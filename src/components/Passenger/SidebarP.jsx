/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logoutUser,
} from "../../backend-services/authServices";
import {
  FaUser,
  FaPlane,
  FaHotel,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function SidebarP(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logoutUser function
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="">
      {/* Sidebar */}
      <div
        className="fixed top-0 left-0 h-full bg-gradient-to-br from-gray-800 to-black text-white shadow-lg transition-transform transform md:translate-x-0"
        style={{ width: "250px" }}
      >
        {/* Brand */}
        <h2 className="text-2xl font-bold text-center py-10">Belike Tourism</h2>

        {/* Menu Items */}
        <div className="space-y-6 px-4">
          {[
            { icon: FaUser, label: `${props.type} Profile`, route: "passenger" },
            { icon: FaPlane, label: props.prp1, route: "travelP" },
            { icon: FaHotel, label: props.prp2, route: "hotelP" },
            { icon: FaInfoCircle, label: props.prp3, route: "detailsP" },
            { icon: FaSignOutAlt, label: props.prp4, action: handleLogout },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action ? item.action : () => navigate(item.route)}
              className="flex items-center w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-blue-600 hover:shadow-lg transition duration-300"
            >
              <item.icon className="mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
