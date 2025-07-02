import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_13 } from "../../testData/testData_TOOLS-13";
import { UserSteps } from "../../steps/steps";

test("TOOLS-13 customer flow - payment by cash on delivery", async ({
  page,
}) => {
  // Create instance of AppPageObjects
  const appPageObjects: AppPageObjects = new AppPageObjects(page);
  const steps: UserSteps = new UserSteps(page);

  // Log in using steps.ts
  await steps.loginUi(
    testData_TOOLS_13.userData.email,
    testData_TOOLS_13.userData.password,
    testData_TOOLS_13.userData.surname,
  );

  // Customer goes to home page, chooses an item, add it to shopping cart.
  await steps.addRandomItemFromHomePageToCart();

  await appPageObjects.checkoutPage().proceedToPayment();

  // Customer fills in billing data
  await appPageObjects
    .checkoutPage()
    .fillInBillingData(
      testData_TOOLS_13.billingData.street,
      testData_TOOLS_13.billingData.city,
      testData_TOOLS_13.billingData.state,
      testData_TOOLS_13.billingData.country,
      testData_TOOLS_13.billingData.postcode,
    );

  // Customer chooses paynment method
  await appPageObjects.checkoutPage().selectPaymentMethod("buy-now-pay-later");

  // Customer chooses monthly installment
  await appPageObjects.checkoutPage().selectRandomMonthlyInstallments();

  // Customer confirms payment
  await appPageObjects.checkoutPage().clickConfirmPaymentButton();

  // Expect  succsess message is visible
  await appPageObjects.checkoutPage().assertPaymentSuccsessMessageAppeared();
});
