import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginUser, logoutUser, verifyAuth } from './authSlice';

describe('authSlice', () => {
  test('should handle initial state', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('should handle loginUser.pending', () => {
    const state = authReducer(
      undefined,
      { type: loginUser.pending.type, payload: undefined }
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should handle loginUser.fulfilled', () => {
    const user = {
      id: '1',
      name: 'Test User',
      role: 'student',
      avatar: 'https://example.com/avatar.jpg',
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: user,
    };

    const state = authReducer(undefined, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('should handle loginUser.rejected', () => {
    const error = 'Login failed';
    const action = {
      type: loginUser.rejected.type,
      payload: error,
    };

    const state = authReducer({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null
    }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Login failed');
  });
});