/* eslint-disable no-unused-vars */
import { loginUser, getUserProfile, fetchDashboardData } from "./authServices";

const handleLogin = async () => {
  try {
    const credentials = { username: "admin", password: "password123" };
    const tokens = await loginUser(credentials);
    console.log("Logged in successfully:", tokens);
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

const fetchProfile = async () => {
  try {
    const profile = await getUserProfile();
    console.log("User profile:", profile);
  } catch (error) {
    console.error("Failed to fetch profile:", error.message);
  }
};

const loadDashboard = async () => {
  try {
    const role = "Admin"; // Replace with dynamic role
    const dashboardData = await fetchDashboardData(role);
    console.log("Dashboard data:", dashboardData);
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error.message);
  }
};
