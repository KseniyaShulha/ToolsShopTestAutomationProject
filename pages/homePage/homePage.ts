import { Page, expect } from '@playwright/test';
import BasePage from '../basePage';


export class HomePage extends BasePage {

    // Constructor for the class
    constructor(page: Page) {
        super(page)
    };

    // Locators
    readonly signInbutton = this.page.locator(`[href="/auth/login"]`);
    readonly userDropdownMenu = this.page.locator(`[id="menu"]`);

    // Methods
    async openHomePage() {
        console.log('User opens home page')
        await this.page.goto('/');
    }

    async clickSignInButton() {
        console.log('User clicks sign in')
        this.signInbutton.click();
    }
}
