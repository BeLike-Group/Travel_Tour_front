/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../../backend-services/bookingServices"; // Assuming you have a service for fetching hotel by ID

const HotelDetails = () => {
  const { hotelId } = useParams(); // Get hotelId from URL
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelData = await getHotelById(hotelId); // Get the hotel data
        setHotel(hotelData); // Set the hotel data to the state
      } catch (error) {
        console.error("Failed to fetch hotel details:", error.message);
        setError(error.message); // Set the error message to the state
      }
    };

    fetchHotelDetails();
  }, [hotelId]); // Run when hotelId changes

  if (error) {
    return <div>Error: {error}</div>; // Display error if any occurs
  }

  if (!hotel) {
    return <div>Loading...</div>; // Show loading until hotel details are fetched
  }

  return (
    <div>
      {/* Hotel Details */}
      <section className="hotel-details">
        <h1 className="text-3xl font-bold">{hotel.username}</h1>
        <p>Email: {hotel.contactInfo?.email}</p>
        <p>Phone: {hotel.contactInfo?.phone}</p>
        <p>Address: {hotel.contactInfo?.address}</p>
        <p>Joined: {new Date(hotel.dateJoined).toLocaleDateString()}</p>
        <p>Updated At: {new Date(hotel.updatedAt).toLocaleDateString()}</p>
      </section>

      {/* Rooms Section */}
      <section className="rooms-section mt-10">
        <h2 className="text-2xl font-semibold">Rooms</h2>
        {hotel.rooms && hotel.rooms.length > 0 ? (
          <ul>
            {hotel.rooms.map((room, index) => (
              <li key={index} className="room-item border p-4 mt-4">
                <h3 className="text-xl font-medium">{room.username}</h3>
                <p>Type: {room.type}</p>
                <p>Price: {room.price}</p>
                <p>Description: {room.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No rooms available.</p>
        )}
      </section>
    </div>
  );
};

export default HotelDetails;
