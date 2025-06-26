import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_9 } from "../../test_data/TOOLS_9/testData_TOOLS-9";
import { UserSteps } from "../../steps/steps";

const email = "customer@practicesoftwaretesting.com";
const password = "welcome01";

test("TOOLS-9 customer flow - payment by card", async ({ page }) => {
  // Create instance of AppPageObjects
  const appPageObjects = new AppPageObjects(page);
  const steps = new UserSteps(page);

  await steps.loginUi(email, password, "Jane Doe");

  // Customer chooses random item on home page
  await appPageObjects.headerSection().clickHomeInHeader();

  await appPageObjects.homePage().choiceOfTheItem();

  // Customer adds item to shopping cart
  await appPageObjects.itemPage().clickAddToShoppingCartButton();

  // Customer goes to shopping cart
  await appPageObjects.headerSection().assertItemAddedToCartMessageOccure();

  await appPageObjects.headerSection().clickShoppingCartIcon();

  // Customer clicks on the "proceed to checkout" button
  await appPageObjects.checkoutPage().clickProceedButton1();

  // Customer clicks on the "proceed to checkout" button
  await appPageObjects.checkoutPage().clickProceedButton2();

  // Customer fills in billing data
  await appPageObjects
    .checkoutPage()
    .fillInStreetField(testData_TOOLS_9.billingData.street);

  await appPageObjects
    .checkoutPage()
    .fillInCityField(testData_TOOLS_9.billingData.city);

  await appPageObjects
    .checkoutPage()
    .fillInStateField(testData_TOOLS_9.billingData.state);

  await appPageObjects
    .checkoutPage()
    .fillInCountryField(testData_TOOLS_9.billingData.country);

  await appPageObjects
    .checkoutPage()
    .fillInPostalCodeField(testData_TOOLS_9.billingData.postcode);

  // Customer clicks on the "proceed to checkout" button
  await appPageObjects.checkoutPage().clickProceedButton3();

  // Customer chooses paynment method
  await appPageObjects.checkoutPage().selectPaymentMethod("credit-card");

  // Customer fills in credit catd data
  await appPageObjects
    .checkoutPage()
    .fillInCreditCardNumberField(testData_TOOLS_9.creditCard.creditCardNumber);

  await appPageObjects
    .checkoutPage()
    .fillInCreditCardExpirationDateField(
      testData_TOOLS_9.creditCard.expirationDate,
    );

  await appPageObjects
    .checkoutPage()
    .fillInCreditCardCvvCodeField(testData_TOOLS_9.creditCard.cvvCode);

  await appPageObjects
    .checkoutPage()
    .fillInCreditCardHolderNameField(
      testData_TOOLS_9.creditCard.cardHolderName,
    );

  await appPageObjects.checkoutPage().clickConfirmPaymentButton();

  // Expect  succsess message is visible
  await appPageObjects.checkoutPage().expectPaymentSuccsessMessage();
});
