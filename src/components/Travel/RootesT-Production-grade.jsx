/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import NavbarminiT from "./NavbarminiT";
import {
  createRoute,
  getAllRoutes,
  updateRoute,
  deleteRoute,
} from "../../backend-services/routeServices";
import { getUserProfile } from "../../backend-services/authServices";

export default function RootesT() {
  const [formData, setFormData] = useState({
    companyId: "",
    departure: { location: "", date: "", time: "" },
    arrival: { location: "", date: "", time: "" },
    price: "",
    seats: [{ seatNumber: "", availability: true }],
  });
  const [routes, setRoutes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRouteId, setCurrentRouteId] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await getUserProfile();
        const id = response.data._id;
        if (!id) throw new Error("Company ID is missing!");
        setFormData((prevData) => ({ ...prevData, companyId: id }));
      } catch (error) {
        console.error("Error fetching company details:", error.message);
      }
    };

    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await getAllRoutes();
      setRoutes(response.data.routes || []);
    } catch (error) {
      console.error("Error fetching routes:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("departure") || name.includes("arrival")) {
      const [section, field] = name.split("_");
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else if (name.includes("seat")) {
      const [property, index] = name.split("_");
      setFormData((prevData) => {
        const seats = [...prevData.seats];
        seats[index][property] =
          property === "availability" ? value === "true" : value;
        return { ...prevData, seats };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAddSeat = () => {
    setFormData((prevData) => ({
      ...prevData,
      seats: [...prevData.seats, { seatNumber: "", availability: true }],
    }));
  };

  const handleRemoveSeat = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      seats: prevData.seats.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !formData.departure.location ||
        !formData.departure.date ||
        !formData.departure.time
      ) {
        throw new Error("All departure details are required.");
      }

      if (
        !formData.arrival.location ||
        !formData.arrival.date ||
        !formData.arrival.time
      ) {
        throw new Error("All arrival details are required.");
      }

      if (formData.price <= 0) {
        throw new Error("Price must be a positive number.");
      }

      if (!formData.seats.length) {
        throw new Error("At least one seat is required.");
      }

      const routeData = {
        companyId: formData.companyId,
        departure: formData.departure,
        arrival: formData.arrival,
        price: parseFloat(formData.price),
        seats: formData.seats,
      };

      if (editMode) {
        if (!currentRouteId) throw new Error("Route ID is missing for update!");
        await updateRoute(currentRouteId, routeData);
        alert("Route updated successfully!");
      } else {
        await createRoute(routeData);
        alert("Route created successfully!");
      }

      resetForm();
      fetchRoutes();
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      alert(error.message || "Failed to save the route.");
    }
  };

  const handleEdit = (route) => {
    setFormData(route);
    setEditMode(true);
    setCurrentRouteId(route._id);
  };

  const handleDelete = async (routeId) => {
    try {
      if (!routeId) throw new Error("Route ID is missing!");
      await deleteRoute(routeId);
      alert("Route deleted successfully!");
      fetchRoutes();
    } catch (error) {
      console.error("Error deleting route:", error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      companyId: formData.companyId,
      departure: { location: "", date: "", time: "" },
      arrival: { location: "", date: "", time: "" },
      price: "",
      seats: [{ seatNumber: "", availability: true }],
    });
    setEditMode(false);
    setCurrentRouteId(null);
  };

  return (
    <div>
      <NavbarminiT name="Manage Routes" />
      <div className="container mx-auto">
        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit}>
          <h2>{editMode ? "Edit Route" : "Add Route"}</h2>
          {/* Departure and Arrival Inputs */}
          {/* Map seats and other inputs */}
        </form>
        {/* Routes List */}
      </div>
    </div>
  );
}
