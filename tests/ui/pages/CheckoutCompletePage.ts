import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private page: Page) {}

  async assertCompleted() {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}
