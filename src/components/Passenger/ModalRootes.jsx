/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { createBooking } from "../../backend-services/bookingServices"; // Import createBooking function

export default function ModalRootes({ isOpen, onClose, route }) {
  if (!isOpen) return null;

  // Utility to format dates into YYYY-MM-DD
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  const handleSubmit = async (data) => {
    try {
      // Prepare the booking data to send, including serviceType as 'Bus'
      const bookingData = {
        departureLocation: data.departureLocation,
        departureDate: data.departureDate,
        departureTime: data.departureTime,
        arrivalLocation: data.arrivalLocation,
        arrivalDate: data.arrivalDate,
        arrivalTime: data.arrivalTime,
        price: data.price,
        seats: data.seats,
        routeId: route._id, // assuming route has an _id field
        serviceType: "Bus", // Assuming you are always dealing with Bus routes
      };

      // Call the createBooking function with the updated booking data
      const response = await createBooking(
        route._id,
        "Bus",
        route._id,
        "confirmed"
      ); // pass the correct parameters

      console.log("Booking created successfully:", response);
      // Optionally close the modal after successful booking creation
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div
      style={{
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE 10+ */,
      }}
      className="fixed inset-0 opacity-1 bg-black/60 backdrop-blur-2xl flex justify-center items-center z-50 overflow-auto"
    >
      <div className="pt-[8rem] rounded-lg shadow-xl shadow-white/60 p-6 w-[30rem] backdrop-blur-3xl bg-white/10">
        <h2 className="text-lg font-semibold mb-4 text-white/80 text-center">
          Route Details
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            handleSubmit(data); // Call handleSubmit which triggers createBooking
          }}
        >
          <div className="mb-4">
            <input
              type="text"
              name="departureLocation"
              defaultValue={route?.departure?.location || ""}
              required
              placeholder="Departure Location"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="departureDate"
              defaultValue={formatDate(route?.departure?.date)}
              required
              placeholder="Departure Date"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          <div className="mb-4">
            <input
              type="time"
              name="departureTime"
              defaultValue={route?.departure?.time || ""}
              required
              placeholder="Departure Time"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="arrivalLocation"
              defaultValue={route?.arrival?.location || ""}
              required
              placeholder="Arrival Location"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="arrivalDate"
              defaultValue={formatDate(route?.arrival?.date)}
              required
              placeholder="Arrival Date"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          <div className="mb-4">
            <input
              type="time"
              name="arrivalTime"
              defaultValue={route?.arrival?.time || ""}
              required
              placeholder="Arrival Time"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="price"
              defaultValue={route?.price || ""}
              required
              placeholder="Price"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white/80 mb-2">Seats:</label>
            <ul className="bg-white/10 p-2 rounded-md shadow-sm shadow-white/70">
              {route?.seats && route.seats.length > 0 ? (
                route.seats.map((seat, index) => (
                  <li key={seat._id} className="text-white/80">
                    Seat {index + 1}: {seat.seatNumber} -{" "}
                    {seat.availability ? "Available" : "Not Available"}
                  </li>
                ))
              ) : (
                <li className="text-white/50">No seats available</li>
              )}
            </ul>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="status"
              defaultValue={route?.status || "confirmed"} // Default to 'confirmed' if no value is provided
              required
              placeholder="Booking Status"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white/20 shadow-sm border border-white/10 shadow-white/50 px-2 py-1 rounded hover:bg-gray-300 hover:text-black/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white/20 shadow-sm border border-white/10 shadow-white/50 text-white px-2 py-1 rounded hover:bg-gray-300 hover:text-black/80"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
