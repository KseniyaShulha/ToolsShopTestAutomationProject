import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";

// Test data for TOOLS-17 & TOOLS-18
const testDataArr = [
  {
    testName: "TOOLS-17 login via API as a customer",
    creds: {
      email: process.env.CUSTOMER_2_EMAIL,
      password: process.env.CUSTOMER_2_PASSWORD,
    },
  },
  {
    testName: "TOOLS-18 login via API as an admin",
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

    // Asserting response status is equal to 2**
    expect(loginResponse.status()).toBe(200);

    // Asserting access token to be defined
    expect(responseBody.access_token).toBeDefined();
  });
}
