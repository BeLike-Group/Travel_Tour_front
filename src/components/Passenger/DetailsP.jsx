import React from 'react'
import NavbarminiP from './NavbarminiP'
import visa from  './pics/visa.png'
import jazzCash from './pics/jazzcash.png'
import hbl from './pics/Hbl.png'
import easypaisa from './pics/easyPaisa.png'
import DetailsPayment from './DetailsPayment'
export default function DetailsP() {
  return (
    <div className='bg-slate-950'>
     {/* Navbar */}
     <NavbarminiP name="Payments" />
     {/* -------------------------Pyment page--------------------------- */}
     <div
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        className="p-5 m-auto overflow-auto h-[30rem] pt-[5rem] w-fit px-20 backdrop-blur-sm bg-white/10 py-24 shadow-lg shadow-black text-white rounded-md"
      >
        <p className='text-xl text-white font-semibold'>Choose a Payment Method </p>
        {/* ----------------------Payment box 1-------------------- */}
        
        <DetailsPayment name="Pay via Credit / Debit (ATM) Card" discount="Rs. 200 OFF" pic={visa}/>
        <DetailsPayment name="JazzCash Mobile Wallet" discount="Rs. 150 OFF" pic={jazzCash}/>
        <DetailsPayment name="Easypaisa Mobile Wallet" discount="Rs. 100 OFF" pic={easypaisa}/>
        <DetailsPayment name="HBL Direct Transfer" discount="Rs. 250 OFF" pic={hbl}/>
        {/* --------------------------Others payment methods--------------------------- */}
      <div className=' gap-3 mt-4 p-3 m-auto overflow-auto   w-full px-6 backdrop-blur-sm bg-white/10 py-4 shadow-lg shadow-black text-white rounded-md'>
        <p className='text-lg font-semibold'>Bank transfer Details</p> 
        <p className='text-sm font-semibold'>Bank transfer Details : 1060038503</p> 
        <p className='text-sm font-semibold'>Account Title: Belike</p> 
        <p className='text-sm font-semibold'>Bank: Habib Bank Ltd (Garden Town Branch)</p> 
        <p className='text-sm font-semibold'>IBAN: PK68 HABB 0010607901038503</p> 
        <p className='text-sm '>
        After transferring Rs. 5,800, please take a screenshot of the<br/>  completedtransaction and send it to 03000647873 via WhatsApp.
        </p>
        </div>
        
        

        
      </div>
    </div>
  )
}
