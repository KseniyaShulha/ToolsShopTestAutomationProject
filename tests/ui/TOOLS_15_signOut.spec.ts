import { test, expect } from "@playwright/test";
import { AppPageObjects } from "../../pages/appPageObjects";
import { testData_TOOLS_9 } from "../../testData/testData_TOOLS-9";
import { UserSteps } from "../../steps/steps";

test.describe("auth ui", () => {
  test.beforeEach(async ({ page }) => {
    const appPageObjects: AppPageObjects = new AppPageObjects(page);
    const steps: UserSteps = new UserSteps(page);

    await steps.loginUi(
      testData_TOOLS_9.userData.email,
      testData_TOOLS_9.userData.password,
      testData_TOOLS_9.userData.surname,
    );
  });

  test("logOut", async ({ page }) => {
    const steps: UserSteps = new UserSteps(page);
    await steps.signOut();
  });
});
