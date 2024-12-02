import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Navbarmini from './Navbarmini';

export default function Room() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        {/* ----------------------------------nav--------------------------------- */}
        <Navbarmini name="Room"/>

        {/* Main Body */}
        <div style={{
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none', /* IE 10+ */
  }}  className="p-5 m-auto overflow-auto h-[30rem]  pt-[5rem] w-fit px-20 backdrop-blur-sm bg-white/10 py-24 shadow-lg shadow-black text-white rounded-md">
          {/* Buttons */}
          <div className="lg:flex min-[315px]:flex-row gap-8 justify-center">
            <div onClick={() => navigate('Hunza_Serena_Inn')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Hunza Serena Inn</p>
            </div>
            <div onClick={() => navigate('Islamabad_Serena_Hotel')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Islamabad Serena Hotel</p>
            </div>
            <div onClick={() => navigate('Gilgit_Serena_Hotel')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Gilgit Serena Hotel</p>
            </div>
            <div onClick={() => navigate('Faisalabad_Serena_Hotel')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Faisalabad Serena Hotel</p>
            </div>
            
          </div>
          <div className="lg:flex min-[315px]:flex-row gap-8 justify-center mt-5">
           
           <div onClick={() => navigate('Serena_Khaplu_Palace')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Serena Khaplu Palace</p>
            </div>
            <div onClick={() => navigate('Swat_Serena_Hotel')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Swat Serena Hotel</p>
            </div>
            <div onClick={() => navigate('Quetta_Serena_Hotel')} className="text-center p-2 bg-transparent rounded-2xl cursor-pointer shadow-sm shadow-black/50 hover:shadow-black">
              <p className="text-sm">Quetta Serena Hotel</p>
            </div>
          </div>

          {/* Nested Routes Rendered Here */}
          <Outlet />
         
        </div>
      </div>
    </div>
  )
}
