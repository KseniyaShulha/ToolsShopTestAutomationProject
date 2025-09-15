import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../basePage";

export class ShoppingCartPage extends BasePage {
  // Locators
  private readonly shoppingCartTable: Locator;
  private readonly productTitleCell: Locator;
  private readonly tableRaw: any;
  private readonly headers: any;

  // Constructor for the class
  constructor(page: Page) {
    super(page);
    this.shoppingCartTable = this.page.locator('[class="table table-hover"]');
    this.tableRaw = this.page.locator("tbody>tr");
    this.productTitleCell = this.page.locator('[class="product-title"]');
    this.headers = this.page.locator("thead");
  }

  // Methods
  async getShoppingCartTableContent() {
    await expect(this.shoppingCartTable).toBeVisible();

    // Хедеры
    const headers = await this.shoppingCartTable
      .locator("thead th")
      .allTextContents();
    // Строки
    const rows = this.shoppingCartTable.locator("tbody tr");

    const result: any[] = [];
    const rowCount = await rows.count();

    for (let r = 0; r < rowCount; r++) {
      const row = rows.nth(r);
      const cells = row.locator("td");

      const obj: any = {};
      const cellCount = await cells.count();

      for (let i = 0; i < cellCount; i++) {
        const header = headers[i]?.trim() || `col_${i}`;
        const cell = cells.nth(i);

        // Проверяем, есть ли input
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
