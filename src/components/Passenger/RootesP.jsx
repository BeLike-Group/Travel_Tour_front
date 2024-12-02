/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ModalRootes from "./ModalRootes";
import { getAllCompanyRoutes } from "../../backend-services/bookingServices";

export default function RootesP({ companyId, cmpnyName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Invalid Time";
    const [hours, minutes] = timeString.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";

    const date = new Date();
    date.setHours(hours, minutes, 0);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const openModal = (route) => {
    setSelectedRoute(route);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRoute(null);
  };

  const handleSubmit = (data) => {
    console.log("Form Data:", data, "Route:", selectedRoute);
    closeModal();
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true); // Reset loading state for each fetch
      setError(null); // Reset error state
      setRoutes([]); // Clear previous routes

      if (!companyId) {
        setError("Company ID is required to fetch routes.");
        setLoading(false);
        return;
      }

      try {
        const response = await getAllCompanyRoutes(companyId); // Pass companyId to the API
        console.log("API Response:", response);
        const fetchedRoutes = response?.data || [];
        setRoutes(fetchedRoutes);
      } catch (err) {
        console.error("Error fetching routes:", err);
        setError(err.message || "Failed to fetch routes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [companyId]); // Re-run effect whenever companyId changes

  return (
    <div>
      <div className="p-5 bg-transparent mt-16 m-auto w-fit px-6 text-white rounded-md">
        <p className="text-center text-[1.4rem] font-semibold">
          Routes Available from {cmpnyName}
        </p>
        {loading ? (
          <p className="text-center">Loading routes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : routes.length > 0 ? (
          <ul className="flex flex-wrap gap-6 text-sm mt-8">
            {routes.map((route) => (
              <li
                key={route._id}
                onClick={() => openModal(route)}
                className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black"
              >
                <div>
                  <p className="text-xl">From: {route.departure.location}</p>
                  <p className="text-xl">To: {route.arrival.location}</p>
                  <p>
                    Departure Time:{" "}
                    {formatTime(route.departure.time || "00:00")}
                  </p>
                  <p>
                    Departure Date:{" "}
                    {formatDate(route.departure.date || new Date())}
                  </p>
                  <p>
                    Arrival Time: {formatTime(route.arrival.time || "00:00")}
                  </p>
                  <p>
                    Arrival Date: {formatDate(route.arrival.date || new Date())}
                  </p>
                  <p className="text-xl">Price: Rs. {route.price}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-white">No routes available.</p>
        )}
      </div>

      <ModalRootes
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        route={selectedRoute}
      />
    </div>
  );
}
