import React from "react";
import NavbarminiP from "./NavbarminiP";
import visa from "./pics/visa.png";
import jazzCash from "./pics/jazzcash.png";
import hbl from "./pics/Hbl.png";
import easypaisa from "./pics/easyPaisa.png";
import DetailsPayment from "./DetailsPayment";

export default function DetailsP() {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-black to-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <NavbarminiP name="Payments" />

      {/* Payment Section */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Choose a Payment Method</h1>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <DetailsPayment
            name="Pay via Credit / Debit (ATM) Card"
            discount="Rs. 200 OFF"
            pic={visa}
          />
          <DetailsPayment
            name="JazzCash Mobile Wallet"
            discount="Rs. 150 OFF"
            pic={jazzCash}
          />
          <DetailsPayment
            name="Easypaisa Mobile Wallet"
            discount="Rs. 100 OFF"
            pic={easypaisa}
          />
          <DetailsPayment
            name="HBL Direct Transfer"
            discount="Rs. 250 OFF"
            pic={hbl}
          />
        </div>

        {/* Other Payment Methods */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bank Transfer Details</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Account Number:</strong> 1060038503
            </li>
            <li>
              <strong>Account Title:</strong> Belike
            </li>
            <li>
              <strong>Bank:</strong> Habib Bank Ltd (Garden Town Branch)
            </li>
            <li>
              <strong>IBAN:</strong> PK68 HABB 0010607901038503
            </li>
          </ul>
          <p className="mt-4 text-sm">
            After transferring Rs. 5,800, please take a screenshot of the completed transaction and send it to <strong>03000647873</strong> via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
