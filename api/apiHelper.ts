import { expect } from "@playwright/test";
import { Urls } from "../utils/urls";


// Define function to verify that credentials are correct
export async function loginApi(
  email: string,
  password: string,
  request: any,
): Promise<string | null> {
  const response = await request.post(
    new Urls().getUrls().appUrl + "/users/login",
    {
      data: {
        email: email,
        password: password,
      },
    },
  );
  expect(response.status()).toBe(200);

  // Assert response
  const data = await response.json();
  console.log("response body", data);
  expect(data.access_token.length).toBeGreaterThan(10);

  // Return token
  return data.access_token;
}