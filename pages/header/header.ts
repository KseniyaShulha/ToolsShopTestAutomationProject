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
  async assertItemAddedToCartMessageAppeared(): Promise<void> {
    console.log("Assert item added to cart message appeared");
    await expect(this.itemAddedToCartMessage).toBeVisible();
  }

  async getDropdownLoginValue(): Promise<string | null> {
    console.log("Get text from login dropdown");
    return this.userDropdownMenu.textContent();
  }

  async clickHomeInHeader(): Promise<void> {
    console.log("User clicks home in the header");
    await this.homePageButton.click();
  }

  async clickShoppingCartIcon(): Promise<void> {
    console.log("User clicks on shopping cart icon");
    await this.shoppingCartIcon.click();
  }
}
