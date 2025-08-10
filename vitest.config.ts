import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['apps/**/__tests__/**/*.test.ts']
  }
});
