/* eslint-disable no-unused-vars */
import React from "react";

import backpic from "./Pics/Signuppics/signUpback3.jpg";

import { Routes, Route } from "react-router-dom";

import SidebarH from "./Hotel/SidebarH";
import RoomH from "./Hotel/RoomH";
import HotelProfile from "./Hotel/HotelProfile";

export default function DashBoardHotel() {
  return (
    <>
      {/* ----------------------------img background------------------- */}

      <div className="">
        <img
          src={backpic}
          alt=""
          className=" h-screen w-screen absolute opacity-1 "
        />
      </div>
      {/* ---------------front------------------ */}
      <div className="flex flex-col md:flex-row h-screen opacity-1">
        {/* ----------------------------sidebar------------------------- */}
        <SidebarH type="Hotel" prp1="Add Room" prp2="Logout" />

        {/* -------------------------main Contanier---------------- */}
        <div className="flex-1 ">
          <Routes>
            <Route path="Hotel" element={<HotelProfile />} />
            <Route path="RoomH" element={<RoomH />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
