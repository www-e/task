import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the shape of the data based on your Mongoose Models
export interface Announcement {
  _id: string;
  author: string;
  subject: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
}

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  type: 'quiz' | 'assignment';
  isCompleted: boolean;
}

interface DashboardData {
  announcements: Announcement[];
  quizzes: Quiz[];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Points to Express Server
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetDashboardDataQuery } = apiSlice;