import api from "../app"; // Axios instance for API calls

// Add a Hotel
export const addHotel = async (hotelData, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.post("/api/v1/users/addHotel", hotelData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error in addHotel:", error.response?.data || error.message);

    const errorMessage =
      error.response?.data?.message || "Failed to add hotel. Please try again.";
    throw new Error(errorMessage);
  }
};

// Get all Hotel
export const getAllHotel = async (token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.get("/api/v1/users/getAllHotel", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getAllHotel:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to fetch hotel. Please try again.";
    throw new Error(errorMessage);
  }
};

// Update Hotel
export const updateHotel = async (hotelId, updatedData, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.patch(
      `/api/v1/users/updateHotel/${hotelId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error in updateHotel:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to update hotel. Please try again.";
    throw new Error(errorMessage);
  }
};

// Delete a Hotel
export const deleteHotel = async (hotelId, token) => {
  try {
    const { data } = await api.delete(`/api/v1/users/deleteHotel/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in deleteHotel:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete hotel. Please try again."
    );
  }
};
