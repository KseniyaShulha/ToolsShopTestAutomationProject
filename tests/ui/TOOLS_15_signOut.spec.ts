import { test } from "@playwright/test";
import { UserSteps } from "../../steps/steps";
import { addCookies } from "../../ui/uiHelper";

test.describe("auth ui", () => {
  test.beforeEach(async ({ page, context }) => {
    await addCookies(context, "customer3");

    await page.goto("/");
  });

  test("logOut", async ({ page }) => {
    const steps: UserSteps = new UserSteps(page);
    await steps.signOut();
  });
});
