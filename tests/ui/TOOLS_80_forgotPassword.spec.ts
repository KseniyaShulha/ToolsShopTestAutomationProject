import { test } from "../fixtures/fixtures";
import { testData_TOOLS_80 } from "../../testData/testData_TOOLS_80";

let testData = structuredClone(testData_TOOLS_80);

test.describe(
  "Forgot password",
  { tag: ["@ui", "@smoke", "@regression", "@auth"] },
  () => {
    test("TOOLS_80 Forgot password", async ({ appPageObjects }) => {
      await appPageObjects.homePage().openHomePage();

      await appPageObjects.homePage().clickSignInButton();

      await appPageObjects.loginPage().clickForgotPasswordLink();

      await appPageObjects
        .forgotPasswordPage()
        .fillInEmailField(testData.email);

      await appPageObjects.forgotPasswordPage().clickSubmitButton();

      await appPageObjects.forgotPasswordPage().assertSuccsessMessageAppeared();
    });
  },
);
