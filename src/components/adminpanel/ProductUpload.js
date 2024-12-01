import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { editProduct, getProduct, mediaUpload, saveProduct } from "../../api/admin";
import { jwtDecode } from "jwt-decode";

const ProductUpload = () => {
  const { productId } = useParams();
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
  const [errors, setErrors] = useState({});
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
          const detail = res.data.detail;
          setProductData({
            name: detail.name || "",
            id: productId,
            brand: detail.brand || "",
            collection: detail.collection || "",
            tag: detail.tag || "",
            category: detail.category || "",
            price: detail.price || "",
            stockCount: detail.stockCount
              ? detail.stockCount.reduce((acc, item) => {
                  acc[item.size.toUpperCase()] = item.count;
                  return acc;
                }, {})
              : {},
            rating: detail.rating || 5,
            description: detail.description || "",
            sizes: detail.sizes?.map((size) => size.toUpperCase()) || [],
            offerPrice: detail.offerPrice || "",
            offerPercentage: detail.offerPercentage || "",
            photos: detail.photos || [],
          });
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
    const size = e.target.value;
    setProductData((prevData) => {
      const newSizes = e.target.checked
        ? [...prevData.sizes, size]
        : prevData.sizes.filter((item) => item !== size);

      return {
        ...prevData,
        sizes: newSizes,
      };
    });
  };

  const handleStockChange = (e, size) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      stockCount: {
        ...prevData.stockCount,
        [size]: Number(value),
      },
    }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
    const token = localStorage.getItem("authToken");
    const user = jwtDecode(token);
    try {
      const res = await mediaUpload(files);
      setProductData((prevData) => ({
        ...prevData,
        photos: res.data?.detail[0]?.imageUrls,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = () => {
    setReviewMode(true);
  };

  const handleUpload = () => {
    const {
      name,
      brand,
      collection,
      tag,
      category,
      price,
      offerPercentage,
      sizes,
      stockCount,
      photos,
      description,
    } = productData;

    const newErrors = {};

    if (!name) newErrors.name = "Product name is required.";
    if (!brand) newErrors.brand = "Brand is required.";
    if (!collection) newErrors.collection = "Collection is required.";
    if (!tag) newErrors.tag = "Tag is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!offerPercentage)
      newErrors.offerPercentage = "Offer percentage is required.";
    if (!description) newErrors.description = "Description is required.";
    // if (!photos || photos.length === 0)
    //   newErrors.photos = "At least one photo is required.";
    if (sizes.length === 0) newErrors.sizes = "At least one size is required.";
    if (sizes.length > 0) {
      sizes.forEach((size) => {
        if (!stockCount[size]) {
          newErrors[
            `stockCount-${size}`
          ] = `Stock count for ${size} is required.`;
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if(productId === "new"){
      saveProduct(productData).then((res) => {
        if (res.status === 201) {
          alert("Product added successfully");
          navigate("../admin/products");
        } else {
          alert("Something went wrong");
        }
      });
    }
    else{
      editProduct(productId,productData).then((res) => {
        if (res.status === 200) {
          alert("Product updated successfully");
        }
      });
    }
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
      <h1 className="text-3xl font-bold mb-6"> {productId==='new'?"Upload ":"Edit "}Product</h1>
      <div className="rounded-lg w-full gap-5 grid grid-cols-1 md:grid-cols-2">
        {/* Input Fields */}
        <div>
          <label className="font-semibold">Product Name *</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter product name (max 15 characters)"
            maxLength="15"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="font-semibold">Product Brand *</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className={`w-full border ${
              errors.brand ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter product brand (max 15 characters)"
            maxLength="15"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Collection *</label>
          <input
            type="text"
            name="collection"
            value={productData.collection}
            onChange={handleChange}
            className={`w-full border ${
              errors.collection ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter product collection (max 15 characters)"
            maxLength="15"
          />
          {errors.collection && (
            <p className="text-red-500 text-sm">{errors.collection}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Tag *</label>
          <input
            type="text"
            name="tag"
            value={productData.tag}
            onChange={handleChange}
            className={`w-full border ${
              errors.tag ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter product tag (max 15 characters)"
            maxLength="15"
          />
          {errors.tag && <p className="text-red-500 text-sm">{errors.tag}</p>}
        </div>

        <div>
          <label className="font-semibold">Product Category *</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className={`w-full border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">
            Product Size (Multiple Select) *
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["XS", "S", "M", "L", "XL", "2X"].map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={productData.sizes.includes(size)}
                  onChange={handleSizeChange}
                />
                {size}
              </label>
            ))}
          </div>
          {errors.sizes && (
            <p className="text-red-500 text-sm">{errors.sizes}</p>
          )}
        </div>

        {productData.sizes.length > 0 &&
          productData.sizes.map((size) => (
            <div key={size}>
              <label className="font-semibold">Stock Count for {size} *</label>
              <input
                type="number"
                name="stockCount"
                value={
                  productData.stockCount[size] !== undefined
                    ? productData.stockCount[size]
                    : ""
                }
                onChange={(e) => handleStockChange(e, size)}
                className={`w-full border ${
                  errors[`stockCount-${size}`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={`Enter stock count for ${size}`}
              />
              {errors[`stockCount-${size}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`stockCount-${size}`]}
                </p>
              )}
            </div>
          ))}

        <div>
          <label className="font-semibold">Product Price *</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className={`w-full border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Offer Percentage *</label>
          <input
            type="number"
            name="offerPercentage"
            value={productData.offerPercentage}
            onChange={handleChange}
            className={`w-full border ${
              errors.offerPercentage ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.offerPercentage && (
            <p className="text-red-500 text-sm">{errors.offerPercentage}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Offer Price *</label>
          <input
            type="number"
            name="offerPrice"
            value={productData.offerPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Product Image (Multiple) *</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.photos && (
            <p className="text-red-500 text-sm">{errors.photos}</p>
          )}
        </div>
      </div>
      <div>
        <label className="font-semibold">Description *</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          className={`w-full border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows="4"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
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
                <strong>Stock for {size}:</strong>{" "}
                {productData.stockCount[size]}
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