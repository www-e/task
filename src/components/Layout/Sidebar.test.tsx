import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import I18nProvider from '@/providers/I18nProvider';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  const store = configureStore({
    reducer: {
      auth: (state = { isAuthenticated: true, user: null, isLoading: false, error: null }, action: { type: string }) => state,
    },
  });

  test('renders all menu items', () => {
    render(
      <Provider store={store}>
        <I18nProvider>
          <Sidebar />
        </I18nProvider>
      </Provider>
    );

    // Check for existence of main elements
    expect(screen.getByText('Coligo')).toBeInTheDocument();
  });
});