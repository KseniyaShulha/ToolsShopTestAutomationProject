import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_9 } from "../../testData/testData_TOOLS-9";
import { UserSteps } from "../../steps/steps";
import path from "path";

let testData = structuredClone(testData_TOOLS_9);

test.use({
  storageState: path.resolve(__dirname, "../../.auth/customer3.json"),
});

test.describe(
  "CustomerFlowPaymentByCard",
  { tag: ["@ui", "@smoke", "@regression", "@payment"] },
  () => {
    test("TOOLS_9 Customer flow - payment by card", async ({ page }) => {
      // Create instance of AppPageObjects
      const appPageObjects: AppPageObjects = new AppPageObjects(page);
      const steps: UserSteps = new UserSteps(page);

      await page.goto("/");

      // Customer goes to home page, chooses an item, add it to shopping cart.
      await steps.addRandomItemFromHomePageToCart();

      await appPageObjects.checkoutPage().proceedToPayment();

      // Customer fills in billing data
      await appPageObjects
        .checkoutPage()
        .fillInBillingData(
          testData.billingData.street,
          testData.billingData.city,
          testData.billingData.state,
          testData.billingData.country,
          testData.billingData.postcode,
        );

      // Customer chooses paynment method
      await appPageObjects.checkoutPage().selectPaymentMethod("credit-card");

      // Customer fills in credit card data
      await appPageObjects
        .checkoutPage()
        .fillInCreditCardData(
          testData.creditCard.creditCardNumber,
          testData.creditCard.expirationDate,
          testData.creditCard.cvvCode,
          testData.creditCard.cardHolderName,
        );

      // Customer confirms payment
      await appPageObjects.checkoutPage().clickConfirmPaymentButton();

      // Expect  succsess message is visible
      await appPageObjects
        .checkoutPage()
        .assertPaymentSuccsessMessageAppeared();
    });
  },
);
