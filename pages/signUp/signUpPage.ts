import { Page, expect } from '@playwright/test';
import BasePage from '../basePage';


export class SignUpPage extends BasePage {

    // Constructor for the class
    constructor(page: Page) {
        super(page)
    };

    // Locators
    readonly firstNameField = this.page.locator(`[id="first_name"]`);
    readonly lastNameField = this.page.locator(`[id="last_name"]`);
    readonly dateOfBirthField = this.page.locator('#dob');
    readonly streetField = this.page.locator(`[id="street"]`);
    readonly postalCodeField = this.page.locator(`[id="postal_code"]`);
    readonly cityField = this.page.locator(`[id="city"]`);
    readonly stateField = this.page.locator(`[id="state"]`);
    readonly countryField = this.page.locator(`[id="country"]`);
    readonly phoneField = this.page.locator(`[id="phone"]`);
    readonly emailField = this.page.locator(`[id="email"]`);
    readonly passwordField = this.page.locator(`[id="password"]`);
    readonly registerButton = this.page.locator(`[class="btnSubmit mb-3"]`);

    // Methods
    async fillInFirstName(firstName) {
        // Customer fills in First name
        console.log(`Customer fills in first name: ${firstName}`);
        await this.firstNameField.fill(firstName);
    }

    async fillInLastName(lastName) {
        // Customer fills in Last name
        console.log(`Customer fills in lst name: ${lastName}`);
        await this.lastNameField.fill(lastName);
    }

    async fillInDateOfBirth(dateOfBirth) {
        console.log('Customer fills in dob 1990/01/01')
        const dobInput = this.page.locator('input[formcontrolname="dob"]');

        await this.page.evaluate((el: any) => {
            el.value = '1990-01-01';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, await dobInput.elementHandle());
    }

    async fillInStreet(street) {
        // Customer fills in street
        console.log(`Customer fills in street: ${street}`);
        await this.streetField.fill(street);
    }

    async fillInState(state) {
        // Customer fills in state
        console.log(`Customer fills in state: ${state}`);
        await this.stateField.fill(state);
    }

    async fillInPostalCode(postalCode) {
        // Customer fills in postal code
        console.log(`Customer fills in postal code: ${postalCode}`);
        await this.postalCodeField.fill(postalCode);
    }

    async fillInCity(city) {
        // Customer fills in city
        console.log(`Customer fills in city: ${city}`);
        await this.cityField.fill(city);
    }

    async fillInCountry(country) {
        // Customer fills in country
        console.log(`Customer fills in country: ${country}`);
        await this.page.selectOption('#country', country);
    }

    async fillInPhone(phone) {
        // Customer fills in phone
        console.log(`Customer fills in phone: ${phone}`);
        await this.phoneField.fill(phone);
    }

    async fillInEmail(email) {
        // Customer fills in email
        console.log(`Customer fills in email: ${email}`);
        await this.emailField.fill(email);
    }

    async fillInPassword(password) {
        // Customer fills in password
        console.log(`Customer fills in password: ${password}`);
        await this.passwordField.fill(password);
    }

    async clickRegisterButton() {
        // Customer clicks register button
        await this.registerButton.click();
    }


}