import React from "react";

const EventMarker = ({ left, icon, tooltip }) => (
  <div className="absolute -top-1" style={{ left }}>
    <div className="group relative w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 border border-gray-600">
      {icon}
      <div className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-50">
        {tooltip}
      </div>
    </div>
  </div>
);
export default EventMarker;
