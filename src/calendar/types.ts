// Represents a raw event with an identifier, start time, and duration
export interface Event {
  id: number;
  start: string; // Format "HH:mm"
  duration: number; // In minutes
}

// Represents a rendered event with additional properties for rendering
export interface RenderedEvent extends Event {
  end?: string; // Calculated end time in "HH:mm" format
  containerWidth?: number; // Width of the event container as a percentage
  startPosition?: number; // Start position of the event as a percentage
  leftPosition?: number; // Left position of the event as a percentage
  eventHeight?: number; // Height of the event as a percentage
}

// Props for the Calendar component
export interface CalendarProps {
  events: Event[]; // Array of raw events
}

// Props for a rendered calendar event
export interface CalendarEventProps {
  event: RenderedEvent; // Rendered event
  containerWidth: number; // Width of the event container as a percentage
}