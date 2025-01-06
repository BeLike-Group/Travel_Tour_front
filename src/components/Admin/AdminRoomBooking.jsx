import React, { useEffect, useState } from "react";
import Navbarmini from "./Navbarmini";
import { getAllBookings, approveBooking } from "../../backend-services/roomBooking";

export default function AdminRoomBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch all bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await getAllBookings();
        console.log("Fetched bookings:", response.bookings);
        setBookings(response.bookings || []);
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

  // Approve booking
  const handleApproveBooking = async (bookingId) => {
    try {
      const approvedBooking = await approveBooking(bookingId);

      // Update booking list with the approved status
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: approvedBooking.status }
            : booking
        )
      );

      setMessage("Booking approved successfully!");
    } catch (error) {
      console.error("Error approving booking:", error);
      setMessage("Failed to approve booking. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbarmini name="Manage Room Bookings" />
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Room Bookings</h2>

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
                  <strong>Room Type:</strong> {booking.roomType}
                </p>
                <p>
                  <strong>Hotel Name:</strong> {booking.hotelName}
                </p>
                <p>
                  <strong>Price/Night:</strong> ${booking.pricePerNight}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
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
                {booking.status === "pending" && (
                  <button
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                    onClick={() => handleApproveBooking(booking._id)}
                  >
                    Approve
                  </button>
                )}
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
