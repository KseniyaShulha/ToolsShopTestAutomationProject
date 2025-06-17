import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/loginPage';
import { HomePage } from '../../pages/homePage/homePage';
import { AccountPage } from '../../pages/accountPage/accountPage';

const email = 'customer@practicesoftwaretesting.com';
const password = 'welcome01'

test('TOOLS-3 login as customer', async ({ page }) => {
  // Create instance of login page class
  const loginPage = new LoginPage(page);

  // Create instance of home page class
  const homePage = new HomePage(page);

  // Create instance of account page class
  const accountPage = new AccountPage(page);

  console.log('Customer opens the home page');
  await page.goto('/');

  await homePage.clickSignInButton();

  console.log('Customer enters email');
  await loginPage.fillEmailField();

  console.log('Verify that the email field is filled correctly');
  await expect(page.locator(`[id="email"]`)).toHaveValue(email);

  console.log('Customer enters password');
  await loginPage.fillPasswordField();

  console.log('Verify that the password field is filled correctly');
  await expect(page.locator(`[id="password"]`)).toHaveValue(password);

  await loginPage.clickSubmitButton();

  console.log('Verify that the customers name apears in id menu');
  expect(await homePage.userDropdownMenu).toHaveValue('Jane Doe');

  console.log('Verify that the customer was redirected to his/her account');
  await expect(page.url()).toContain('/account');
});

