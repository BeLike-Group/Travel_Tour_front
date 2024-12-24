import axios from "axios";

const api = axios.create({
  // baseURL: "https://travel-tour-back.onrender.com", // Replace with your backend URL
baseURL:"http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are included
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

// Function to process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add interceptor for token handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 status (Unauthorized) and ensure it’s not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If token refresh is in progress, queue the failed request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Retry the original request with the new token
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/users/refresh-token",
          {},
          { withCredentials: true } // Send cookies
        );

        // Update Authorization header with new token
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
