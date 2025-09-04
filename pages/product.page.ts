import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('#button-cart');
    this.successAlert = page.locator('.alert-success');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async successMessage() {
    return this.successAlert;
  }
}
