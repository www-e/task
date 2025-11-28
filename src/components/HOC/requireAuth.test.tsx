import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import requireAuth from './requireAuth';

// Mock component to wrap with requireAuth
const MockComponent = () => <div>Protected Content</div>;

describe('requireAuth HOC', () => {
  const setupStore = (isAuthenticated: boolean) => {
    return configureStore({
      reducer: {
        auth: (state = { isAuthenticated, user: null, isLoading: false, error: null }, action: { type: string }) => state,
      },
    });
  };

  test('should render wrapped component when user is authenticated', () => {
    const store = setupStore(true);
    const AuthenticatedComponent = requireAuth(MockComponent);
    
    render(
      <Provider store={store}>
        <AuthenticatedComponent />
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('should not render wrapped component when user is not authenticated', () => {
    const store = setupStore(false);
    const UnauthenticatedComponent = requireAuth(MockComponent);
    
    render(
      <Provider store={store}>
        <UnauthenticatedComponent />
      </Provider>
    );

    // When not authenticated, it should redirect (not render the component)
    // We'll check that the protected content is not displayed
    expect(() => screen.getByText('Protected Content')).toThrow();
  });
});