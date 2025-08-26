import { Page, Locator } from '@playwright/test';

export class CheckoutInfoPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postal: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postal = page.getByTestId('postalCode');
    this.continueBtn = page.getByTestId('continue');
  }

  async fillAndContinue(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postal.fill(zip);
    await this.continueBtn.click();
  }
}
