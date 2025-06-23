import { Page } from "@playwright/test";
import BasePage from "../basePage";

export class LoginPage extends BasePage {
  // Constructor for the class
  constructor(page: Page) {
    super(page);
  }

  // Locators
  readonly submitButton = this.page.locator(".btnSubmit");
  readonly emailField = this.page.locator(`[id="email"]`);
  readonly passwordField = this.page.locator(`[id="password"]`);
  readonly registerButton = this.page.locator(`[href="/auth/register"]`);

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
    // Customer clicks on the register button
    await this.registerButton.click();
  }
}
