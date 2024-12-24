import React from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../backend-services/bookingServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaBusAlt,
  FaWifi,
  FaHeadphones,
  FaTv,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ModalRootes({ isOpen, onClose, route }) {
  const navigate = useNavigate(); // Initialize navigate

  if (!isOpen) return null;

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "N/A";


    const handleContinue = () => {
      const selectedSeats = route?.seats?.map(seat => seat.seatNumber); // Extract seat numbers
    
      navigate("/booking-summary", {
        state: {
          
          routeId: route?._id,
          company: route?.companyId,
          departure: route?.departure?.location,
          departureDate: route?.departure?.date,
          departureTime: route?.departure?.time,
          arrival: route?.arrival?.location,
          arrivalTime: route?.arrival?.time,
          arrivalDate: route?.arrival?.date,
          price: route?.price,
          Seats: route?.seats, // Pass seat numbers array
        },
      });
    };
    
  const handleBooking = async () => {
    try {
      const response = await createBooking(
        route._id,
        "Bus",
        route._id,
        "confirmed"
      );

      console.log("Booking created successfully:", response);

      // Show success toaster
      toast.success("Booking confirmed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Close modal after booking
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);

      // Show error toaster
      toast.error("Booking failed. Please try again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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
              <h2 className="text-2xl font-bold">Bus Preview</h2>
              <button
                onClick={onClose}
                className="text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2"
              >
                ✕
              </button>
            </div>

            {/* Route Information */}
            <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt size={20} />
                  <p className="text-sm font-semibold">
                    From: {route?.departure?.location || "Main Band Road, Lahore"}
                  </p>
                </div>
                <p className="text-xs">{route?.departure?.time || "10:00 AM"}</p>
              </div>
              <div className="border-l-2 border-gray-500 pl-4 ml-3 space-y-2">
                <p className="text-sm text-gray-300">Duration: 4h 15m</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt size={20} />
                  <p className="text-sm font-semibold">
                    To: {route?.arrival?.location || "Hassanabad Gate, Multan"}
                  </p>
                </div>
                <p className="text-xs">{route?.arrival?.time || "1:45 PM"}</p>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Amenities:</h3>
              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <FaWifi size={24} />
                  <p className="text-xs mt-1">WiFi</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaHeadphones size={24} />
                  <p className="text-xs mt-1">Entertainment</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaTv size={24} />
                  <p className="text-xs mt-1">TV</p>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <p className="text-lg font-bold">Starting From</p>
              <p className="text-xl font-bold text-green-400">
                Rs. {route?.price || "1,593"}
              </p>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                className="px-16 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
