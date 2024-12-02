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

  // useEffect(() => {
  //   const fetchCompanyDetails = async () => {
  //     try {
  //       const response = await getUserProfile(); // Check if API returns _id or companyId
  //       console.log("getUserProfile Response:", response);

  //       // Handle company ID extraction
  //       const id =
  //         response.data.companyId || response.data._id || response.data.id;
  //       if (!id) {
  //         console.error("Company ID not found in API response");
  //         return;
  //       }

  //       setCompanyId(id);
  //     } catch (error) {
  //       console.error("Error fetching company details:", error);
  //     }
  //   };

  //   fetchCompanyDetails();
  // }, []);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await getUserProfile();
        const id = response.data._id;
        if (!id) throw new Error("Company ID is missing!");
        setCompanyId(id); // Set it once
      } catch (error) {
        console.error("Error fetching company details:", error.message);
      }
    };

    fetchCompanyDetails();
  }, []); // Fetch once on component mount

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await getAllRoutes();
      setRoutes(response.data.routes);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch routes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle changes in departure and arrival fields
    if (name.includes("departure") || name.includes("arrival")) {
      const section = name.split("_")[0]; // 'departure' or 'arrival'
      const field = name.split("_")[1]; // 'location', 'date', or 'time'

      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else if (name.includes("seat")) {
      const seatIndex = parseInt(name.split("_")[1]);
      setFormData((prevData) => {
        const updatedSeats = [...prevData.seats];
        const propertyName = name.split("_")[0]; // Extract seat property (seatNumber or availability)
        updatedSeats[seatIndex] = {
          ...updatedSeats[seatIndex],
          [propertyName]: value,
        };
        return { ...prevData, seats: updatedSeats };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSeat = () => {
    setFormData((prevData) => ({
      ...prevData,
      seats: [
        ...prevData.seats,
        { seatNumber: "", availability: true }, // Ensure 'availability' is true by default
      ],
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);

  //   // Ensure all fields are populated and valid
  //   if (
  //     !formData.departure.time ||
  //     !formData.departure.date ||
  //     !formData.departure.location
  //   ) {
  //     alert("Please provide all departure details.");
  //     return;
  //   }

  //   if (
  //     !formData.arrival.time ||
  //     !formData.arrival.date ||
  //     !formData.arrival.location
  //   ) {
  //     alert("Please provide all arrival details.");
  //     return;
  //   }

  //   const routeData = {
  //     ...formData,
  //     companyId, // Explicitly map it here
  //   };

  //   console.log("Route Data with Company ID:", routeData);

  //   try {
  //     const response = await createRoute(routeData); // Send routeData including companyId
  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to create route.");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // Check companyId before preparing data
      if (!companyId) throw new Error("Company ID is missing!");

      const routeData = {
        companyId, // Use the stored companyId
        departure: formData.departure,
        arrival: formData.arrival,
        price: formData.price,
        seats: formData.seats,
      };

      console.log("Route Data Prepared for API:", routeData);

      // Send data to API
      const response = await createRoute(routeData);
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
    }
  };

  const handleDelete = async (routeId) => {
    try {
      const response = await deleteRoute(routeId);
      alert(response.data.message);
      fetchRoutes(); // Reload routes after deletion
    } catch (error) {
      console.error(error);
      alert("Failed to delete route");
    }
  };

  const handleUpdate = async (routeId) => {
    try {
      const updatedData = { ...formData, routeId }; // Assuming you update the form data
      const response = await updateRoute(updatedData);
      alert(response.data.message);
      fetchRoutes(); // Reload routes after updating
    } catch (error) {
      console.error(error);
      alert("Failed to update route");
    }
  };

  return (
    <div>
      <NavbarminiT name="Add Routes" />
      <div
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        className="overflow-auto h-[30rem] p-5 m-auto pt-[5rem] w-fit px-24 backdrop-blur-sm bg-white/10 py-24 shadow-lg shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
      >
        <form onSubmit={handleSubmit}>
          {/* Departure */}
          <p className="text-xl text-white font-serif my-5">Departure</p>
          <div className="flex gap-[8rem] justify-center">
            <div>
              <input
                type="text"
                name="departure_location"
                placeholder="Departure Location"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="departure_date"
                placeholder="Departure Date"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="departure_time"
                placeholder="Departure Time"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
          </div>

          {/* Arrival */}
          <p className="text-xl text-white font-serif my-5">Arrival</p>
          <div className="flex gap-[8rem] justify-center">
            <div>
              <input
                type="text"
                name="arrival_location"
                placeholder="Arrival Location"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="arrival_date"
                placeholder="Arrival Date"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="arrival_time"
                placeholder="Arrival Time"
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
              />
            </div>
          </div>

          {/* Price */}
          <p className="text-xl text-white font-serif my-5">Price</p>
          <div className="flex gap-[14rem] mt-8">
            <div>
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
            <div key={index} className="flex gap-[8rem]">
              <div>
                <input
                  type="text"
                  name={`seatNumber_${index}`}
                  value={seat.seatNumber}
                  placeholder="Seat Number"
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
                />
              </div>
              <div>
                <select
                  name={`availability_${index}`}
                  value={formData.seats.availability}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
                {/* 
                <input
                  type="text"
                  name={`availability_${index}`}
                  value={seat.availability}
                  placeholder="Availability"
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
                /> */}
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
              Add Route
            </button>
          </div>
        </form>

        {/* Display Routes */}
        {routes.map((route) => (
          <div
            key={route._id}
            className="flex gap-[4.7rem] m-auto w-[52rem] justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4"
          >
            <p>{route.name}</p>
            <p>
              {route.departure.location} to {route.arrival.location}
            </p>
            <button
              onClick={() => handleDelete(route._id)}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdate(route._id)}
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
