import { test, expect } from '@playwright/test';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

test('authenticate and save storage state', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill(required('SAUCE_USER'));
  await page.getByTestId('password').fill(required('SAUCE_PASS'));
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/\/inventory\.html/);
  await page.context().storageState({ path: 'storageState.json' });
});
