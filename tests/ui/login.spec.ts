import { test, expect } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_9 } from "../../testData/testData_TOOLS-9";

const email = "customer@practicesoftwaretesting.com";
const password = "welcome01";

test("TOOLS-3 login as customer", async ({ page }) => {
  // Create instance of AppPageObjects
  const appPageObjects = new AppPageObjects(page);

  await appPageObjects.homePage().openHomePage();

  await appPageObjects.homePage().clickSignInButton();

  await appPageObjects.loginPage().fillInEmailField(email);

  await appPageObjects.loginPage().fillInPasswordField(password);

  await appPageObjects.loginPage().clickSubmitButton();

  console.log("Verify that the customers name apears in id menu");
  expect(
    await appPageObjects.headerSection().getDropdownLoginValue(),
  ).toContain("Doe");

  await appPageObjects.accountPage().waitPageUrlLoaded("account");
});
