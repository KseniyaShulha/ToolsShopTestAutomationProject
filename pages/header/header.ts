import { Locator, Page, expect } from "@playwright/test";

export class Header {
  private readonly page: Page;
  private readonly userDropdownMenu: Locator;
  private readonly homePageButton: Locator;
  private readonly shoppingCartIcon: Locator;
  private readonly itemAddedToCartMessage: Locator;
  private readonly signOutOption: Locator;
  private readonly ordersOption: Locator;
  private readonly usersOption: Locator;

  // Constructor for the class
  constructor(page: Page) {
    this.page = page;
    this.userDropdownMenu = this.page.locator(`[id="menu"]`);
    this.homePageButton = this.page.locator('[data-test="nav-home"]');
    this.shoppingCartIcon = this.page.locator('a[href = "/checkout"]');
    this.itemAddedToCartMessage = this.page.locator(".toast-success");
    this.signOutOption = this.page.locator('[data-test="nav-sign-out"]');
    this.ordersOption = this.page.locator('[href="/admin/orders"]');
    this.usersOption = this.page.locator('[href="/admin/users"]');
  }

  // Methods
  async clickUserDropdownMenu(): Promise<void> {
    console.log("\nUser clicks on user dropdown menu");
    await this.userDropdownMenu.click();
  }

  async clickOrdersAsAdmin(): Promise<void> {
    console.log("\nAdmin clicks on orders from dropdown menu");
    await this.ordersOption.click();
  }

  async clickSignOut(): Promise<void> {
    console.log("\nUser clicks on sign out");
    await this.signOutOption.click();
  }

  async assertItemAddedToCartMessageAppeared(): Promise<void> {
    console.log("\nAssert item added to cart message appeared");
    await expect(this.itemAddedToCartMessage).toBeVisible();
  }

  async getDropdownLoginValue(): Promise<string | null> {
    console.log("\nGet text from login dropdown");
    return this.userDropdownMenu.textContent();
  }

  async clickHomeInHeader(): Promise<void> {
    console.log("\nUser clicks home in the header");
    await this.homePageButton.click();
  }

  async clickShoppingCartIcon(): Promise<void> {
    console.log("\nUser clicks on shopping cart icon");
    await this.shoppingCartIcon.click();
  }

  async clickUsersAsAdmin(): Promise<void> {
    console.log("\nAdmin clicks on users from dropdown menu");
    await this.usersOption.click();
  }
}
