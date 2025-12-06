import React from "react";

export default function ServicesCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition text-center text-white">
      <div className="flex justify-center mb-3">
        <Icon className="text-yellow-400 text-4xl" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}
