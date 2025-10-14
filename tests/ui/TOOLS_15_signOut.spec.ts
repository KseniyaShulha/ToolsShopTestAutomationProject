import { test } from "@playwright/test";
import { UserSteps } from "../../steps/steps";
import path from "path";

test.use({
  storageState: path.resolve(__dirname, "../../.auth/customer2.json"),
});

test.describe("auth ui", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("logOut", async ({ page }) => {
    const steps: UserSteps = new UserSteps(page);
    await steps.signOut();
  });
});
