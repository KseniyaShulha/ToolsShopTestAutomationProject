import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/loginPage';
import { HomePage } from '../../pages/homePage/homePage';
import { AccountPage } from '../../pages/accountPage/accountPage';
import { SignUpPage } from '../../pages/signUp/signUpPage';
import { testData_TOOLS_6 } from '../../testData/TOOLS-6/testData_TOOLS-6';

test('TOOLS-6 sign up as customer', async ({ page, request }) => {
  // Define function to verify that credentials are correct
  async function loginApi(email, password) {
    const response = await request.post("https://api.practicesoftwaretesting.com/users/login", {
      data: {
        email: email,
        password: password,
      }
    });
    expect(response.status()).toBe(200);

    // Assert response
    const data = await response.json();
    console.log('response body', data);
    await expect(data.access_token.length).toBeGreaterThan(10);

    return data.access_token;
  }

  // Create instance of login page class
  const loginPage = new LoginPage(page);

  // Create instance of home page class
  const homePage = new HomePage(page);

  // Create instance of account page class
  const accountPage = new AccountPage(page);

  // Create instance of sign up page class
  const signUpPage = new SignUpPage(page);

  console.log('Customer opens the home page');
  await page.goto('/');

  await homePage.clickSignInButton();

  await loginPage.clickRegisterButton();

  console.log('Verify that the customer was redirected to register page');
  await page.waitForURL('**/register');

  await signUpPage.fillInFirstName(testData_TOOLS_6.firstName);

  await signUpPage.fillInLastName(testData_TOOLS_6.lastName);

  await signUpPage.fillInDateOfBirth(testData_TOOLS_6.dateOfBirth);

  await signUpPage.fillInStreet(testData_TOOLS_6.street);

  await signUpPage.fillInPostalCode(testData_TOOLS_6.postalCode);

  await signUpPage.fillInCity(testData_TOOLS_6.city);

  await signUpPage.fillInState(testData_TOOLS_6.state);

  await signUpPage.fillInCountry(testData_TOOLS_6.country);

  await signUpPage.fillInPhone(testData_TOOLS_6.phone);

  await signUpPage.fillInEmail(testData_TOOLS_6.email);

  await signUpPage.fillInPassword(testData_TOOLS_6.password);

  await signUpPage.clickRegisterButton();

  console.log('Verify that the customer was redirected to login page');
  await page.waitForURL('**/login');

  await loginApi(testData_TOOLS_6.email, testData_TOOLS_6.password);
});
