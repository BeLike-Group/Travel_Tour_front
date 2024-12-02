/* eslint-disable no-unused-vars */
import React from "react";

import backpic from "./Pics/Signuppics/signUpback3.jpg";
import { Routes, Route } from "react-router-dom";

import PassengerProfile from "./Passenger/PassengerProfile";
import SidebarP from "./Passenger/SidebarP";
import TravelP from "./Passenger/TravelP";
import HotelP from "./Passenger/HotelP";
import DetailsP from "./Passenger/DetailsP";
// import Rootes_RoomP from './Passenger/Rootes_RoomP';
import RootesP from "./Passenger/RootesP";
import RoomP from "./Passenger/RoomP";

export default function DashBoardPassenger() {
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
        <SidebarP
          type="Passenger"
          prp1="Travel"
          prp2="Hotel"
          prp3="Details"
          prp4="Logout"
        />

        {/* -------------------------main Contanier---------------- */}
        <div className="flex-1 ">
          <Routes>
            <Route path="passenger" element={<PassengerProfile />} />

            <Route path="travelP/*" element={<TravelP />}>
              <Route
                path="destinationbagpacker"
                element={
                  <RootesP
                    companyId="67498d5b87abc9c7356f7996"
                    cmpnyName="Destination Bag Packer"
                  />
                }
              />
              {/* <Route
                path="devo"
                element={
                  <RootesP
                    companyId="67481a3a576314f41b0870cd"
                    cmpnyName="Devo"
                  />
                }
              />
              <Route
                path="faisal mover"
                element={
                  <RootesP
                    companyId="67481a5d576314f41b0870d4"
                    cmpnyName="Faisal Mover"
                  />
                }
              /> */}
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
              <Route
                path="Gilgit_Serena_Hotel"
                element={
                  <RoomP
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
                  <RoomP
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
                  <RoomP
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
                  <RoomP
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
                  <RoomP
                    cmpnyName="Quetta Serena Hotel"
                    rt1="Room56"
                    rt2="Room78"
                    rt3="Room73"
                  />
                }
              />
            </Route>
            <Route path="detailsP" element={<DetailsP />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
