import axios from 'axios';
import type {
  User,
  Service,
  Appointment,
  LoginCredentials,
  RegisterData,
  CreateServiceData,
  UpdateServiceData,
  CreateAppointmentData,
  UpdateAppointmentData,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  loginWithGoogle: async (googleToken: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/google', { token: googleToken });
    return response.data;
  },

  refreshToken: async (): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Services API
export const servicesAPI = {
  getServices: async (): Promise<Service[]> => {
    const response = await api.get('/services');
    return response.data;
  },

  getServiceById: async (id: string): Promise<Service> => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createService: async (data: CreateServiceData): Promise<Service> => {
    const response = await api.post('/services', data);
    return response.data;
  },

  updateService: async (id: string, data: UpdateServiceData): Promise<Service> => {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
  },

  getOwnerServices: async (): Promise<Service[]> => {
    const response = await api.get('/services/owner');
    return response.data;
  },
};

// Appointments API
export const appointmentsAPI = {
  getAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments');
    return response.data;
  },

  getAppointmentById: async (id: string): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  createAppointment: async (data: CreateAppointmentData): Promise<Appointment> => {
    const response = await api.post('/appointments', data);
    return response.data;
  },

  updateAppointment: async (id: string, data: UpdateAppointmentData): Promise<Appointment> => {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  },

  deleteAppointment: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },

  getOwnerAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments/owner');
    return response.data;
  },

  getClientAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments/client');
    return response.data;
  },
};

export default api;