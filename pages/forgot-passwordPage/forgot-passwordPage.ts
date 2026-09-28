import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../basePage";

export class ForgotPasswordPage extends BasePage {
  // Locators
  private readonly emailField: Locator;
  private readonly setNewPasswordButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = this.page.locator('[data-test="email"]');
    this.setNewPasswordButton = this.page.locator(
      '[data-test="forgot-password-submit"]',
    );
    this.successMessage = this.page.locator('[role="alert"]');
  }

  // Methods

  async fillInEmailField(email: string): Promise<void> {
    console.log(`\nUser fills in email field with: ${email}`);
    await this.emailField.fill(email);
  }

  async clickSubmitButton(): Promise<void> {
    console.log("\nUser clicks setNewPassword button");
    await this.setNewPasswordButton.click();
  }

  async assertSuccsessMessageAppeared(): Promise<void> {
    console.log(
      "\nThe page forgot password is successfully confirmed via a message",
    );
    await expect(this.successMessage).toBeVisible();
  }
}
