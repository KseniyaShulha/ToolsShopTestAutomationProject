import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_9 } from "../../test_data/TOOLS_9/testData_TOOLS-9";
import { UserSteps } from "../../steps/steps";

test("TOOLS-9 customer flow - payment by card", async ({ page }) => {
  // Create instance of AppPageObjects
  const appPageObjects: AppPageObjects = new AppPageObjects(page);
  const steps: UserSteps = new UserSteps(page);

  // Log in using steps.ts
  await steps.loginUi(
    testData_TOOLS_9.userData.email,
    testData_TOOLS_9.userData.password,
    testData_TOOLS_9.userData.fullName,
  );

  // Customer goes to home page
  await appPageObjects.headerSection().clickHomeInHeader();

  // Customer chooses random item on home page
  await appPageObjects.homePage().chooseFirstItem();

  // Customer adds item to shopping cart
  await appPageObjects.itemPage().clickAddToShoppingCartButton();

  // Customer goes to shopping cart
  await appPageObjects.headerSection().assertItemAddedToCartMessageAppeared();

  await appPageObjects.headerSection().clickShoppingCartIcon();

  // Customer clicks on the "proceed to checkout" button
  await appPageObjects.checkoutPage().clickProceedButton(1);

  // Customer clicks on the "proceed to checkout" button
  await appPageObjects.checkoutPage().clickProceedButton(2);

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
  await appPageObjects.checkoutPage().clickProceedButton(3);

  // Customer chooses paynment method
  await appPageObjects.checkoutPage().selectPaymentMethod("credit-card");

  // Customer fills in credit card data
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
  await appPageObjects.checkoutPage().assertPaymentSuccsessMessageAppeared();
});
