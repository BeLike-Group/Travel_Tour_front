/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarminiP from "./NavbarminiP";
import { getAllTravelCompanies } from "../../backend-services/bookingServices";

const TravelP = () => {
  const [companies, setCompanies] = useState([]); // State for storing companies
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllTravelCompanies();
        console.log("API Response:", response);

        // Set data to state after validating response structure
        if (Array.isArray(response.data)) {
          setCompanies(response.data);
        } else {
          setCompanies([response.data]);
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error.message);
        alert("Unable to load data. Please try again later.");
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white">
      {/* Navbar */}
      <NavbarminiP name="Travel Companies" />

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Explore Travel Companies
        </h1>

        {/* Companies List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.length > 0 ? (
            companies.map((company) => (
              <div
                key={company._id}
                role="button"
                aria-label={`Navigate to ${company.username || company.name}`}
                onClick={() =>
                  navigate(
                    company.username.replace(/\s+/g, ""),
                    { state: { companyId: company._id, cmpnyName: company.username || company.name } }
                  )
                }
                
                className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-center mb-2">
                  {company.username || company.name}
                </h2>
                <p className="text-sm text-gray-400 text-center flex items-center justify-center gap-2">
  Click to explore
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>
</p>
  </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No companies found. Please check back later!
            </p>
          )}
        </div>

        {/* Nested Routes Rendered Here */}
        <div className="mt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TravelP;