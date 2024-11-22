import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { saveProduct } from "../../api/admin";

const ProductUpload = () => {
  const [productData, setProductData] = useState({
    name: "",
    id: "",
    brand: "",
    collection: "",
    tag: "",
    category: "",
    price: "",
    stock: {},
    rating: "",
    description: "",
    size: [],
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

  // Effect to update offerPrice whenever offerPercentage changes
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
      [name]: value,
    }));
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setProductData((prevData) => {
      const newSizes = e.target.checked
        ? [...prevData.size, size] // Add the size if checked
        : prevData.size.filter((item) => item !== size); // Remove the size if unchecked

      return {
        ...prevData,
        size: newSizes,
      };
    });
  };

  const handleStockChange = (e, size) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      stock: {
        ...prevData.stock,
        [size]: value,
      },
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      price: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData((prevData) => ({
      ...prevData,
      photos: files,
    }));
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleReview = () => {
    setReviewMode(true);
  };

  const handleUpload = () => { 
    // created product
    saveProduct(productData).then((res) => {
      console.log(res);
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
          <label className="font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="font-semibold">Product ID</label>
          <input
            type="text"
            name="id"
            value={productData.id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product ID"
          />
        </div>

        <div>
          <label className="font-semibold">Product Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product brand"
          />
        </div>
        <div>
          <label className="font-semibold">Collection</label>
          <input
            type="text"
            name="Tag"
            value={productData.collection}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product brand"
          />
        </div>
        <div>
          <label className="font-semibold">Tag</label>
          <input
            type="text"
            name="Tag"
            value={productData.tag}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product brand"
          />
        </div>

        <div>
          <label className="font-semibold">Product Category</label>
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
            Product Size (Multiple Select)
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["XS", "S", "M", "L", "XL", "2X"].map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={productData.size.includes(size)}
                  onChange={handleSizeChange}
                  className="form-checkbox"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        {productData.size.length > 0 &&
          productData.size.map((size) => (
            <div key={size}>
              <label className="font-semibold">Stock Count for {size}</label>
              <input
                type="number"
                name="stock"
                value={productData.stock[size] || ""}
                onChange={(e) => handleStockChange(e, size)}
                className="w-full px-4 py-2 border rounded"
                placeholder={`Enter stock count for ${size}`}
              />
            </div>
          ))}

        <div>
          <label className="font-semibold">Product Price</label>
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
          <label className="font-semibold">Offer Percentage</label>
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
          <label className="font-semibold">Product Photos (Multiple)</label>
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
        <label className="font-semibold">Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter product description"
          rows="3"
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
            <strong>Size:</strong> {productData.size.join(", ")}
          </p>
          {productData.size.length > 0 &&
            productData.size.map((size) => (
              <p key={size}>
                <strong>Stock for {size}:</strong> {productData.stock[size]}
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
