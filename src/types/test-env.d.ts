// src/types/test-env.d.ts
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveStyle(style: Record<string, unknown> | string): R;
    }
  }
  namespace NodeJS {
    interface Global {
      Headers: typeof Headers;
    }
  }
}