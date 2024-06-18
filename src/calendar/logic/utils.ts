import { Event, RenderedEvent } from "../types";
import { isOverlapping } from "./pureFunctions";

// Function to reshape an event object with additional properties
export const reshapeEvent = (event: Event): RenderedEvent => {
  const { start, duration } = event;
  const startHour = parseInt(start.split(":")[0], 10);
  const startMinute = parseInt(start.split(":")[1], 10);
  // Calculate the start position based on a 12-hour range (09:00 am to 09:00 pm)
  const startPosition = Math.floor(((startHour * 60 + startMinute - 9 * 60) / (12 * 60)) * 100);

  const endMinutes = startMinute + duration;
  const endHour = startHour + Math.floor(endMinutes / 60);
  const endMinute = endMinutes % 60;

  // Not necessary, but I kept it in order to be able to display it directly in the browser for verification
  const end = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  const eventHeight = Math.floor((duration / (12 * 60)) * 100)

  return {
    ...event,
    end,
    startPosition,
    eventHeight,
  }
}

// Function to find the overlapping group for an event
export const getOverlappingGroup = (groupedEvents: RenderedEvent[][], event: RenderedEvent): RenderedEvent[] | undefined => {
  return groupedEvents.find((group) => group.some((groupEvent) => isOverlapping(event, groupEvent)));
};

// Function to calculate the container width for an overlapping group
export const calculateContainerWidth = (containerWidth: number, overlappingGroup: RenderedEvent[]): number => {
  let nonOverlappingCount = 0;

  // Iterate over the overlapping group to count the number of non-overlapping events
  for (const [index, currentEvent] of overlappingGroup.entries()) {
    const prevEvent = index > 0 ? overlappingGroup[index - 1] : null;
    if (prevEvent && !isOverlapping(prevEvent, currentEvent)) {
      nonOverlappingCount++;
    }
  }

  // Calculate the containerWidth based on the total number of events and non-overlapping events
  const totalEvents = overlappingGroup.length - nonOverlappingCount;
  return containerWidth / totalEvents;
};

// Function to calculate the left position for an event in an overlapping group
export const calculateLeftPosition = (eventWidth: number, index: number, overlappingGroup: RenderedEvent[]): number => {
  const currentEvent = overlappingGroup[index];
  const prevEvent = index > 0 ? overlappingGroup[index - 1] : null;

  if(!prevEvent) return 0
  if (!isOverlapping(prevEvent, currentEvent)) {
    // If the current event does not overlap with the previous one, they should have the same leftPosition
    return eventWidth * (index - 1);
  } else {
    return eventWidth * index;
  }
};