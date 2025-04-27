import { Program, Client, Enrollment } from './models';

// Mock database storage
let programs: Program[] = [
  {
    id: 1,
    name: 'TB Program',
    description: 'Tuberculosis management and treatment program',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Malaria Prevention',
    description: 'Program focused on malaria prevention and treatment',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'HIV Support',
    description: 'Comprehensive HIV support and management program',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Occupation Therapy',
    description: 'Comprehensive O.T support and management program',
    createdAt: new Date().toISOString(),
  },
];

let clients: Client[] = [
  {
    id: 1,
    name: 'John Kiriamiti',
    age: 35,
    gender: 'Male',
    contactNumber: '254-123-4567',
    address: '123 Main St, Nairobi',
    enrolledPrograms: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Jane Wangari',
    age: 42,
    gender: 'Female',
    contactNumber: '254-987-6543',
    address: '456 Kijabe str, Mombasa',
    enrolledPrograms: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Melody Adhiambo',
    age: 25,
    gender: 'Female',
    contactNumber: '254-258-9687',
    address: '777 Maryland str, Kitengela',
    enrolledPrograms: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Reloy Maina',
    age: 29,
    gender: 'Male',
    contactNumber: '254-995-9037',
    address: '114 Uzima Court, Westlands',
    enrolledPrograms: [],
    createdAt: new Date().toISOString(),
  },
];

let enrollments: Enrollment[] = [
  {
    clientId: 1,
    programId: 1,
    enrollmentDate: new Date().toISOString(),
  },
  {
    clientId: 1,
    programId: 3,
    enrollmentDate: new Date().toISOString(),
  },
  {
    clientId: 4,
    programId: 2, // Reloy Maina enrolled in Malaria Prevention
    enrollmentDate: new Date().toISOString(),
  },
];

// Initialize the database with relationships
const initializeDb = () => {
  // Add enrolledPrograms to clients
  clients = clients.map(client => {
    const clientEnrollments = enrollments.filter(e => e.clientId === client.id);
    const enrolledPrograms = clientEnrollments.map(
      enrollment => programs.find(p => p.id === enrollment.programId)!
    ).filter(Boolean);

    return {
      ...client,
      enrolledPrograms
    };
  });
};

// Call initialization
initializeDb();

// Database operations
export const db = {
  // Program operations
  getAllPrograms: () => [...programs],
  
  getProgramById: (id: number) => programs.find(p => p.id === id),
  
  createProgram: (program: Omit<Program, 'id' | 'createdAt'>) => {
    const newProgram: Program = {
      ...program,
      id: programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1,
      createdAt: new Date().toISOString()
    };
    programs.push(newProgram);
    return newProgram;
  },

  // Client operations
  getAllClients: () => clients.map(client => {
    const clientEnrollments = enrollments.filter(e => e.clientId === client.id);
    const enrolledPrograms = clientEnrollments.map(
      enrollment => programs.find(p => p.id === enrollment.programId)!
    ).filter(Boolean);

    return {
      ...client,
      enrolledPrograms
    };
  }),

  getClientById: (id: number) => {
    const client = clients.find(c => c.id === id);
    if (!client) return null;

    const clientEnrollments = enrollments.filter(e => e.clientId === id);
    const enrolledPrograms = clientEnrollments.map(
      enrollment => programs.find(p => p.id === enrollment.programId)!
    ).filter(Boolean);

    return {
      ...client,
      enrolledPrograms
    };
  },

  createClient: (client: Omit<Client, 'id' | 'enrolledPrograms' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
      enrolledPrograms: [],
      createdAt: new Date().toISOString()
    };
    clients.push(newClient);
    return newClient;
  },

  searchClients: (searchTerm: string) => {
    const matchingClients = clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchingClients.map(client => {
      const clientEnrollments = enrollments.filter(e => e.clientId === client.id);
      const enrolledPrograms = clientEnrollments.map(
        enrollment => programs.find(p => p.id === enrollment.programId)!
      ).filter(Boolean);

      return {
        ...client,
        enrolledPrograms
      };
    });
  },

  // Enrollment operations
  enrollClientInProgram: (clientId: number, programId: number) => {
    const client = clients.find(c => c.id === clientId);
    const program = programs.find(p => p.id === programId);
    
    if (!client || !program) return false;

    // Check if already enrolled
    const existingEnrollment = enrollments.find(
      e => e.clientId === clientId && e.programId === programId
    );
    
    if (existingEnrollment) return false;

    const newEnrollment: Enrollment = {
      clientId,
      programId,
      enrollmentDate: new Date().toISOString()
    };
    
    enrollments.push(newEnrollment);
    
    // Update client's enrolled programs
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex !== -1) {
      clients[clientIndex].enrolledPrograms.push(program);
    }
    
    return true;
  },

  removeClientFromProgram: (clientId: number, programId: number) => {
    const initialLength = enrollments.length;
    enrollments = enrollments.filter(
      e => !(e.clientId === clientId && e.programId === programId)
    );
    
    // Update client's enrolled programs
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex !== -1) {
      clients[clientIndex].enrolledPrograms = clients[clientIndex].enrolledPrograms.filter(
        p => p.id !== programId
      );
    }
    
    return enrollments.length !== initialLength;
  },

  getClientEnrollments: (clientId: number) => {
    return enrollments.filter(e => e.clientId === clientId).map(enrollment => {
      const program = programs.find(p => p.id === enrollment.programId);
      return {
        ...enrollment,
        program
      };
    });
  }
};
