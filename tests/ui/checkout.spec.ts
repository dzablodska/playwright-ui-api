import { test } from './fixtures/ui.fixtures';
import { fullCheckout } from './steps/checkout.steps';

const ITEMS = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'] as const;

test('Full checkout with two items and validate final price', async ({
  login,
  inventory,
  cart,
  info,
  overview,
  complete,
}) => {
  await fullCheckout(
    { login, inventory, cart, info, overview, complete },
    {
      items: ITEMS,
      firstName: 'Daria',
      lastName: 'Z.',
      zip: '1011AA',
    },
  );
});
