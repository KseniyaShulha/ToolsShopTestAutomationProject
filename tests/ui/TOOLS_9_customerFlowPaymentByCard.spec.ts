import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_9 } from "../../testData/testData_TOOLS-9";
import { UserSteps } from "../../steps/steps";
import { addCookies } from "../../ui/uiHelper";

test("TOOLS-9 customer flow - payment by card", async ({ page, context }) => {
  // Create instance of AppPageObjects
  const appPageObjects: AppPageObjects = new AppPageObjects(page);
  const steps: UserSteps = new UserSteps(page);

  await addCookies(context, "customer3");

  await page.goto("/");

  // Customer goes to home page, chooses an item, add it to shopping cart.
  await steps.addRandomItemFromHomePageToCart();

  await appPageObjects.checkoutPage().proceedToPayment();

  // Customer fills in billing data
  await appPageObjects
    .checkoutPage()
    .fillInBillingData(
      testData_TOOLS_9.billingData.street,
      testData_TOOLS_9.billingData.city,
      testData_TOOLS_9.billingData.state,
      testData_TOOLS_9.billingData.country,
      testData_TOOLS_9.billingData.postcode,
    );

  // Customer chooses paynment method
  await appPageObjects.checkoutPage().selectPaymentMethod("credit-card");

  // Customer fills in credit card data
  await appPageObjects
    .checkoutPage()
    .fillInCreditCardData(
      testData_TOOLS_9.creditCard.creditCardNumber,
      testData_TOOLS_9.creditCard.expirationDate,
      testData_TOOLS_9.creditCard.cvvCode,
      testData_TOOLS_9.creditCard.cardHolderName,
    );

  // Customer confirms payment
  await appPageObjects.checkoutPage().clickConfirmPaymentButton();

  // Expect  succsess message is visible
  await appPageObjects.checkoutPage().assertPaymentSuccsessMessageAppeared();
});
