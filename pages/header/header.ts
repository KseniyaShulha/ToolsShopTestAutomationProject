import { Locator, Page, expect } from "@playwright/test";

export class Header {
  private readonly page: Page;
  private readonly userDropdownMenu: Locator;
  private readonly homePageButton: Locator;
  private readonly shoppingCartIcon: Locator;
  private readonly itemAddedToCartMessage: Locator;

  // Constructor for the class
  constructor(page: Page) {
    this.page = page;
    this.userDropdownMenu = this.page.locator(`[id="menu"]`);
    this.homePageButton = this.page.locator('[data-test="nav-home"]');
    this.shoppingCartIcon = this.page.locator('a[href = "/checkout"]');
    this.itemAddedToCartMessage = this.page.locator(".toast-success");
  }

  // Methods
  async assertItemAddedToCartMessageOccure() {
    await expect(this.itemAddedToCartMessage).toBeVisible();
  }

  async getDropdownLoginValue() {
    // Take text content from user dropdown menu
    return this.userDropdownMenu.textContent();
  }

  async clickHomeInHeader() {
    console.log("User clicks home in the header");
    await this.homePageButton.click();
  }

  async clickShoppingCartIcon() {
    console.log("User clicks on shopping cart icon");
    await this.shoppingCartIcon.click();
  }
}
