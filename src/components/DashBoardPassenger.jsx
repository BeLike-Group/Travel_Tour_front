import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import backpic from "./Pics/Signuppics/signUpback3.jpg";
import SidebarP from "./Passenger/SidebarP";
import PassengerProfile from "./Passenger/PassengerProfile";
import TravelP from "./Passenger/TravelP";
import HotelP from "./Passenger/HotelP";
import DetailsP from "./Passenger/DetailsP";
import RootesP from "./Passenger/RootesP";
import RoomP from "./Passenger/RoomP";
import { FaBars } from "react-icons/fa";
import { FaSearch, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function DashBoardPassenger() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { companyId, cmpnyName } = location.state || {}; // Default to an empty object in case no state is passed

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white">
      {/* Background Image */}
      <img
        src={backpic}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover -z-10"
      />

      {/* Header */}
      <header className="flex items-center justify-between bg-gray-800 px-4 py-3 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </header>

      {/* Layout */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div
          className={`fixed md:relative bg-gradient-to-br from-gray-900 to-gray-700 w-64 md:w-72 h-full z-40 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <SidebarP
            type="Passenger"
            prp1="Travel"
            prp2="Hotel"
            prp3="Details"
            prp4="Logout"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto transition-all duration-300">
          <div className="p-6">
            {/* Filter Section */}
<div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-white">Search for Travel</h2>
  <div className="flex flex-col md:flex-row items-center gap-4">
    {/* From */}
    <div className="flex items-center bg-gray-700 rounded-lg p-2 w-full md:w-1/4">
      <FaLocationArrow className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="From"
        className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
      />
    </div>

    {/* To */}
    <div className="flex items-center bg-gray-700 rounded-lg p-2 w-full md:w-1/4">
      <FaLocationArrow className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="To"
        className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
      />
    </div>

    {/* Date */}
    <div className="flex items-center bg-gray-700 rounded-lg p-2 w-full md:w-1/4">
      <FaCalendarAlt className="text-gray-400 mr-2" />
      <input
        type="date"
        className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
      />
    </div>

    {/* Search Button */}
    <button className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-lg w-full md:w-auto">
      <FaSearch className="mr-2" />
      Search
    </button>
  </div>
</div>


            {/* Routes */}
            <Routes>
              <Route path="passenger" element={<PassengerProfile />} />
              <Route path="travelP/*" element={<TravelP />}>
                <Route
                  path={cmpnyName}
                  element={
                    <RootesP
                      companyId={companyId}
                      cmpnyName={cmpnyName}
                    />
                  }
                />
              </Route>

              <Route path="hotelP/*" element={<HotelP />}>
                <Route
                  path="fourseasonhotel"
                  element={
                    <RoomP
                      hotelId="67481ac0576314f41b0870df"
                      hotelName="Four Season Hotel"
                    />
                  }
                />
                <Route
                  path="shangri-la hotel"
                  element={
                    <RoomP
                      hotelId="67481afc576314f41b0870e6"
                      hotelName="Shangri-La Hotel"
                    />
                  }
                />
                <Route
                  path="waldorf astoria"
                  element={
                    <RoomP
                      hotelId="67481ba0576314f41b0870fd"
                      hotelName="Waldrof Astoria"
                    />
                  }
                />
              </Route>
              <Route path="detailsP" element={<DetailsP />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
