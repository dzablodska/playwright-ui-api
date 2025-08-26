import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByTestId('checkout');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async gotoCheckout() {
    await this.checkoutBtn.click();
  }
}
