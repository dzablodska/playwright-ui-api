import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortSelect: Locator;
  readonly items: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.sortSelect = page.locator(
      [
        'select[data-test="product_sort_container"]',
        'select#product_sort_container',
        'select.product_sort_container',
        'select[data-test="product-sort-container"]',
      ].join(', '),
    );

    this.items = page.locator('[data-test="inventory-item"], .inventory_item');
    this.cartLink = page.locator('[data-test="shopping-cart-link"], .shopping_cart_link');
  }

  async assertLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
    await expect(this.sortSelect).toBeVisible();
  }

  async addToCartByName(name: string) {
    const card = this.items.filter({ hasText: name });
    await card.getByRole('button', { name: /add to cart/i }).click();
  }

  async sortByZA() {
    await this.sortSelect.waitFor({ state: 'visible' });
    await this.sortSelect.selectOption({ value: 'za' });
  }

  async getProductNames(): Promise<string[]> {
    return await this.items
      .locator('[data-test="inventory-item-name"], .inventory_item_name')
      .allTextContents();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
