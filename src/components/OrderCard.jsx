import React from "react";
import { MdPending, MdDoneAll, MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { modifyOrder } from "../redux/slices/orderSlice";

export default function OrderCard({ order }) {
  const dispatch = useDispatch();

  const handleStatusChange = (status) => {
    dispatch(modifyOrder({ id: order.id, updatedData: { status } }));
  };

  const baseBg =
    "p-1 rounded-full bg-gray-700 shadow-sm flex items-center justify-center";

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return (
          <div className={baseBg}>
            <MdDoneAll className="text-green-600 text-3xl" />
          </div>
        );

      case "canceled":
        return (
          <div className={baseBg}>
            <MdCancel className="text-rose-500 text-3xl" />
          </div>
        );

      default:
        return (
          <div className={baseBg}>
            <MdPending className="text-accent text-3xl" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between bg-gray-800 p-5 rounded-xl text-white mb-4 gap-4 items-center">

      <div className="flex-1">
        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
        <p className="text-gray-300">Customer: {order.customer}</p>
        <p className="text-yellow-300 font-bold">Total: ${order.total}</p>
        <p className="capitalize mt-1">Status: {order.status}</p>
      </div>

      <div className="flex items-center gap-5">
        {/* Status Icon */}
        {getStatusIcon(order.status)}

        {/* Admin actions for Pending */}
        {order.status === "pending" && (
          <div className="flex items-center gap-4">

            <div
              onClick={() => handleStatusChange("delivered")}
              className={`${baseBg} cursor-pointer hover:scale-110 transition`}
              title="Mark Delivered"
            >
              <MdDoneAll className="text-green-600 text-3xl" />
            </div>

            <div
              onClick={() => handleStatusChange("canceled")}
              className={`${baseBg} cursor-pointer hover:scale-110 transition`}
              title="Cancel Order"
            >
              <MdCancel className="text-rose-500 text-3xl" />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
