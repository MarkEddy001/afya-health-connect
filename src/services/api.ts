
import { db } from '../data/db';
import { Program, Client } from '../data/models';

// API service to simulate real API calls
export const api = {
  // Program endpoints
  getPrograms: async (): Promise<Program[]> => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return db.getAllPrograms();
  },

  getProgram: async (id: number): Promise<Program | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return db.getProgramById(id) || null;
  },

  createProgram: async (program: Omit<Program, 'id' | 'createdAt'>): Promise<Program> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return db.createProgram(program);
  },

  // Client endpoints
  getClients: async (): Promise<Client[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return db.getAllClients();
  },

  getClient: async (id: number): Promise<Client | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return db.getClientById(id);
  },

  createClient: async (client: Omit<Client, 'id' | 'enrolledPrograms' | 'createdAt'>): Promise<Client> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return db.createClient(client);
  },

  searchClients: async (searchTerm: string): Promise<Client[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return db.searchClients(searchTerm);
  },

  // Enrollment endpoints
  enrollClient: async (clientId: number, programId: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return db.enrollClientInProgram(clientId, programId);
  },

  removeEnrollment: async (clientId: number, programId: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return db.removeClientFromProgram(clientId, programId);
  }
};
