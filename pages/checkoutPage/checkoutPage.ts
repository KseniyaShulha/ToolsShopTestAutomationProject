import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../basePage";

export class CheckoutPage extends BasePage {
  // Locators
  private readonly proceedButton1: Locator;
  private readonly streetField: Locator;
  private readonly cityField: Locator;
  private readonly stateField: Locator;
  private readonly countryField: Locator;
  private readonly postalCodeField: Locator;
  private readonly proceedButton2: Locator;
  private readonly paymentMethodDropDown: Locator;
  private readonly creditCardNumberField: Locator;
  private readonly creditCardExpirationDateField: Locator;
  private readonly creditCardCvvCodeField: Locator;
  private readonly creditCardHolderNameField: Locator;
  private readonly confirmPaymentButton: Locator;
  private readonly paymentSuccsessMessage: Locator;
  private readonly proceedButton3: Locator;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.proceedButton1 = this.page.locator('[data-test="proceed-1"]');
    this.streetField = this.page.locator('[id="street"]');
    this.cityField = this.page.locator('[id="city"]');
    this.stateField = this.page.locator('[id="state"]');
    this.countryField = this.page.locator('[id="country"]');
    this.postalCodeField = this.page.locator('[id="postal_code"]');
    this.proceedButton2 = this.page.locator('[data-test="proceed-2"]');
    this.creditCardNumberField = this.page.locator('[id="credit_card_number"]');
    this.creditCardExpirationDateField = this.page.locator(
      '[id="expiration_date"]',
    );
    this.creditCardCvvCodeField = page.locator('[id="cvv"]');
    this.creditCardHolderNameField = page.locator('[id="card_holder_name"]');
    this.confirmPaymentButton = page.locator('[data-test="finish"]');
    this.paymentSuccsessMessage = page.locator(
      '[data-test="payment-success-message"]',
    );
    this.proceedButton3 = this.page.locator('button[data-test="proceed-3"]');
  }

  // Methods
  async clickProceedButton3() {
    console.log("User clicks on the proceed button 3");
    await this.proceedButton3.click();
  }

  async clickProceedButton1() {
    console.log("User clicks on the proceed button 1");
    await this.proceedButton1.click({ timeout: 5000 });
  }

  async fillInStreetField(street) {
    console.log(`User fills in: ${street}`);
    await this.streetField.fill(street);
  }

  async fillInCityField(city) {
    console.log(`User fills in: ${city}`);
    await this.cityField.fill(city);
  }

  async fillInStateField(state) {
    console.log(`User fills in: ${state}`);
    await this.stateField.fill(state);
  }

  async fillInCountryField(country) {
    console.log(`User fills in: ${country}`);
    await this.countryField.fill(country);
  }

  async fillInPostalCodeField(postcode) {
    console.log(`User fills in: ${postcode}`);
    await this.postalCodeField.fill(postcode);
  }

  async clickProceedButton2() {
    console.log("User clicks on the proceed button 2");
    await this.proceedButton2.click();
  }

  async selectPaymentMethod(paymentMethod) {
    console.log(`User selects payment method to be: ${paymentMethod}`);
    await this.page.selectOption('select[id="payment-method"]', paymentMethod);
  }

  async fillInCreditCardNumberField(cardNumber) {
    console.log(`User selects payment method to be: ${cardNumber}`);
    await this.creditCardNumberField.fill(cardNumber);
  }

  async fillInCreditCardExpirationDateField(expirationDate) {
    console.log(`User fills in: ${expirationDate}`);
    await this.creditCardExpirationDateField.fill(expirationDate);
  }

  async fillInCreditCardCvvCodeField(cvvCode) {
    console.log(`User fills in: ${cvvCode}`);
    await this.creditCardCvvCodeField.fill(cvvCode);
  }

  async fillInCreditCardHolderNameField(cardHolderName) {
    console.log(`User fills in: ${cardHolderName}`);
    await this.creditCardHolderNameField.fill(cardHolderName);
  }

  async clickConfirmPaymentButton() {
    console.log("User clicks on the confirm button");
    await this.confirmPaymentButton.click();
  }

  async expectPaymentSuccsessMessage() {
    console.log("The payment is successfully confirmed via a message");
    await expect(this.paymentSuccsessMessage).toBeVisible();
  }
}
