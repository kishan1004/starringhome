import React from "react";
import { Link } from "react-router-dom";

const SizeChart = () => {
  return (
    <div className="container mx-auto pb-10 p-4 md:px-10 font-beatrice bg-gray-100">
      {/* Inches Table */}
      <section className="max-w-screen py-14">
        <Link to="/one-product">
          <svg
            width="62"
            height="14"
            viewBox="0 0 62 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60.5 7H1M1 7L7 1M1 7L7 13"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </section>

      <h1 className="text-3xl font-semibold flex justify-center pb-4">
        Measurement Guide
      </h1>

      <h2 className="text-xl font-bold mb-4">IN</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">XS</th>
            <th className="border px-4 py-2">S</th>
            <th className="border px-4 py-2">M</th>
            <th className="border px-4 py-2">L</th>
            <th className="border px-4 py-2">XL</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["CHEST", "22", "23", "23.5", "24.5", "25"],
            ["LENGTH", "27", "28", "29", "30", "30.5"],
            ["SHOULDER", "21", "22", "23", "24", "25"],
            ["SLV. LENGTH", "8.5", "9", "9.5", "10", "10"],
            ["SLV. OPEN", "7.5", "8", "8", "9", "9"],
            ["NECK WIDTH", "7", "7", "7.5", "7.5", "8"],
          ].map((row, index) => (
            <tr key={index}>
              {row.map((cell, idx) => (
                <td key={idx} className="border px-2 py-2 text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Centimeters Table */}
      <h2 className="text-xl font-bold mt-8 mb-4">CM</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">XS</th>
            <th className="border px-4 py-2">S</th>
            <th className="border px-4 py-2">M</th>
            <th className="border px-4 py-2">L</th>
            <th className="border px-4 py-2">XL</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["CHEST", "56", "58", "60", "62", "64"],
            ["LENGTH", "69", "71", "73", "75", "77"],
            ["SHOULDER", "55", "57", "59", "61", "63"],
            ["SLV. LENGTH", "22", "23", "24", "25", "26"],
            ["SLV. OPEN", "19", "20", "21", "22", "23"],
            ["NECK WIDTH", "18", "18", "19", "19", "20"],
          ].map((row, index) => (
            <tr key={index}>
              {row.map((cell, idx) => (
                <td key={idx} className="border px-2 py-2 text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeChart;
