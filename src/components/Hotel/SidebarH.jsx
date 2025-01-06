import React, { useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../backend-services/authServices";

export default function SidebarH({ type, prp1, prp2 }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .fromTo(
        "#prp1",
        { y: -50, opacity: 0 },
        { duration: 0.5, y: 0, opacity: 1 }
      )
      .fromTo(
        "#prp2",
        { y: -50, opacity: 0 },
        { duration: 0.7, y: 0, opacity: 1 }
      );
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Strictly check the active route
  const isActive = (path) => location.pathname === `/${path}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-start py-6 px-4 w-64">
      <h2 className="text-2xl font-bold mb-6">Quick Access</h2>

      <div className="space-y-4 w-full">
        <div
          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
            isActive("Hotel") ? "bg-gray-800" : "hover:bg-gray-800"
          } transition`}
          onClick={() => navigate("Hotel")}
        >
          <span
            className={`text-xl ${
              isActive("Hotel") ? "text-blue-400" : "text-blue-500"
            }`}
          >
            {type} Profile
          </span>
        </div>

        <div
          id="prp1"
          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer backdrop-blur-sm ${
            isActive("RoomH") ? "bg-gray-800" : "bg-white/20 hover:bg-gray-800"
          } transition`}
          onClick={() => navigate("RoomH")}
        >
          <span className="text-lg">{prp1}</span>
        </div>

        <div
          id="prp2"
          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer backdrop-blur-sm ${
            location.pathname === "/login"
              ? "bg-gray-800"
              : "bg-white/20 hover:bg-gray-800"
          } transition`}
          onClick={handleLogout}
        >
          <span className="text-lg">{prp2}</span>
        </div>
      </div>
    </div>
  );
}
