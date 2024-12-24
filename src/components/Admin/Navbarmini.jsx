import React from 'react'

export default function Navbarmini(props) {
  return (
    <div>
    {/* ----------------------------------nav--------------------------------- */}
    <div className='flex m-auto backdrop-blur-sm bg-white/10 lg:gap-[20rem] min-[425px]:gap-[6rem] w-fit px-10 py-6 shadow-md shadow-black/40 text-white rounded-md '>
        <div>Welcome</div>
        <div>{props.name}</div>
        <div>Pic</div>
      </div>
  </div>
  )
}
