/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";

import SidebarH from "./Hotel/SidebarH";
import RoomH from "./Hotel/RoomH";
import HotelProfile from "./Hotel/HotelProfile";

export default function DashBoardHotel() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('./Pics/Signuppics/signUpback3.jpg')` }}
      ></div>

      {/* Content Overlay */}
      <div className="relative flex flex-col md:flex-row h-screen">
        {/* Sidebar */}
        <SidebarH type="Hotel" prp1="Add Room" prp2="Logout" />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          <Routes>
            <Route path="Hotel" element={<HotelProfile />} />
            <Route path="RoomH" element={<RoomH />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
