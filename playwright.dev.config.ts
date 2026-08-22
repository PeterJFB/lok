import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './playwright.global-setup.ts',
  globalTeardown: './playwright.global-teardown.ts',
  webServer: {
    command: 'pnpm run dev',
    port: 5173,
    env: {
      DATABASE_URL: 'file:tests.db'
    },
    reuseExistingServer: !process.env.CI
  },
  testMatch: '**/*.e2e.{ts,js}'
});
