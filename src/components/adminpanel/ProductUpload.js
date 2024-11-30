import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getProduct, mediaUpload, saveProduct } from "../../api/admin";
import { jwtDecode } from "jwt-decode";

const ProductUpload = () => {
  const {productId} = useParams();
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    collection: "",
    tag: "",
    category: "",
    price: "",
    stockCount: [],
    rating: 5,
    description: "",
    sizes: [],
    offerPrice: "",
    offerPercentage: "",
    photos: [],
  });

  const [reviewMode, setReviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Tshirt",
    "Shirt",
    "Polo",
    "Oversized",
    "Jacket",
    "Hoodie",
  ];


  useEffect(() => {
    const fetchProduct = async () => {
      if (productId !== "new") {
        const res = await getProduct(productId);
        if (res.status === 200) {
          console.log(res.data.detail);
          setProductData({
            name: res.data.detail.name,
            id: productId, 
            brand: res.data.detail.brand,
            collection: res.data.detail.collection,
            tag: res.data.detail.tag,
            category: res.data.detail.category,
            price: res.data.detail.price,
            stockCount: res.data.detail.stockCount ? res.data.detail.stockCount.reduce((acc, item) => {
              acc[item.sizes.toUpperCase()] = item.count; 
              return acc;
            }, {}) : {},
            rating: res.data.detail.rating,
            description: res.data.detail.description,
            sizes: res.data.detail.sizes.map(size => size.toUpperCase()), 
            offerPrice: res.data.detail.offerPrice,
            offerPercentage: res.data.detail.offerPercentage,
            photos: res.data.detail.photos,
          });
        } else {
          console.log(res);
        }
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (productData.offerPercentage && productData.price) {
      const offerPrice =
        productData.price -
        (productData.price * productData.offerPercentage) / 100;
      setProductData((prevData) => ({
        ...prevData,
        offerPrice: offerPrice.toFixed(2),
      }));
    }
  }, [productData.offerPercentage, productData.price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === "photos" ? e.target.files[0].name : value,
    }));
  };

  const handleSizeChange = (e) => {
    const sizes = e.target.value;
    setProductData((prevData) => {
      const newSizes = e.target.checked
        ? [...prevData.sizes, sizes] // Add the sizes if checked
        : prevData.sizes.filter((item) => item !== sizes); // Remove the sizes if unchecked

      return {
        ...prevData,
        sizes: newSizes,
      };
    });
  };

  const handleStockChange = (e, size) => {
    const { value } = e.target;
    setProductData((prevData) => {
      const updatedStockCount = prevData.stockCount.map(stock => 
        stock.size === size ? { ...stock, count: value } : stock
      );

      // Check if the size does not exist in the stockCount array
      if (!updatedStockCount.some(stock => stock.size === size)) {
        updatedStockCount.push({ count: value, size }); // Add new size if it doesn't exist
      }

      return {
        ...prevData,
        stockCount: updatedStockCount,
      };
    });
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      price: value,
    }));
  };

  const handleFileChange = async(e) => {
    const files = Array.from(e.target.files);
    setProductData((prevData) => ({
      ...prevData,
      photos: files,
    }));
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
    const token = localStorage.getItem('authToken')
    const user = jwtDecode(token);
    console.log(user);
    try{
      const res = await mediaUpload(files);
      console.log(res.data?.detail[0]?.imageUrls);
      setProductData((prevData) => ({
        ...prevData,
        photos: res.data?.detail[0]?.imageUrls,
      }));
      console.log(res);
    }
    catch(err)
    {
      console.log(err);
    }
  };

  const handleReview = () => {
    setReviewMode(true);
  };

  const handleUpload = () => {
    // created product
    saveProduct(productData).then((res) => {
      console.log(res);
      if(res.status===201)
      {
        alert("Added successfully");
        navigate('../admin/products');
      }
      else
      {
        console.log(res.data);
        alert('Something went wrong');
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gray-100 mt-14 p-8">
      <button
        onClick={() => navigate("/admin/products")}
        className="mb-4 flex items-center"
      >
        <FaArrowLeftLong />
      </button>
      <h1 className="text-3xl font-bold mb-6">Product Upload</h1>
      <div className="rounded-lg w-full gap-5 grid grid-cols-1 md:grid-cols-2">
        {/* Input Fields */}
        <div>
          <label className="font-semibold">Product Name *</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product name (max 15 characters)"
            maxLength="15"
          />
        </div>
        {/* <div>
          <label className="font-semibold">Product ID *</label>
          <input
            type="text"
            name="id"
            value={productData.id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product ID (max 15 characters)"
            maxLength="15"
          />
        </div> */}

        <div>
          <label className="font-semibold">Product Brand *</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product brand (max 15 characters)"
            maxLength="15"
          />
        </div>
        <div>
          <label className="font-semibold">Collection</label>
          <input
            type="text"
            name="collection"
            value={productData.collection}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product collection (max 15 characters)"
            maxLength="15"
          />
        </div>
        <div>
          <label className="font-semibold">Tag</label>
          <input
            type="text"
            name="tag"
            value={productData.tag}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product tag (max 15 characters)"
            maxLength="15"
          />
        </div>

        <div>
          <label className="font-semibold">Product Category *</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Product Size (Multiple Select) *
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["XS", "S", "M", "L", "XL", "2X"].map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={productData.sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="form-checkbox"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        {productData.sizes.length > 0 &&
          productData.sizes.map((size) => (
            <div key={size}>
              <label className="font-semibold">Stock Count for {size} *</label>
              <input
                type="number"
                name="stockCount"
                value={productData.stockCount[size] !== undefined ? productData.stockCount[size] : ""}
                onChange={(e) => handleStockChange(e, size)}
                className="w-full px-4 py-2 border rounded"
                placeholder={`Enter stock count for ${size}`}
              />
            </div>
          ))}

        <div>
          <label className="font-semibold">Product Price *</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handlePriceChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product price"
          />
        </div>

        <div>
          <label className="font-semibold">Offer Percentage *</label>
          <input
            type="number"
            name="offerPercentage"
            value={productData.offerPercentage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter offer percentage"
          />
        </div>

        <div>
          <label className="font-semibold">Offer Price</label>
          <input
            type="text"
            value={productData.offerPrice}
            readOnly
            className="w-full px-4 py-2 border rounded"
            placeholder="Calculated offer price"
          />
        </div>

        <div>
          <label className="font-semibold">Product Photos (Multiple) *</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      </div>
      <div>
        <label className="font-semibold">Description *</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter product description (max 150 characters)"
          rows="3"
          maxLength="150"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleReview}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Review
        </button>
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>

      {/* Review Section */}
      {reviewMode && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Review Product Details</h2>
          <p>
            <strong>Name:</strong> {productData.name}
          </p>
          <p>
            <strong>ID:</strong> {productData.id}
          </p>
          <p>
            <strong>Brand:</strong> {productData.brand}
          </p>
          <p>
            <strong>Collection:</strong> {productData.collection}
          </p>
          <p>
            <strong>Tag:</strong> {productData.tag}
          </p>
          <p>
            <strong>Category:</strong> {productData.category}
          </p>
          <p>
            <strong>Size:</strong> {productData.sizes.join(", ")}
          </p>
          {productData.sizes.length > 0 &&
            productData.sizes.map((size) => (
              <p key={size}>
                <strong>Stock for {size}:</strong> {productData.stockCount[size]}
              </p>
            ))}
          <p>
            <strong>Price:</strong> Rs.{productData.price}
          </p>
          <p>
            <strong>Offer Price:</strong> Rs.{productData.offerPrice}
          </p>
          <p>
            <strong>Offer Percentage:</strong> {productData.offerPercentage}%
          </p>
          <p>
            <strong>Description:</strong> {productData.description}
          </p>
          <p>
            <strong>Photos:</strong>{" "}
            {imagePreview?.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="w-20 h-20 mr-2"
              />
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
