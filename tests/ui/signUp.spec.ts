import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/loginPage';
import { HomePage } from '../../pages/homePage/homePage';
import { AccountPage } from '../../pages/accountPage/accountPage';
import { SignUpPage } from '../../pages/signUp/signUpPage';

const userObj = {
  firstName: 'Ivan',
  lastName: 'Wolf',
  dateOfBirth: '01.01.1990',
  street: '123 Maple Avenue',
  postalCode: '62704',
  city: 'Springfield',
  state: 'IL',
  country: 'AL',
  phone: '12135558294',
  email: `ivanwolf+${Date.now()}@gmail.com`,
  password: 'ivanwolF#123',
}

test('TOOLS-6 sign up as customer', async ({ page }) => {
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

  await signUpPage.fillInFirstName(userObj.firstName);

  await signUpPage.fillInLastName(userObj.lastName);

  await signUpPage.fillInDateOfBirth(userObj.dateOfBirth);

  await signUpPage.fillInStreet(userObj.street);

  await signUpPage.fillInPostalCode(userObj.postalCode);

  await signUpPage.fillInCity(userObj.city);

  await signUpPage.fillInState(userObj.state);

  await signUpPage.fillInCountry(userObj.country);

  await signUpPage.fillInPhone(userObj.phone);

  await signUpPage.fillInEmail(userObj.email);

  await signUpPage.fillInPassword(userObj.password);

  await signUpPage.clickRegisterButton();

  console.log('Verify that the customer was redirected to login page');
  await page.waitForURL('**/login');

  await loginPage.fillInEmailField(userObj.email);

  await loginPage.fillInPasswordField(userObj.password);

  await loginPage.clickSubmitButton();

  console.log('Verify that the customers name apears in id menu');
  await expect(homePage.userDropdownMenu).toHaveText(userObj.firstName + " " + userObj.lastName, { timeout: 5_000 });

  console.log('Verify that the customer was redirected to his/her account');
  await page.waitForURL('**/account');
});