import React, { useState, useEffect } from "react";
//* Components
import CalendarEvent from "./CalendarEvent";
//* Libs
import { groupOverlappingEvents } from "../eventLogic";
// import { CalendarProps } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Calendar: React.FC<any> = ({ events }) => {

  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const overlappingEvents = groupOverlappingEvents(events)
  console.log(overlappingEvents)

  return (
    <div className="calendar-container">
      <div></div>
      {overlappingEvents.map((group, index) => (
        <div key={index} className="event-group">
          {group.map((event) => (
            <CalendarEvent
              key={event.id}
              event={event}
              containerWidth={containerWidth / group.length}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;

