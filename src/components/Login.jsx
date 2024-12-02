import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { loginUser  } from "../backend-services/authServices";
import backpic from "./Pics/Signuppics/signUpback3.jpg";

const Login = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const t1 = gsap.timeline();

    // Use matchMedia to apply different animations based on screen size
    const mediaQuery = window.matchMedia("(max-width: 425px)");

    const animate = (isMobile) => {
      if (isMobile) {
        // Animation for mobile screens
        t1.fromTo(
          ".box1",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      } else {
        // Animation for larger screens
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

    // Initial animation
    animate(mediaQuery.matches);

    // Add listener for media query changes
    mediaQuery.addEventListener("change", (e) => {
      animate(e.matches);
    });

    return () => {
      mediaQuery.removeEventListener("change", (e) => {
        animate(e.matches);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser (formData);
      const { role } = response; // Access role directly from response

      // Navigate based on role
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
          alert("Invalid role. Contact support.");
          break;
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Failed to log in. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-transparent flex gap-3">
      <div>
        <img src={backpic} alt="" className="absolute h-screen w-screen " />
      </div>
      <div className="box1 h-fit mt-[8rem] max-w-md w-full px-6 py-8 bg-transparent rounded-lg shadow-md shadow-black">
        <div
          ref={formRef}
          className="f1 p-6 bg-transparent rounded-lg max-w-md mx-auto"
        >
          <h2 className="text-2xl text-white font-bold mb-4 text-center">
            Log in to Belike Traveling
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            />
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Log In
            </button>
          </form>
          <div className="flex gap-1 justify-center mt-4">
            <p className="text-center mt-2 font-sans text-[0.9rem] text-white">
              If you don't have an account, click on
            </p>
            <p
              className="px-2 mt-1 rounded-md bg-green-700 text-white w-fit font-semibold text-[1rem] hover:cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;