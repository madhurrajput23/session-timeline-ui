export const toMilliseconds = (timestamp) => new Date(timestamp).getTime();

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getRelativePosition = (
  sessionStart,
  sessionEnd,
  current,
  width
) => {
  const total = toMilliseconds(sessionEnd) - toMilliseconds(sessionStart);
  const position = toMilliseconds(current) - toMilliseconds(sessionStart);
  return (position / total) * width;
};

export const generateTimeScale = (start, end, stepInMinutes = 1) => {
  const timeArray = [];
  let current = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  while (current <= endMs) {
    timeArray.push(
      new Date(current).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    current += stepInMinutes * 60 * 1000;
  }
  return timeArray;
};
