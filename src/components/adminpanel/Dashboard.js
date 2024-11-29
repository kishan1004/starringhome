import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import { FaSearch, FaFacebook, FaInstagram } from "react-icons/fa";
import {
  FaUsers,
  FaShoppingCart,
  FaCheck,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { axiosInstance } from "../../utils/axios";
import { getOrderStats, getSalesDetails } from "../../api/admin";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [orderStats, setOrderStats] = useState({
    completedOrders: 0,
    completedOrdersPercent: 0,
    dispatchedOrders: 0,
    dispatchedOrdersPercent: 0,
    totalEarnings: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  const [salesDetails,setSalesDetails] = useState({
    google:0,
    facebook:0,
    instagram:0
  });

  const [timeRange, setTimeRange] = useState("lastDay");

  
  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const res = await getOrderStats(timeRange); 
        if (res.status === 200) {
          console.log("Success", res.data);
          setOrderStats(res.data.detail);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    };
  
    fetchOrderStats();
  }, [timeRange]);

  useEffect(() => {
    const fetchSalesDetails = async () => {
      try {
        const res = await getSalesDetails(); 
        if (res.status === 200) {
          console.log("Success", res.data);
          setSalesDetails(res.data.detail);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    };
  
    fetchSalesDetails();
  }, []);

  
  

  const statsData = {
    lastDay: {
      totalUsers: 150,
      totalOrders: 45,
      completedOrders: 20,
      pendingOrders: 23,
      canceledOrders: 12,
      returns: 4,
      earnings: "Rs.1,200",
      ordersOverTime: [10, 20, 15, 5, 23], // Orders every 6 hours
      completedOrdersOverTime: [5, 14, 34, 8, 14],
      pendingOrdersOverTime: [5, 9, 3, 4, 1],
      timeLabels: ["0h", "6h", "12h", "18h", "24h"],
      trafficData: {
        organicSearch: 120,
        facebook: 50,
        instagram: 25,
        direct: 40,
        referral: 20,
        paidAds: 15,
        dailySales: 1200,
      },
    },
    lastWeek: {
      totalUsers: 900,
      totalOrders: 600,
      completedOrders: 500,
      pendingOrders: 80,
      canceledOrders: 20,
      returns: 15,
      earnings: "Rs.10,500",
      ordersOverTime: [150, 30, 150, 200, 250, 300, 600], // Orders for each of the 7 days
      completedOrdersOverTime: [40, 10, 120, 160, 200, 250, 500], // Completed orders for each of the 7 days
      pendingOrdersOverTime: [110, 20, 30, 40, 50, 60, 80], // Pending orders for each of the 7 days
      canceledOrdersOverTime: [2, 5, 3, 4, 4, 2, 2], // Canceled orders (example values)
      returnsOverTime: [1, 3, 2, 1, 2, 2, 4], // Returns (example values)
      timeLabels: [
        "Day 1",
        "Day 2",
        "Day 3",
        "Day 4",
        "Day 5",
        "Day 6",
        "Day 7",
      ], // Labels for all 7 days
      trafficData: {
        organicSearch: 400,
        facebook: 120,
        instagram: 100,
        direct: 150,
        referral: 80,
        paidAds: 60,
        dailySales: 1500,
      },
    },
    lastMonth: {
      totalUsers: 3500,
      totalOrders: 4500,
      completedOrders: 4000,
      pendingOrders: 300,
      canceledOrders: 100,
      returns: 50,
      earnings: "Rs.78,000",
      ordersOverTime: [500, 800, 1500, 2000, 3000, 4000, 4500], // Orders on Day 1, 5, 10, 15, 20, 25, 30
      completedOrdersOverTime: [400, 600, 1200, 1600, 2800, 3600, 4000], // Completed orders
      pendingOrdersOverTime: [50, 60, 100, 120, 200, 250, 300], // Pending orders
      canceledOrdersOverTime: [10, 5, 12, 15, 20, 25, 28], // Canceled orders (example values)
      returnsOverTime: [2, 3, 5, 6, 7, 8, 10], // Returns (example values)
      timeLabels: [
        "Day 1",
        "Day 5",
        "Day 10",
        "Day 15",
        "Day 20",
        "Day 25",
        "Day 30",
      ], // Updated labels
      trafficData: {
        organicSearch: 1500, // Total for the month
        facebook: 600, // Total for the month
        instagram: 400, // Total for the month
        direct: 800, // Total for the month
        referral: 350, // Total for the month
        paidAds: 250, // Total for the month
        dailySales: 2600, // Total sales for the month
      },
    },
    lastYear: {
      totalUsers: 42000,
      totalOrders: 50000,
      completedOrders: 47000,
      pendingOrders: 2000,
      canceledOrders: 500,
      returns: 300,
      earnings: "Rs.650,000",
      ordersOverTime: [
        5000, 8000, 12000, 15000, 18000, 22000, 25000, 28000, 32000, 37000,
        45000, 50000,
      ], // Monthly distribution for orders
      completedOrdersOverTime: [
        4500, 8000, 12000, 14000, 16000, 19000, 22000, 24000, 27000, 33000,
        42000, 47000,
      ], // Completed orders for each month
      pendingOrdersOverTime: [
        300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1500, 2000,
      ], // Pending orders for each month
      canceledOrdersOverTime: [
        20, 40, 60, 70, 80, 90, 100, 110, 120, 130, 150, 200,
      ], // Canceled orders per month (example values)
      returnsOverTime: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150], // Returns per month (example values)
      timeLabels: [
        "Month 1",
        "Month 2",
        "Month 3",
        "Month 4",
        "Month 5",
        "Month 6",
        "Month 7",
        "Month 8",
        "Month 9",
        "Month 10",
        "Month 11",
        "Month 12",
      ], // Monthly labels
      trafficData: {
        organicSearch: 20000, // Total for the year
        facebook: 6000, // Total for the year
        instagram: 4000, // Total for the year
        direct: 9000, // Total for the year
        referral: 3000, // Total for the year
        paidAds: 2000, // Total for the year
        dailySales: 3500, // Average sales per day over the year
      },
    },
  };

  const stats = statsData[timeRange];

  // Prepare data for the chart
  const lineChartData = {
    labels: stats.timeLabels,
    datasets: [
      {
        label: "Total Orders",
        data: stats.ordersOverTime,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.6)", // Green with more opacity
        stack: "Stack 0", // Ensures stacking starts from base
      },
      {
        label: "Completed Orders",
        data: stats.completedOrdersOverTime,
        borderColor: "purple",
        backgroundColor: "rgba(128, 0, 128, 0.6)", // Purple with more opacity
        stack: "Stack 1", // Complements stack
      },
      {
        label: "Pending Orders",
        data: stats.pendingOrdersOverTime,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.6)", // Orange with more opacity
        stack: "Stack 2", // Complements stack
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "500",
          },
          color: "#021526", // Dark blue for legend text
        },
      },
      title: {
        display: true,
        text: `Orders Overview for ${timeRange.replace("last", "Last ")}`,
        font: {
          size: 20,
          weight: "600",
        },
        color: "#03346E", // Blue for title
        padding: {
          top: 20,
          bottom: 30,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          font: {
            size: 14,
            weight: "500",
          },
          color: "#03346E", // Blue for x-axis title
          padding: { top: 10 },
        },
        grid: {
          color: "#E2E2B6", // Light grid lines color
          borderColor: "#E2E2B6", // Light border color
        },
        ticks: {
          color: "#6EACDA", // Light blue ticks
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Orders",
          font: {
            size: 14,
            weight: "500",
          },
          color: "#03346E", // Blue for y-axis title
          padding: { top: 10 },
        },
        grid: {
          color: "#E2E2B6", // Light grid lines color
          borderColor: "#E2E2B6", // Light border color
        },
        ticks: {
          color: "#6EACDA", // Light blue ticks
          callback: function (value) {
            return value.toLocaleString(); // Format numbers with commas
          },
        },
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        backgroundColor: "#FF6347", // Tomato red for data points
        borderWidth: 2,
        borderColor: "#6EACDA", // Light blue border for points
      },
      line: {
        borderWidth: 3,
        tension: 0.3, // Slightly curved lines
      },
    },
    interaction: {
      mode: "index", // Show interaction based on x-axis index
      intersect: false, // Doesn't require bars to intersect
    },
    stacked: false, // Disable stacking for line chart (stacking is for bar charts)
    // Adding different colors for each dataset line
    datasets: [
      {
        label: "Total Orders",
        borderColor: "#FF6347", // Tomato red
        backgroundColor: "rgba(255, 99, 71, 0.2)", // Light red with transparency
        fill: true, // Fill the area under the line
      },
      {
        label: "Completed Orders",
        borderColor: "#6EACDA", // Light blue
        backgroundColor: "rgba(110, 172, 218, 0.3)", // Semi-transparent blue
        fill: true, // Fill the area under the line
      },
      {
        label: "Pending Orders",
        borderColor: "#FF4500", // Orange-red
        backgroundColor: "rgba(255, 69, 0, 0.2)", // Light orange-red
        fill: true, // Fill the area under the line
      },
    ],
  };

  const pieChartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Order Status Distribution",
        data: [
          stats.completedOrders,
          stats.pendingOrders,
          // stats.canceledOrders,
          // stats.returns,
        ],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(255,205,86,1)",
          // "rgba(255,99,132,1)",
          // "rgba(153,102,255,1)",
        ],
        hoverBackgroundColor: [
          "rgba(75,192,192,0.8)",
          "rgba(255,205,86,0.8)",
          // "rgba(255,99,132,0.8)",
          // "rgba(153,102,255,0.8)",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Time Range Selector */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {["lastDay", "lastWeek", "lastMonth", "lastYear"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`py-2 px-4 rounded ${
              timeRange === range ? "bg-black text-white" : "bg-[#D9D9D9]"
            } `} // Added hover effect
          >
            {range.replace("last", "Last ")}
          </button>
        ))}
      </div>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-blue-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-2xl font-semibold">{orderStats.totalUsers}</h3>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaShoppingCart className="text-green-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-semibold">{orderStats.totalOrders}</h3>
          </div>
        </div>

        {/* Orders Completed Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaCheck className="text-purple-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Orders Completed</p>
            <h3 className="text-2xl font-semibold">{orderStats.completedOrders}</h3>
          </div>
        </div>

        {/* Orders Pending Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaClock className="text-yellow-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Orders Pending</p>
            <h3 className="text-2xl font-semibold">{stats.pendingOrders}</h3>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaRupeeSign className="text-red-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Earnings</p>
            <h3 className="text-2xl font-semibold">{orderStats.totalEarnings}</h3>
          </div>
        </div>
      </div>
      {/* Chart Section */}
      <div className="mb-5 lg:mb-0 hidden md:block max-w-full p-4 bg-white shadow-md rounded-md my-4 ">
        {/* Added margin for spacing on smaller screens */}
        <h2 className="text-lg font-semibold mb-4">Statistics Overview</h2>
        <div className="max-w-full mx-auto p-6">
          <div className="overflow-hidden">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>
      <div className="bg-white grid lg:grid-cols-2 grid-cols-1  p-5 my-10 rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {/* Adjusted margin for mobile responsiveness */}
            Order Status Distribution
          </h2>
          <div className="xl:max-w-96">
            <Doughnut
              data={pieChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right",
                  },
                  title: {
                    display: true,
                    text: "Completed vs Pending Orders",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                    color: "#333",
                  },
                },
                cutout: "40%", // Adjust this value for the size of the hole (70% is just an example)
              }}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Traffic & Sales Overview
          </h2>

          {/* Traffic Sources */}
          <div className="grid grid-cols-1 gap-4 my-6">
            {/* Organic Search */}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
              <FaSearch className="text-blue-500 text-3xl mr-4" />
              <div>
                <p className="text-gray-500">Organic Search</p>
                <h3 className="text-2xl font-semibold">
                  {salesDetails.google}
                </h3>
              </div>
            </div>

            {/* Facebook */}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
              <FaFacebook className="text-blue-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-500">Facebook</p>
                <h3 className="text-2xl font-semibold">
                  {salesDetails.facebook}
                </h3>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
              <FaInstagram className="text-pink-500 text-3xl mr-4" />
              <div>
                <p className="text-gray-500">Instagram</p>
                <h3 className="text-2xl font-semibold">
                  {salesDetails.instagram}
                </h3>
              </div>
            </div>
          </div>

          {/* Daily Sales */}
          {/* <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-gray-500">Daily Sales</h3>
            <h2 className="text-2xl font-semibold">
              ${stats.trafficData.dailySales}
            </h2>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
