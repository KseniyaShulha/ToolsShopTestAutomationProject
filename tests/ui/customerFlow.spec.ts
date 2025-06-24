import { test, expect } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";

const email = "customer@practicesoftwaretesting.com";
const password = "welcome01";
const billingData = {
  street: "Test street 9991",
  city: "Vienna",
  state: "AL",
  country: "Austria",
  postcode: "55342366",
};
const creditCard = {
  creditCardNumber: "4242-4242-4242-4242",
  expirationDate: "12/2025",
  cvvCode: "123",
  cardHolderName: "Customer One",
};

test("TOOLS-9 customer flow", async ({ page }) => {
  // Create instance of AppPageObjects
  const appPageObjects = new AppPageObjects(page);

  // Customer logs in
  await appPageObjects.homePage().openHomePage();

  await appPageObjects.homePage().clickSignInButton();

  await appPageObjects.loginPage().fillInEmailField(email);

  await appPageObjects.loginPage().fillInPasswordField(password);

  await appPageObjects.loginPage().clickSubmitButton();

  console.log("Verify that the customers name apears in id menu");
  expect(
    await appPageObjects.headerSection().getDropdownLoginValue(),
  ).toContain("Jane Doe");

  await appPageObjects.accountPage().waitPageUrlLoaded("account");

  // Customer chooses random item on home
  await page.locator('[data-test="nav-home"]').click();

  await page.locator('[class="card-img-top"]').first().click();

  // Customer adds item to shopping cart
  await page.locator('[id="btn-add-to-cart"]').click();

  // Customer goes to shopping cart
  await page.locator('[href="/checkout"]').click();

  // Customer clicks on the "proceed to checkout" button
  await page.locator('[data-test="proceed-1"]').click();

  // Customer fills in credentials for login
  // await page.locator('[id="email"]').fill(email);

  // await page.locator('[id="password"]').fill(password);

  // await page.locator('[class="btnSubmit"]').click();

  // Customer clicks on the "proceed to checkout" button
  await page.locator('[data-test="proceed-2"]').click();

  // Customer fills in billing data
  await page.locator('[id="street"]').fill(billingData.street);

  await page.locator('[id="city"]').fill(billingData.city);

  await page.locator('[id="state"]').fill(billingData.state);

  await page.locator('[id="country"]').fill(billingData.country);

  await page.locator('[id="postal_code"]').fill(billingData.postcode);

  // Customer clicks on the "proceed to checkout" button
  await page.locator('[data-test="proceed-3"]').click();

  // Customer chooses paynment method
  await page.selectOption('[id="payment-method"]', "credit-card");

  // Customer fills in credit catd data
  await page
    .locator('[id="credit_card_number"]')
    .fill(creditCard.creditCardNumber);

  await page.locator('[id="expiration_date"]').fill(creditCard.expirationDate);

  await page.locator('[id="cvv"]').fill(creditCard.cvvCode);

  await page.locator('[id="card_holder_name"]').fill(creditCard.cardHolderName);

  await page.locator('[data-test="finish"]').click();

  // Expect  succsess message is visible
  await expect(
    page.locator('[data-test="payment-success-message"]'),
  ).toBeVisible();
});
