import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";
import { testData_TOOLS_20_signUp } from "../../testData/testData_TOOLS_20_signUp";
import { signUpApi, loginApi } from "../../api/apiHelper";

let token: any;
let userID: any;
let createdUserEmail: any;
let createdUserpassword: any;
let q: any;

test.describe("DELETE/users", async () => {
  test.beforeEach(async ({ request }) => {
    // Send Post request to sign in
    const responseBody = await signUpApi(testData_TOOLS_20_signUp, request);

    userID = responseBody.id;
    createdUserEmail = responseBody.email;
    createdUserpassword = testData_TOOLS_20_signUp.password;

    // Login with created credentials and save token
    token = await loginApi(
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      request,
    );
  });

  test("TOOLS-30 delete user", async ({ request }) => {
    // Create instance of UserApi
    const userApi = new UsersApi(request);

    // Send put request /users/
    const deleteUserResponse: any = await userApi.deleteUser(token, userID);

    // Asserting response status is equal to 2**
    await expect(deleteUserResponse).toBeOK();

    // Try to login as the deleted user
    const loginDeletedUser = await userApi.postLogin(
      {
        email: createdUserEmail,
        password: createdUserpassword,
      },
      request,
    );

    // Send Get request to search for the deleted user by email
    const searchUserResponse = await userApi.searchUser(
      token,
      createdUserEmail,
    );

    // Asserting response status data is equal to be []
    const responseBody = await searchUserResponse.json();

    console.log("Response body", responseBody)
    expect(responseBody.data).toStrictEqual([]);
  });
});
