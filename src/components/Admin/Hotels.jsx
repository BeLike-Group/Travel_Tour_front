import React, { useEffect, useRef, useState } from "react";
import Navbarmini from "./Navbarmini";
import {
  addHotel,
  getAllHotel,
  updateHotel,
  deleteHotel,
} from "../../backend-services/adminHotelServices";

export default function Hotels() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Hotel",
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
  });

  const [hotels, setHotels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contactInfo) {
      setFormData({
        ...formData,
        contactInfo: { ...formData.contactInfo, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Start editing a hotel
  const startEditing = (hotel) => {
    setFormData({
      username: hotel.username,
      password: "", // Password left blank for security
      role: "Hotel",
      contactInfo: { ...hotel.contactInfo },
    });
    setIsEditing(true);
    setEditingHotelId(hotel._id);
    formRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      if (isEditing) {
        const response = await updateHotel(editingHotelId, formData, token);
        alert(response.message || "Hotel updated successfully");
      } else {
        const response = await addHotel(formData, token);
        alert(response.message || "Hotel added successfully");
      }
      fetchHotels(); // Refresh the list
      resetForm();
    } catch (error) {
      console.error("Failed to save hotel:", error.message);
      alert("Failed to save hotel");
    }
  };

  // Fetch all hotels
  const fetchHotels = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to view hotels.");
      return;
    }

    try {
      const response = await getAllHotel(token);
      setHotels(response.data || []);
    } catch (error) {
      console.error("Failed to fetch hotels:", error.message);
    }
  };

  // Delete a hotel
  const deleteHotelHandler = async (hotelId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await deleteHotel(hotelId, token);
      alert(response.message || "Hotel deleted successfully");
      fetchHotels(); // Refresh the hotels list
    } catch (error) {
      console.error("Failed to delete hotel:", error.message);
      alert("Failed to delete hotel");
    }
  };

  // Reset form state
  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      role: "Hotel",
      contactInfo: { email: "", phone: "", address: "" },
    });
    setIsEditing(false);
    setEditingHotelId(null);
  };

  useEffect(() => {
    fetchHotels(); // Fetch hotels on component mount
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen pt-10">


      {/* Main Container */}
      <div className="overflow-auto h-[30rem] m-auto pt-4 w-full md:w-fit px-2 md:px-24 backdrop-blur-sm bg-white/10 py-4 shadow-lg shadow-black text-white rounded-md">
        {/* Form Section */}
        <form ref={formRef} onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow-sm rounded-md placeholder-white focus:outline-none focus:ring-2"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow-sm rounded-md placeholder-white focus:outline-none focus:ring-2"
            />
            <input
              type="email"
              name="email"
              value={formData.contactInfo.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow-sm rounded-md placeholder-white focus:outline-none focus:ring-2"
            />
            <input
              type="text"
              name="phone"
              value={formData.contactInfo.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow-sm rounded-md placeholder-white focus:outline-none focus:ring-2"
            />
            <input
              type="text"
              name="address"
              value={formData.contactInfo.address}
              placeholder="Address"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow-sm rounded-md placeholder-white focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 rounded-md shadow hover:bg-blue-500"
            >
              {isEditing ? "Update Hotel" : "Add Hotel"}
            </button>
          </div>
        </form>

        {/* Hotels List Section */}
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-900 rounded-lg shadow-md"
            >
              <div>{hotel.username}</div>
              <div>{hotel.contactInfo.email}</div>
              <div>{hotel.contactInfo.phone}</div>
              <div>{hotel.contactInfo.address}</div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-yellow-600 text-xs rounded-lg hover:bg-yellow-500"
                  onClick={() => startEditing(hotel)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-xs rounded-lg hover:bg-red-500"
                  onClick={() => deleteHotelHandler(hotel._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
