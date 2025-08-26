import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

type UI = {
  login: LoginPage;
  inventory: InventoryPage;
  cart: CartPage;
  info: CheckoutInfoPage;
  overview: CheckoutOverviewPage;
  complete: CheckoutCompletePage;
};

export const test = base.extend<UI>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  info: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  overview: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  complete: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});

export const expect = test.expect;

export type UIFixtures = UI;
