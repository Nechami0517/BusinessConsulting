import axios from 'axios';
import type {
  User,
  Service,
  MeetingTimeSlot,
  LoginCredentials,
  RegisterData,
  CreateServiceData,
  UpdateServiceData,
  CreateMeetingData,
  UpdateMeetingData,
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

 
};

// MeetingTimeSlots API
export const meetingsAPI = {
  getMeetingTimeSlots: async (): Promise<MeetingTimeSlot[]> => {
    const response = await api.get('/meeting-time-slots');
    return response.data;
  },

  getMeetingTimeSlotById: async (id: string): Promise<MeetingTimeSlot> => {
    const response = await api.get(`/meeting-time-slots/${id}`);
    return response.data;
  },

  createMeetingTimeSlot: async (data: CreateMeetingData): Promise<MeetingTimeSlot> => {
    const response = await api.post('/meeting-time-slots', data);
    return response.data;
  },

  updateMeetingTimeSlot: async (id: string, data: UpdateMeetingData): Promise<MeetingTimeSlot> => {
    const response = await api.put(`/meeting-time-slots/${id}`, data);
    return response.data;
  },

  deleteMeetingTimeSlot: async (id: string): Promise<void> => {
    await api.delete(`/meeting-time-slots/${id}`);
  },

  getManagerMeetingTimeSlots: async (): Promise<MeetingTimeSlot[]> => {
    const response = await api.get('/meeting-time-slots/manager');
    return response.data;
  },

  getClientMeetingTimeSlots: async (): Promise<MeetingTimeSlot[]> => {
    const response = await api.get('/meeting-time-slots/client');
    return response.data;
  },
};

export default api;