import api from "../app"; // Axios instance for API calls

// Add a Booking
export const addBooking = async (bookingData) => {

  try {
    const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("You are not authorized to perform this action. Please log in again.");
  }
    const { data } = await api.post("/api/v1/roomBooking/bookings", bookingData, {
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

export const getAllBookings = async () => {
 

  try {
    const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("You are not authorized to perform this action. Please log in again.");
  }
    const { data } = await api.get("/api/v1/roomBooking/bookings", {
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


export const getBookingById = async (bookingId) => {
  
  try {
    const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("You are not authorized to perform this action. Please log in again.");
  }
    const { data } = await api.get(`/api/v1/roomBooking/bookings/${bookingId}`, {
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

export const approveBooking = async (bookingId) => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  
    if (!token) {
      throw new Error("You are not authorized to perform this action. Please log in again.");
    }
  
    // Send an empty object as the body instead of `null`
    const response = await api.patch(
      `/api/v1/roomBooking/bookings/${bookingId}/approve`,
      {}, // <-- Empty JSON object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };
  // Update a Booking
export const updateBooking = async (bookingId, updatedData) => {
  

  try {
    const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("You are not authorized to perform this action. Please log in again.");
  }
    const { data } = await api.put(`/api/v1/roomBooking/bookings/${bookingId}`, updatedData, {
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
export const deleteBooking = async (bookingId) => {
    try {
        const token =
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  
      if (!token) {
        throw new Error("You are not authorized to perform this action. Please log in again.");
      }
    const { data } = await api.delete(`/api/v1/roomBooking/bookings/${bookingId}`, {
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

// Get Booking Dates by Room ID
export const getBookingDatesByRoom = async (roomId) => {
  

  try {
    const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("You are not authorized to perform this action. Please log in again.");
  }
    const { data } = await api.get(`/api/v1/roomBooking/bookingDates/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getBookingDatesByRoom:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to fetch booking dates. Please try again.";
    throw new Error(errorMessage);
  }
};
