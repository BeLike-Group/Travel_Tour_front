/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ModalRoom from "./ModalRoom";
import { getAllHotelRooms } from "../../backend-services/bookingServices";
import { FaBed, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

export default function RoomP({ hotelId, hotelName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
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
      setLoading(true);
      setError(null);
      setRooms([]);

      if (!hotelId) {
        setError("Hotel ID is required to fetch rooms.");
        setLoading(false);
        return;
      }

      try {
        const response = await getAllHotelRooms(hotelId);
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
  }, [hotelId]);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-black to-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold">
          Rooms Available at {hotelName}
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <p className="text-center text-gray-400">Loading rooms...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                onClick={() => openModal(room)}
                className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <FaBed className="text-green-500" />
                  {room.type}
                </h2>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <strong>Availability From:</strong> {formatDate(room.availability.from)}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-500" />
                    <strong>Availability To:</strong> {formatDate(room.availability.to)}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-red-500" />
                    <strong>Price Per Night:</strong> Rs. {room.pricePerNight}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No rooms available.</p>
        )}
      </div>

      {/* Modal */}
      <ModalRoom
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        room={selectedRoom}
      />
    </div>
  );
}
