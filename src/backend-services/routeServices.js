import api from "../app"; // Import Axios instance for API calls

/**
 * Create a new route (Done)
 * @param {Object} routeData - Data for the new route
 * @returns {Promise<Object>} - Created route details
 */

export const createRoute = async (routeData) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error(
        "You are not authorized to perform this action. Please log in again."
      );
    }

    console.log("Route Data Sent to API:", routeData);

    const { data } = await api.post(
      `/api/v1/routeCompany/create-route/${routeData.companyId}`,
      {
        departure: routeData.departure,
        arrival: routeData.arrival,
        price: routeData.price,
        seats: routeData.seats,
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
    console.error("Error in createRoute:", errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Get all routes with optional pagination (Done)
 * @param {Object} [queryParams={}] - { page, limit } for pagination
 * @returns {Promise<Object>} - List of all routes
 */
export const getAllRoutes = async (queryParams = {}) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get("/api/v1/routeCompany/all-routes", {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getAllRoutes:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch routes. Please try again."
    );
  }
};

/**
 * Get a route by ID
 * @param {String} routeId - ID of the route
 * @returns {Promise<Object>} - Route details
 */
export const getRouteById = async (routeId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.get(`/api/v1/routeCompany/route/${routeId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error in getRouteById:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch route details. Please try again."
    );
  }
};

/**
 * Update route details (Done)
 * @param {String} routeId - ID of the route to update
 * @param {Object} updateData - Updated route details
 * @returns {Promise<Object>} - Updated route details
 */

export const updateRoute = async (routeId, updateData) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.patch(
      `/api/v1/routeCompany/update-route/${routeId}`, // Removed companyId
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
      "Error in updateRoute:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to update route. Please try again."
    );
  }
};

/**
 * Delete a route (Done)
 * @param {String} routeId - ID of the route to delete
 * @returns {Promise<Object>} - Deletion confirmation
 */
export const deleteRoute = async (routeId) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in again.");
    }

    const { data } = await api.delete(
      `/api/v1/routeCompany/delete-route/${routeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      }
    );

    return data; // Returns the data directly
  } catch (error) {
    console.error(
      "Error in deleteRoute:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete route. Please try again."
    );
  }
};
