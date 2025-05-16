import React from "react";
import data from "../data/sessionData.json";
import ParticipantTrack from "./ParticipantTrack";

const Timeline = () => {
  const { participantArray, start, end } = data;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Session Timeline</h2>
      {participantArray.map((participant) => (
        <ParticipantTrack
          key={participant.participantId}
          participant={participant}
          sessionStart={start}
          sessionEnd={end}
        />
      ))}
    </div>
  );
};

export default Timeline;
