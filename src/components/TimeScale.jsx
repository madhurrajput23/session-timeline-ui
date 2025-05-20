const TimeScale = ({ timeMarkers }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    // <div className="flex border-b border-gray-700 pb-2">
    //   <div className="w-64 flex-shrink-0"></div>
    //   <div className="flex-grow flex justify-between">
    //     {timeMarkers.map((time, index) => (
    //       <div key={index} className="text-xs text-gray-400">
    //         {formatTime(time)}
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="relative border border-gray-800 py-2 h-10 px-0">
      {/* Time markers */}
      <div className="flex justify-between w-full">
        {timeMarkers.map((time, index) => (
          <div key={index} className="text-xs text-gray-400">
            {formatTime(time)}
          </div>
        ))}
      </div>

      {/* Vertical grid lines */}
      <div className="absolute top-10 left-0 right-0 h-screen">
        {timeMarkers.map((time, index) => (
          <div
            key={index}
            className="absolute top-0 w-px h-full bg-gray-800"
            style={{
              left: `${(index / (timeMarkers.length - 1)) * 100}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TimeScale;
