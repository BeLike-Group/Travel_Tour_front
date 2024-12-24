/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./backend-services/authServices";

export default function Sidebar(props) {
  useEffect(() => {
    const t1 = gsap.timeline();
    t1.to("#prp1", { duration: 0, y: -50, opacity: 0 });
    t1.to("#prp3", { duration: 0, y: -150, opacity: 0 });
    t1.to("#prp5", { duration: 0, y: -250, opacity: 0 });
    t1.to("#prp6", { duration: 0, y: -250, opacity: 0 });

    const t2 = gsap.timeline();
    t2.to("#prp1", { duration: 0.5, y: 10, opacity: 1 });
    t2.to("#prp3", { duration: 0.9, y: 30, opacity: 1 });
    t2.to("#prp5", { duration: 1.5, y: 50, opacity: 1 });
    t2.to("#prp6", { duration: 1.5, y: 50, opacity: 1 });
  }, []);

  const navigate = useNavigate();

  // Handle Logout Users
  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logoutUser function
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="w-full md:w-64 h-full bg-gradient-to-br from-gray-800 to-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-8">Quick Access</h2>
      {/* Sidebar Options */}
      <div className="text-white text-lg space-y-4">
        <button
          onClick={() => navigate("admin")}
          className="w-full py-2 rounded-lg bg-white/10 hover:bg-blue-600 hover:shadow-lg active:shadow-md active:scale-95 transition duration-300 ease-in-out"
          aria-label={`${props.type} Profile`}
        >
          {props.type} Profile
        </button>
        <button
          id="prp1"
          onClick={() => navigate("travelCompany")}
          className="w-full py-2 rounded-lg bg-white/10 hover:bg-blue-600 hover:shadow-lg active:shadow-md active:scale-95 transition duration-300 ease-in-out"
          aria-label={props.prp1}
        >
          {props.prp1}
        </button>
        <button
          id="prp3"
          onClick={() => navigate("hotels")}
          className="w-full py-2 rounded-lg bg-white/10 hover:bg-blue-600 hover:shadow-lg active:shadow-md active:scale-95 transition duration-300 ease-in-out"
          aria-label={props.prp3}
        >
          {props.prp3}
        </button>
        <button
          id="prp5"
          onClick={() => navigate("passengers")}
          className="w-full py-2 rounded-lg bg-white/10 hover:bg-blue-600 hover:shadow-lg active:shadow-md active:scale-95 transition duration-300 ease-in-out"
          aria-label={props.prp5}
        >
          {props.prp5}
        </button>
        <button
          id="prp6"
          onClick={() => navigate("bookings")}

          className="w-full py-2 rounded-lg  bg-white/10 hover:bg-blue-600 hover:shadow-lg active:shadow-md active:scale-95 transition duration-300 ease-in-out"
          aria-label={props.prp6}
        >
          {props.prp6}
        </button>
        <button
          id="prp6"
          onClick={handleLogout}
          className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-700 hover:shadow-lg active:shadow-md active:scale-95 transition duration-300 ease-in-out"
          aria-label={props.prp6}
        >
          {props.prp7}
        </button>
      </div>
    </div>
  );
}
