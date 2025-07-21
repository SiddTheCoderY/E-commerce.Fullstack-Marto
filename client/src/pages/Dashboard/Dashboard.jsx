import React, { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Search, Sun, MoreVertical } from "lucide-react";
import CountUp from "react-countup";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

// 📦 Dummy Data
const statsData = [
  {
    title: "Ecommerce Revenue",
    value: 245450, // number for count animation
    displayValue: "245,450", // formatted string for showing if you want
    change: "+14.9%",
    sub: "(+43.21%)",
    color: "text-green-600",
    bg: "bg-orange-50",
  },
  {
    title: "New Customers",
    value: 684,
    displayValue: "684",
    change: "-8.6%",
    sub: "",
    color: "text-red-500",
    bg: "bg-green-50",
  },
  {
    title: "Repeat Purchase Rate",
    value: 75.12,
    displayValue: "75.12 %",
    change: "+25.4 %",
    sub: "(+20.11 %)",
    color: "text-green-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Average Order Value",
    value: 2412.23,
    displayValue: "$2,412.23",
    change: "+35.2 %",
    sub: "(+$575)",
    color: "text-green-600",
    bg: "bg-blue-50",
  },
  {
    title: "Conversion rate",
    value: 32.65,
    displayValue: "32.65 %",
    change: "-12.42 %",
    sub: "",
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

const chartData = {
  labels: [
    "Sep 07",
    "Sep 08",
    "Sep 09",
    "Sep 10",
    "Sep 11",
    "Sep 12",
    "Sep 13",
  ],
  datasets: [
    {
      label: "Order",
      data: [5000, 7500, 7200, 4300, 3000, 3800, 6000],
      borderColor: "#22C55E",
      backgroundColor: "#22C55E",
      tension: 0.3,
    },
    {
      label: "Income Growth",
      data: [6000, 7000, 6900, 5500, 4000, 4500, 7000],
      borderColor: "#3B82F6",
      backgroundColor: "#3B82F6",
      tension: 0.3,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const products = [
  { name: "Snicker Vento", id: "2441310", sales: "128 Sales", image: "👟" },
  { name: "Blue Backpack", id: "1241318", sales: "401 Sales", image: "🎒" },
  { name: "Water Bottle", id: "8441573", sales: "1K+ Sales", image: "🚰" },
];

const orders = [
  {
    product: "Water Bottle",
    customer: "Peterson Jack",
    orderId: "#8441573",
    date: "27 Jun 2025",
    status: "Pending",
    statusColor: "text-yellow-600 bg-yellow-100",
  },
  {
    product: "iPhone 15 Pro",
    customer: "Michel Datta",
    orderId: "#2457841",
    date: "26 Jun 2025",
    status: "Canceled",
    statusColor: "text-red-600 bg-red-100",
  },
  {
    product: "Headphone",
    customer: "Jeslya Rose",
    orderId: "#1024784",
    date: "20 Jun 2025",
    status: "Shipped",
    statusColor: "text-green-600 bg-green-100",
  },
];

const topCustomers = [
  { name: "Marks Hoverson", orders: 25 },
  { name: "Marks Hoverson", orders: 15 },
  { name: "Jhony Peters", orders: 23 },
];

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || user.role !== "seller") {
      toast.error("Become a seller to access dashboard");
      navigate("/");
    }
  }, [user]);

  const verifyDashvoardVisit = async () => {
    try {
      const response = await axiosInstance.post(
        "/user/verify-visit-to-seller-dashboard"
      );
      console.log(response);
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Dashboard");
    verifyDashvoardVisit();
    console.log("Dashboard visited");
  }, []);

  return (
    <div className="flex-1 bg-[#e4e7eb] p-6 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 bg-white shadow-sm outline-none text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <Sun className="text-gray-500 h-5 w-5 cursor-pointer" />
          <img src={user?.avatar} className="rounded-full h-8 w-8" alt="user" />
        </div>
      </div>

      {/* Greeting and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome Back,{" "}
            <span className="highlight-tilt p-[1.5px] text-white">
              {user?.fullName}
            </span>
          </h1>
          <p className="text-sm text-gray-500">
            Here's what happening with your store today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white shadow-sm">
            <option>Previous Year</option>
            <option>This Year</option>
          </select>
          <button className="text-sm font-medium px-4 py-2 bg-gray-900 text-white rounded-md">
            View All Time
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {statsData.map((item, index) => {
          // calculate start number for countup (30 less but not below 0)
          const startVal =
            typeof item.value === "number" ? Math.max(item.value - 30, 0) : 0;

          return (
            <div
              key={index}
              className={`rounded-xl p-4 shadow-sm bg-white/90 backdrop-blur-[3px] ${item.bg}`}
              style={{
                animation: `fadeInUp 0.5s ease forwards`,
                animationDelay: `${index * 150}ms`,
                opacity: 0,
              }}
            >
              <h3 className="text-xs text-gray-500">{item.title}</h3>
              <p className="text-lg font-semibold text-gray-800">
                <CountUp
                  start={Math.max(item.value - 30, 0)}
                  end={item.value}
                  duration={1.5}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix={item.title === "Average Order Value" ? "$" : ""}
                  suffix={item.displayValue.includes("%") ? " %" : ""}
                />
              </p>
              <span className={`text-xs font-medium ${item.color}`}>
                {item.change} {item.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-[3px] p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Summary</h3>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          <Line data={chartData} options={chartOptions} height={130} />
        </div>

        <div className="bg-white/60 backdrop-blur-[3px] p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">
              Most Selling Products
            </h3>
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </div>
          <ul className="space-y-4">
            {products.map((p, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.image}</span>
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-gray-400">ID: {p.id}</div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {p.sales}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Orders and Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-[3px] p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Recent Orders</h3>
            <button className="text-sm text-blue-600">View All</button>
          </div>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-left border-b">
              <tr>
                <th className="py-2">Product</th>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3">{order.product}</td>
                  <td>{order.customer}</td>
                  <td>{order.orderId}</td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white/60 backdrop-blur-[3px] p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">
              Weekly Top Customers
            </h3>
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </div>
          <ul className="space-y-4">
            {topCustomers.map((c, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${i + 5}`}
                    className="w-8 h-8 rounded-full"
                    alt={c.name}
                  />
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-gray-400">
                      {c.orders} Orders
                    </div>
                  </div>
                </div>
                <button className="text-xs text-blue-600 font-medium">
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>
        {`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
      </style>
    </div>
  );
}
