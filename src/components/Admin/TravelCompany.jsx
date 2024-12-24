/* eslint-disable no-unused-vars */
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

  const startEditing = (company) => {
    setFormData({
      username: company.username,
      password: "", // Leave blank for security
      role: "TravelCompany",
      contactInfo: { ...company.contactInfo },
    });
    setIsEditing(true);
    setEditingCompanyId(company._id); // or company._id based on your schema
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    if (isEditing) {
      // Update mode
      try {
        const response = await updateTravelCompany(
          editingCompanyId,
          formData,
          token
        );
        alert(response.message || "Company updated successfully");
        fetchCompanies(); // Refresh the list
        setIsEditing(false);
        setEditingCompanyId(null);
        setFormData({
          username: "",
          password: "",
          role: "TravelCompany",
          contactInfo: { email: "", phone: "", address: "" },
        }); // Reset form
      } catch (error) {
        console.error("Update failed:", error.message);
        alert("Failed to update Travel Company");
      }
    } else {
      // Add mode
      try {
        const response = await addTravelCompany(formData, token);
        alert(response.message || "Company added successfully");
        fetchCompanies();
      } catch (error) {
        console.error("Registration failed:", error.message);
        alert("Failed to register Travel Company");
      }
    }
  };

  const fetchCompanies = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve token from storage

    if (!token) {
      alert("You must be logged in to view travel companies.");
      return;
    }

    try {
      const response = await getAllTravelCompanies(token);
      console.log("API Response:", response); // Log response to check structure
      setCompanies(response.data || []); // Adjust based on actual response structure
    } catch (error) {
      console.error("Failed to fetch companies:", error.message);
    }
  };

  const deleteCompany = async (companyId) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from storage

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await deleteTravelCompany(companyId, token);
      alert(response.message || "Company deleted successfully");
      fetchCompanies(); // Refresh the companies list after deletion
    } catch (error) {
      console.error("Failed to delete company:", error.message);
      alert("Failed to delete company");
    }
  };

  useEffect(() => {
    fetchCompanies(); // Fetch the companies on component mount
  }, []);
