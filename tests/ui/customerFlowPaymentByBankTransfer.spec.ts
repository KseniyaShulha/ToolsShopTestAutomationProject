import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_9 } from "../../testData/testData_TOOLS-9";
import { UserSteps } from "../../steps/steps";

test("TOOLS-11 customer flow - payment by bank transfer", async ({ page }) => {
  // Create instance of AppPageObjects
  const appPageObjects: AppPageObjects = new AppPageObjects(page);
  const steps: UserSteps = new UserSteps(page);

  // Log in using steps.ts
  await steps.loginUi(
    testData_TOOLS_9.userData.email,
    testData_TOOLS_9.userData.password,
    testData_TOOLS_9.userData.fullName,
  );

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
  await appPageObjects.checkoutPage().selectPaymentMethod("bank-transfer");

  //Customer fills in bank data
  await appPageObjects
    .checkoutPage()
    .fillInBankData(
      testData_TOOLS_9.bankData.bankName,
      testData_TOOLS_9.bankData.accountName,
      testData_TOOLS_9.bankData.accountNumber,
    );

  await appPageObjects.checkoutPage().clickConfirmPaymentButton();

  // Expect  succsess message is visible
  await appPageObjects.checkoutPage().assertPaymentSuccsessMessageAppeared();
});
