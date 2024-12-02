import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbarmini from './Navbarmini';

export default function Rootes() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        {/* ----------------------------------nav--------------------------------- */}
        <Navbarmini name="Rootes"/>

        {/* Main Body */}
        <div style={{
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none', /* IE 10+ */
  }}  className="p-5 m-auto overflow-auto h-[30rem]  pt-[5rem] w-fit px-20 backdrop-blur-sm bg-white/10 py-24 shadow-lg shadow-black text-white rounded-md">
          {/* Buttons */}
          <div className="lg:flex min-[315px]:flex-row gap-8 justify-center">
            <div onClick={() => navigate('FaisalMovers')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Faisal Movers</p>
            </div>
            <div onClick={() => navigate('DaewooExpress')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Daewoo Express</p>
            </div>
            <div onClick={() => navigate('RoadMaster')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Road Master</p>
            </div>
            <div onClick={() => navigate('NiaziExpress')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Niazi Express</p>
            </div>
            <div onClick={() => navigate('QConnect')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Q Connect</p>
            </div>
            <div onClick={() => navigate('Skyways')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Skyways</p>
            </div>
            <div onClick={() => navigate('WaraichExpress')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Waraich Express</p>
            </div>
          </div>

          {/* Nested Routes Rendered Here */}
          <Outlet />
         
        </div>
      </div>
    </div>
  );
}
