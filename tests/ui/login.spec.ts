import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/loginPage';
import { HomePage } from '../../pages/homePage/homePage';

// User credentials for this test
const email = 'customer@practicesoftwaretesting.com'
const password = 'welcome01'

test('TOOLS-3 login as customer', async ({ page }) => {
  // Create instance of login page class
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  console.log('Customer opens the home page');
  await page.goto('/');
  
  console.log('Customer clicks on login link');
  await homePage.clickSignInButton();
  // await page.locator(`[href="/auth/login"]`).click();

  console.log('Customer enters email');
  await page.locator(`[id="email"]`).fill(email);

  console.log('Verify that the email field is filled correctly');
  await expect(page.locator(`[id="email"]`)).toHaveValue(email);

  console.log('Customer enters password');
  await page.locator(`[id="password"]`).fill(password);

  console.log('Verify that the password field is filled correctly');
  await expect(page.locator(`[id="password"]`)).toHaveValue(password);

  await loginPage.clickSubmitButton();

  console.log('Verify that the customers name apears in id menu');
  await expect(page.locator(`[id="menu"]`)).toHaveText('Jane Doe');

  console.log('Verify that the customer was redirected to his/her account');
  await expect(page.url()).toContain('/account');
});

