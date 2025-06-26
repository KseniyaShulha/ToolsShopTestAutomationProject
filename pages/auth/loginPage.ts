import { Page, Locator } from "@playwright/test";
import BasePage from "../basePage";

export class LoginPage extends BasePage {
  // Locators
  private readonly submitButton: Locator;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly registerButton: Locator;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.submitButton = this.page.locator(".btnSubmit");
    this.emailField = this.page.locator(`[id="email"]`);
    this.passwordField = this.page.locator(`[id="password"]`);
    this.registerButton = this.page.locator(`[href="/auth/register"]`);
  }

  // Methods
  async clickSubmitButton() {
    console.log("User clicks submit");
    await this.submitButton.click();
  }

  async fillInEmailField(email) {
    console.log(`User fills in email field: ${email}`);
    await this.emailField.fill(email);
  }

  async fillInPasswordField(password) {
    console.log(`User fills in password field: ${password}`);
    await this.passwordField.fill(password);
  }

  async clickRegisterButton() {
    console.log("User clicks registration button");
    await this.registerButton.click();
  }
}
