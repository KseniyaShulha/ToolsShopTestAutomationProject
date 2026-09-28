import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";
import { loginApi } from "../../api/apiHelper";

let token: string | null;

test.describe("Logout", { tag: ["@api", "@regression", "@auth"] }, () => {
  test.beforeEach(async ({ request }) => {
   // Login as admin
    token = await loginApi(
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      request,
    );

    console.log("\nToken", token);
  });

  test("TOOLS_19 GET users/logout", async ({ request }) => {
    // Create instance of UserApi
    const userApi = new UsersApi(request);

    // Send post request /users/login and storing the response in variable
    const logoutResponse: any = await userApi.getLogout(token);

    // Asserting response status is equal to 2**
    expect(logoutResponse.status()).toBe(200);
  });
});
