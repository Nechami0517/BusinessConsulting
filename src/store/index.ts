import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    appointments: appointmentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;