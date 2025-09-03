import { test, expect } from "@playwright/test";
import { PaymentApi } from "../../api/paymentApi";
import { testData_TOOLS_38 } from "../../testData/testData_TOOLS_38";

test("TOOLS-38 POST /payment/check", async ({ request }) => {
  // Create instance of PaymentApi
  const paymentApi = new PaymentApi(request);

  // Save response in var
  const postCheckPaymentResponse: any = await paymentApi.postCheckPayment(
    "bank-transfer",
    testData_TOOLS_38.payment_details,
  );

  // Assert response status is equal to 2**
  expect(postCheckPaymentResponse.status()).toBe(200);

  // Assert message from response body to be strict equal response data
  expect(postCheckPaymentResponse).toStrictEqual(
    paymentApi.responseData.successPayment
  );
});
