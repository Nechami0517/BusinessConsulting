import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentsAPI } from '../../services/api';
import type { AppointmentsState, CreateAppointmentData, UpdateAppointmentData } from '../../types';

const initialState: AppointmentsState = {
  appointments: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const appointments = await appointmentsAPI.getAppointments();
      return appointments;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }
);

export const fetchOwnerAppointments = createAsyncThunk(
  'appointments/fetchOwnerAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const appointments = await appointmentsAPI.getOwnerAppointments();
      return appointments;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch owner appointments');
    }
  }
);

export const fetchClientAppointments = createAsyncThunk(
  'appointments/fetchClientAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const appointments = await appointmentsAPI.getClientAppointments();
      return appointments;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch client appointments');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (data: CreateAppointmentData, { rejectWithValue }) => {
    try {
      const appointment = await appointmentsAPI.createAppointment(data);
      return appointment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create appointment');
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, data }: { id: string; data: UpdateAppointmentData }, { rejectWithValue }) => {
    try {
      const appointment = await appointmentsAPI.updateAppointment(id, data);
      return appointment;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update appointment');
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id: string, { rejectWithValue }) => {
    try {
      await appointmentsAPI.deleteAppointment(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete appointment');
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointmentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
        state.error = null;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch owner appointments
      .addCase(fetchOwnerAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOwnerAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
        state.error = null;
      })
      .addCase(fetchOwnerAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch client appointments
      .addCase(fetchClientAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClientAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
        state.error = null;
      })
      .addCase(fetchClientAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments.push(action.payload);
        state.error = null;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update appointment
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete appointment
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAppointmentsError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;