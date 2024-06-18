import { Event } from "../types";

// Function to get the start time of an event in minutes
export const getEventStartTime = (event: Event): number => {
  const [startHour, startMinute] = event.start.split(":").map(Number);
  return startHour * 60 + startMinute;
};

// Function to get the end time of an event in minutes
export const getEventEndTime = (event: Event): number => {
  const [startHour, startMinute] = event.start.split(":").map(Number);
  const endHour = startHour + Math.floor(event.duration / 60);
  const endMinute = startMinute + (event.duration % 60);
  return endHour * 60 + endMinute;
};

// Function to check if two events overlap
export const isOverlapping = (event1: Event, event2: Event): boolean => {
  const event1Start = getEventStartTime(event1);
  const event1End = getEventEndTime(event1);
  const event2Start = getEventStartTime(event2);
  const event2End = getEventEndTime(event2);

  return (
    (event1Start < event2End && event1End > event2Start) ||
    (event2Start < event1End && event2End > event1Start)
  );
};