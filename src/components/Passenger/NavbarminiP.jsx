import React from "react";

export default function NavbarminiP(props) {
  return (
    <nav className="bg-gradient-to-r from-gray-800 via-black to-gray-900 px-6 py-4 shadow-md shadow-black/50 rounded-lg flex items-center justify-between text-white">
      {/* Welcome Section */}
      <div className="flex items-center gap-2">
        <div className="text-lg font-semibold">Welcome,</div>
        <div className="text-xl font-bold">{props.name}</div>
      </div>

      {/* Profile Picture Placeholder */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
          {/* Placeholder for a profile picture */}
          <span className="text-sm font-medium text-gray-300">Pic</span>
        </div>
      </div>
    </nav>
  );
}
