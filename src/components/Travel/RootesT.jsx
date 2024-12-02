/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import NavbarminiT from "./NavbarminiT";
import {
  createRoute,
  getAllRoutes,
  updateRoute,
  deleteRoute,
} from "../../backend-services/routeServices";
import { getUserProfile } from "../../backend-services/authServices";

export default function RootesT() {
  const formRef = useRef();
  const [companyId, setCompanyId] = useState("");
  const [formData, setFormData] = useState({
    companyId,
    departure: {
      location: "",
      date: "",
      time: "",
    },
    arrival: {
      location: "",
      date: "",
      time: "",
    },
    price: 0,
    seats: [{ seatNumber: "", availability: true }],
  });
  const [routes, setRoutes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRouteId, setCurrentRouteId] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await getUserProfile();
        const id = response.data._id;
        if (!id) throw new Error("Company ID is missing!");
        setCompanyId(id);
      } catch (error) {
        console.error("Error fetching company details:", error.message);
      }
    };

    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await getAllRoutes();
      console.log("Fetched Routes:", response.data.routes); // Debugging log
      setRoutes(response.data.routes);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch routes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("departure") || name.includes("arrival")) {
      const [section, field] = name.split("_");
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else if (name.includes("seat")) {
      const [propertyName, seatIndex] = name.split("_");
      setFormData((prevData) => {
        const updatedSeats = [...prevData.seats];
        updatedSeats[seatIndex][propertyName] =
          propertyName === "availability" ? value === "true" : value; // Handle boolean for availability
        return { ...prevData, seats: updatedSeats };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSeat = () => {
    setFormData((prevData) => ({
      ...prevData,
      seats: [...prevData.seats, { seatNumber: "", availability: true }],
    }));
  };

  const handleRemoveSeat = (index) => {
    const updatedSeats = [...formData.seats];
    updatedSeats.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      seats: updatedSeats,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate departure details
      if (
        !formData.departure.location ||
        !formData.departure.date ||
        !formData.departure.time
      ) {
        throw new Error("Please provide all departure details.");
      }

      // Validate arrival details
      if (
        !formData.arrival.location ||
        !formData.arrival.date ||
        !formData.arrival.time
      ) {
        throw new Error("Please provide all arrival details.");
      }

      // Validate price
      if (formData.price <= 0) {
        throw new Error("Price must be a positive value.");
      }

      // Validate seats
      if (formData.seats.length === 0) {
        throw new Error("At least one seat must be added.");
      }

      // Construct the route data
      const routeData = {
        departure: formData.departure,
        arrival: formData.arrival,
        price: formData.price,
        seats: formData.seats,
      };

      if (editMode) {
        // Update an existing route
        if (!currentRouteId) throw new Error("Route ID is missing for update!");
        await updateRoute(currentRouteId, routeData);
        alert("Route updated successfully!");
      } else {
        // Add a new route
        if (!companyId)
          throw new Error("Company ID is missing for adding a route!");
        await createRoute({ ...routeData, companyId });
        alert("Route created successfully!");
      }

      // Reset the form
      setFormData({
        departure: { location: "", date: "", time: "" },
        arrival: { location: "", date: "", time: "" },
        price: 0,
        seats: [{ seatNumber: "", availability: true }],
      });
      setEditMode(false);
      fetchRoutes(); // Fetch updated list of routes
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      alert(error.message || "Failed to save the route.");
    }
  };

  const handleEdit = (route) => {
    setFormData(route); // Populate form with route details
    setEditMode(true);
    setCurrentRouteId(route._id); // Set the current route ID
    console.log("Editing Route ID:", route._id); // Debugging log
  };

  // const handleDelete = async (routeId) => {
  //   try {
  //     const response = await deleteRoute(routeId);
  //     alert(response.data.message);
  //     fetchRoutes();
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to delete route");
  //   }
  // };
  const handleDelete = async (routeId) => {
    try {
      // Ensure routeId is provided
      if (!routeId) throw new Error("Route ID is missing!");

      // Call the delete function
      const response = await deleteRoute(routeId);

      // Check if response contains the expected message
      if (response && response.message) {
        alert(response.message); // Response directly contains the message
      } else {
        throw new Error("Unexpected response format from server.");
      }

      // Refresh the routes list
      fetchRoutes();
    } catch (error) {
      console.error("Error in handleDelete:", error.message || error);
      alert(error.message || "Failed to delete route.");
    }
  };

  return (
    <div className="bg-slate-950 h-fit min-[425px]::w-fit">
      <NavbarminiT name="Manage Routes" />
      <div className="overflow-auto h-[30rem] p-5 m-auto pt-5 lg:w-fit min-[425px]:w-[425px] max-w-fit backdrop-blur-sm bg-white/10 py-10 shadow-lg shadow-black text-white rounded-md">
        <form onSubmit={handleSubmit}>
          <p className="text-xl text-white font-serif my-5 ">
            {editMode ? "Edit Route" : "Add Route"}
          </p>
  
          {/* Departure */}
          <p className="text-xl text-white font-serif my-5 ">Departure</p>
          <div className="flex flex-col md:flex-row gap-16 justify-center">
            <div className="flex-1">
              <input
                type="text"
                name="departure_location"
                value={formData.departure.location}
                placeholder="Departure Location"
                onChange={handleChange}
                className="w-full md:w-fit bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                name="departure_date"
                value={formData.departure.date}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div className="flex-1">
              <input
                type="time"
                name="departure_time"
                value={formData.departure.time}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
          </div>
  
          {/* Arrival */}
          <p className="text-xl text-white font-serif my-5">Arrival</p>
          <div className="flex flex-col md:flex-row gap-16 justify-center">
            <div className="flex-1">
              <input
                type="text"
                name="arrival_location"
                value={formData.arrival.location}
                placeholder="Arrival Location"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                name="arrival_date"
                value={formData.arrival.date}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div className="flex-1">
              <input
                type="time"
                name="arrival_time"
                value={formData.arrival.time}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
          </div>
  
          {/* Price */}
          <p className="text-xl text-white font-serif my-5">Price</p>
          <div className="flex justify-center mt-5">
            <div className="flex-1">
              <input
                type="text"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
          </div>
  
          {/* Seats */}
          <p className="text-xl text-white font-serif my-5">Seats</p>
          {formData.seats.map((seat, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-16 justify-center">
              <div className="flex-1">
                <input
                  type="text"
                  name={`seatNumber_${index}`}
                  value={seat.seatNumber}
                  placeholder="Seat Number"
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
                />
              </div>
              <div className="flex-1">
                <select
                  name={`availability_${index}`}
   value={seat.availability}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSeat(index)}
                className="text-red-500"
              >
                Remove Seat
              </button>
            </div>
          ))}
  
          <button
            type="button"
            onClick={handleAddSeat}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-[1rem] shadow-md shadow-black/30"
          >
            Add Another Seat
          </button>
  
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-[1rem] shadow-md shadow-black/30"
            >
              {editMode ? "Update Route" : "Add Route"}
            </button>
          </div>
        </form>
  
        {/* Display Routes */}
        {routes.map((route) => (
          <div
            key={route._id}
            className="flex lg:gap-[4.7rem] m-auto lg:w-[52rem] min-[425px]:w-[380px] justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4"
          >
            <p>
              {route.departure.location} to {route.arrival.location}
            </p>
            <button
              onClick={() => handleEdit(route)}
              className="text-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(route._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
