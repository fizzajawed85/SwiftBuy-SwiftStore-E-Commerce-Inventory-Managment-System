// src/pages/admin/Dashboard.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import { loadOrders } from "../../redux/slices/orderSlice.js";
import { loadCategories } from "../../redux/slices/categorySlice.js";

// Recharts
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

// Icons
import { FaBoxOpen, FaShoppingCart, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
  const dispatch = useDispatch();

  // Redux state
  const products = useSelector((state) => state.products?.items || []);
  const orders = useSelector((state) => state.orders?.items || []);
  const categories = useSelector((state) => state.categories?.items || []);

  // Load data
  useEffect(() => {
    dispatch(loadOrders());
    dispatch(loadCategories());
  }, [dispatch]);

  // Derived stats
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalOrders = orders.length;

  // Orders chart
  const ordersChartData = orders.reduce((acc, order) => {
    const date = order.date ? new Date(order.date).toLocaleDateString() : "Unknown";
    if (!acc[date]) acc[date] = 0;
    acc[date]++;
    return acc;
  }, {});
  const chartOrdersData = Object.keys(ordersChartData).map((date) => ({
    date,
    orders: ordersChartData[date],
  }));

  // Products chart
  const chartProductsData = products.map((product) => ({
    name: product.name || "Unknown",
    stock: product.stock || 0,
  }));

  // Categories chart
  const chartCategoriesData = categories.map((cat) => {
    const productCount = products.filter((p) => p.category === cat.name).length;
    return { name: cat.name, count: productCount };
  });

  // Overall performance
  const overallData = [
    { name: "Products", value: products.length },
    { name: "Stock", value: totalStock },
    { name: "Orders", value: totalOrders },
    { name: "Categories", value: categories.length },
  ];
  const COLORS = ["#4ade80", "#facc15", "#f87171", "#38bdf8"];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-none h-screen sticky top-0">
        <Sidebar isOpen={true} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto h-screen">
        {/* Mobile Sidebar top full-width */}
        <div className="sm:hidden w-full">
          <Sidebar isOpen={true} />
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Mobile Title */}
          <div className="sm:hidden mt-4 mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="text-3xl font-bold mb-6 hidden sm:block">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard title="Total Products" value={products.length} icon={<FaBoxOpen />} />
            <StatsCard title="Total Stock" value={totalStock} icon={<FaDollarSign />} />
            <StatsCard title="Total Orders" value={totalOrders} icon={<FaShoppingCart />} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            {/* Orders Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Orders Over Time</h2>
              {chartOrdersData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartOrdersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="date" stroke="#aaa" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#facc15" strokeWidth={2} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center py-10">No orders data available.</p>
              )}
            </div>

            {/* Products Stock Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Products Stock Levels</h2>
              {chartProductsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartProductsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="name" stroke="#aaa" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Bar dataKey="stock" fill="#facc15" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center py-10">No products data available.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Categories Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Categories</h2>
              {chartCategoriesData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartCategoriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="name" stroke="#aaa" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4ade80" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center py-10">No categories data available.</p>
              )}
            </div>

            {/* Overall Performance Pie Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Overall Performance</h2>
              {overallData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={overallData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {overallData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center py-10">No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
