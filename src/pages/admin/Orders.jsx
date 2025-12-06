import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar.jsx";
import OrderCard from "../../components/OrderCard.jsx";
import { loadOrders } from "../../redux/slices/orderSlice.js";

export default function Orders() {
  const dispatch = useDispatch();

  const { items: orders, loading, error } = useSelector(
    (state) => state.orders || { items: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-none w-64 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto h-screen">
        {/* Mobile Sidebar top full-width */}
        <div className="sm:hidden w-full">
          <Sidebar />
        </div>

        <div className="p-6">
          {/* Page Heading */}
          <h1 className="text-3xl font-bold mb-6">Orders</h1>

          {/* Loading / Error */}
          {loading && <p className="text-gray-400">Loading orders...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Orders List */}
          {!loading && orders.length === 0 ? (
            <p className="text-gray-400">No orders yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
