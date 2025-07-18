import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_12 } from "../../testData/testData_TOOLS-12";
import { UserSteps } from "../../steps/steps";

test("TOOLS-12 customer flow - payment by cash on delivery", async ({
  page,
}) => {
  // Create instance of AppPageObjects
  const appPageObjects: AppPageObjects = new AppPageObjects(page);
  const steps: UserSteps = new UserSteps(page);

  // Log in using steps.ts
  await steps.loginUi(
    testData_TOOLS_12.userData.email,
    testData_TOOLS_12.userData.password,
    testData_TOOLS_12.userData.surname,
  );

  // Customer goes to home page, chooses an item, add it to shopping cart.
  await steps.addRandomItemFromHomePageToCart();

  await appPageObjects.checkoutPage().proceedToPayment();

  // Customer fills in billing data
  await appPageObjects
    .checkoutPage()
    .fillInBillingData(
      testData_TOOLS_12.billingData.street,
      testData_TOOLS_12.billingData.city,
      testData_TOOLS_12.billingData.state,
      testData_TOOLS_12.billingData.country,
      testData_TOOLS_12.billingData.postcode,
    );

  // Customer chooses paynment method
  await appPageObjects.checkoutPage().selectPaymentMethod("cash-on-delivery");

  // Customer confirms payment
  await appPageObjects.checkoutPage().clickConfirmPaymentButton();

  // Expect  succsess message is visible
  await appPageObjects.checkoutPage().assertPaymentSuccsessMessageAppeared();
});
