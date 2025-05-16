import React from "react";
import EventMarker from "./EventMarker";
import { getRelativePosition, formatTime } from "../utils/timeUtils";
import { FaMicrophone, FaVideo, FaExclamationTriangle } from "react-icons/fa";

const TRACK_WIDTH = 800;

const ParticipantTrack = ({ participant, sessionStart, sessionEnd }) => {
  return (
    <div className="border-b py-4 relative">
      <p className="font-medium mb-1">{participant.name}</p>
      <div
        className="relative h-10 bg-gray-100 rounded overflow-hidden w-full"
        style={{ width: TRACK_WIDTH }}
      >
        {/* Join/Leave */}
        {participant.timelog.map((log, index) => {
          const left = getRelativePosition(
            sessionStart,
            sessionEnd,
            log.start,
            TRACK_WIDTH
          );
          const width =
            getRelativePosition(
              sessionStart,
              sessionEnd,
              log.end,
              TRACK_WIDTH
            ) - left;
          return (
            <div
              key={index}
              className="absolute top-1 bg-blue-400 h-3 rounded"
              style={{ left, width }}
            />
          );
        })}

        {/* Mic Events */}
        {participant.events?.mic?.map((mic, index) => (
          <EventMarker
            key={`mic-${index}`}
            left={getRelativePosition(
              sessionStart,
              sessionEnd,
              mic.start,
              TRACK_WIDTH
            )}
            icon={<FaMicrophone className="text-green-600" />}
            tooltip={`Mic On: ${formatTime(mic.start)}`}
          />
        ))}

        {/* Webcam Events */}
        {participant.events?.webcam?.map((cam, index) => (
          <EventMarker
            key={`cam-${index}`}
            left={getRelativePosition(
              sessionStart,
              sessionEnd,
              cam.start,
              TRACK_WIDTH
            )}
            icon={<FaVideo className="text-blue-600" />}
            tooltip={`Video On: ${formatTime(cam.start)}`}
          />
        ))}

        {/* Error Events */}
        {participant.events?.errors?.map((err, index) => (
          <EventMarker
            key={`err-${index}`}
            left={getRelativePosition(
              sessionStart,
              sessionEnd,
              err.start,
              TRACK_WIDTH
            )}
            icon={<FaExclamationTriangle className="text-red-600" />}
            tooltip={err.message}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantTrack;
