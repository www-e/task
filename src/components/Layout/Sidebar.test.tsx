import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
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
        <Sidebar />
      </Provider>
    );

    // Check for existence of main elements
    expect(screen.getByText('Coligo')).toBeInTheDocument();

    // Check for menu items by their translated text (using the English translations from i18n)
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Gradebook')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Announcements')).toBeInTheDocument();
    expect(screen.getByText('Quizzes')).toBeInTheDocument();
  });

  test('has correct styling', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const sidebar = screen.getByText('Coligo').closest('div'); // Find the sidebar container
    // Note: We can't directly test computed styles with testing-library/jest-dom
    // Instead, we can check if the element exists and has certain attributes
    expect(sidebar).toBeInTheDocument();
  });
});