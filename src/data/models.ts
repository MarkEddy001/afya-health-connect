
// Program model
export interface Program {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

// Client model
export interface Client {
  id: number;
  name: string;
  age: number;
  gender: string;
  contactNumber: string;
  address: string;
  enrolledPrograms: Program[];
  createdAt: string;
}

// Enrollment model
export interface Enrollment {
  clientId: number;
  programId: number;
  enrollmentDate: string;
}
