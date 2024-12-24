/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import TravelProfile from "./Travel/TravelProfile";
import SidebarT from "./Travel/SidebarT";
import RootesT from "./Travel/RootesT";

export default function DashBoardTravel() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <SidebarT type="Travel" prp1="Routes" prp2="Logout" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Container */}
        <div className="p-6 bg-gray-800 h-full rounded-tl-md shadow-lg">
          <Routes>
            <Route path="travel" element={<TravelProfile />} />
            <Route path="RootesT" element={<RootesT />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
