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

  await loginPage.fillEmailField(email);

  await loginPage.fillPasswordField(password);

  await loginPage.clickSubmitButton();

  console.log('Verify that the customers name apears in id menu');
  await expect(homePage.userDropdownMenu).toHaveText('Jane Doe', { timeout: 5_000 });

  console.log('Verify that the customer was redirected to his/her account');
  await page.waitForURL('**/account');;
});

