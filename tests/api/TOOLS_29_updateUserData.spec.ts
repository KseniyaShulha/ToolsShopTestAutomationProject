import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";
import { testData_TOOLS_29 } from "../../testData/testData_TOOLS_29";
import { testData_TOOLS_20_signUp } from "../../testData/testData_TOOLS_20_signUp";
import { signUpApi, loginApi } from "../../api/apiHelper";

let token: any;
let userID: any;
let clonedTestDataObj = { ...testData_TOOLS_29.body };

test.describe("PUT/users", async () => {
  test.beforeEach(async ({ request }) => {
    // Send Post request to sign in
    const responseBody = await signUpApi(testData_TOOLS_20_signUp, request);

    // Login with created credentials and save token
    token = await loginApi(
      {
        email: testData_TOOLS_20_signUp.email,
        password: testData_TOOLS_20_signUp.password,
      },
      request,
    );

    // Save user ID from the response body in var
    userID = responseBody.id;

    // Assign email and password
    clonedTestDataObj.email = testData_TOOLS_20_signUp.email;
    clonedTestDataObj.password = testData_TOOLS_20_signUp.password;
  });

  test("TOOLS-29 PUT users/userId", async ({ request }) => {
    // Create instance of UserApi
    const userApi = new UsersApi(request);

    // Send put request /users/
    const updateUserDataResponse: any = await userApi.putUpdateUserData(
      clonedTestDataObj,
      token,
      userID,
    );

    // Asserting response status is equal to 2**
    await expect(updateUserDataResponse).toBeOK();

    // Save response in var after sending GET request
    const getUserResponse: any = await userApi.getUser(token, userID);

    // Save response body in var
    const getUserResponseBody = await getUserResponse.json();

    // // Compare cloned test data with API response
    for (const key in clonedTestDataObj) {
      if (key === "address") {
        // Assert strict equality for adress obj
        expect(clonedTestDataObj[key]).toStrictEqual(getUserResponseBody[key]);
      } else if (key === "password") {
        // Skip password
        continue;
      } else {
        // Assert value equality for other keys
        expect(clonedTestDataObj[key]).toBe(getUserResponseBody[key]);
      }
    }
  });
});
