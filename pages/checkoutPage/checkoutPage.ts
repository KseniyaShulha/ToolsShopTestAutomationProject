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
  private readonly bankNameField: Locator;
  private readonly accountNameField: Locator;
  private readonly accountNumberField: Locator;

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
    this.bankNameField = this.page.locator('[id="bank_name"]');
    this.accountNameField = this.page.locator('[id="account_name"]');
    this.accountNumberField = this.page.locator('[id="account_number"]');
  }

  // Methods
  async proceedToPayment(): Promise<void> {
    // Customer clicks on the "proceed to checkout" button
    await this.clickProceedButton(1);

    // Customer clicks on the "proceed to checkout" button
    await this.clickProceedButton(2);
  }

  async fillInBillingData(
    street: string,
    city: string,
    state: string,
    country: string,
    postcode: string,
  ): Promise<void> {
    // Customer fills in billing data
    await this.fillInStreetField(street);

    await this.fillInCityField(city);

    await this.fillInStateField(state);

    await this.fillInCountryField(country);

    await this.fillInPostalCodeField(postcode);

    // Customer clicks on the "proceed to checkout" button
    await this.clickProceedButton(3);
  }

  // Customer fills in Bank data
  async fillInBankData(
    bankName: string,
    accountName: string,
    accountNumber: string,
  ): Promise<void> {
    await this.fillInBankName(bankName);

    await this.fillInAccountName(accountName);

    await this.fillInAccountNumber(accountNumber);
  }

  // Customer fills in billing adress
  async fillInCreditCardData(
    creditCardNumber: string,
    expirationDate: string,
    cvvCode: string,
    cardHolderName: string,
  ): Promise<void> {
    // Customer fills in credit card data
    await this.fillInCreditCardNumberField(creditCardNumber);

    await this.fillInCreditCardExpirationDateField(expirationDate);

    await this.fillInCreditCardCvvCodeField(cvvCode);

    await this.fillInCreditCardHolderNameField(cardHolderName);
  }

  async clickProceedButton(step: number): Promise<void> {
    console.log(`User clicks on the proceed button ${step}`);
    if (step === 1) {
      await this.proceedButton1.click();
    } else if (step === 2) {
      await this.proceedButton2.click();
    } else {
      await this.proceedButton3.click();
    }
  }

  async fillInStreetField(street: string): Promise<void> {
    console.log(`User fills in street field with: ${street}`);
    await this.streetField.fill(street);
  }

  async fillInCityField(city: string): Promise<void> {
    console.log(`User fills in city field with: ${city}`);
    await this.cityField.fill(city);
  }

  async fillInStateField(state: string): Promise<void> {
    console.log(`User fills in state field with: ${state}`);
    await this.stateField.fill(state);
  }

  async fillInCountryField(country: string): Promise<void> {
    console.log(`User fills in country field with: ${country}`);
    await this.countryField.fill(country);
  }

  async fillInPostalCodeField(postcode: string): Promise<void> {
    console.log(`User fills in postal code field with: ${postcode}`);
    await this.postalCodeField.fill(postcode);
  }

  async selectPaymentMethod(paymentMethod: string): Promise<void> {
    console.log(`User selects payment method to be: ${paymentMethod}`);
    await this.page.selectOption('select[id="payment-method"]', paymentMethod);
  }

  async fillInBankName(bankName: string): Promise<void> {
    console.log(`User fills in bank name field with: ${bankName}`);
    await this.bankNameField.fill(bankName);
  }

  async fillInAccountName(accountName: string): Promise<void> {
    console.log(`User fills in account name field with: ${accountName}`);
    await this.accountNameField.fill(accountName);
  }

  async fillInAccountNumber(accountNumber: string): Promise<void> {
    console.log(`User fills in account number field with: ${accountNumber}`);
    await this.accountNumberField.fill(accountNumber);
  }

  async fillInCreditCardNumberField(cardNumber: string): Promise<void> {
    console.log(`User fills in credit card number field with: ${cardNumber}`);
    await this.creditCardNumberField.fill(cardNumber);
  }

  async fillInCreditCardExpirationDateField(
    expirationDate: string,
  ): Promise<void> {
    console.log(
      `User fills in credit card expiration field with: ${expirationDate}`,
    );
    await this.creditCardExpirationDateField.fill(expirationDate);
  }

  async fillInCreditCardCvvCodeField(cvvCode: string): Promise<void> {
    console.log(`User fills in cvv code field with: ${cvvCode}`);
    await this.creditCardCvvCodeField.fill(cvvCode);
  }

  async fillInCreditCardHolderNameField(cardHolderName: string): Promise<void> {
    console.log(
      `User fills in credit card holder name field with: ${cardHolderName}`,
    );
    await this.creditCardHolderNameField.fill(cardHolderName);
  }

  async clickConfirmPaymentButton(): Promise<void> {
    console.log("User clicks on the confirm payment button");
    await this.confirmPaymentButton.click();
  }

  async assertPaymentSuccsessMessageAppeared(): Promise<void> {
    console.log("The payment is successfully confirmed via a message");
    await expect(this.paymentSuccsessMessage).toBeVisible();
  }
}
