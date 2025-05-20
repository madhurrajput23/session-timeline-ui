import { useState } from "react";
import {
  MicrophoneIcon,
  MicrophoneOffIcon,
  VideoIcon,
  VideoOffIcon,
  ErrorIcon,
  JoinIcon,
  LeaveIcon,
} from "./Icons";

const TimelineEvent = ({ type, position, time, status, error }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getEventIcon = () => {
    switch (type) {
      case "microphone":
        return status === "on" ? <MicrophoneIcon /> : <MicrophoneOffIcon />;
      case "video":
        return status === "on" ? <VideoIcon /> : <VideoOffIcon />;
      case "error":
        return <ErrorIcon />;
      case "join":
        return <JoinIcon />;
      case "leave":
        return <LeaveIcon />;
      default:
        return null;
    }
  };

  const getEventColor = () => {
    switch (type) {
      case "microphone":
        return status === "on" ? "bg-blue-500" : "bg-gray-500";
      case "video":
        return status === "on" ? "bg-blue-500" : "bg-gray-500";
      case "error":
        return "bg-red-500";
      case "join":
        return "bg-blue-500";
      case "leave":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
      style={{ left: `${position}%` }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${getEventColor()}`}
      >
        {getEventIcon()}
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded p-2 whitespace-nowrap z-10">
          <div>
            {type.charAt(0).toUpperCase() + type.slice(1)} {status}
          </div>
          <div>{formatTime(time)}</div>
          {error && <div className="text-red-400">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default TimelineEvent;
