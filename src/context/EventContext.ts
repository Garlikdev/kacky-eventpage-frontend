import { createContext } from 'react';

export interface EventContextProps {
  status: string;
  type: string;
  edition: number;
}
// Define your context interface
export type EventContextStateProps = {
  // Add event and setEvent properties
  event: EventContextProps;
  setEvent: React.Dispatch<React.SetStateAction<EventContextProps>>;
};

const defaultAuthState: EventContextStateProps = {
  event: { status: '', type: '', edition: 0 },
  setEvent: () => {},
};

const EventContext = createContext<EventContextStateProps>(defaultAuthState); // Initialize with null as a type guard

export default EventContext;
