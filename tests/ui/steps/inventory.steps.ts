import { expect, test } from '@playwright/test';
import type { InventoryPage } from '../pages/InventoryPage';

export async function sortZAAndAssert(inventory: InventoryPage) {
  await test.step('Open inventory', async () => {
    await inventory.page.goto('/inventory.html');
    await inventory.assertLoaded();
  });

  await test.step('Sort by Name Z→A', async () => {
    await inventory.sortByZA();
  });

  await test.step('Assert names are Z→A', async () => {
    const names = await inventory.getProductNames();
    const expected = [...names].sort((a, b) => b.localeCompare(a));
    await expect(names).toEqual(expected);
  });
}
