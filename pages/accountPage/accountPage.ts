import { Page, expect } from '@playwright/test';
import BasePage from '../basePage';


export class AccountPage extends BasePage {

    // Constructor for the class
    constructor(page: Page) {
        super(page)
    };

    // Locators
    readonly dashboardNavigationMenu = this.page.locator(`[class="btn-group-vertical"]`)

    // Methods

}