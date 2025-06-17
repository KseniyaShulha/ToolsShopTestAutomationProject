import { Page, expect } from '@playwright/test';
import BasePage from '../basePage';


export class LoginPage extends BasePage {

    // Constructor for the class
    constructor(page: Page) {
        super(page)
    };

    // Locators
    readonly submitButton = this.page.locator('.btnSubmit');
    readonly emailField = this.page.locator(`[id="email"]`);
    readonly passwordField = this.page.locator(`[id="password"]`);

    // Methods
    async clickSubmitButton() {
        console.log('User clicks submit')
        await this.submitButton.click();
    }

    async fillEmailField(email) {
        console.log(`User fills in email field: ${email}`)
        await this.emailField.fill(email);
    }

    async fillPasswordField(password) {
        console.log(`User fills in password field: ${password}`)
        await this.passwordField.fill(password)
    }
}
