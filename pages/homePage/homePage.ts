import { Page, Locator } from "@playwright/test";
import BasePage from "../basePage";

export class HomePage extends BasePage {
  // Locators
  private readonly signInbutton: Locator;
  private readonly itemChoice: Locator;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.signInbutton = this.page.locator(`[href="/auth/login"]`);
    this.itemChoice = page.locator('[class="card-img-top"]');
  }

  // Methods
  async openHomePage(): Promise<void> {
    console.log("User opens home page");
    await this.page.goto("/");
  }

  async clickSignInButton(): Promise<void> {
    console.log("User clicks sign in");
    this.signInbutton.click();
  }

  async chooseFirstItem(): Promise<void> {
    console.log("User chooses the first item");
    this.itemChoice.first().click();
  }
}
