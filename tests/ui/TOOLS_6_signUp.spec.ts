import { test } from "@playwright/test";
import { testData_TOOLS_6 } from "../../testData/testData_TOOLS-6";
import { AppPageObjects } from "../../pages/appPageObjects";
import { loginApi } from "../../api/apiHelper";

test("TOOLS-6 sign up as customer", async ({ page, request }) => {
  const appPageObjects = new AppPageObjects(page);

  console.log("\nCustomer opens the home page");
  await appPageObjects.homePage().openHomePage();

  await appPageObjects.homePage().clickSignInButton();

  await appPageObjects.loginPage().clickRegisterButton();

  await appPageObjects.signUpPage().waitPageUrlLoaded("register");

  await appPageObjects.signUpPage().fillInFirstName(testData_TOOLS_6.firstName);

  await appPageObjects.signUpPage().fillInLastName(testData_TOOLS_6.lastName);

  await appPageObjects
    .signUpPage()
    .fillInDateOfBirth(testData_TOOLS_6.dateOfBirth);

  await appPageObjects.signUpPage().fillInStreet(testData_TOOLS_6.street);

  await appPageObjects
    .signUpPage()
    .fillInPostalCode(testData_TOOLS_6.postalCode);

  await appPageObjects.signUpPage().fillInCity(testData_TOOLS_6.city);

  await appPageObjects.signUpPage().fillInState(testData_TOOLS_6.state);

  await appPageObjects.signUpPage().fillInCountry(testData_TOOLS_6.country);

  await appPageObjects.signUpPage().fillInPhone(testData_TOOLS_6.phone);

  await appPageObjects.signUpPage().fillInEmail(testData_TOOLS_6.email);

  await appPageObjects.signUpPage().fillInPassword(testData_TOOLS_6.password);

  await appPageObjects.signUpPage().clickRegisterButton();

  await appPageObjects.loginPage().waitPageUrlLoaded("login");

  // Confirm that its possible to login
  await loginApi(
    {
      email: testData_TOOLS_6.email,
      password: testData_TOOLS_6.password,
    },
    request,
  );
});
