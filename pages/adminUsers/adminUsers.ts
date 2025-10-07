import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../basePage";
import { Tabletojson } from "tabletojson";

export class AdminUsersPage extends BasePage {
  // Locators
  private readonly searchUserField: Locator;
  private readonly searchButton: Locator;
  private readonly usersTable: Locator;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.searchUserField = this.page.locator('[data-test="user-search-query"]');
    this.searchButton = this.page.locator('[data-test="user-search-submit"]');
    this.usersTable = this.page.locator('[class="table table-hover"]');
  }

  // Methods

  async fillInSearchUserField(value: string): Promise<void> {
    console.log(`\nAdmin fills in search field with: ${value}`);
    await this.searchUserField.fill(value);
  }

  async clickOnSearchButton(): Promise<void> {
    console.log(`\nAdmin clicks on search button`);
    await this.searchButton.click();
  }

  async getUsersTableContent(): Promise<Array<Record<string, string>>> {
    await expect(this.usersTable).toBeVisible();
    const tableHtml = await this.usersTable.innerHTML();

    const tablesAsJson = Tabletojson.convert(`<table>${tableHtml}</table>`);

    console.log(
      "\nUsers table content: ",
      JSON.stringify(tablesAsJson[0], null, 2),
    );

    return tablesAsJson[0];
  }

  async waitForUsers(): Promise<Response> {
    const response = await this.page.waitForResponse(
      (resp: any) => resp.url().includes(`/users/`) && resp.status() === 200,
    );
    return await response.json();
  }

  async getUsersTable(): Promise<any> {
    return this.usersTable;
  }
}