// -------------------------------new-----------------
return (
  <div className="bg-slate-950">
    <Navbarmini name="Travel Company" />
    <div className="overflow-auto h-screen m-auto  w-full md:w-fit px-2  backdrop-blur-sm bg-white/10  shadow-lg shadow-black text-white rounded-md">
      {/* Add Company Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row lg:pt-8 min-[425px]:pt-1 lg:gap-[9rem] min-[425px]:gap-4 justify-center">
          <div className="w-full md:w-auto">
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              className="w-full backdrop-blur-none bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            />
          </div>
          <div className="w-full md:w-auto">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:pt-4 min-[425px]:pt-1 lg:gap-[12rem] min-[425px]:gap-4 justify-center mt-4">
          <div className="w-full md:w-auto">
            <input
              type="email"
              name="email"
              value={formData.contactInfo.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            />
          </div>
          <div className="w-full md:w-auto">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="TravelCompany">TravelCompany</option>
              <option value="Hotel">Hotel</option>
              <option value="Passenger">Passenger</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:gap-[9rem] min-[425px]:gap-4 justify-center mt-4">
          <div className="w-full md:w-auto">
            <input
              type="text"
              name="phone"
              value={formData.contactInfo.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            />
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.contactInfo.address}
              onChange={handleChange}
              className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 shadow-md shadow-black/30"
          >
            {isEditing ? "Update Travel Company" : "Add Travel Company"}
          </button>
        </div>
      </form>

      {/* Companies List */}
      <div className="flex flex-col  w-full justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:gap-16 min-[425px]:gap-2 text-[0.95rem] font-semibold">
          <div>Company Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Address</div>
          <div>Action</div>
        </div>
        {Array.isArray(companies) && companies.map((company, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4"
          >
            <div className="tracking-tight text-[0.95rem]">{company.username}</div>
            <div className="tracking-tight text-[0.95rem]">{company.contactInfo.email}</div>
            <div className="tracking-tight text-[0.95rem]">{company.contactInfo.phone}</div>
            <div className="tracking-tight text-[0.95rem]">{company.contactInfo.address}</div>
            <div className="flex gap-2">
              <div
                className="p-2 bg-red-600 text-xs rounded-lg cursor-pointer"
                onClick={() => deleteCompany(company._id)}
              >
                Delete
              </div>
              <div
                className="p-2 bg-yellow-600 text-xs rounded-lg cursor-pointer"
                onClick={() => startEditing(company)}
              >
                Edit
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
  // -----------------------prev------------------
  // return (
  //   <div>
  //     <Navbarmini name="Travel Company" />
  //     <div className="overflow-auto h-[30rem] p-5 m-auto pt-[5rem] w-fit px-24 backdrop-blur-sm bg-white/10 py-24 shadow-lg shadow-black text-white rounded-md">
  //       {/* Add Company Form */}
  //       <form className="" onSubmit={handleSubmit}>
  //         <div className="flex gap-[14rem] justify-center">
  //           <div>
  //             <input
  //               type="text"
  //               name="username"
  //               value={formData.username}
  //               placeholder="Username"
  //               onChange={handleChange}
  //               className="w-full backdrop-blur-none bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
  //             />
  //           </div>
  //           <div>
  //             <input
  //               type="password"
  //               name="password"
  //               value={formData.password}
  //               placeholder="Password"
  //               onChange={handleChange}
  //               className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
  //             />
  //           </div>
  //         </div>
  //         <div className="flex gap-[14rem] justify-center mt-8">
  //           <div>
  //             <input
  //               type="email"
  //               name="email"
  //               value={formData.contactInfo.email}
  //               placeholder="Email"
  //               onChange={handleChange}
  //               className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
  //             />
  //           </div>
  //           <div>
  //             <select
  //               name="role"
  //               value={formData.role}
  //               onChange={handleChange}
  //               className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
  //             >
  //               <option value="">Select Role</option>
  //               <option value="Admin">Admin</option>
  //               <option value="TravelCompany">TravelCompany</option>
  //               <option value="Hotel">Hotel</option>
  //               <option value="Passenger">Passenger</option>
  //             </select>
  //           </div>
  //         </div>
  //         <div className="flex gap-[14rem] justify-center mt-8">
  //           <div>
  //             <input
  //               type="text"
  //               name="phone"
  //               value={formData.contactInfo.phone}
  //               placeholder="Phone"
  //               onChange={handleChange}
  //               className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
  //             />
  //           </div>
  //           <div>
  //             <input
  //               type="text"
  //               name="address"
  //               placeholder="Address"
  //               value={formData.contactInfo.address}
  //               onChange={handleChange}
  //               className="w-full bg-transparent px-4 py-2 shadow-sm shadow-black text-white rounded-md focus:outline-none focus:ring-2 placeholder-white"
  //             />
  //           </div>
  //         </div>
  //         <div className="flex justify-center mt-5">
  //           <button
  //             type="submit"
  //             className="bg-blue-500 text-white px-4 py-2 rounded mt-[1rem] shadow-md shadow-black/30"
  //           >
  //             {isEditing ? "Update Travel Company" : "Add Travel Company"}
  //           </button>
  //         </div>
  //       </form>

  //       {/* Companies List */}
  //       <div className="flex gap-[4.7rem] m-auto w-[52rem] justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4">
  //         <div className="tracking-tight text-[0.95rem] font-semibold">
  //           Company Name
  //         </div>
  //         <div className="tracking-tight text-[0.95rem] font-semibold">
  //           Email
  //         </div>
  //         <div className="tracking-tight text-[0.95rem] font-semibold">
  //           Phone
  //         </div>
  //         <div className="tracking-tight text-[0.95rem] font-semibold">
  //           Address
  //         </div>
  //         <div className="tracking-tight text-[0.95rem] font-semibold">
  //           Action
  //         </div>
  //       </div>
  //       <div>
  //         <div>
  //           {/* Companies List */}
  //           {Array.isArray(companies) &&
  //             companies.map((company, index) => (
  //               <div
  //                 key={index}
  //                 className="flex gap-[4.7rem] m-auto w-[52rem] justify-between p-6 shadow-md shadow-black/50 hover:shadow-black/80 text-white rounded-md mt-4"
  //               >
  //                 <div className="tracking-tight text-[0.95rem]">
  //                   {company.username}
  //                 </div>
  //                 <div className="tracking-tight text-[0.95rem]">
  //                   {company.contactInfo.email}
  //                 </div>
  //                 <div className="tracking-tight text-[0.95rem]">
  //                   {company.contactInfo.phone}
  //                 </div>
  //                 <div className="tracking-tight text-[0.95rem]">
  //                   {company.contactInfo.address}
  //                 </div>
  //                 <div
  //                   className="p-2 bg-red-600 text-xs rounded-lg cursor-pointer"
  //                   onClick={() => deleteCompany(company._id)}
  //                 >
  //                   Delete
  //                 </div>
  //                 <div
  //                   className="p-2 bg-yellow-600 text-xs rounded-lg cursor-pointer"
  //                   onClick={() => startEditing(company)}
  //                 >
  //                   Edit
  //                 </div>
  //               </div>
  //             ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
