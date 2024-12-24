import React, { useEffect, useState } from "react";
import Navbarmini from "./Navbarmini";
import {
  getAllBookings,
  updateBookingStatus,
  updateSeatAvailability,
} from "../../backend-services/bookingServices";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const response = await getAllBookings();
        setBookings(response.data.bookings);
        console.log("Fetched bookings:", response.data.bookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setMessage("Failed to load bookings. Please try again.");
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus, routeId, selectedSeats) => {
    console.log("Updating booking:", { bookingId, newStatus, routeId, selectedSeats });
    try {
      const updatedBooking = await updateBookingStatus(bookingId, newStatus);
      console.log("Booking status updated:", updatedBooking);

      if (newStatus === "confirmed") {
        console.log("Updating seat availability for routeId:", routeId);
        await updateSeatAvailability(routeId, selectedSeats);
      }

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      setMessage("Booking status updated successfully!");
    } catch (error) {
      console.error("Error updating booking status:", error);
      setMessage("Failed to update booking status. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbarmini name="Manage Bookings" />
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Bookings</h2>
        {loading ? (
          <p className="text-center">Loading bookings...</p>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md mb-4"
            >
              <p>
                <strong>ID:</strong> {booking._id}
              </p>
              <p>
                <strong>User ID:</strong> {booking.userId}
              </p>
              <p>
                <strong>Service Type:</strong> {booking.serviceType}
              </p>
              <p>
                <strong>Service ID:</strong> {booking.serviceId}
              </p>
              <p>
                <strong>Seats:</strong>{" "}
                {booking.Seats.map((seat, index) => (
                  <span key={index}>{seat.seatNumber} </span>
                ))}
              </p>
              <p>
                <strong>Departure Date:</strong>{" "}
                {new Date(booking.departureDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Arrival Date:</strong>{" "}
                {new Date(booking.arrivalDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    booking.status === "confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <div className="flex justify-end space-x-4 mt-4">
              <button
  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
  onClick={() => {
    console.log("Confirm button clicked for booking ID:", booking._id);
    handleStatusUpdate(
      booking._id,
      "confirmed",
      booking.serviceId,
      booking.Seats
    );
  }}
>
  Confirm
</button>
<button
  className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
  onClick={() => {
    console.log("Cancel button clicked for booking ID:", booking._id);
    handleStatusUpdate(booking._id, "cancelled");
  }}
>
  Cancel
</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No bookings found.</p>
        )}

        {message && (
          <div className="text-center mt-4 text-yellow-400">{message}</div>
        )}
      </div>
    </div>
  );
}
