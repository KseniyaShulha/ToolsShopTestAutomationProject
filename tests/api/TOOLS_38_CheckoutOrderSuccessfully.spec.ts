import { test, expect } from "@playwright/test";
import { PaymentApi } from "../../api/paymentApi";
import { faker } from "@faker-js/faker";

test("TOOLS-38 POST /payment/check", async ({ request }) => {
  const paymentApi = new PaymentApi(request);
  const postCheckPaymentResponse: any = await paymentApi.postCheckPayment(
    "bank-transfer",
    {
      bank_name: faker.word.sample() + " bank",
      account_name: faker.finance.accountName(),
      account_number: faker.finance.accountNumber(),
    },
  );

  console.log("postCheckPaymentResponse", postCheckPaymentResponse);

  // Assert response status is equal to 2**
  expect(postCheckPaymentResponse.status()).toBe(200);
});
