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
  async clickSubmitButton(): Promise<void> {
    console.log("\nUser clicks submit");
    await this.submitButton.click();
  }

  async fillInEmailField(email: string): Promise<void> {
    console.log(`\nUser fills in email field with: ${email}`);
    await this.emailField.fill(email);
  }

  async fillInPasswordField(password: string): Promise<void> {
    console.log(`\nUser fills in password field with: ${password}`);
    await this.passwordField.fill(password);
  }

  async clickRegisterButton(): Promise<void> {
    console.log("\nUser clicks registration button");
    await this.registerButton.click();
  }
}
