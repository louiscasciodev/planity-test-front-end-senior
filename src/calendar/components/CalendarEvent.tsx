import React from "react";
//* Libs
import { CalendarEventProps } from "../types";

const CalendarEvent: React.FC<CalendarEventProps> = ({
  event,
}) => {
  const { id, start, end } = event;

  // Dynamic style to position the event div as absolute
  const style = {
    top: `${event.startPosition}%`,
    left: `${event.leftPosition}px`,
    width: `${event.containerWidth}px`,
    height: `${event.eventHeight}%`,
  };

  return (
    <div className="event" style={style}>
      <span style={{color: 'red', paddingRight: '10px' }}>{id}</span><span>{start} - {end}</span>
    </div>
  );
};

export default CalendarEvent;
