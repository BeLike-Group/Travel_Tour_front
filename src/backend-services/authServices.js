import api from "../app"; // Axios instance for API calls

/**
 * Registers a new user (Done)
 * @param {Object} userData - { username, password, role, contactInfo }
 * @returns {Promise<Object>} - Newly created user details
 */
export const registerUser = async (userData) => {
  try {
    const { data } = await api.post("/api/v1/users/register", userData);
    return data;
  } catch (error) {
    console.error(
      "Error in registerUser:",
      error.response?.data || error.message
    );
    // Log full error for debugging
    console.error("Full error details:", error);
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

/**
 * Logs in a user (Done)
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} - Access and refresh tokens
 */

export const loginUser = async (credentials) => {
  try {
    const { data } = await api.post("/api/v1/users/login", credentials);

    const { accessToken, user } = data.data;

    if (accessToken) {
      // Store token in localStorage or sessionStorage
      localStorage.setItem("authToken", accessToken);
      sessionStorage.setItem("authToken", accessToken);
    } else {
      throw new Error("Access token missing in login response");
    }

    return user;
  } catch (error) {
    console.error("Error in loginUser:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

/**
 * Logs out the user (Done)
 * @returns {Promise<Object>} - Logout confirmation
 */
export const logoutUser = async () => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token found, cannot perform logout.");
    }

    await api.post(
      "/api/v1/users/logout",
      {}, // No body required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      }
    );

    // Clear token from storage
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  } catch (error) {
    console.error(
      "Error in logoutUser:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Logout failed. Please try again."
    );
  }
};

/**
 * Refreshes the access token
 * @returns {Promise<Object>} - New access token
 */
export const refreshAccessToken = async () => {
  try {
    const { data } = await api.post("/api/v1/users/refresh-token");
    return data;
  } catch (error) {
    console.error(
      "Error in refreshAccessToken:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Token refresh failed. Please login again."
    );
  }
};

/**
 * Changes the current user's password
 * @param {Object} passwordData - { currentPassword, newPassword }
 * @returns {Promise<Object>} - Password change confirmation
 */
export const changePassword = async (passwordData) => {
  try {
    const { data } = await api.post(
      "/api/v1/users/change-password",
      passwordData
    );
    return data;
  } catch (error) {
    console.error(
      "Error in changePassword:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Password change failed. Please try again."
    );
  }
};

/**
 * Fetches the user's profile (Done)
 * @returns {Promise<Object>} - User profile details
 */
export const getUserProfile = async () => {
  try {
    // Retrieve the token (ensure it's stored correctly during login)
    const token = localStorage.getItem("authToken"); // Replace 'jwtToken' with the actual key name used

    if (!token) {
      throw new Error("authToken is not available. Please log in again.");
    }

    // Include the token in the Authorization header
    const { data } = await api.get("/api/v1/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(
      "Error in getUserProfile:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile."
    );
  }
};

/**
 * Updates the user's profile (Done)
 * @param {Object} profileData - Updated profile information
 * @returns {Promise<Object>} - Updated profile details
 */
export const updateUserProfile = async (profileData) => {
  try {
    // Retrieve the JWT from localStorage (or wherever you store it)
    const token = localStorage.getItem("authToken");

    // Throw an error if the token is not available
    if (!token) {
      throw new Error("authToken is missing. Please log in again.");
    }

    // Send the PATCH request with the Authorization header
    const { data } = await api.patch(
      "/api/v1/users/profile-update",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
        },
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Error in updateUserProfile:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Profile update failed. Please try again."
    );
  }
};

/**
 * Fetches dashboard data based on the user's role
 * @param {String} role - The role of the user (Admin, TravelCompany, Hotel, Passenger)
 * @returns {Promise<Object>} - Dashboard data for the role
 */
export const fetchDashboardData = async (role) => {
  try {
    const roleToEndpoint = {
      Admin: "/api/v1/users/admin-dashboard",
      TravelCompany: "/api/v1/users/travel-company-dashboard",
      Hotel: "/api/v1/users/hotel-dashboard",
      Passenger: "/api/v1/users/passenger-dashboard",
    };

    const endpoint = roleToEndpoint[role];
    if (!endpoint) {
      throw new Error(`Invalid role: ${role}`);
    }

    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    console.error(
      "Error in fetchDashboardData:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch dashboard data for ${role}. Please try again.`
    );
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
    const { data } = await api.get("/api/v1/users/getAllCompanies", {
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
