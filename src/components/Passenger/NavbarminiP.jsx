import React from 'react'

export default function NavbarminiP(props) {
    return (
        <div>
        {/* ----------------------------------nav--------------------------------- */}
        <div className='flex m-auto backdrop-blur-sm bg-white/10 lg:gap-[20rem] min-[425px]:gap-[6rem] p-7  my-5  w-fit px-4 py-2 shadow-md shadow-black/40 text-white rounded-md '>
            <div>Welcome</div>
            <div>{props.name}</div>
            <div>Pic</div>
          </div>
      </div>
      )
    }
