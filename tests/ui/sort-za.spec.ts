import { test } from './fixtures/ui.fixtures';
import { sortZAAndAssert } from './steps/inventory.steps';

test.describe('Authenticated flows', () => {
  test('Sort items by Name Z→A', async ({ inventory }) => {
    await sortZAAndAssert(inventory);
  });
});
