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
    this.itemChoice = page.locator('[class="card-img-top"]').first();
  }

  // Methods
  async openHomePage() {
    console.log("User opens home page");
    await this.page.goto("/");
  }

  async clickSignInButton() {
    console.log("User clicks sign in");
    this.signInbutton.click();
  }

  async choiceOfTheItem() {
    console.log("User chooses an item");
    this.itemChoice.click();
  }
}
