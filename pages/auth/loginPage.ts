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
        this.submitButton.click();
    }

    async fillEmailField() {
        console.log('User fills in email field')
        this.emailField.fill('customer@practicesoftwaretesting.com');
    }

    async fillPasswordField() {
        console.log('User fills in password field')
        this.passwordField.fill('welcome01')
    }


}


