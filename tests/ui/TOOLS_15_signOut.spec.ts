import { test } from "@playwright/test";
import { testData_TOOLS_9 } from "../../testData/testData_TOOLS-9";
import { UserSteps } from "../../steps/steps";

test.describe("auth ui", () => {
  test.beforeEach(async ({ page }) => {
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
