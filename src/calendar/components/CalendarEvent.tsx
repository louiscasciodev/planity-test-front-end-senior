import React from "react";
//* Libs
import { CalendarEventProps } from "../types";

const CalendarEvent: React.FC<CalendarEventProps> = ({
  event,
  containerWidth,
}) => {
  const { id, start, duration } = event;
  const startHour = parseInt(start.split(":")[0], 10);
  const startMinute = parseInt(start.split(":")[1], 10);
  // const endHour = startHour + Math.floor(duration / 60);
  // const endMinute = startMinute + (duration % 60);

  const startPosition = ((startHour * 60 + startMinute) / (24 * 60)) * 100;
  const eventHeight = (duration / (24 * 60)) * 100;

  const style = {
    left: 0,
    width: `${containerWidth}px`,
    top: `${startPosition}%`,
    height: `${eventHeight}%`,
    border: `1px solid black`,
  };
  console.log("containerWidth", containerWidth)
  console.log("startPosition", startPosition)
  console.log("eventHeight", eventHeight)

  return (
    <div className="event" style={style}>
      {id}
    </div>
  );
};

export default CalendarEvent;
