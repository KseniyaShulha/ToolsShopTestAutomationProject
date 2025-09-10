import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../basePage";
import { Tabletojson } from "tabletojson";

export class OrdersPage extends BasePage {
  // Locators
  private readonly searchField: Locator;
  private readonly searchButton: Locator;
  private readonly ordersTable: Locator;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.searchField = this.page.locator('[data-test="order-search-query"]');
    this.searchButton = this.page.locator('[data-test="order-search-submit"]');
    this.ordersTable = this.page.locator("table.table-hover");
  }

  // Methods
  async fillInSearchFieldInOrders(invoiceNumber: string): Promise<void> {
    console.log(`\nAdmin fills in search field with: ${invoiceNumber}`);
    await this.searchField.fill(invoiceNumber);
  }

  async clickOnSearchButton(): Promise<void> {
    console.log(`\nAdmin clicks on search button`);
    await this.searchButton.click();
  }

  async getOrdersTableContent(): Promise<Array<Record<string, string>>> {
    await expect(this.ordersTable).toBeVisible();
    const tableHtml = await this.ordersTable.innerHTML();

    const tablesAsJson = Tabletojson.convert(`<table>${tableHtml}</table>`);

    return tablesAsJson[0];
  }
}
