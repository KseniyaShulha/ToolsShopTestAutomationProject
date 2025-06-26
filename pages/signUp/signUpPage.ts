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
  async fillInFirstName(firstName: string): Promise<void> {
    // Customer fills in First name
    console.log(`Customer fills in first name field with: ${firstName}`);
    await this.firstNameField.fill(firstName);
  }

  async fillInLastName(lastName: string): Promise<void> {
    // Customer fills in Last name
    console.log(`Customer fills in last name field with: ${lastName}`);
    await this.lastNameField.fill(lastName);
  }

  async fillInDateOfBirth(dateOfBirth: string): Promise<void> {
    console.log(`Customer fills in dob field with: ${dateOfBirth}`);
    const dobInput: Locator = this.page.locator('input[formcontrolname="dob"]');

    await this.page.evaluate(
      (el: any) => {
        el.value = "1990-01-01";
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      },
      await dobInput.elementHandle(),
    );
  }

  async fillInStreet(street: string): Promise<void> {
    console.log(`Customer fills in street field with: ${street}`);
    await this.streetField.fill(street);
  }

  async fillInState(state: string): Promise<void> {
    console.log(`Customer fills in state field with: ${state}`);
    await this.stateField.fill(state);
  }

  async fillInPostalCode(postalCode: string): Promise<void> {
    console.log(`Customer fills in postal code field with: ${postalCode}`);
    await this.postalCodeField.fill(postalCode);
  }

  async fillInCity(city: string): Promise<void> {
    console.log(`Customer fills in city field with: ${city}`);
    await this.cityField.fill(city);
  }

  async fillInCountry(country: string): Promise<void> {
    console.log(`Customer fills in country field with: ${country}`);
    await this.page.selectOption("#country", country);
  }

  async fillInPhone(phone: string): Promise<void> {
    console.log(`Customer fills in phone field with: ${phone}`);
    await this.phoneField.fill(phone);
  }

  async fillInEmail(email: string): Promise<void> {
    console.log(`Customer fills in email field with: ${email}`);
    await this.emailField.fill(email);
  }

  async fillInPassword(password: string): Promise<void> {
    console.log(`Customer fills in password field with: ${password}`);
    await this.passwordField.fill(password);
  }

  async clickRegisterButton(): Promise<void> {
    console.log("User clicks on registration button");
    await this.registerButton.click();
  }
}
