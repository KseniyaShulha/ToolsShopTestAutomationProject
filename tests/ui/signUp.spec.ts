import { test, expect } from "@playwright/test";
import { testData_TOOLS_6 } from "../../testData/TOOLS-6/testData_TOOLS-6";
import { AppPageObjects } from "../../pages/appPageObjects";

test("TOOLS-6 sign up as customer", async ({ page, request }) => {
  const appPageObjects = new AppPageObjects(page);

  console.log("Customer opens the home page");
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
  await loginApi(testData_TOOLS_6.email, testData_TOOLS_6.password, request);
});

// Define function to verify that credentials are correct
async function loginApi(
  email: string,
  password: string,
  request: any,
): Promise<string | null> {
  const response = await request.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      data: {
        email: email,
        password: password,
      },
    },
  );
  expect(response.status()).toBe(200);

  // Assert response
  const data = await response.json();
  console.log("response body", data);
  expect(data.access_token.length).toBeGreaterThan(10);

  // Return token
  return data.access_token;
}
