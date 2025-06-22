
// פרטי העסק
export interface BusinessDetail {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email: string;
  website?: string;
  description?: string;
}

// 
export interface User {
  id: number;
  name: string;
  phone?: string;
  email: string;
  role: 'manager'; 
}


// export interface Meeting {
//   id: number;
//   user_id: number; // ID של הלקוח
//   service_id: number; // ID של השירות
// }

export interface MeetingTimeSlot {
  id: number;
  date: string; // תאריך
  start_time: string; // שעת התחלה
  end_time: string; // שעת סיום
  status: 'available' | 'booked';
  meeting_id?: number; // ID של הפגישה, יכול להיות ריק
}

export interface Service {
  id: number;
  name: string;
  description?: string;
  duration: number; // משך בשעות
  price: number; // מחיר
}

export interface AuthState {
  user: User | null; // יכול להיות לקוח או מנהל
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ServicesState {
  services: Service[];
  isLoading: boolean;
  error: string | null;
}

export interface MeetingState {
  meetings: MeetingTimeSlot[]; // או MeetingTimeSlot תלוי מה אתה צריך
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone:string;
}
export interface  CreateMeetingData{
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateMeetingData {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  date?: string;
  time?: string;
  notes?: string;
}

export interface CreateServiceData {
  name: string;
  description: string;
  price: number;
  duration: number;
  // category: string;
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  isActive?: boolean;
}
