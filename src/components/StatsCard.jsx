// src/components/StatsCard.jsx
import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      {/* Icon with colored circle */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 text-gray-900 text-2xl">
        {icon && React.cloneElement(icon, { size: 28 })} {/* Ensure the icon renders with correct size */}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h4 className="text-gray-300 text-sm font-medium">{title}</h4>
        <p className="text-yellow-400 font-bold text-2xl">{value}</p>
      </div>
    </div>
  );
}
