export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'client';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  isActive: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  clientId: string;
  ownerId: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ServicesState {
  services: Service[];
  isLoading: boolean;
  error: string | null;
}

export interface AppointmentsState {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'owner' | 'client';
}

export interface CreateServiceData {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  isActive?: boolean;
}

export interface CreateAppointmentData {
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateAppointmentData {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  date?: string;
  time?: string;
  notes?: string;
}