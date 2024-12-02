import api from "../app"; // Axios instance for API calls

// Add a Travel Company
export const addTravelCompany = async (travelCompanyData, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.post(
      "/api/v1/users/addTravelCompany",
      travelCompanyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error in addTravelCompany:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to add travel company. Please try again.";
    throw new Error(errorMessage);
  }
};

// Get all Travel Companies
export const getAllTravelCompanies = async (token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.get("/api/v1/users/getTravelCompanies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getAllTravelCompanies:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to fetch travel companies. Please try again.";
    throw new Error(errorMessage);
  }
};

// Update a Travel Company

export const updateTravelCompany = async (companyId, updatedData, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const { data } = await api.patch(
      `/api/v1/users/updateTravelCompany/${companyId}`,
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
      "Error in updateTravelCompany:",
      error.response?.data || error.message
    );

    const errorMessage =
      error.response?.data?.message ||
      "Failed to update travel company. Please try again.";
    throw new Error(errorMessage);
  }
};

// Delete a Travel Company
export const deleteTravelCompany = async (companyId, token) => {
  try {
    const { data } = await api.delete(
      `/api/v1/users/deleteTravelCompany/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error in deleteTravelCompany:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete travel company. Please try again."
    );
  }
};
