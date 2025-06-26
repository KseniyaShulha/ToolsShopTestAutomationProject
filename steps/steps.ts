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
    userFullName: string,
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
    ).toContain(userFullName);

    await this.appPageObjects.accountPage().waitPageUrlLoaded("account");
  }
}
