/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ModalRoom from "./ModalRoom";
import { getAllHotelRooms } from "../../backend-services/bookingServices";

export default function RoomP({ hotelId, hotelName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Invalid Time";
    const [hours, minutes] = timeString.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";

    const date = new Date();
    date.setHours(hours, minutes, 0);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  const handleSubmit = (data) => {
    console.log("Form Data:", data, "Room:", selectedRoom);
    closeModal();
  };

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true); // Reset loading state for each fetch
      setError(null); // Reset error state
      setRooms([]); // Clear previous rooms

      if (!hotelId) {
        setError("Company ID is required to fetch rooms.");
        setLoading(false);
        return;
      }

      try {
        const response = await getAllHotelRooms(hotelId); // Pass companyId to the API
        console.log("API Response:", response);
        const fetchedRooms = response?.data || [];
        setRooms(fetchedRooms);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(err.message || "Failed to fetch rooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]); // Re-run effect whenever companyId changes

  return (
    <div>
      <div className="p-5 bg-transparent mt-16 m-auto w-fit px-6 text-white rounded-md">
        <p className="text-center text-[1.4rem] font-semibold">
          Rooms Available from {hotelName}
        </p>
        {loading ? (
          <p className="text-center">Loading rooms...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : rooms.length > 0 ? (
          <ul className="flex flex-wrap gap-6 text-sm mt-8">
            {rooms.map((room) => (
              <li
                key={room._id}
                onClick={() => openModal(room)}
                className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black"
              >
                <div>
                  <p className="text-xl">Room Type: {room.type}</p>
                  <p>
                    Availability From:{" "}
                    {formatDate(room.availability.from || new Date())}
                  </p>

                  <p>
                    Ailability To:{" "}
                    {formatDate(room.availability.to || new Date())}
                  </p>
                  <p className="text-xl">
                    Price Per Night: Rs. {room.pricePerNight}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-white">No rooms available.</p>
        )}
      </div>

      <ModalRoom
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        room={selectedRoom}
      />
    </div>
  );
}
