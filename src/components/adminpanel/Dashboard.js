import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Loader2 from "../common/Loader2";
import { FaSearch, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

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
import MetaTags from "../common/MetaTags";

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

  const [loaderState,SetLoader]=useState(false);

  const [pieChartData, setPieChartData] = useState({
    labels: ["Completed", "Dispatched"],
    datasets: [
      {
        label: "Order Status Distribution",
        data: [
          orderStats.completedOrders,
          orderStats.dispatchedOrders,
        ],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(255,205,86,1)",
        ],
        hoverBackgroundColor: [
          "rgba(75,192,192,0.8)",
          "rgba(255,205,86,0.8)",
        ],
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: ["Total Orders", "Completed Orders", "Dispatched Orders"],
    datasets: [
      {
        label: "Order Counts",
        data: [
          orderStats.totalOrders,
          orderStats.completedOrders,
          orderStats.dispatchedOrders,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchOrderStats = async () => {
      SetLoader(true);
      try {
        const res = await getOrderStats(timeRange); 
        SetLoader(false);
        if (res.status === 200) {
          
          setOrderStats(res.data.detail);
          setPieChartData({
            labels: ["Completed", "Dispatched"],
            datasets: [
              {
                label: "Order Status Distribution",
                data: [
                  res.data.detail.completedOrders,
                  res.data.detail.dispatchedOrders,
                ],
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "rgba(255,205,86,1)",
                ],
                hoverBackgroundColor: [
                  "rgba(75,192,192,0.8)",
                  "rgba(255,205,86,0.8)",
                ],
              },
            ],
          });
        } else {
          console.log(res);
        }
      } catch (error) {
        SetLoader(false);
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
          setSalesDetails(res.data.detail);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.error("Error fetching sales details:", error);
      }
    };
  
    fetchSalesDetails();
  }, []);

  useEffect(() => {
    setBarChartData({
      labels: ["Total Orders", "Completed Orders", "Dispatched Orders"],
      datasets: [
        {
          label: "Order Counts",
          data: [
            orderStats.totalOrders,
            orderStats.completedOrders,
            orderStats.dispatchedOrders,
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 205, 86, 0.6)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 205, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [orderStats]);

  const stats = {
    ...orderStats[timeRange],
    dispatchedOrders: orderStats.dispatchedOrders,
    completedOrders: orderStats.completedOrders,
    totalOrders: orderStats.totalOrders,
    totalUsers: orderStats.totalUsers,
    earnings: orderStats.totalEarnings,
  };

  const metaData = {
    title:"Dashboard",desc:""
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      {loaderState && <Loader2/>}
      <MetaTags data={metaData} />
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
            <p className="text-gray-500">Dispatched Orders</p>
            <h3 className="text-2xl font-semibold">{orderStats.dispatchedOrders}</h3>
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

      <div>
        <h2 className="text-lg font-semibold mb-4">Order Counts Overview</h2>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
      
      <div className="bg-white grid lg:grid-cols-2 grid-cols-1  p-5 my-10 rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {/* Adjusted margin for mobile responsiveness */}
            Order Status Distribution
          </h2>
          <div className="xl:max-w-96">
            <h3 className="text-center bold">Completed VS Pending Orders</h3>
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
                    text: "",
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
            {/* Twitter */}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
              <FaTwitter className="text-blue-500 text-3xl mr-4" />
              <div>
                <p className="text-gray-500">Twitter</p>
                <h3 className="text-2xl font-semibold">
                  {salesDetails.twitterx}
                </h3>
              </div>
            </div>
            {/* Youtube */}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
              <FaYoutube className="text-red-500 text-3xl mr-4" />
              <div>
                <p className="text-gray-500">Youtube</p>
                <h3 className="text-2xl font-semibold">
                  {salesDetails.youtube}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
