/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../Sidebar";
import AdminProfile from "./Admin/AdminProfile";
import Booking from "./Admin/AdminBookings";
import TravelCompany from "./Admin/TravelCompany";
import Rootes from "./Admin/Rootes";
import Hotels from "./Admin/Hotels";
import Room from "./Admin/Room";
import Passenger from "./Admin/Passenger";
import Rootes_Room from "./Admin/Rootes_Room";
import AdminRoomBookings from './Admin/AdminRoomBooking';


export default function DashBoard() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        type="Admin"
        prp1="Travel Company"
        prp3="Hotels"
        prp5="Passengers"
        prp6="Bookings"
        prp7="Room Bookings"
        prp8="Logout"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <Routes>
          {/* Admin Dashboard */}
          <Route path="admin" element={<AdminProfile />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="travelCompany" element={<TravelCompany />} />
          <Route path="bookingroom" element={<AdminRoomBookings/>} />

          {/* Routes Section */}
          <Route path="rootes/*" element={<Rootes />}>
            {[
              { name: "FaisalMovers", cmpnyName: "Faisal Movers", rt1: "Lahore to Islamabad", rt2: "Lahore to Faisalabad", rt3: "Lahore to Peshawar" },
              { name: "DaewooExpress", cmpnyName: "Daewoo Express", rt1: "Lahore to Rawalpindi", rt2: "Multan to Faisalabad", rt3: "Sahiwal to Peshawar" },
              { name: "RoadMaster", cmpnyName: "Road Master", rt1: "Lahore to Arifwala", rt2: "Atak to Faisalabad", rt3: "Quetta to Peshawar" },
              { name: "NiaziExpress", cmpnyName: "Niazi Express", rt1: "Lahore to Islamabad", rt2: "Lahore to Faisalabad", rt3: "Lahore to Peshawar" },
              { name: "QConnect", cmpnyName: "Q Connect", rt1: "Lahore to Vehari", rt2: "Burewala to Faisalabad", rt3: "Gaggo to Peshawar" },
              { name: "Skyways", cmpnyName: "Skyways", rt1: "Lahore to Skardu", rt2: "Lahore to Okara", rt3: "Lahore to Karachi" },
              { name: "WaraichExpress", cmpnyName: "Waraich Express", rt1: "Lahore to Sukkur", rt2: "Lahore to Faisalabad", rt3: "Lahore to Peshawar" },
            ].map(({ name, cmpnyName, rt1, rt2, rt3 }) => (
              <Route
                key={name}
                path={name}
                element={<Rootes_Room cmpnyName={cmpnyName} rt1={rt1} rt2={rt2} rt3={rt3} />}
              />
            ))}
          </Route>

          {/* Hotels Section */}
          <Route path="hotels" element={<Hotels />} />
          <Route path="rooms/*" element={<Room />}>
            {[
              { name: "Hunza_Serena_Inn", cmpnyName: "Hunza Serena Inn", rt1: "Room3", rt2: "Room5", rt3: "Room4" },
              { name: "Islamabad_Serena_Hotel", cmpnyName: "Islamabad Serena Hotel", rt1: "Room11", rt2: "Room112", rt3: "Room34" },
              { name: "Gilgit_Serena_Hotel", cmpnyName: "Gilgit Serena Hotel", rt1: "Room17", rt2: "Room147", rt3: "Room97" },
              { name: "Faisalabad_Serena_Hotel", cmpnyName: "Faisalabad Serena Hotel", rt1: "Room1167", rt2: "Room114", rt3: "Room193" },
              { name: "Serena_Khaplu_Palace", cmpnyName: "Serena Khaplu Palace", rt1: "Room52", rt2: "Room78", rt3: "Room190" },
              { name: "Swat_Serena_Hotel", cmpnyName: "Swat Serena Hotel", rt1: "Room83", rt2: "Room94", rt3: "Room96" },
              { name: "Quetta_Serena_Hotel", cmpnyName: "Quetta Serena Hotel", rt1: "Room56", rt2: "Room78", rt3: "Room73" },
            ].map(({ name, cmpnyName, rt1, rt2, rt3 }) => (
              <Route
                key={name}
                path={name}
                element={<Rootes_Room cmpnyName={cmpnyName} rt1={rt1} rt2={rt2} rt3={rt3} />}
              />
            ))}
          </Route>

          {/* Passengers Section */}
          <Route path="passengers" element={<Passenger />} />
        </Routes>
      </div>
    </div>
  );
}
