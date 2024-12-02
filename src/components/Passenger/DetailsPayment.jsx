import React from 'react'

export default function DetailsPayment(props) {
  return (
    <div>
      {/* ----------------------Payment box 3-------------------- */}
      <div className='flex gap-3 mt-4 p-3 m-auto overflow-auto   w-full px-6 backdrop-blur-sm bg-white/10 py-4 shadow-lg shadow-black text-white rounded-md'>
          <div>
            <img src={props.pic} alt="" className='rounded-full shadow-sm shadow-black h-12'/>
          </div>
          <div>
            <p>{props.name}</p>
            <p>{props.discount}</p>
          </div>
        </div>
    </div>
  )
}
