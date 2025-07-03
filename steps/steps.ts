import { AppPageObjects } from "../pages/appPageObjects";
import { expect, Page } from "@playwright/test";

export class UserSteps {
  protected page: Page;
  protected appPageObjects: any;

  constructor(page: Page) {
    this.page = page;
    this.appPageObjects = new AppPageObjects(page);
  }

  async loginUi(
    email: string,
    password: string,
    surname: string,
  ): Promise<void> {
    // Customer logs in
    await this.appPageObjects.homePage().openHomePage();

    await this.appPageObjects.homePage().clickSignInButton();

    await this.appPageObjects.loginPage().fillInEmailField(email);

    await this.appPageObjects.loginPage().fillInPasswordField(password);

    await this.appPageObjects.loginPage().clickSubmitButton();

    console.log("Verify that the customers name apears in id menu");
    expect(
      await this.appPageObjects.headerSection().getDropdownLoginValue(),
    ).toContain(surname);

    await this.appPageObjects.accountPage().waitPageUrlLoaded("account");
  }

  async addRandomItemFromHomePageToCart(): Promise<void> {
    // Customer goes to home page
    await this.appPageObjects.headerSection().clickHomeInHeader();

    // Customer chooses random item on home page
    await this.appPageObjects.homePage().chooseFirstItem();

    // Customer adds item to shopping cart
    await this.appPageObjects.itemPage().clickAddToShoppingCartButton();

    // Customer goes to shopping cart
    await this.appPageObjects
      .headerSection()
      .assertItemAddedToCartMessageAppeared();

    await this.appPageObjects.headerSection().clickShoppingCartIcon();
  }

  async signOut(): Promise<void> {
    // Customer clicks on user dropdown menu in the header
    await this.appPageObjects.headerSection().clickUserDropdownMenu();

    // Customer chooses sign out option
    await this.appPageObjects.headerSection().clickSignOut();

    console.log("Verify that the Sign in appears in the header");
    await expect(this.page.locator('[data-test="nav-sign-in"]')).toBeVisible();
  }
}
