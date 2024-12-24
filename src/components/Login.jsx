import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../backend-services/authServices";
import backpic from "./Pics/Signuppics/signUpback3.jpg";

const Login = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = gsap.timeline();
    const animate = (isMobile) => {
      if (isMobile) {
        t1.fromTo(
          ".box1",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      } else {
        t1.to(".box1", {
          duration: 1.5,
          x: 450,
          opacity: 1,
          ease: "back.out(1.7)",
        });
        t1.fromTo(
          ".f1",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }
    };

    const mediaQuery = window.matchMedia("(max-width: 425px)");
    animate(mediaQuery.matches);

    const handleResize = (e) => animate(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const { role } = response;

      switch (role) {
        case "Admin":
          navigate("/DashboardAdmin");
          break;
        case "TravelCompany":
          navigate("/DashboardTravel");
          break;
        case "Hotel":
          navigate("/DashboardHotel");
          break;
        case "Passenger":
          navigate("/DashboardPassenger");
          break;
        default:
          throw new Error("Invalid role. Contact support.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Failed to log in. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 flex items-center justify-center">
      <img
        src={backpic}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover -z-10"
      />
      <div className="box1 max-w-md w-full px-6 py-8 bg-opacity-80 bg-gray-900 rounded-lg shadow-lg">
        <div ref={formRef} className="f1">
          <h2 className="text-2xl text-white font-bold mb-4 text-center">
            Log in to Belike Traveling
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              aria-label="Username"
              className="w-full bg-gray-800 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              aria-label="Password"
              className="w-full bg-gray-800 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Log In
            </button>
          </form>
          <div className="flex gap-1 justify-center mt-4 text-white text-sm">
            <p>Don't have an account?</p>
            <span
              className="font-semibold text-blue-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
