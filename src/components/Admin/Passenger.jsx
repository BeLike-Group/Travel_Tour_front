/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbarmini from "./Navbarmini";
import {
  getAllPasssenger,
  deletePassenger as deletePassengerApi, // Renamed the imported deletePassenger function
} from "../../backend-services/adminPassengerServices";

export default function Passenger() {
  const [passengers, setPassengers] = useState([]);

  const fetchPassengers = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve token from storage

    if (!token) {
      alert("You must be logged in to view passenger.");
      return;
    }

    try {
      const response = await getAllPasssenger(token);
      console.log("API Response:", response); // Log response to check structure
      setPassengers(response.data || []); // Adjust based on actual response structure
    } catch (error) {
      console.error("Failed to fetch passengers:", error.message);
    }
  };

  const handleDeletePassenger = async (passengerId) => {
    // Renamed function to handleDeletePassenger
    const token = localStorage.getItem("authToken"); // Retrieve token from storage

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await deletePassengerApi(passengerId, token); // Use the renamed import
      alert(response.message || "Passenger deleted successfully");
      fetchPassengers(); // Refresh the passengers list after deletion
    } catch (error) {
      console.error("Failed to delete passenger:", error.message);
      alert("Failed to delete passenger");
    }
  };

  useEffect(() => {
    fetchPassengers(); // Fetch the passengers on component mount
  }, []);

  return (
    <>
      <div className="bg-slate-950">
        {/* ----------------------------------nav--------------------------------- */}
        <Navbarmini name="Passenger" />
        {/* ----------------------------main container----------------------------- */}
        <div
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE 10+ */,
          }}
          className="overflow-auto h-[32.5rem] flex-1 p-5 m-auto pt-[5rem] w-fit px-24 backdrop-blur-sm bg-white/10 py-[6rem] shadow-lg shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
        >
          {/* -----------------------------------Fetched Passengers-------------------------------------- */}
          <div className="flex flex-col w-full justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4">
            <div className="grid grid-cols-1 md:grid-cols-5 lg:gap-16 min-[425px]:gap-2 text-[0.95rem] font-semibold">
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Address</div>
              <div>Action</div>
            </div>
            {/* Table Rows */}
            {passengers.map((passenger, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4"
              >
                <div className="tracking-tight text-[0.95rem]">
                  {passenger.username}
                </div>
                <div className="tracking-tight text-[0.95rem]">
                  {passenger.contactInfo.email}
                </div>
                <div className="tracking-tight text-[0.95rem]">
                  {passenger.contactInfo.phone}
                </div>
                <div className="tracking-tight text-[0.95rem]">
                  {passenger.contactInfo.address}
                </div>
                <div className="flex gap-2">
                  <div
                    className="p-2 bg-red-600 text-xs rounded-lg cursor-pointer"
                    onClick={() => handleDeletePassenger(passenger._id)} // Use the renamed function
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
