import { Page } from "@playwright/test";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

export default abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  headerSection() {
    return new Header(this.page);
  }

  footerSection() {
    return new Footer(this.page);
  }

  async waitPageUrlLoaded(url: string) {
    console.log(`Verify that the customer was redirected to ${url} page`);
    await this.page.waitForURL(`**/${url}`);
  }
}
