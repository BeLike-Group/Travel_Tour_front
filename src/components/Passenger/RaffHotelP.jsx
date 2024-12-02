/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarminiP from "./NavbarminiP";
import { getAllHotels } from "../../backend-services/bookingServices";

export default function HotelP() {
  const [hotels, setHotels] = useState([]); // State for storing hotel data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels(); // Fetch hotel data from API
        console.log("API Response:", response);

        // Check if response.data is an array or a single object
        if (Array.isArray(response.data)) {
          setHotels(response.data); // Set directly if it's an array
        } else {
          // Wrap the single object in an array for consistent handling
          setHotels([response.data]);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error.message);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <NavbarminiP name="Hotel" />

      {/* Main Body */}
      <div
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        className="p-5 m-auto overflow-auto h-[30rem] pt-[5rem] w-fit px-20 backdrop-blur-sm bg-white/10 py-24 shadow-lg shadow-black text-white rounded-md"
      >
        {/* Render Hotel Buttons */}
        <div className="lg:flex flex-wrap gap-8 justify-center">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel._id} // Use a unique key
                role="button"
                aria-label={`Navigate to ${hotel.username || hotel.name}`}
                onClick={() => navigate(hotel.username.replace(/\s+/g, ""))} // Navigate using hotel route
                className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black"
              >
                <p className="text-sm">Name: {hotel.username || hotel.name}</p>{" "}
                {/* Display username or name */}
                <p className="text-xs">
                  Phone No: {hotel.contactInfo?.phone || "No phone"}
                </p>{" "}
                {/* Display phone number */}
                <p className="text-xs">
                  Email: {hotel.contactInfo?.email || "No email"}
                </p>{" "}
                {/* Display email */}
                <p className="text-xs">
                  Address: {hotel.contactInfo?.address || "No Address"}
                </p>{" "}
                {/* Display address */}
              </div>
            ))
          ) : (
            <p className="text-center text-white">No hotels available.</p> // Show this if no hotels are returned
          )}
        </div>

        {/* Nested Routes Rendered Here */}
        <Outlet />
      </div>
    </div>
  );
}
