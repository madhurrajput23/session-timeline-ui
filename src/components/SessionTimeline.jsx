import { useState } from "react";
import ParticipantTimeline from "./ParticipantTimeline";
import TimeScale from "./TimeScale";

const SessionTimeline = ({ sessionData }) => {
  const [showParticipantTimeline, setShowParticipantTimeline] = useState(true);

  // Calculate session start and end times
  const startTime = new Date(sessionData.start);
  const endTime = new Date(sessionData.end);

  // Generate time markers for the scale
  const generateTimeMarkers = () => {
    const markers = [];
    const currentTime = new Date(startTime);

    // Calculate appropriate interval based on session duration
    const sessionDuration = endTime - startTime;
    const intervalMinutes = sessionDuration > 1000 * 60 * 30 ? 2 : 1; // Use 2-minute intervals for longer sessions

    while (currentTime <= endTime) {
      markers.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }

    return markers;
  };

  const timeMarkers = generateTimeMarkers();

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          <h1 className="text-lg font-medium">
            Participants wise Session Timeline
          </h1>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Show participant timeline</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showParticipantTimeline}
              onChange={() =>
                setShowParticipantTimeline(!showParticipantTimeline)
              }
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <TimeScale timeMarkers={timeMarkers} />

          <div className="mt-4">
            {sessionData.participantArray.map((participant) => (
              <ParticipantTimeline
                key={participant.participantId}
                participant={participant}
                startTime={startTime}
                endTime={endTime}
                timeMarkers={timeMarkers}
                showTimeline={showParticipantTimeline}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeline;
