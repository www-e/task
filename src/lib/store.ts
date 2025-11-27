import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { apiSlice } from './features/apiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, etc.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];