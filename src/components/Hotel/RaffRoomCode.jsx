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
  const formRef = useRef();
  const [hotelId, setHotelId] = useState("");
  const [formData, setFormData] = useState({
    hotelId,
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

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await getUserProfile();
        const id = response.data._id;
        if (!id) throw new Error("Company ID is missing!");
        setHotelId(id);
      } catch (error) {
        console.error("Error fetching company details:", error.message);
      }
    };

    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      setRooms(response.data.rooms);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch rooms");
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
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.type || formData.pricePerNight <= 0) {
        throw new Error("Please fill in all fields correctly.");
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
          throw new Error("Company ID is missing for adding a room!");
        await createRoom({ ...roomData, hotelId });
        alert("Room added successfully!");
      }

      setFormData({
        type: "",
        pricePerNight: 0,
        availability: { from: "", to: "" },
      });
      setEditMode(false);
      fetchRooms();
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      alert(error.message || "Failed to save the room.");
    }
  };

  const handleEdit = (room) => {
    setFormData(room);
    setEditMode(true);
    setCurrentRoomId(room._id);
  };

  const handleDelete = async (roomId) => {
    try {
      if (!roomId) throw new Error("Room ID is missing!");

      const response = await deleteRoom(roomId);

      if (response && response.message) {
        alert(response.message);
      } else {
        throw new Error("Unexpected response format from server.");
      }

      fetchRooms();
    } catch (error) {
      console.error("Error in handleDelete:", error.message || error);
      alert(error.message || "Failed to delete room.");
    }
  };

  return (
    <div>
      <NavbarminiH name="Add Room" />
      <div className="p-5 mx-auto w-fit backdrop-blur-sm bg-white/10 py-10 shadow-lg text-white rounded-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="type"
            placeholder="Room Type"
            onChange={handleChange}
            value={formData.type}
            className="w-full px-4 py-2 bg-transparent shadow-sm text-white rounded-md"
          />
          <input
            type="number"
            name="pricePerNight"
            placeholder="Price Per Night"
            onChange={handleChange}
            value={formData.pricePerNight}
            className="w-full px-4 py-2 mt-4 bg-transparent shadow-sm text-white rounded-md"
            min="0"
          />
          <div className="mt-4">
            <p>Availability</p>
            <input
              type="date"
              name="availability_from"
              placeholder="From"
              onChange={handleChange}
              value={formData.availability.from}
              className="w-full px-4 py-2 mt-2 bg-transparent shadow-sm text-white rounded-md"
            />
            <input
              type="date"
              name="availability_to"
              placeholder="To"
              onChange={handleChange}
              value={formData.availability.to}
              className="w-full px-4 py-2 mt-2 bg-transparent shadow-sm text-white rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 mt-5 bg-blue-500 rounded shadow-md"
          >
            Add Room
          </button>
        </form>
        <div className="mt-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="flex justify-between p-4 bg-gray-800 rounded-lg mt-2"
            >
              <div>{room.type}</div>
              <div>{room.pricePerNight}</div>
              <div>
                {room.availability.from} - {room.availability.to}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(room._id)}
                  className="px-2 py-1 bg-red-600 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(room)}
                  className="px-2 py-1 bg-green-600 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
