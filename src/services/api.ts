import axios from 'axios';
import type {
  User,
  Service,
  LoginCredentials,
  RegisterData,
  CreateServiceData,
  UpdateServiceData,
  CreateMeetingData,
  UpdateMeetingData,
  Meeting,
  BusinessConsultantState,
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
//פונקציית מעטפת לקריאות api שלא דורשות slice
const apiCallWrapper = async (apiCall: () => Promise<any>) => {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    console.error('API Error:', error);
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      {
        alert(axios.isAxiosError(error) && error.response?.data)
      }
    throw error; // אפשר להחזיר את השגיאה כדי שתוכל לטפל בה במקום אחר אם צריך
    }
  }
};
// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
    console.log('Registering user:', data);
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
    console.log('Creating service:', data);
    const response = await api.post('/services', data);
    return response.data;
  },

  updateService: async (id: number, data: UpdateServiceData): Promise<Service> => {
    const response = await api.put(`/services/${id}`, { ...data, id });
    return response.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
  },
};

// MeetingTimeSlots API
export const meetingsAPI = {
  getMeetings: async (): Promise<Meeting[]> => {
    const response = await api.get('/meeting');
    return response.data;
  },

  getMeetingById: async (id: string): Promise<Meeting> => {
    const response = await api.get(`/meeting/${id}`);
    return response.data;
  },

  createMeeting: async (data: CreateMeetingData): Promise<Meeting> => {
    const response = await api.post('/meeting', data);
    return response.data;
  },

  updateMeeting: async (id: string, data: UpdateMeetingData): Promise<Meeting> => {
    const response = await api.put(`/meeting/${id}`, data);
    return response.data;
  },

  deleteMeeting: async (id: string): Promise<void> => {
    await api.delete(`/meeting/${id}`);
  },

  getManagerMeetings: async (): Promise<Meeting[]> => {
    const response = await api.get('/meeting/manager');
    return response.data;
  },

  getClientMeetings: async (): Promise<Meeting[]> => {
    const response = await api.get('/meeting/client');
    return response.data;
  },
};

// ConsultantService API


export const consultantServiceAPI = {
  createConsultantService: async (data: { service_id: string; consultant_id: string }): Promise<void> => {
    return apiCallWrapper(() => api.post('/consultant-service', data));
  },

  deleteConsultantService: async (data: { serviceId: string; consultantId: string }): Promise<void> => {
    return apiCallWrapper(() => api.delete('/consultant-service', { data }));
  },
};
// BusinessConsultant API
export const businessConsultantAPI = {
  createConsultant: async (data: { name: string; password: string; email: string; role: string }): Promise<BusinessConsultantState> => {
    const response = await api.post('/business-consultant', data);
    return response.data;
  },

  getAllConsultants: async (): Promise<BusinessConsultantState[]> => {
    const response = await api.get('/business-consultant');
    return response.data;
  },

  getConsultantById: async (id: string): Promise<BusinessConsultantState> => {
    const response = await api.get(`/business-consultant/${id}`);
    return response.data;
  },

  updateConsultant: async (id: string, data: { name?: string; password?: string; email?: string; role?: string }): Promise<BusinessConsultantState> => {
    const response = await api.put(`/business-consultant/${id}`, data);
    return response.data;
  },

  deleteConsultant: async (id: string): Promise<void> => {
    await api.delete(`/business-consultant/${id}`);
  },
};

export default api;
