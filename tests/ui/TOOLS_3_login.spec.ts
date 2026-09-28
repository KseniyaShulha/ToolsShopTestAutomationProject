import { test, expect } from "../fixtures/fixtures";
import { testData_login } from "../../testData/testData_login";

let testData = structuredClone(testData_login);

test.describe(
  "Login",
  { tag: ["@ui", "@smoke", "@regression", "@auth"] },
  () => {
    test("TOOLS_3 Login as customer", async ({ appPageObjects }) => {
      await appPageObjects.homePage().openHomePage();

      await appPageObjects.homePage().clickSignInButton();

      await appPageObjects
        .loginPage()
        .fillInEmailField(testData.userData.email);

      await appPageObjects
        .loginPage()
        .fillInPasswordField(testData.userData.password);

      await appPageObjects.loginPage().clickSubmitButton();

      console.log("\nVerify that the customers name apears in id menu");
      expect(
        await appPageObjects.headerSection().getDropdownLoginValue(),
      ).toContain(testData.userData.surname);

      await appPageObjects.accountPage().waitPageUrlLoaded("account");
    });
  },
);
