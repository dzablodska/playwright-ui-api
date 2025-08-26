import { Page, Locator, expect } from '@playwright/test';
import { parseCurrency } from '../../../helpers/money';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly finishBtn: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishBtn = page.getByTestId('finish');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
  }

  async validateTotals() {
    const items = parseCurrency((await this.itemTotal.textContent()) || '');
    const tax = parseCurrency((await this.tax.textContent()) || '');
    const total = parseCurrency((await this.total.textContent()) || '');
    expect.soft(items).toBeGreaterThan(0);
    expect.soft(total).toBeCloseTo(items + tax, 2);
    return { items, tax, total };
  }

  async finish() {
    await this.finishBtn.click();
  }
}
