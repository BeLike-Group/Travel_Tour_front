import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function NavbarminiT({ name }) {
  return (
    <div className="bg-gray-900 shadow-lg text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 px-6 bg-gray-800 shadow-md rounded-md">
        {/* Welcome Section */}
        <div className="flex items-center gap-2">
          <FaUserCircle size={24} className="text-blue-500" />
          <p className="text-lg font-semibold">Welcome</p>
        </div>

        {/* Name Section */}
        <div className="text-lg font-bold">{name || "User"}</div>

        {/* Placeholder for Profile Picture */}
        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
          <span className="text-sm font-semibold">Pic</span>
        </div>
      </div>
    </div>
  );
}
