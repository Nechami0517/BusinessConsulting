import axios from 'axios';
import type {
  User,
  Service,
  Meeting,
  LoginCredentials,
  RegisterData,
  CreateServiceData,
  UpdateServiceData,
  CreateMeetingData,
  UpdateMeetingData,
  MeetingTimeSlot,
} from '../types';

const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:3000';

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
    const response = await api.post('/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
    const response = await api.post('/login/register', data);
    return response.data;
  },

  loginWithGoogle: async (googleToken: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/google', { token: googleToken });
    return response.data;
  },

  refreshToken: async (): Promise<{ user: User; token: string }> => {
    const response = await api.post('/refresh');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/logout');
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/profile');
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

  updateService: async (id: number, data: UpdateServiceData): Promise<Service> => {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
  },

  getManagerServices: async (): Promise<Service[]> => {
    const response = await api.get('/services/manager');
    return response.data;
  },
};

// Meetings API
export const meetingsAPI = {
  getMeetings: async (): Promise<MeetingTimeSlot[]> => {
    const response = await api.get('/services');
    return response.data;
  },

  getMeetingById: async (id: string): Promise<Meeting> => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createMeeting: async (data: CreateMeetingData): Promise<Meeting> => {
    const response = await api.post('/services', data);
    return response.data;
  },

  updateMeeting: async (id: string, data: UpdateMeetingData): Promise<Meeting> => {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },

  deleteMeeting: async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
  },

  getManagerMeetings: async (): Promise<Meeting[]> => {
    const response = await api.get('/services/manager');
    return response.data;
  },

  getClientMeetings: async (): Promise<Meeting[]> => {
    const response = await api.get('/services/client');
    return response.data;
  },
};

export default api;