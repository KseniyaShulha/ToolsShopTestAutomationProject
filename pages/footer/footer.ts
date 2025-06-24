import { Page } from "@playwright/test";

export class Footer {
  private readonly page: Page;

  // Constructor for the class
  constructor(page: Page) {
    this.page = page;
  }
}
