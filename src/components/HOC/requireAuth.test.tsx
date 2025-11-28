import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import I18nProvider from '@/providers/I18nProvider';
import requireAuth from './requireAuth';

// Mock component to wrap with requireAuth
const MockComponent = () => <div>Protected Content</div>;

// Mock next/navigation useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Create a mock module for react-redux to set up for both tests
const mockUseSelector = jest.fn();

// Mock react-redux useSelector and useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: mockUseSelector,
  useDispatch: () => jest.fn(),
}));

describe('requireAuth HOC', () => {
  const setupStore = (isAuthenticated: boolean) => {
    return configureStore({
      reducer: {
        auth: (state = { isAuthenticated, user: null, isLoading: false, error: null }, action: { type: string }) => state,
      },
    });
  };

  test('should render wrapped component when user is authenticated', () => {
    // Mock useSelector to return authenticated state
    mockUseSelector.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    const store = setupStore(true);
    const AuthenticatedComponent = requireAuth(MockComponent);

    render(
      <Provider store={store}>
        <I18nProvider>
          <AuthenticatedComponent />
        </I18nProvider>
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('should not render wrapped component when user is not authenticated', () => {
    // Mock useSelector to return unauthenticated state
    mockUseSelector.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    const store = setupStore(false);
    const UnauthenticatedComponent = requireAuth(MockComponent);

    render(
      <Provider store={store}>
        <I18nProvider>
          <UnauthenticatedComponent />
        </I18nProvider>
      </Provider>
    );

    // When not authenticated, it should redirect (not render the component)
    // We'll check that the protected content is not displayed
    expect(() => screen.getByText('Protected Content')).toThrow();
  });
});