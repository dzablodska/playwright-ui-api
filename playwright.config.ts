import * as dotenv from 'dotenv';
dotenv.config();

import { defineConfig, devices } from '@playwright/test';

const UI_BASE = process.env.UI_BASE_URL ?? 'https://www.saucedemo.com';
const API_BASE = process.env.REQRES_BASE ?? 'https://reqres.in';
const API_KEY = process.env.REQRES_API_KEY ?? '';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  reporter: [
    ['list'],
    ['allure-playwright', { detail: true, resultsDir: 'allure-results' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: UI_BASE,
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts$/,
      use: {
        baseURL: API_BASE,
        extraHTTPHeaders: {
          'content-type': 'application/json',
          accept: 'application/json',
          'user-agent': 'playwright-tests',
          ...(API_KEY ? { 'x-api-key': API_KEY } : {}),
        },
      },
    },

    { name: 'setup', testMatch: /auth\.setup\.ts$/ },

    {
      name: 'chromium',
      testMatch: /tests\/ui\/.*\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: UI_BASE,
        testIdAttribute: 'data-test',
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },
  ],

  workers: 4,
});
