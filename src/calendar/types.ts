export interface Event {
  id: number;
  start: string;
  duration: number;
}

export interface CalendarProps {
  events: Event[];
}

export interface CalendarEventProps {
  event: Event;
  containerWidth: number;
}
