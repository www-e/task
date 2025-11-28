// Simple unit test for apiSlice - testing the structure without complex fetch mocking
import { apiSlice } from './apiSlice';

describe('apiSlice', () => {
  test('should have correct endpoints defined', () => {
    expect(apiSlice.endpoints.getDashboardData).toBeDefined();
    expect(apiSlice.endpoints.createAnnouncement).toBeDefined();
    expect(apiSlice.endpoints.updateAnnouncement).toBeDefined();
    expect(apiSlice.endpoints.deleteAnnouncement).toBeDefined();
    expect(apiSlice.endpoints.createQuiz).toBeDefined();
    expect(apiSlice.endpoints.updateQuiz).toBeDefined();
    expect(apiSlice.endpoints.deleteQuiz).toBeDefined();
  });

  test('should have correct reducer path', () => {
    expect(apiSlice.reducerPath).toBe('api');
  });
});