/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbarmini from "./Navbarmini";
import {
  getAllPasssenger,
  deletePassenger as deletePassengerApi,
} from "../../backend-services/adminPassengerServices";

export default function Passenger() {
  const [passengers, setPassengers] = useState([]);

  // Fetch passengers from API
  const fetchPassengers = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to view passengers.");
      return;
    }

    try {
      const response = await getAllPasssenger(token);
      console.log("API Response:", response);
      setPassengers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch passengers:", error.message);
    }
  };

  // Handle passenger deletion
  const handleDeletePassenger = async (passengerId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await deletePassengerApi(passengerId, token);
      alert(response.message || "Passenger deleted successfully");
      fetchPassengers();
    } catch (error) {
      console.error("Failed to delete passenger:", error.message);
      alert("Failed to delete passenger");
    }
  };

  // Fetch passengers on component mount
  useEffect(() => {
    fetchPassengers();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Navbar */}


      {/* Main Container */}
      <div className="overflow-auto h-[32.5rem] p-5 m-auto pt-20 w-fit px-24 backdrop-blur-sm bg-white/10 py-24 shadow-lg shadow-black text-white rounded-md">
        {/* Passengers List */}
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm font-semibold p-4 bg-gray-800 rounded-lg">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Address</div>
            <div>Action</div>
          </div>

          {/* Passenger Rows */}
          {passengers.length > 0 ? (
            passengers.map((passenger, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-900 rounded-lg mt-4 shadow-md hover:shadow-lg"
              >
                <div>{passenger.username}</div>
                <div>{passenger.contactInfo?.email || "N/A"}</div>
                <div>{passenger.contactInfo?.phone || "N/A"}</div>
                <div>{passenger.contactInfo?.address || "N/A"}</div>
                <div>
                  <button
                    className="px-4 py-2 bg-red-600 text-xs rounded-lg hover:bg-red-500"
                    onClick={() => handleDeletePassenger(passenger._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-6">
              No passengers found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
