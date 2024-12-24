import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBusAlt, FaMapMarkerAlt, FaClock, FaRupeeSign } from "react-icons/fa";
import { createBooking,updateSeatAvailability } from "../../backend-services/bookingServices"; // Import createBooking function
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookingSummary = () => {
    const navigate = useNavigate(); // Initialize useNavigate

  const location = useLocation();
  const {
    routeId,
    departure,
    arrival,
    departureTime,
    departureDate,
    arrivalTime,
    arrivalDate,
    price,
    company,
    Seats,
  } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);

  const seatAvailability = Seats.map((seat) => ({
    seatNumber: seat.seatNumber,
    availability: seat.availability,
    _id: seat._id,
  }));

  // Handle seat selection
  const handleSeatClick = (seat) => {
    if (!seat.availability) return;
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat.seatNumber)
        ? prevSelectedSeats.filter((s) => s !== seat.seatNumber)
        : [...prevSelectedSeats, seat.seatNumber]
    );
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  // Submit booking data
  const handleSubmit = async () => {
    console.log(selectedSeats)
    try {
      const formattedDepartureDate = formatDate(departureDate);
      const formattedArrivalDate = formatDate(arrivalDate);

      // Prepare booking data
      const bookingData = {
        departureLocation: departure,
        departureDate: formattedDepartureDate,
        departureTime,
        arrivalLocation: arrival,
        arrivalDate: formattedArrivalDate,
        arrivalTime,
        price,
        seats: selectedSeats,
        routeId,
        serviceType: "Bus",
      };

      const response = await createBooking(
        routeId,
        "Bus",
        routeId,
        "pending",
        bookingData // Pass booking data as the last parameter

      ); // pass the correct parameters

      console.log("Booking data prepared for submission:", response);
      console.log("Booking data prepared for submission:", selectedSeats);

      // Optionally integrate booking submission API
      // Example API call:
      // await createBooking(bookingData);

      return bookingData;
    } catch (error) {
      console.error("Error preparing booking data:", error);
      throw error;
    }
  };

  // Confirm booking
  const confirmBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    setIsConfirming(true);
    try {
      const bookingData = await handleSubmit();
    //   await updateSeatAvailability(routeId, selectedSeats);
      navigate("/DashboardPassenger"); // Adjust the path if your home page is located at a different route

      // Prepare WhatsApp message
      const message = `Booking Summary:
Route ID: ${routeId}
From: ${departure}
To: ${arrival}
Departure Date & Time: ${bookingData.departureDate} at ${departureTime}
Arrival Date & Time: ${bookingData.arrivalDate} at ${arrivalTime}
Price: Rs. ${price}
Selected Seats: ${selectedSeats.join(", ")}`;

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/+923475800705?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");

      toast.success("Payment Pending! Redirecting to WhatsApp...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Error confirming booking. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">{company}</h1>

      {/* Booking Details */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Route Details</h2>
          <FaBusAlt size={30} className="text-blue-500" />
        </div>
        <div className="space-y-2">
          <p className="flex items-center text-lg">
            <FaMapMarkerAlt className="mr-2 text-yellow-500" />
            <strong>From:</strong> {departure}
          </p>
          <p className="flex items-center text-lg">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            <strong>To:</strong> {arrival}
          </p>
          <p className="flex items-center text-lg">
            <FaClock className="mr-2 text-blue-500" />
            <strong>Departure Date & Time:</strong> {`${formatDate(departureDate)} at ${departureTime}`}
          </p>
          <p className="flex items-center text-lg">
            <FaClock className="mr-2 text-purple-500" />
            <strong>Arrival Date & Time:</strong> {`${formatDate(arrivalDate)} at ${arrivalTime}`}
          </p>
          <p className="flex items-center text-lg">
            <FaRupeeSign className="mr-2 text-green-500" />
            <strong>Price:</strong> Rs. {price}
          </p>
        </div>
      </div>

      {/* Seat Selection */}
      <h2 className="text-2xl font-bold mb-4 text-center">Select Your Seats</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 bg-gray-800 p-6 rounded-md shadow-lg">
        {seatAvailability.map((seat) => (
          <div
            key={seat._id}
            className={`flex flex-col items-center justify-center border-2 rounded-lg p-3 cursor-pointer transition ${
              seat.availability
                ? selectedSeats.includes(seat.seatNumber)
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white cursor-not-allowed"
            }`}
            onClick={() => handleSeatClick(seat)}
            title={seat.availability ? `Seat ${seat.seatNumber}` : "Not Available"}
          >
            <FaBusAlt size={24} />
            <span className="text-sm mt-1">{seat.seatNumber}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-600 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-700 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-600 rounded"></div>
          <span>Unavailable</span>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-md shadow-lg mt-6">
          <h3 className="text-xl font-semibold mb-2">Selected Seats</h3>
          <p>
            {selectedSeats.map((seat, index) => (
              <span key={index} className="mr-2">{`${seat}`}</span>
            ))}
          </p>
        </div>
      )}

      {/* Confirm Booking */}
      <div className="flex justify-center mt-6">
        <button
          onClick={confirmBooking}
          className={`px-12 py-3 rounded-lg font-semibold ${
            isConfirming ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
          } text-white`}
          disabled={isConfirming}
        >
          {isConfirming ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
