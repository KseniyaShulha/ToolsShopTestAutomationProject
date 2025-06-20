import { test, expect, request, } from '@playwright/test';
import { LoginPage } from '../../pages/auth/loginPage';
import { HomePage } from '../../pages/homePage/homePage';
import { AccountPage } from '../../pages/accountPage/accountPage';
import { SignUpPage } from '../../pages/signUp/signUpPage';
import { faker } from '@faker-js/faker';

const userObj = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  dateOfBirth: faker.date.birthdate(),
  street: faker.location.streetAddress(),
  postalCode: faker.location.zipCode(),
  city: faker.location.city(),
  state: 'IL',
  country: 'AL',
  phone: Date.now().toString(),
  email: faker.internet.email(),
  password: "1Qq!" + faker.internet.password({ length: 8 }),
}

test('TOOLS-6 sign up as customer', async ({ page, request }) => {
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

  // Send login req
  const response = await request.post("https://api.practicesoftwaretesting.com/users/login", {
    data: {
      email: userObj.email,
      password: userObj.password,
    }
  });
  expect(response.status()).toBe(200);

  // Assert response
  const data = await response.json();
  console.log('response body', data);
  await expect(data.access_token.length).toBeGreaterThan(10);
});
