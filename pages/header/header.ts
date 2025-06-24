import { Locator, Page } from "@playwright/test";

export class Header {
  private readonly page: Page;
  private readonly userDropdownMenu: Locator;

  // Constructor for the class
  constructor(page: Page) {
    this.page = page;
    this.userDropdownMenu = this.page.locator(`[id="menu"]`);
  }

  // Methods
  async getDropdownLoginValue() {
    // Take text content from user dropdown menu
    return this.userDropdownMenu.textContent();
  }
}
