import requireAuth from './requireAuth';

// Simple unit test to verify requireAuth is a function
describe('requireAuth HOC', () => {
  test('should be a function', () => {
    expect(typeof requireAuth).toBe('function');
  });

  test('should return a function when called with a component', () => {
    const MockComponent = () => <div>Test</div>;
    const enhancedComponent = requireAuth(MockComponent);
    expect(typeof enhancedComponent).toBe('function');
  });
});