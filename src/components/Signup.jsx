import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../backend-services/authServices"; // Adjust the path to your API service file
import backpic from "./Pics/Signuppics/signUpback3.jpg";

const Signup = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = gsap.timeline();
    const mediaQuery = window.matchMedia("(max-width: 425px)");

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

    animate(mediaQuery.matches);
    mediaQuery.addEventListener("change", (e) => animate(e.matches));

    return () => {
      mediaQuery.removeEventListener("change", (e) => animate(e.matches));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["email", "phone", "address"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        contactInfo: { ...prevData.contactInfo, [name]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.contactInfo.email)
      newErrors.email = "Email is required.";
    if (!formData.contactInfo.phone)
      newErrors.phone = "Phone number is required.";
    if (!formData.contactInfo.address)
      newErrors.address = "Address is required.";
    if (!formData.role) newErrors.role = "Role selection is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await registerUser(formData);
      alert(response.message || "Sign up successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Sign up failed. Please try again.");
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
            Sign up for Belike Traveling
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              aria-label="Username"
              required
              className={`w-full bg-gray-800 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                errors.username ? "ring-red-500" : "ring-blue-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              aria-label="Password"
              required
              className={`w-full bg-gray-800 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "ring-red-500" : "ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              aria-label="Email"
              required
              className={`w-full bg-gray-800 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "ring-red-500" : "ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              aria-label="Role"
              required
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 ${
                errors.role ? "ring-red-500" : "ring-blue-500"
              }`}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Passenger">Passenger</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              aria-label="Phone"
              required
              className={`w-full bg-gray-800 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                errors.phone ? "ring-red-500" : "ring-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              aria-label="Address"
              required
              className={`w-full bg-gray-800 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                errors.address ? "ring-red-500" : "ring-blue-500"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-center mt-4 text-white text-sm">
            <p>Already have an account?</p>
            <span
              className="font-semibold text-blue-500 cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
