import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";
import { getTokenFromJson } from "../../api/apiHelper";

let token: any;

test.describe("logout", () => {
  test.beforeEach(async () => {
    token = await getTokenFromJson("admin");

    console.log("\nToken", token);
  });

  test("TOOLS-19 GET users/logout", async ({ request }) => {
    // Create instance of UserApi
    const userApi = new UsersApi(request);

    // Send post request /users/login and storing the response in variable
    const logoutResponse: any = await userApi.getLogout(token);

    // Asserting response status is equal to 2**
    expect(logoutResponse.status()).toBe(200);
  });
});
