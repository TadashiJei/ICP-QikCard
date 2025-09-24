// Mock ICP Event Canister declarations
export const eventCanister = {
  createEvent: async (event: any) => ({ ok: { id: 'mock-event-id' } }),
  getEvent: async (id: string) => ({ ok: { id, title: 'Mock Event' } }),
  updateEvent: async (id: string, event: any) => ({ ok: true }),
  deleteEvent: async (id: string) => ({ ok: true }),
  getEventsByOrganizer: async (organizerId: string) => ({ ok: [] }),
};

export default eventCanister;
