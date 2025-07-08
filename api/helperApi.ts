import { expect } from "@playwright/test";
import { UsersApi } from "./usersApi";

export async function loginApi(
  credsObj: object,
  request: any,
): Promise<string | null> {
  // Create instance of UserApi
  const userApi = new UsersApi(request);

  // Send post request /users/login and storing the response in variable
  const loginResponse: any = await userApi.postLogin(credsObj);

  // Assign body to var
  const responseBody = await loginResponse.json();

  // Asserting response status is equal to 2**
  await expect(loginResponse).toBeOK();

  // Asserting access token to be defined
  expect(responseBody.access_token).toBeDefined();

  return responseBody.access_token;
}
