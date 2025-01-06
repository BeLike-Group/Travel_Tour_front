// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarminiP from "./NavbarminiP";
import { getAllHotels } from "../../backend-services/bookingServices";
import { FaHotel, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function HotelP() {
  const [hotels, setHotels] = useState([]); // State for storing hotel data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels();
        console.log("API Response:", response);

        if (Array.isArray(response.data)) {
          setHotels(response.data); // Set directly if it's an array
        } else {
          setHotels([response.data]); // Wrap the single object in an array
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error.message);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-black to-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <NavbarminiP name="Hotels" />

      {/* Main Body */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          <FaHotel className="inline text-blue-500 mr-2" />
          Available Hotels
        </h1>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                role="button"
                aria-label={`Navigate to ${hotel.username || hotel.name}`}
                onClick={() =>
                  navigate(
                    hotel.username.replace(/\s+/g, ""), // Route path
                    {
                      state: {
                        hotelId: hotel._id,
                        hotelName: hotel.username || hotel.name,
                        // contactInfo: hotel.contactInfo, // Pass contact info if needed
                      },
                    }
                  )
                }
                className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2">
                  <FaHotel className="inline text-green-500 mr-2" />
                  {hotel.username || hotel.name}
                </h2>
                <ul className="text-sm space-y-2">
                  <li>
                    <FaPhone className="inline text-blue-500 mr-2" />
                    {hotel.contactInfo?.phone || "No phone"}
                  </li>
                  <li>
                    <FaEnvelope className="inline text-yellow-500 mr-2" />
                    {hotel.contactInfo?.email || "No email"}
                  </li>
                  <li>
                    <FaMapMarkerAlt className="inline text-red-500 mr-2" />
                    {hotel.contactInfo?.address || "No Address"}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No hotels available.</p>
          )}
        </div>

        {/* Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
}
