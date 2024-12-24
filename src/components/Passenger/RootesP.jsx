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

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().split("T")[0] : "";

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
      setLoading(true);
      setError(null);
      setRoutes([]);

      if (!companyId) {
        setError("Company ID is required to fetch routes.");
        setLoading(false);
        return;
      }

      try {
        const response = await getAllCompanyRoutes(companyId);
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
  }, [companyId]);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-black to-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold">
          Routes Available from {cmpnyName}
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <p className="text-center text-gray-400">Loading routes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : routes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div
                key={route._id}
                onClick={() => openModal(route)}
                className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {route.departure.location} → {route.arrival.location}
                </h2>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Departure:</strong>{" "}
                    {formatDate(route.departure.date || new Date())},{" "}
                    {formatTime(route.departure.time || "00:00")}
                  </li>
                  <li>
                    <strong>Arrival:</strong>{" "}
                    {formatDate(route.arrival.date || new Date())},{" "}
                    {formatTime(route.arrival.time || "00:00")}
                  </li>
                  <li>
                    <strong>Price:</strong> Rs. {route.price}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No routes available.</p>
        )}
      </div>

      {/* Modal */}
      <ModalRootes
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        route={selectedRoute}
      />
    </div>
  );
}
