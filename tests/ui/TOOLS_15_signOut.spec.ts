import { test } from "@playwright/test";
import { UserSteps } from "../../steps/steps";
import path from "path";

test.use({
  storageState: path.resolve(__dirname, "../../.auth/customer2.json"),
});

test.describe("TOOLS_15_signOut", { tag: ["@ui", "@regression", "@auth"] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("LogOut", async ({ page }) => {
    const steps: UserSteps = new UserSteps(page);
    await steps.signOut();
  });
});
