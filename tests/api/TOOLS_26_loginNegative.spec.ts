import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";
import { testData_TOOLS_26 } from "../../testData/testData_TOOLS_26";

test.describe(
  "TOOLS_26_loginNegative",
  { tag: ["@api", "@negative", "@regression"] },
  () => {
    test("POST users/login (negative)", async ({ request }) => {
      // Create instance of UserApi
      const userApi = new UsersApi(request);

      for (const testDataObj of testData_TOOLS_26) {
        console.log("\nTesting with: ", testDataObj.scenarioName);

        // Send post request /users/login and storing the response in variable
        const loginResponse: any = await userApi.postLogin(testDataObj.body);

        // Assign body to var
        const responseBody = await loginResponse.json();

        // Assert response status
        expect.soft(loginResponse.status()).toBe(testDataObj.expcetedStatus);

        //Assert error message
        expect.soft(responseBody.error).toBe(testDataObj.errorMessage);

        // Assert access token to be not defined
        expect.soft(responseBody.access_token).not.toBeDefined();
        console.log("\n========================================\n");
      }
    });
  },
);
