import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../backend-services/authServices";
import { FaUser, FaRoute, FaSignOutAlt } from "react-icons/fa";

export default function SidebarT({ type, prp1, prp2 }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-start py-6 px-4 w-64">
      <h2 className="text-2xl font-bold mb-6">Quick Access</h2>

      {/* Navigation Links */}
      <div className="space-y-4 w-full">
        <div
          className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-800 transition"
          onClick={() => navigate("travel")}
        >
          <FaUser className="text-blue-500" size={20} />
          <span>{type} Profile</span>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-800 transition"
          onClick={() => navigate("RootesT")}
        >
          <FaRoute className="text-green-500" size={20} />
          <span>{prp1}</span>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-800 transition"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-red-500" size={20} />
          <span>{prp2}</span>
        </div>
      </div>
    </div>
  );
}
