import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isSameDay, format } from "date-fns";
import { FaBed, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

import { addBooking, getBookingDatesByRoom } from "../../backend-services/roomBooking"; // Import backend services


const RoomBookingSummary = () => {
  const location = useLocation();
  const {
    roomId,
    roomType,
    pricePerNight,
    availabilityFrom,
    availabilityTo,
    hotelName,
  } = location.state || {};

  const [bookedDates, setBookedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  // Fetch booked dates from the backend
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await getBookingDatesByRoom(roomId);
        const dates = response.bookingDates.map((booking) => ({
          startDate: new Date(booking.startDate),
          endDate: new Date(booking.endDate),
        }));
        
        // Generate an array of booked dates
        const allBookedDates = dates.flatMap(({ startDate, endDate }) => {
          const days = [];
          let current = new Date(startDate);
          while (current <= endDate) {
            days.push(new Date(current));
            current = addDays(current, 1);
          }
          return days;
        });

        setBookedDates(allBookedDates);
      } catch (error) {
        toast.error("Failed to load booked dates. Please try again.");
      }
    };

    fetchBookedDates();
  }, [roomId]);

  // Check if a date is booked
  const isDateBooked = (date) =>
    bookedDates.some((bookedDate) => isSameDay(date, bookedDate));

  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select a valid date range.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Check for overlap with booked dates
    const selectedDates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      selectedDates.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }

    const hasOverlap = selectedDates.some((date) => isDateBooked(date));
    if (hasOverlap) {
      toast.error("Selected dates overlap with unavailable dates.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Confirm booking with backend
    try {
      const bookingData = {
        roomId,
        roomType,
        hotelName,
        pricePerNight,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      };

      const response = await addBooking(bookingData);
      toast.success("Booking Confirmed!", {
        position: "top-right",
        autoClose: 3000,
      });
      const message = `Booking Summary:
Route ID: 
From: 
To: 
Departure Date & Time: $
Arrival Date & Time: 
Price: Rs. 
Selected Seats: $.join(", ")}`;

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/+923475800705?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");

      console.log("Booking Response:", response);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
        {hotelName}
      </h1>

      {/* Room Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaBed className="text-green-500" />
          Room Details
        </h2>
        <div className="space-y-3">
          <p className="flex items-center text-lg">
            <FaBed className="mr-2 text-blue-500" />
            <strong>Room Type:</strong> {roomType}
          </p>
          <p className="flex items-center text-lg">
            <FaMoneyBillWave className="mr-2 text-red-500" />
            <strong>Price Per Night:</strong> Rs. {pricePerNight}
          </p>
          <p className="flex items-center text-lg">
            <FaCalendarAlt className="mr-2 text-yellow-500" />
            <strong>Available From:</strong> {format(availabilityFrom, "yyyy-MM-dd")}
          </p>
          <p className="flex items-center text-lg">
            <FaCalendarAlt className="mr-2 text-purple-500" />
            <strong>Available To:</strong> {format(availabilityTo, "yyyy-MM-dd")}
          </p>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-yellow-500" />
          Select Booking Dates
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={availabilityFrom}
              maxDate={availabilityTo}
              excludeDates={bookedDates}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || availabilityFrom}
              maxDate={availabilityTo}
              excludeDates={bookedDates}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              placeholderText="Select end date"
            />
          </div>
        </div>
      </div>

      {/* Confirm Booking Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleConfirmBooking}
          className="px-12 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-white transition shadow-md"
        >
            Make Payment
        </button>
      </div>
    </div>
  );
};

export default RoomBookingSummary;
