import { Page, expect } from '@playwright/test';
import BasePage from '../basePage';


export class LoginPage extends BasePage{

    // Constructor for the class
    constructor(page: Page){
        super(page)
    };

    // Locators
    readonly submitButton = this.page.locator('.btnSubmit');

    // Methods
    async clickSubmitButton(){
        console.log('User clicks submit')
        this.submitButton.click();
    }
}


