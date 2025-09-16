import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../basePage";

export class ShoppingCartPage extends BasePage {
  // Locators
  private readonly shoppingCartTable: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartTable = this.page.locator('[class="table table-hover"]');
  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.shoppingCartTable = this.page.locator('[class="table table-hover"]');
    this.tableRaw = this.page.locator("tbody>tr");
    this.productTitleCell = this.page.locator('[class="product-title"]');
    this.headers = this.page.locator("thead");
  }

  // Methods
  async getShoppingCartTableContent(): Promise<Array<Record<string, string>>> {
    await expect(this.shoppingCartTable).toBeVisible();

    // Headers
    const headers = await this.shoppingCartTable
      .locator("thead th")
      .allTextContents();

    // Rows
    const rows = this.shoppingCartTable.locator("tbody tr");

    const result: Array<Record<string, string>> = [];
    const rowCount = await rows.count();

    for (let r = 0; r < rowCount; r++) {
      const row = rows.nth(r);
      const cells = row.locator("td");

      const obj: Record<string, string> = {};
      const cellCount = await cells.count();

      for (let i = 0; i < cellCount; i++) {
        const header = headers[i]?.trim() || `col_${i}`;
        const cell = cells.nth(i);

        // Check if there's an input element
        if ((await cell.locator("input").count()) > 0) {
          obj[header] = await cell.locator("input").inputValue();
        } else {
          obj[header] = (await cell.textContent())?.trim() || "";
        }
      }

      result.push(obj);
    }

    return result;
  }
}
