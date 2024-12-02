import api from "../app"; // Import Axios instance for API calls

/**
 * Create a new booking (Done)
 * @param {Object} bookingData - Data for the new booking
 * @returns {Promise<Object>} - Created booking details
 */
export const createBooking = async (userId, serviceType, serviceId, status) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error(
        "You are not authorized to perform this action. Please log in again."
      );
    }

    // Check if the serviceType is valid
    if (!["Bus", "Hotel"].includes(serviceType)) {
      throw new Error("Invalid serviceType. Allowed values: Bus, Hotel");
    }

    console.log("Booking Data Sent to API:", {
      userId,
      serviceType,
      serviceId,
      status,
    });

    // Make the API request with the URL params
    const { data } = await api.post(
      `/api/v1/booking/create-booking/${userId}/${serviceType}/${serviceId}`,
      { status }, // status is still passed in the body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data; // Return the full response from the API
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    console.error("Error in createBooking:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getAllTravelCompanies = async (queryParams = {}) => {
  try {
    // Get the token from localStorage or sessionStorage
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Check if token is present
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    // Make the GET request to fetch hotels
    const { data } = await api.get("/api/v1/booking/getAllCompanies", {
      params: queryParams, // Pass query parameters for pagination or filters
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    });

    // Return the fetched data
    return data;
  } catch (error) {
    // Log the error and throw a user-friendly message
    console.error(
      "Error in getAllCompanies:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch Companies. Please try again."
    );
  }
};

export const getTravelCompanyById = async (companyId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get(
      `/api/v1/booking/getTravelCompany/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Company Deatils Data:", data);
    return data;
  } catch (error) {
    console.error("Error in getTravelCompanyById:", error.message);
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch Company profile. Please try again."
    );
  }
};

// get all company routes (Done)
export const getAllCompanyRoutes = async (companyId, queryParams = {}) => {
  try {
    // Get the token from localStorage or sessionStorage
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Check if token is present
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    // Validate companyId
    if (!companyId) {
      throw new Error("Company ID is required to fetch routes.");
    }

    // Make the GET request to fetch routes
    const { data } = await api.get(
      `/api/v1/booking/getAllCompanyRoutes/${companyId}`,
      {
        params: queryParams, // Pass query parameters for pagination or filters
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      }
    );

    // Return the fetched data
    return data;
  } catch (error) {
    // Log the error and throw a user-friendly message
    console.error(
      "Error in getAllCompanyRoutes:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch routes. Please try again."
    );
  }
};

/**
 * Fetch all hotels from the backend with optional query parameters
 * @param {Object} queryParams - Query parameters for filters (e.g., page, limit, city, minRating, maxPriceRange)
 * @returns {Promise<Object>} - API response containing the list of hotels
 */
export const getAllHotels = async (queryParams = {}) => {
  try {
    // Get the token from localStorage or sessionStorage
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Check if token is present
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    // Make the GET request to fetch hotels
    const { data } = await api.get("/api/v1/booking/getAllHotels", {
      params: queryParams, // Pass query parameters for pagination or filters
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    });

    // Return the fetched data
    return data;
  } catch (error) {
    // Log the error and throw a user-friendly message
    console.error(
      "Error in getAllHotels:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch hotels. Please try again."
    );
  }
};

// get all hotel rooms
export const getAllHotelRooms = async (hotelId, queryParams = {}) => {
  try {
    // Get the token from localStorage or sessionStorage
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Check if token is present
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    // Validate companyId
    if (!hotelId) {
      throw new Error("Hotel ID is required to fetch rooms.");
    }

    // Make the GET request to fetch rooms
    const { data } = await api.get(
      `/api/v1/booking/getAllHotelRooms/${hotelId}`,
      {
        params: queryParams, // Pass query parameters for pagination or filters
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      }
    );

    // Return the fetched data
    return data;
  } catch (error) {
    // Log the error and throw a user-friendly message
    console.error(
      "Error in getAllHotelRooms:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch rooms. Please try again."
    );
  }
};
export const getHotelById = async (hotelId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get(`/api/v1/booking/getHotel/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("HotelDeatils Data:", data);
    return data;
  } catch (error) {
    console.error("Error in getHotelById:", error.message);
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch hotel profile. Please try again."
    );
  }
};

/**
 * Get all bookings with optional pagination (Done)
 * @param {Object} [queryParams={}] - { page, limit } for pagination
 * @returns {Promise<Object>} - List of all bookings
 */
export const getAllBookings = async (queryParams = {}) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get("/api/v1/booking/all-booking", {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });

    return data;
  } catch (error) {
    console.error(
      "Error in getAllBookings:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch bookings. Please try again."
    );
  }
};

/**
 * Get a booking by ID
 * @param {String} bookingId - ID of the booking
 * @returns {Promise<Object>} - Booking details
 */
export const getBookingById = async (bookingId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get(`/api/v1/booking/one-booking/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });

    return data;
  } catch (error) {
    console.error(
      "Error in getBookingById:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch booking details. Please try again."
    );
  }
};

/**
 * Update booking status (Done)
 * @param {String} bookingId - ID of the booking
 * @param {Object} updateData - Updated status for the booking
 * @returns {Promise<Object>} - Updated booking details
 */
export const updateBookingStatus = async (bookingId, updateData) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.patch(
      `/api/v1/booking/update-booking/${bookingId}/status`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Error in updateBookingStatus:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to update booking status. Please try again."
    );
  }
};

/**
 * Delete a booking (Done)
 * @param {String} bookingId - ID of the booking
 * @returns {Promise<Object>} - Deletion confirmation
 */
export const deleteBooking = async (bookingId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.delete(
      `/api/v1/booking/delete-booking/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      }
    );

    return data; // Returns the data directly
  } catch (error) {
    console.error(
      "Error in deleteBooking:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete booking. Please try again."
    );
  }
};
