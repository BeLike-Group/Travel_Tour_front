/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NavbarminiT from "./NavbarminiT";
import {
  createRoute,
  getAllRoutes,
  updateRoute,
  deleteRoute,
} from "../../backend-services/routeServices";
import { getUserProfile } from "../../backend-services/authServices";

export default function RootesT() {
  const [companyId, setCompanyId] = useState("");
  const [formData, setFormData] = useState({
    departure: { location: "", date: "", time: "" },
    arrival: { location: "", date: "", time: "" },
    price: "",
    seats: [],
    numberOfSeats: 0, // Added field to specify the number of seats
  });
  const [routes, setRoutes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRouteId, setCurrentRouteId] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await getUserProfile();
        setCompanyId(response.data._id);
      } catch (error) {
        console.error("Error fetching company details:", error.message);
      }
    };

    fetchCompanyDetails();
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await getAllRoutes();
      setRoutes(response.data.routes || []);
    } catch (error) {
      console.error("Error fetching routes:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numberOfSeats") {
      // Automatically generate seats based on the entered number
      const numSeats = parseInt(value, 10);
      const generatedSeats = Array.from({ length: numSeats }, (_, index) => ({
        seatNumber: `Seat ${index + 1}`,
        availability: true,
      }));
      setFormData((prevData) => ({
        ...prevData,
        seats: generatedSeats,
        [name]: value,
      }));
    } else if (name.includes("departure") || name.includes("arrival")) {
      const [section, field] = name.split("_");
      setFormData((prevData) => ({
        ...prevData,
        [section]: { ...prevData[section], [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const routeData = {
        departure: formData.departure,
        arrival: formData.arrival,
        price: formData.price,
        seats: formData.seats,
      };

      if (editMode) {
        await updateRoute(currentRouteId, routeData);
        alert("Route updated successfully!");
      } else {
        await createRoute({ ...routeData, companyId });
        alert("Route created successfully!");
      }

      setFormData({
        departure: { location: "", date: "", time: "" },
        arrival: { location: "", date: "", time: "" },
        price: "",
        seats: [],
        numberOfSeats: 0,
      });
      setEditMode(false);
      fetchRoutes();
    } catch (error) {
      console.error("Error saving route:", error.message);
      alert(error.message || "Failed to save route.");
    }
  };

  const handleEdit = (route) => {
    setFormData({
      ...route,
      numberOfSeats: route.seats.length, // Populate numberOfSeats for editing
    });
    setEditMode(true);
    setCurrentRouteId(route._id);
  };

  const handleDelete = async (routeId) => {
    try {
      await deleteRoute(routeId);
      alert("Route deleted successfully!");
      fetchRoutes();
    } catch (error) {
      console.error("Error deleting route:", error.message);
      alert("Failed to delete route.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <NavbarminiT name="Manage Routes" />

      <div className="container mx-auto px-6 py-8">
        {/* Add/Edit Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            {editMode ? "Edit Route" : "Add Route"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Departure Section */}
            <div>
              <label className="block font-semibold mb-1">Departure</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="departure_location"
                  value={formData.departure.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="p-2 bg-gray-700 rounded w-full"
                />
                <input
                  type="date"
                  name="departure_date"
                  value={formData.departure.date}
                  onChange={handleChange}
                  className="p-2 bg-gray-700 rounded w-full"
                />
                <input
                  type="time"
                  name="departure_time"
                  value={formData.departure.time}
                  onChange={handleChange}
                  className="p-2 bg-gray-700 rounded w-full"
                />
              </div>
            </div>

            {/* Arrival Section */}
            <div>
              <label className="block font-semibold mb-1">Arrival</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="arrival_location"
                  value={formData.arrival.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="p-2 bg-gray-700 rounded w-full"
                />
                <input
                  type="date"
                  name="arrival_date"
                  value={formData.arrival.date}
                  onChange={handleChange}
                  className="p-2 bg-gray-700 rounded w-full"
                />
                <input
                  type="time"
                  name="arrival_time"
                  value={formData.arrival.time}
                  onChange={handleChange}
                  className="p-2 bg-gray-700 rounded w-full"
                />
              </div>
            </div>

            {/* Price Section */}
            <div>
              <label className="block font-semibold mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="p-2 bg-gray-700 rounded w-full"
              />
            </div>

            {/* Number of Seats */}
            <div>
              <label className="block font-semibold mb-1">Number of Seats</label>
              <input
                type="number"
                name="numberOfSeats"
                value={formData.numberOfSeats}
                onChange={handleChange}
                placeholder="Enter number of seats"
                className="p-2 bg-gray-700 rounded w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 rounded hover:bg-green-500"
              >
                {editMode ? "Update Route" : "Add Route"}
              </button>
            </div>
          </form>
        </div>

        {/* Route List */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">Routes</h2>
          {routes.map((route) => (
            <div
              key={route._id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded shadow"
            >
              <p>
                {route.departure.location} to {route.arrival.location}
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(route)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(route._id)}
                  className="text-red-500 hover:text-red-600"
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
