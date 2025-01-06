import React, { useEffect, useRef, useState } from "react";
import Navbarmini from "./Navbarmini";
import {
  addTravelCompany,
  deleteTravelCompany,
  getAllTravelCompanies,
  updateTravelCompany,
} from "../../backend-services/adminTravelCompanyServices";

export default function TravelCompany() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "TravelCompany", // Default value
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
  });

  const [companies, setCompanies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contactInfo) {
      setFormData({
        ...formData,
        contactInfo: { ...formData.contactInfo, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Start editing a company
  const startEditing = (company) => {
    setFormData({
      username: company.username,
      password: "", // Leave blank for security
      role: "TravelCompany",
      contactInfo: { ...company.contactInfo },
    });
    setIsEditing(true);
    setEditingCompanyId(company._id);
    formRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      if (isEditing) {
        const response = await updateTravelCompany(
          editingCompanyId,
          formData,
          token
        );
        alert(response.message || "Company updated successfully");
      } else {
        const response = await addTravelCompany(formData, token);
        alert(response.message || "Company added successfully");
      }
      fetchCompanies();
      resetForm();
    } catch (error) {
      console.error("Error saving company:", error.message);
      alert("Failed to save travel company.");
    }
  };

  // Fetch all travel companies
  const fetchCompanies = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to view travel companies.");
      return;
    }

    try {
      const response = await getAllTravelCompanies(token);
      setCompanies(response.data || []);
    } catch (error) {
      console.error("Failed to fetch companies:", error.message);
    }
  };

  // Delete a travel company
  const deleteCompanyHandler = async (companyId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await deleteTravelCompany(companyId, token);
      alert(response.message || "Company deleted successfully");
      fetchCompanies();
    } catch (error) {
      console.error("Failed to delete company:", error.message);
      alert("Failed to delete company.");
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      role: "TravelCompany",
      contactInfo: { email: "", phone: "", address: "" },
    });
    setIsEditing(false);
    setEditingCompanyId(null);
  };

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen p-10">
   

      {/* Main Container */}
      <div className="container mx-auto py-6 px-4 bg-white/10 shadow-lg text-white rounded-md">
        {/* Form Section */}
        <form ref={formRef} onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow rounded-md placeholder-gray-400 focus:ring-2"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow rounded-md placeholder-gray-400 focus:ring-2"
            />
            <input
              type="email"
              name="email"
              value={formData.contactInfo.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow rounded-md placeholder-gray-400 focus:ring-2"
            />
            <input
              type="text"
              name="phone"
              value={formData.contactInfo.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow rounded-md placeholder-gray-400 focus:ring-2"
            />
            <input
              type="text"
              name="address"
              value={formData.contactInfo.address}
              placeholder="Address"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent shadow rounded-md placeholder-gray-400 focus:ring-2"
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 rounded-md shadow hover:bg-blue-500"
            >
              {isEditing ? "Update Travel Company" : "Add Travel Company"}
            </button>
          </div>
        </form>

        {/* Companies List Section */}
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-800 p-4 rounded-md font-semibold">
            <div>Company Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Address</div>
            <div>Actions</div>
          </div>
          {companies.map((company) => (
            <div
              key={company._id}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 mt-4 bg-gray-900 rounded-md shadow hover:shadow-lg"
            >
              <div>{company.username}</div>
              <div>{company.contactInfo.email}</div>
              <div>{company.contactInfo.phone}</div>
              <div>{company.contactInfo.address}</div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-1 bg-yellow-600 rounded hover:bg-yellow-500"
                  onClick={() => startEditing(company)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 bg-red-600 rounded hover:bg-red-500"
                  onClick={() => deleteCompanyHandler(company._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
