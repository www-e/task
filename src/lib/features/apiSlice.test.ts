import { setupServer } from 'msw/node';
import { http } from 'msw';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

// Mock server for API testing
const server = setupServer(
  http.get('http://localhost:5000/api/dashboard', ({ request, params, cookies }) => {
    return new Response(JSON.stringify({
      announcements: [
        {
          _id: '1',
          author: 'Test Author',
          subject: 'Test Subject',
          avatarUrl: 'http://example.com/avatar.jpg',
          content: 'Test content',
          createdAt: '2023-01-01T00:00:00Z',
        },
      ],
      quizzes: [
        {
          _id: '1',
          title: 'Test Quiz',
          course: 'Test Course',
          topic: 'Test Topic',
          dueDate: '2023-01-01T00:00:00Z',
          type: 'quiz',
          isCompleted: false,
        },
      ],
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('apiSlice', () => {
  test('should fetch dashboard data', async () => {
    const store = configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });

    const result = await store.dispatch(apiSlice.endpoints.getDashboardData.initiate());

    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data?.announcements)).toBe(true);
    expect(Array.isArray(result.data?.quizzes)).toBe(true);
  });

  test('should handle dashboard data error', async () => {
    server.use(
      http.get('http://localhost:5000/api/dashboard', ({ request, params, cookies }) => {
        return new Response('', { status: 500 });
      })
    );

    const store = configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });

    const result = await store.dispatch(apiSlice.endpoints.getDashboardData.initiate());

    expect(result.error).toBeDefined();
  });
});