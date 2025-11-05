import { test, expect } from "../fixtures/fixtures";
import { testData_login } from "../../testData/testData_login";

test.describe('TOOLS_99_login_visualTesting @ui @regression', () => {
  test("Login as customer", async ({ appPageObjects,page }) => {
  await appPageObjects.homePage().openHomePage();

  await appPageObjects.homePage().clickSignInButton();

  await appPageObjects
    .loginPage()
    .fillInEmailField(testData_login.userData.email);

  await appPageObjects
    .loginPage()
    .fillInPasswordField(testData_login.userData.password);

  await appPageObjects.loginPage().clickSubmitButton();

  const loginForm = await page.locator('[class="col-lg-6 auth-form"]')
  await expect(loginForm).toHaveScreenshot()
});
});

