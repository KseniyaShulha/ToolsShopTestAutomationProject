import { test, expect } from "../fixtures/fixtures";
import { testData_TOOLS_20_signUp } from "../../testData/testData_TOOLS_20_signUp";
import { signUpApi } from "../../api/apiHelper";

let userID: any;
let createdUserEmail: any;

test.describe(
  "DeleteUser",
  { tag: ["@api", "@regression", "@user"] },
  () => {
    test.beforeEach(async ({ request }) => {
      // Send Post request to sign up
      const responseBody = await signUpApi(testData_TOOLS_20_signUp, request);

      userID = responseBody.id;
      createdUserEmail = responseBody.email;
    });

    test("TOOLS_30 DELETE users/userId", async ({ adminApi }) => {
      // Send put request /users/
      const deleteUserResponse: any = await adminApi.deleteUser(userID);

      // Asserting response status is equal to 2**
      await expect(deleteUserResponse).toBeOK();

      // Send Get request to search for the deleted user by email
      const searchUserResponse = await adminApi.searchUser(createdUserEmail);

      // Asserting response status is equal to 2**
      await expect(searchUserResponse).toBeOK();

      // Asserting response status data is equal to be []
      const responseBody = await searchUserResponse.json();

      // Assert nothing found
      expect(responseBody.total).toBe(0);
    });
  },
);
