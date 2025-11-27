import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

// 1. Get the URL from Environment Variable (fallback to localhost for safety)
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }), 
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => '/dashboard', // Appended to baseUrl -> http://localhost:5000/api/dashboard
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardDataQuery } = apiSlice;