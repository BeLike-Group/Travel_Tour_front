/* eslint-disable no-unused-vars */
import React from "react";

import backpic from "./Pics/Signuppics/signUpback3.jpg";

import { Routes, Route } from "react-router-dom";
import TravelProfile from "./Travel/TravelProfile";
import SidebarT from "./Travel/SidebarT";
import RootesT from "./Travel/RootesT";

export default function DashBoardTravel() {
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
        <SidebarT type="Travel" prp1="Rootes" prp2="Logout" />

        {/* -------------------------main Contanier---------------- */}
        <div className="flex-1 ">
          <Routes>
            <Route path="travel" element={<TravelProfile />} />
            <Route path="RootesT" element={<RootesT />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
