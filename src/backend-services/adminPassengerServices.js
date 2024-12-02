import api from "../app";

// Get all Travel Companies
export const getAllPasssenger = async (token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.get("/api/v1/users/getAllPassenger", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getAllPassenger:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to fetch passengers. Please try again.";
    throw new Error(errorMessage);
  }
};

export const deletePassenger = async (passengerId, token) => {
  try {
    const { data } = await api.delete(
      `/api/v1/users/deletePassenger/${passengerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error in deletePassenger:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete passenger. Please try again."
    );
  }
};
