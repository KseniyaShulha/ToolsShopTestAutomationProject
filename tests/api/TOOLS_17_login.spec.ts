import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";

test.describe(
  "TOOLS_17_login",
  { tag: ["@api", "@smoke", "@regression", "@auth"] },
  () => {
    // Test data for TOOLS-17 & TOOLS-18
    const testDataArr = [
      {
        testName: "POST users/login (customer)",
        creds: {
          email: process.env.CUSTOMER_2_EMAIL,
          password: process.env.CUSTOMER_2_PASSWORD,
        },
      },
      {
        testName: "POST users/login (admin)",
        creds: {
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        },
      },
    ];

    // Iterate over test data
    for (const testDataObj of testDataArr) {
      // Run test based on test data
      test(testDataObj.testName, async ({ request }) => {
        // Create instance of UserApi
        const userApi = new UsersApi(request);

        // Send post request /users/login and storing the response in variable
        const loginResponse: any = await userApi.postLogin(testDataObj.creds);

        // Assign body to var
        const responseBody = await loginResponse.json();

        // Assert response status is equal to 2**
        expect(loginResponse.status()).toBe(200);

        // Assert access token to be defined
        expect(responseBody.access_token).toBeDefined();
      });
    }
  },
);
