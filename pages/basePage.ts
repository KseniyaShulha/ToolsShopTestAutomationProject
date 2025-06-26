import { Page } from "@playwright/test";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

export default abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  headerSection(): Header {
    return new Header(this.page);
  }

  footerSection(): Footer {
    return new Footer(this.page);
  }

  async waitPageUrlLoaded(url: string): Promise<void> {
    console.log(`Verify that the customer was redirected to ${url} page`);
    await this.page.waitForURL(`**/${url}`);
  }
}
