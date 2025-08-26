import { expect } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage';

export async function expectFailedLogin(
  login: LoginPage,
  {
    username,
    password,
    message = /Epic sadface|Username and password do not match/i,
  }: {
    username: string;
    password: string;
    message?: RegExp | string;
  },
) {
  await login.goto();
  await login.login(username, password);
  await login.expectError(message);
  await expect(login.page).toHaveURL(/\/$/);
}
