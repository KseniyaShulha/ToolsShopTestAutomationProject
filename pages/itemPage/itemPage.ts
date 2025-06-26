import { Page, Locator } from "@playwright/test";
import BasePage from "../basePage";

export class ItemPage extends BasePage {
  // Locators
  private readonly addToShoppingCart: Locator;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.addToShoppingCart = page.locator('[id="btn-add-to-cart"]');
  }

  // Methods
  async clickAddToShoppingCartButton(): Promise<void> {
    console.log("User adds an item to the shopping cart");
    await this.addToShoppingCart.click();
  }
}
