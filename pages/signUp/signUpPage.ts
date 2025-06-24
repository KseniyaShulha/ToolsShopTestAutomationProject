import { Page, Locator } from "@playwright/test";
import BasePage from "../basePage";

export class SignUpPage extends BasePage {
  // Locators
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly dateOfBirthField: Locator;
  private readonly streetField: Locator;
  private readonly postalCodeField: Locator;
  private readonly cityField: Locator;
  private readonly stateField: Locator;
  private readonly countryField: Locator;
  private readonly phoneField: Locator;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly registerButton: Locator;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.firstNameField = this.page.locator(`[id="first_name"]`);
    this.lastNameField = this.page.locator(`[id="last_name"]`);
    this.dateOfBirthField = this.page.locator("#dob");
    this.streetField = this.page.locator(`[id="street"]`);
    this.postalCodeField = this.page.locator(`[id="postal_code"]`);
    this.cityField = this.page.locator(`[id="city"]`);
    this.stateField = this.page.locator(`[id="state"]`);
    this.countryField = this.page.locator(`[id="country"]`);
    this.phoneField = this.page.locator(`[id="phone"]`);
    this.emailField = this.page.locator(`[id="email"]`);
    this.passwordField = this.page.locator(`[id="password"]`);
    this.registerButton = this.page.locator(`[class="btnSubmit mb-3"]`);
  }

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
    console.log(`Customer fills in dob 1990/01/01: ${dateOfBirth}`);
    const dobInput = this.page.locator('input[formcontrolname="dob"]');

    await this.page.evaluate(
      (el: any) => {
        el.value = "1990-01-01";
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      },
      await dobInput.elementHandle(),
    );
  }

  async fillInStreet(street) {
    console.log(`Customer fills in street: ${street}`);
    await this.streetField.fill(street);
  }

  async fillInState(state) {
    console.log(`Customer fills in state: ${state}`);
    await this.stateField.fill(state);
  }

  async fillInPostalCode(postalCode) {
    console.log(`Customer fills in postal code: ${postalCode}`);
    await this.postalCodeField.fill(postalCode);
  }

  async fillInCity(city) {
    console.log(`Customer fills in city: ${city}`);
    await this.cityField.fill(city);
  }

  async fillInCountry(country) {
    console.log(`Customer fills in country: ${country}`);
    await this.page.selectOption("#country", country);
  }

  async fillInPhone(phone) {
    console.log(`Customer fills in phone: ${phone}`);
    await this.phoneField.fill(phone);
  }

  async fillInEmail(email) {
    console.log(`Customer fills in email: ${email}`);
    await this.emailField.fill(email);
  }

  async fillInPassword(password) {
    console.log(`Customer fills in password: ${password}`);
    await this.passwordField.fill(password);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }
}
