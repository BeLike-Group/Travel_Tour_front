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

  // Fetch all bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await getAllBookings();
        setBookings(response.data.bookings || []);
        setMessage(null); // Clear any previous error message
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setMessage("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Update booking status and seat availability
  const handleStatusUpdate = async (bookingId, newStatus, routeId, selectedSeats) => {
    try {
      // Update booking status
      await updateBookingStatus(bookingId, newStatus);

      // If status is confirmed, update seat availability
      if (newStatus === "confirmed" && routeId && selectedSeats) {
        await updateSeatAvailability(routeId, selectedSeats);
      }

      // Update booking list with the new status
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
          <p className="text-center text-gray-400">Loading bookings...</p>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md mb-6"
            >
              <div className="grid grid-cols-2 gap-4">
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
                <p className="col-span-2">
                  <strong>Seats:</strong>{" "}
                  {booking.Seats.map((seat, index) => (
                    <span key={index}>{seat} </span>
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
                    className={`font-semibold ${
                      booking.status === "confirmed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                  onClick={() =>
                    handleStatusUpdate(
                      booking._id,
                      "confirmed",
                      booking.serviceId,
                      booking.Seats
                    )
                  }
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                  onClick={() =>
                    handleStatusUpdate(booking._id, "cancelled")
                  }
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
          <div className="mt-4 text-center text-yellow-400">{message}</div>
        )}
      </div>
    </div>
  );
}
