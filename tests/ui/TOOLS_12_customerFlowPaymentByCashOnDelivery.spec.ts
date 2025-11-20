import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_12 } from "../../testData/testData_TOOLS-12";
import { UserSteps } from "../../steps/steps";
import path from "path";

let testData = structuredClone(testData_TOOLS_12);

test.use({
  storageState: path.resolve(__dirname, "../../.auth/customer1.json"),
});

test.describe(
  "CustomerFlowPaymentByCashOnDelivery",
  { tag: ["@ui", "@regression", "@payment", "@smoke"] },
  () => {
    test("TOOLS_12 Customer flow - payment by cash on delivery", async ({ page }) => {
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
      await appPageObjects
        .checkoutPage()
        .selectPaymentMethod("cash-on-delivery");

      // Customer confirms payment
      await appPageObjects.checkoutPage().clickConfirmPaymentButton();

      // Expect  succsess message is visible
      await appPageObjects
        .checkoutPage()
        .assertPaymentSuccsessMessageAppeared();
    });
  },
);
