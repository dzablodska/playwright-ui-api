// tests/ui/steps/checkout.steps.ts
import type { UIFixtures } from '../fixtures/ui.fixtures';

export type CheckoutInput = {
  items: readonly string[];
  firstName: string;
  lastName: string;
  zip: string;
};

export async function fullCheckout(
  { inventory, cart, info, overview, complete }: UIFixtures,
  { items, firstName, lastName, zip }: CheckoutInput,
) {
  await inventory.page.goto('/inventory.html');
  await inventory.assertLoaded();

  for (const name of items) {
    await inventory.addToCartByName(name);
  }

  await inventory.openCart();
  await cart.assertLoaded();
  await cart.gotoCheckout();

  await info.fillAndContinue(firstName, lastName, zip);

  await overview.validateTotals();
  await overview.finish();

  await complete.assertCompleted();
}
