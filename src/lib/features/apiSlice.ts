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
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    credentials: 'include',
  }), 
  tagTypes: ['Dashboard', 'Announcement', 'Quiz'],
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
    
    // Announcements CRUD
    createAnnouncement: builder.mutation<Announcement, Partial<Announcement>>({
      query: (newAnnouncement) => ({
        url: '/announcements',
        method: 'POST',
        body: newAnnouncement,
      }),
      invalidatesTags: ['Dashboard'],
    }),
    
    updateAnnouncement: builder.mutation<Announcement, { id: string; data: Partial<Announcement> }>({
      query: ({ id, data }) => ({
        url: `/announcements/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Dashboard'],
    }),
    
    deleteAnnouncement: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dashboard'],
    }),
    
    // Quizzes CRUD
    createQuiz: builder.mutation<Quiz, Partial<Quiz>>({
      query: (newQuiz) => ({
        url: '/quizzes',
        method: 'POST',
        body: newQuiz,
      }),
      invalidatesTags: ['Dashboard'],
    }),
    
    updateQuiz: builder.mutation<Quiz, { id: string; data: Partial<Quiz> }>({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Dashboard'],
    }),
    
    deleteQuiz: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dashboard'],
    }),
  }),
});

export const { 
  useGetDashboardDataQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation
} = apiSlice;