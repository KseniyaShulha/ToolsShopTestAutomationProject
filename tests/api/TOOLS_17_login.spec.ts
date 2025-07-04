import { test, expect } from "@playwright/test";

test("TOOLS-17 login via API as a customer", async ({ request }) => {
  // Seding post request /users/login and storing the response in variable
  console.log(
    `Send POST /users/login for user ${process.env.CUSTOMER_2_EMAIL}`,
  );
  const loginResponse: any = await request.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: process.env.CUSTOMER_2_EMAIL,
        password: process.env.CUSTOMER_2_PASSWORD,
      },
    },
  );

  // Assign body tovar
  const responseBody = await loginResponse.json();
  console.log("response: ", responseBody);

  // Asserting response status is equal to 201
  expect(loginResponse.status()).toEqual(200);

  // Asserting access token to be defined
  expect(responseBody.access_token).toBeDefined();
});
