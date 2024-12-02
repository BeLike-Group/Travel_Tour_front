import api from "../app"; // Import Axios instance for API calls

/**
 * Create a new room
 * @param {Object} roomData - Data for the new room
 * @returns {Promise<Object>} - Created room details
 */
export const createRoom = async (roomData) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error(
        "You are not authorized to perform this action. Please log in again."
      );
    }

    console.log("Room Data Sent to API:", roomData);

    const { data } = await api.post(
      `/api/v1/roomHotel/create-room/${roomData.hotelId}`,
      {
        type: roomData.type,
        pricePerNight: roomData.pricePerNight,
        availability: roomData.availability,
      },
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
      "Something went wrong. Please try again.";
    console.error("Error in createRoom:", errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Get all rooms with optional pagination
 * @param {Object} [queryParams={}] - { page, limit } for pagination
 * @returns {Promise<Object>} - List of all rooms
 */
export const getAllRooms = async (queryParams = {}) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get("/api/v1/roomHotel/all-rooms", {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getAllRooms:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch rooms. Please try again."
    );
  }
};

/**
 * Get a room by ID
 * @param {String} roomId - ID of the room
 * @returns {Promise<Object>} - Room details
 */
export const getRoomById = async (roomId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get(`/api/v1/roomHotel/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getRoomById:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch room details. Please try again."
    );
  }
};

/**
 * Update room details
 * @param {String} roomId - ID of the room to update
 * @param {Object} updateData - Updated room details
 * @returns {Promise<Object>} - Updated room details
 */
export const updateRoom = async (roomId, updateData) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.patch(
      `/api/v1/roomHotel/update-room/${roomId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error in updateRoom:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to update room. Please try again."
    );
  }
};

/**
 * Delete a room
 * @param {String} roomId - ID of the room to delete
 * @returns {Promise<Object>} - Deletion confirmation
 */
export const deleteRoom = async (roomId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.delete(
      `/api/v1/roomHotel/delete-room/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      }
    );

    return data; // Returns the data directly
  } catch (error) {
    console.error(
      "Error in deleteRoom:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete room. Please try again."
    );
  }
};
