import api from "../app"; // Axios instance for API calls

// Add a Booking
export const addBooking = async (bookingData, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.post("/api/bookings", bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in addBooking:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to create booking. Please try again.";
    throw new Error(errorMessage);
  }
};

// Get All Bookings
export const getAllBookings = async (token) => {
//   if (!token) {
//     throw new Error("Authentication token is missing. Please log in.");
//   }

  try {
    const { data } = await api.get("/api/v1/booking/all-booking", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getAllBookings:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to fetch bookings. Please try again.";
    throw new Error(errorMessage);
  }
};

// Get Booking by ID
export const getBookingById = async (bookingId, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.get(`/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getBookingById:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to fetch booking details. Please try again.";
    throw new Error(errorMessage);
  }
};

// Update a Booking
export const updateBooking = async (bookingId, updatedData, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.put(`/api/bookings/${bookingId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in updateBooking:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to update booking. Please try again.";
    throw new Error(errorMessage);
  }
};

// Delete a Booking
export const deleteBooking = async (bookingId, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.delete(`/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in deleteBooking:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to delete booking. Please try again.";
    throw new Error(errorMessage);
  }
};
