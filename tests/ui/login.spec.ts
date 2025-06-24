import { test, expect } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";

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
  ).toContain("Jane Doe");

  await appPageObjects.accountPage().waitPageUrlLoaded('account');
});
