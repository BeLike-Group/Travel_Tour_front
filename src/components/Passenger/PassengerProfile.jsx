/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NavbarminiP from "./NavbarminiP";
import {
  getUserProfile,
  updateUserProfile,
} from "../../backend-services/authServices";

export default function PassengerProfile() {
  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
    role: "",
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const [message, setMessage] = useState(null); // To display success/error messages

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await getUserProfile();
        setProfileData(response.data); // Assuming response.data contains the profile information
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setMessage("Failed to load profile data. Please try again.");
      }
    }
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["email", "phone", "address"].includes(name)) {
      setProfileData((prevData) => ({
        ...prevData,
        contactInfo: {
          ...prevData.contactInfo,
          [name]: value,
        },
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const updatedProfile = await updateUserProfile(profileData);
      setProfileData(updatedProfile.data); // Update the state with the new data
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white">
      {/* Navbar */}
      <NavbarminiP name="Passenger Profile" />

      <div className="flex flex-col items-center py-10 px-6">
        <form
          className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.contactInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 text-sm font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={profileData.role}
                onChange={handleChange}
                placeholder="Enter your role"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={profileData.contactInfo.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={profileData.contactInfo.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="text-center mt-4 text-sm text-yellow-400">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
