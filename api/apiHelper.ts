import { expect } from "@playwright/test";
import { UsersApi } from "./usersApi";

// Define function to verify that credentials are correct
export async function loginApi(
  body: object,
  request: any,
): Promise<string | null> {
  const userApi = new UsersApi(request);
  // Send post request /users/register and storing the response in variable
  const logInResponse: any = await userApi.postLogin(body);
  await expect(logInResponse).toBeOK();

  // Assert response
  const data = await logInResponse.json();
  expect(data.access_token.length).toBeGreaterThan(10);

  // Return token
  return data.access_token;
}

export async function signUpApi(
  body: object,
  request: any,
): Promise<any | null> {
  const userApi = new UsersApi(request);
  // Send post request /users/register and storing the response in variable
  const signUpResponse: any = await userApi.postSignUp(body);
  await expect(signUpResponse).toBeOK();

  // Save response body
  const responseBody = await signUpResponse.json();

  return responseBody;
}