import { test } from "@playwright/test";
import { testData_TOOLS_6 } from "../../testData/testData_TOOLS-6";
import { AppPageObjects } from "../../pages/appPageObjects";
import { loginApi } from "../../api/apiHelper";

let testData = structuredClone(testData_TOOLS_6);

test.describe(
  "SignUp",
  { tag: ["@ui", "@smoke", "@regression", "@auth"] },
  () => {
    test("TOOLS_6 Sign up as customer", async ({ page, request }) => {
      const appPageObjects = new AppPageObjects(page);

      console.log("\nCustomer opens the home page");
      await appPageObjects.homePage().openHomePage();

      await appPageObjects.homePage().clickSignInButton();

      await appPageObjects.loginPage().clickRegisterButton();

      await appPageObjects.signUpPage().waitPageUrlLoaded("register");

      await appPageObjects
        .signUpPage()
        .fillInFirstName(testData.firstName);

      await appPageObjects
        .signUpPage()
        .fillInLastName(testData.lastName);

      await appPageObjects
        .signUpPage()
        .fillInDateOfBirth(testData.dateOfBirth);

      await appPageObjects.signUpPage().fillInStreet(testData.street);

      await appPageObjects
        .signUpPage()
        .fillInPostalCode(testData.postalCode);

      await appPageObjects.signUpPage().fillInCity(testData.city);

      await appPageObjects.signUpPage().fillInState(testData.state);

      await appPageObjects.signUpPage().fillInCountry(testData.country);

      await appPageObjects.signUpPage().fillInPhone(testData.phone);

      await appPageObjects.signUpPage().fillInEmail(testData.email);

      await appPageObjects
        .signUpPage()
        .fillInPassword(testData.password);

      await appPageObjects.signUpPage().clickRegisterButton();

      await appPageObjects.loginPage().waitPageUrlLoaded("login");

      // Confirm that its possible to login
      await loginApi(
        {
          email: testData.email,
          password: testData.password,
        },
        request,
      );
    });
  },
);
