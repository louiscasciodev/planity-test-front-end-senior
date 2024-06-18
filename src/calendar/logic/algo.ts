import { getEventStartTime } from "./pureFunctions";
import { reshapeEvent, getOverlappingGroup, calculateContainerWidth, calculateLeftPosition } from "./utils";
import { Event, RenderedEvent } from "../types";

// Main function to group overlapping events
export const groupOverlappingEvents = (events: Event[], containerWidth: number): RenderedEvent[][] => {
  // Sort the events by start time
  // This ensures that events are processed in the correct order
  const orderedEvents = events.sort((a, b) => getEventStartTime(a) - getEventStartTime(b));

  return orderedEvents.reduce((groupedEvents: RenderedEvent[][], event: Event) => {
    const reshapedEvent = reshapeEvent(event);

    // Find the overlapping group for the current event
    const overlappingGroup = getOverlappingGroup(groupedEvents, reshapedEvent);

    if (overlappingGroup) {
      // If an overlapping group exists, add the current event to the group
      overlappingGroup.push(reshapedEvent)

      // Calculate the container width for the overlapping group
      // This ensures that every overlapping event has the same width
      // as every event it overlaps (CONSTRAINT 1)
      const containerWidthResult = calculateContainerWidth(containerWidth, overlappingGroup)

      // Update the properties of the events in the overlapping group
      const updatedGroup = overlappingGroup.map((groupEvent, i) => ({
        ...groupEvent,
        containerWidth: containerWidthResult, // Set the container width for each event
        leftPosition: calculateLeftPosition(containerWidthResult, i, overlappingGroup), // Calculate the left position for each event
      }));

      // Replace the overlapping group in the groupedEvents array with the updated group
      groupedEvents[groupedEvents.indexOf(overlappingGroup)] = updatedGroup;
    } else {
      // If no overlapping group exists, create a new group with the current event
      // This ensures that non-overlapping events use the maximum width available (CONSTRAINT 2)
      groupedEvents.push([
        {
          ...reshapedEvent,
          containerWidth, // Set the container width to the maximum available width
          leftPosition: 0, // Set the left position to 0 for non-overlapping events
        },
      ]);
    }

    return groupedEvents;
  }, []);
}

// CONSTRAINT 1: Every overlapping event should have the same width as every event it overlaps
// This constraint is satisfied by calculating the containerWidth for the overlapping group
// and assigning the same containerWidth to all events in the group.

// CONSTRAINT 2: Every event should use the maximum width available while satisfying constraint 1
// This constraint is satisfied by assigning the maximum available width (containerWidth)
// to non-overlapping events.

// Cost of the algorithm:
// The time complexity of this algorithm is O(n^2), where n is the number of events.
// This is because, in the worst case, all events could overlap, and the algorithm
// needs to check for overlaps between each pair of events.

// The space complexity is O(n), as the algorithm creates new arrays to store the grouped events.

// Potential improvement:
// The time complexity can be improved by using a more efficient algorithm for detecting overlaps,
// such as an interval tree or a sweep line algorithm. These algorithms can detect overlaps
// in O(n log n) time, which would improve the overall time complexity of the grouping algorithm.
// However, these algorithms are more complex to implement and may not be necessary
// for small to medium-sized event sets.