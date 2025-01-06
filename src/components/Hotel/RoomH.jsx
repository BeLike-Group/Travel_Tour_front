/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import NavbarminiH from "./NavbarminiH";
import {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from "../../backend-services/roomServices";
import { getUserProfile } from "../../backend-services/authServices";

export default function RoomsH() {
  const formRef = useRef(null);
  const [hotelId, setHotelId] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    pricePerNight: 0,
    availability: {
      from: "",
      to: "",
    },
  });
  const [rooms, setRooms] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);

  // Fetch Hotel ID on component mount
  useEffect(() => {
    const fetchHotelId = async () => {
      try {
        const response = await getUserProfile();
        const id = response.data._id;
        if (!id) throw new Error("Hotel ID is missing!");
        setHotelId(id);
      } catch (error) {
        console.error("Error fetching hotel ID:", error.message);
      }
    };

    fetchHotelId();
  }, []);

  // Fetch Rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      setRooms(response.data.rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
      alert("Failed to fetch rooms. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("availability")) {
      const [section, field] = name.split("_");
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.type || formData.pricePerNight <= 0) {
        alert("Please fill in all fields correctly.");
        return;
      }

      const roomData = {
        type: formData.type,
        pricePerNight: formData.pricePerNight,
        availability: formData.availability,
      };

      if (editMode) {
        if (!currentRoomId) throw new Error("Room ID is missing for update!");
        await updateRoom(currentRoomId, roomData);
        alert("Room updated successfully!");
      } else {
        if (!hotelId)
          throw new Error("Hotel ID is missing for adding a room!");
        await createRoom({ ...roomData, hotelId });
        alert("Room added successfully!");
      }

      resetForm();
      fetchRooms();
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      alert(error.message || "Failed to save the room.");
    }
  };

  const resetForm = () => {
    setFormData({
      type: "",
      pricePerNight: 0,
      availability: { from: "", to: "" },
    });
    setEditMode(false);
    setCurrentRoomId(null);
  };

  const handleEdit = (room) => {
    setFormData({
      type: room.type,
      pricePerNight: room.pricePerNight,
      availability: room.availability,
    });
    setEditMode(true);
    setCurrentRoomId(room._id);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (roomId) => {
    try {
      if (!roomId) throw new Error("Room ID is missing!");
      await deleteRoom(roomId);
      alert("Room deleted successfully!");
      fetchRooms();
    } catch (error) {
      console.error("Error in handleDelete:", error.message);
      alert(error.message || "Failed to delete the room.");
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <NavbarminiH name="Manage Rooms" />
      <div
        ref={formRef}
        className="p-5 mx-auto w-full max-w-lg backdrop-blur-sm bg-white/10 py-10 shadow-lg text-white rounded-md"
      >
        <form onSubmit={handleSubmit}>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent shadow-sm text-white rounded-md"
          >
            <option value="">Select Room Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>

          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            placeholder="Price Per Night"
            className="w-full px-4 py-2 mt-4 bg-transparent shadow-sm text-white rounded-md"
            min="0"
          />

          <div className="mt-4">
            <p>Availability</p>
            <input
              type="date"
              name="availability_from"
              value={formData.availability.from}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-transparent shadow-sm text-white rounded-md"
            />
            <input
              type="date"
              name="availability_to"
              value={formData.availability.to}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-transparent shadow-sm text-white rounded-md"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 mt-5 bg-blue-500 rounded shadow-md w-full"
          >
            {editMode ? "Update Room" : "Add Room"}
          </button>
        </form>
      </div>

      <div className="p-5 mx-auto w-full max-w-4xl">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="flex justify-between items-center p-4 bg-gray-800 rounded-lg mt-2"
          >
            <div>{room.type}</div>
            <div>${room.pricePerNight}</div>
            <div>
              {room.availability.from} - {room.availability.to}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(room)}
                className="px-3 py-1 bg-green-600 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(room._id)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
