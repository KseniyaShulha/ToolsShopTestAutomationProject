import { test, expect } from "../fixtures/fixtures";
import { UsersApi } from "../../api/usersApi";
import { testData_TOOLS_20_signUp } from "../../testData/testData_TOOLS_20_signUp";

let userID: any;

test.describe(
  "TOOLS_20_signUp",
  { tag: ["@api", "@smoke", "@regression", "@critical"] },
  () => {
    test("POST users/register", async ({ request }) => {
      // Create instance of UserApi
      const userApi = new UsersApi(request);

      // Send post request /users/register and storing the response in variable
      const signUpResponse: any = await userApi.postSignUp(
        testData_TOOLS_20_signUp,
      );
      expect(signUpResponse.status()).toBe(201);

      const signUpResponseBody = await signUpResponse.json();

      userID = signUpResponseBody.id;
      console.log("\nuserID: ", userID);

      // Create loginBody var with creds
      const loginBody = {
        email: testData_TOOLS_20_signUp.email,
        password: testData_TOOLS_20_signUp.password,
      };

      // // Send post request /users/login and storing the response in variable
      const loginResponse = await userApi.postLogin(loginBody);

      // Assert response status to be 200
      expect(loginResponse.status()).toBe(200);

      const loginData = await loginResponse.json();

      // Assert login token to be defined
      expect(loginData.access_token).toBeDefined();
    });

    // afterEach hook to delete user
    test.afterEach(async ({ adminApi }) => {
      await adminApi.deleteUser(userID);
    });
  },
);
