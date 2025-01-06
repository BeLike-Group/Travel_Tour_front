/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBed, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ModalRoom({ isOpen, onClose, room }) {
  if (!isOpen) return null;
  const navigate = useNavigate();

  // Utility to format dates into YYYY-MM-DD
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "N/A";

  // const handleBooking = () => {
  //   toast.success("Room booked successfully!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });

  //   onClose();
  // };
console.log(room)
  const handleContinue = () => {
    // const selectedSeats = route?.seats?.map(seat => seat.seatNumber); // Extract seat numbers
  
    navigate("/room-booking-summary", {
      state: {
        
        roomId: room?._id,
        hotelName: room?.companyId,
        pricePerNight: room?.pricePerNight,
        availabilityFrom: room?.availability?.from,
        availabilityTo: room?.availability?.to,
        roomType: room?.type,

      },
    });
  };
  
  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50">
        <div
          className={`absolute right-0 top-0 w-full max-w-md h-full bg-gradient-to-br from-gray-900 to-black text-white shadow-lg transform transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 overflow-y-auto h-full space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Room Details</h2>
              <button
                onClick={onClose}
                className="text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2"
              >
                ✕
              </button>
            </div>

            {/* Room Information */}
            <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
              {/* Room Type */}
              <div className="flex items-center space-x-2">
                <FaBed size={24} className="text-blue-500" />
                <p className="text-sm font-semibold">
                  <strong>Type:</strong> {room?.type || "Standard"}
                </p>
              </div>

              {/* Availability From */}
              <div className="flex items-center space-x-2">
                <FaCalendarAlt size={24} className="text-green-500" />
                <p className="text-sm">
                  <strong>Available From:</strong> {formatDate(room?.availability?.from)}
                </p>
              </div>

              {/* Availability To */}
              <div className="flex items-center space-x-2">
                <FaCalendarAlt size={24} className="text-yellow-500" />
                <p className="text-sm">
                  <strong>Available To:</strong> {formatDate(room?.availability?.to)}
                </p>
              </div>

              {/* Price Per Night */}
              <div className="flex items-center space-x-2">
                <FaMoneyBillWave size={24} className="text-red-500" />
                <p className="text-sm">
                  <strong>Price Per Night:</strong> Rs. {room?.pricePerNight || "N/A"}
                </p>
              </div>
            </div>

            {/* Booking Button */}
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                className="px-16 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
