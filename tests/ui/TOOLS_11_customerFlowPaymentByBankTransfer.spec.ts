import { test } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_11 } from "../../testData/testData_TOOLS-11";
import { UserSteps } from "../../steps/steps";
import { addCookies } from "../../ui/uiHelper";

test("TOOLS-11 customer flow - payment by bank transfer", async ({
  page,
  context,
}) => {
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
      testData_TOOLS_11.billingData.street,
      testData_TOOLS_11.billingData.city,
      testData_TOOLS_11.billingData.state,
      testData_TOOLS_11.billingData.country,
      testData_TOOLS_11.billingData.postcode,
    );

  // Customer chooses paynment method
  await appPageObjects.checkoutPage().selectPaymentMethod("bank-transfer");

  //Customer fills in bank data
  await appPageObjects
    .checkoutPage()
    .fillInBankData(
      testData_TOOLS_11.bankData.bankName,
      testData_TOOLS_11.bankData.accountName,
      testData_TOOLS_11.bankData.accountNumber,
    );

  // Customer confirms payment
  await appPageObjects.checkoutPage().clickConfirmPaymentButton();

  // Expect  succsess message is visible
  await appPageObjects.checkoutPage().assertPaymentSuccsessMessageAppeared();
});
