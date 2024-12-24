/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../backend-services/authServices";
import { FaUser, FaPlane, FaHotel, FaInfoCircle, FaSignOutAlt, FaBars } from "react-icons/fa";

export default function SidebarP(props) {
  const [isOpen, setIsOpen] = useState(true); // State to toggle the sidebar
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
    <div className="flex">
      {/* Hamburger Menu */}
      <button
        className="p-4 text-white bg-gray-800 fixed z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-br from-gray-800 to-black text-white shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
        style={{ width: "250px" }}
      >
        <h2 className="text-2xl font-bold text-center py-10">Belike Tourism</h2>

        <div className="space-y-6 px-4">
          <button
            onClick={() => navigate("passenger")}
            className="flex items-center w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-blue-600 hover:shadow-lg transition duration-300"
          >
            <FaUser className="mr-3" />
            <span>{props.type} Profile</span>
          </button>
          <button
            onClick={() => navigate("travelP")}
            className="flex items-center w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-green-600 hover:shadow-lg transition duration-300"
          >
            <FaPlane className="mr-3" />
            <span>{props.prp1}</span>
          </button>
          <button
            onClick={() => navigate("hotelP")}
            className="flex items-center w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-orange-600 hover:shadow-lg transition duration-300"
          >
            <FaHotel className="mr-3" />
            <span>{props.prp2}</span>
          </button>
          <button
            onClick={() => navigate("detailsP")}
            className="flex items-center w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-yellow-600 hover:shadow-lg transition duration-300"
          >
            <FaInfoCircle className="mr-3" />
            <span>{props.prp3}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-red-600 hover:shadow-lg transition duration-300"
          >
            <FaSignOutAlt className="mr-3" />
            <span>{props.prp4}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
