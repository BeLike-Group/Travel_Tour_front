/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import backpic from "./Pics/Signuppics/signUpback3.jpg";
import Sidebar from "../Sidebar";
import AdminProfile from "./Admin/AdminProfile";
import Booking from "./Admin/AdminBookings"
import TravelCompany from "./Admin/TravelCompany";
import Rootes from "./Admin/Rootes";
import Hotels from "./Admin/Hotels";
import Room from "./Admin/Room";
import Passenger from "./Admin/Passenger";
import Rootes_Room from "./Admin/Rootes_Room";
// import Bookings from "./Admin/Bookings"; // Import Bookings Component

export default function DashBoard() {
  return (
    <>
      {/* Background Image */}
      
      {/* Main Container */}
      <div className="flex flex-col md:flex-row h-screen opacity-1">
        {/* Sidebar */}
        <Sidebar
          type="Admin"
          prp1="Travel Company"
          prp3="Hotels"
          prp5="Passengers"
          prp6="Bookings" // Add Bookings Button
          prp7="Logout"
        />

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="admin" element={<AdminProfile />} />
            <Route path="bookings" element={<Booking />} />

            <Route path="travelCompany" element={<TravelCompany />} />
            <Route path="rootes/*" element={<Rootes />}>


              {/* Nested Routes for Rootes */}
              <Route
                path="FaisalMovers"
                element={
                  <Rootes_Room
                    cmpnyName="Faisal Movers"
                    rt1="Lahore to Islamabad"
                    rt2="Lahore to Faisalabad"
                    rt3="Lahore to Peshawar"
                  />
                }
              />
              <Route
                path="DaewooExpress"
                element={
                  <Rootes_Room
                    cmpnyName="Daewoo Express"
                    rt1="Lahore to Rawalpindi"
                    rt2="Multan to Faisalabad"
                    rt3="Sahiwal to Peshawar"
                  />
                }
              />
              <Route
                path="RoadMaster"
                element={
                  <Rootes_Room
                    cmpnyName="Road Master"
                    rt1="Lahore to Arifwala"
                    rt2="Atak to Faisalabad"
                    rt3="Quetta to Peshawar"
                  />
                }
              />
              <Route
                path="NiaziExpress"
                element={
                  <Rootes_Room
                    cmpnyName="Niazi Express"
                    rt1="Lahore to Islamabad"
                    rt2="Lahore to Faisalabad"
                    rt3="Lahore to Peshawar"
                  />
                }
              />
              <Route
                path="QConnect"
                element={
                  <Rootes_Room
                    cmpnyName="Q Connect"
                    rt1="Lahore to Vehari"
                    rt2="Burewala to Faisalabad"
                    rt3="Gaggo to Peshawar"
                  />
                }
              />
              <Route
                path="Skyways"
                element={
                  <Rootes_Room
                    cmpnyName="Skyways"
                    rt1="Lahore to Skardu"
                    rt2="Lahore to Okara"
                    rt3="Lahore to Karachi"
                  />
                }
              />
              <Route
                path="WaraichExpress"
                element={
                  <Rootes_Room
                    cmpnyName="Waraich Express"
                    rt1="Lahore to Sukkur"
                    rt2="Lahore to Faisalabad"
                    rt3="Lahore to Peshawar"
                  />
                }
              />
            </Route>
            <Route path="hotels" element={<Hotels />} />
            <Route path="rooms/*" element={<Room />}>
              {/* Nested Routes for Rooms */}
              <Route
                path="Hunza_Serena_Inn"
                element={
                  <Rootes_Room
                    cmpnyName="Hunza Serena Inn"
                    rt1="Room3"
                    rt2="Room5"
                    rt3="Room4"
                  />
                }
              />
              <Route
                path="Islamabad_Serena_Hotel"
                element={
                  <Rootes_Room
                    cmpnyName="Islamabad Serena Hotel"
                    rt1="Room11"
                    rt2="Room112"
                    rt3="Room34"
                  />
                }
              />
              <Route
                path="Gilgit_Serena_Hotel"
                element={
                  <Rootes_Room
                    cmpnyName="Gilgit Serena Hotel"
                    rt1="Room17"
                    rt2="Room147"
                    rt3="Room97"
                  />
                }
              />
              <Route
                path="Faisalabad_Serena_Hotel"
                element={
                  <Rootes_Room
                    cmpnyName="Faisalabad Serena Hotel"
                    rt1="Room1167"
                    rt2="Room114"
                    rt3="Room193"
                  />
                }
              />
              <Route
                path="Serena_Khaplu_Palace"
                element={
                  <Rootes_Room
                    cmpnyName="Serena Khaplu Palace"
                    rt1="Room52"
                    rt2="Room78"
                    rt3="Room190"
                  />
                }
              />
              <Route
                path="Swat_Serena_Hotel"
                element={
                  <Rootes_Room
                    cmpnyName="Swat Serena Hotel"
                    rt1="Room83"
                    rt2="Room94"
                    rt3="Room96"
                  />
                }
              />
              <Route
                path="Quetta_Serena_Hotel"
                element={
                  <Rootes_Room
                    cmpnyName="Quetta Serena Hotel"
                    rt1="Room56"
                    rt2="Room78"
                    rt3="Room73"
                  />
                }
              />
            </Route>
            <Route path="passengers" element={<Passenger />} />
            
            {/* <Route path="bookings" element={<Bookings />} /> New Route */}
          </Routes>
        </div>
      </div>
    </>
  );
}
