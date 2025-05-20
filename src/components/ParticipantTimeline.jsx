import { ChevronRight } from "./Icons";
import TimelineEvents from "./TimelineEvents";

const ParticipantTimeline = ({
  participant,
  startTime,
  endTime,
  timeMarkers,
  showTimeline,
}) => {
  // Get the first timelog entry for join time and last for leave time
  const firstTimelog = participant.timelog[0];
  const lastTimelog = participant.timelog[participant.timelog.length - 1];

  const joinTime = new Date(firstTimelog.start);
  const leaveTime = new Date(lastTimelog.end);

  // Calculate duration in minutes
  const duration = Math.floor((leaveTime - joinTime) / (1000 * 60));

  // Format date: "11 July 2024, 11:59"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}, ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  };

  // Calculate position percentage based on time
  const calculatePosition = (eventTime) => {
    const time = new Date(eventTime);
    const totalDuration = endTime - startTime;
    const eventPosition = time - startTime;
    return (eventPosition / totalDuration) * 100;
  };

  // Process all events to create a flat array of timeline events
  const processEvents = () => {
    const events = [];

    // Add join/leave events from timelog
    participant.timelog.forEach((log, index) => {
      events.push({
        type: "join",
        time: log.start,
        position: calculatePosition(log.start),
      });

      events.push({
        type: "leave",
        time: log.end,
        position: calculatePosition(log.end),
      });
    });

    // Add microphone events
    if (participant.events.mic) {
      participant.events.mic.forEach((event) => {
        events.push({
          type: "microphone",
          status: "on",
          time: event.start,
          position: calculatePosition(event.start),
        });

        events.push({
          type: "microphone",
          status: "off",
          time: event.end,
          position: calculatePosition(event.end),
        });
      });
    }

    // Add webcam events
    if (participant.events.webcam) {
      participant.events.webcam.forEach((event) => {
        events.push({
          type: "video",
          status: "on",
          time: event.start,
          position: calculatePosition(event.start),
        });

        events.push({
          type: "video",
          status: "off",
          time: event.end,
          position: calculatePosition(event.end),
        });
      });
    }

    // Add error events if they exist
    if (participant.events.errors) {
      participant.events.errors.forEach((error) => {
        events.push({
          type: "error",
          time: error.start,
          error: error.message,
          position: calculatePosition(error.start),
        });
      });
    }

    return events;
  };

  const timelineEvents = processEvents();

  // Generate segments for the timeline
  const generateTimelineSegments = () => {
    const segments = [];

    participant.timelog.forEach((log, index) => {
      const startPos = calculatePosition(log.start);
      const endPos = calculatePosition(log.end);

      segments.push({
        start: startPos,
        end: endPos,
        active: true,
      });

      // Add gap segment if there's another timelog entry after this one
      if (index < participant.timelog.length - 1) {
        const nextLog = participant.timelog[index + 1];
        const gapStart = calculatePosition(log.end);
        const gapEnd = calculatePosition(nextLog.start);

        segments.push({
          start: gapStart,
          end: gapEnd,
          active: false,
        });
      }
    });

    return segments;
  };

  const timelineSegments = generateTimelineSegments();

  return (
    <div className="mb-6">
      <div className="flex items-start">
        <div className="w-64 flex-shrink-0">
          <div className="font-medium">
            {participant.name} ({participant.participantId})
          </div>
          <div className="text-xs text-gray-400">
            {formatDate(joinTime)} | Duration {duration} Mins
          </div>
        </div>

        <div className="flex-grow relative">
          {showTimeline && (
            <div className="h-8 relative">
              {/* Timeline segments */}
              {timelineSegments.map((segment, index) => (
                <div
                  key={index}
                  className={`absolute top-1/2 h-0.5 ${
                    segment.active
                      ? "bg-blue-600"
                      : "bg-gray-600 border-dashed border-t border-gray-500"
                  }`}
                  style={{
                    left: `${segment.start}%`,
                    width: `${segment.end - segment.start}%`,
                    transform: "translateY(-50%)",
                  }}
                ></div>
              ))}

              {/* Timeline events */}
              {timelineEvents.map((event, index) => (
                <TimelineEvents
                  key={index}
                  type={event.type}
                  position={event.position}
                  time={event.time}
                  status={event.status}
                  error={event.error}
                />
              ))}
            </div>
          )}
        </div>

        <div className="ml-4 flex-shrink-0">
          <button className="text-blue-500 flex items-center text-sm">
            View details
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantTimeline;
