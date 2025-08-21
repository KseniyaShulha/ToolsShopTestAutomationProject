import { test, expect } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_login } from "../../testData/testData_login";

test("TOOLS-3 login as customer", async ({ page }) => {
  // Create instance of AppPageObjects
  const appPageObjects = new AppPageObjects(page);

  await appPageObjects.homePage().openHomePage();

  await appPageObjects.homePage().clickSignInButton();

  await appPageObjects
    .loginPage()
    .fillInEmailField(testData_login.userData.email);

  await appPageObjects
    .loginPage()
    .fillInPasswordField(testData_login.userData.password);

  await appPageObjects.loginPage().clickSubmitButton();

  console.log("Verify that the customers name apears in id menu");
  expect(
    await appPageObjects.headerSection().getDropdownLoginValue(),
  ).toContain(testData_login.userData.surname);

  await appPageObjects.accountPage().waitPageUrlLoaded("account");
});
