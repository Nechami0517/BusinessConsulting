import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';
import meetingsReducer from './slices/meetingsSlice';
import consultanatServiceSlice from './slices/consultantServiceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    meetings: meetingsReducer,
    consultantServices: consultanatServiceSlice,
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
