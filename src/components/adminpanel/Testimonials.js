import React, { useState } from "react";

const testimonialsData = [
  { id: 1, customerName: "Alice", review: "Great product! Highly recommend." },
  {
    id: 2,
    customerName: "Bob",
    review: "Excellent customer service and fast shipping.",
  },
  {
    id: 3,
    customerName: "Charlie",
    review: "The quality is outstanding! Will buy again.",
  },
  { id: 4, customerName: "David", review: "Very satisfied with my purchase." },
  {
    id: 5,
    customerName: "Eva",
    review: "Amazing experience! Will definitely recommend.",
  },
  { id: 6, customerName: "Alice", review: "Great product! Highly recommend." },
  {
    id: 7,
    customerName: "Bob",
    review: "Excellent customer service and fast shipping.",
  },
  {
    id: 8,
    customerName: "Charlie",
    review: "The quality is outstanding! Will buy again.",
  },
  { id: 9, customerName: "David", review: "Very satisfied with my purchase." },
  {
    id: 10,
    customerName: "Eva",
    review: "Amazing experience! Will definitely recommend.",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [newTestimonial, setNewTestimonial] = useState({
    customerName: "",
    review: "",
  });
  const itemsPerPage = 8;
  const totalItems = testimonials.length;

  const handleNext = () => {
    if (currentIndex < Math.floor(totalItems / itemsPerPage)) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTestimonial.customerName && newTestimonial.review) {
      setTestimonials((prevTestimonials) => [
        ...prevTestimonials,
        { id: prevTestimonials.length + 1, ...newTestimonial },
      ]);
      setNewTestimonial({ customerName: "", review: "" }); // Reset form
    }
  };

  const displayedTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Customer Testimonials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {displayedTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-4 border rounded">
            <h3 className="font-semibold">{testimonial.customerName}</h3>
            <p className="text-gray-600">{testimonial.review}</p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded ${
            currentIndex === 0 ? "bg-gray-300" : "bg-black text-white"
          } `}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= Math.floor(totalItems / itemsPerPage)}
          className={`px-4 py-2 rounded ${
            currentIndex >= Math.floor(totalItems / itemsPerPage)
              ? "bg-gray-300"
              : "bg-black text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Form for New Testimonial */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 p-4 bg-white border rounded shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Add a Testimonial</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="customerName">
            Name:
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={newTestimonial.customerName}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="review">
            Review:
          </label>
          <textarea
            id="review"
            name="review"
            value={newTestimonial.review}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testimonials;
