import { test } from "@playwright/test";
import { UserSteps } from "../../steps/steps";
import path from "path";

test.use({
  storageState: path.resolve(__dirname, "../../.auth/customer2.json"),
});

test.describe(
  "SignOut",
  { tag: ["@ui", "@regression", "@auth"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("TOOLS_15 LogOut", async ({ page }) => {
      const steps: UserSteps = new UserSteps(page);
      await steps.signOut();
    });
  },
);
