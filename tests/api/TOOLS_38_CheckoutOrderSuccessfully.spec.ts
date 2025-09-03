import { test, expect, APIResponse } from "@playwright/test";
import { PaymentApi } from "../../api/paymentApi";
import { testData_TOOLS_38 } from "../../testData/testData_TOOLS_38";
import { testData_TOOLS_39 } from "../../testData/testData_TOOLS_39";

// Test data for TOOLS-38 & TOOLS-39
const testDataArr = [
  {
    testName: "TOOLS-38 POST /payment/check_bankTransfer",
    payment_method: "bank-transfer",
    payment_details: testData_TOOLS_38.payment_details,
  },
  {
    testName: "TOOLS-39 POST /payment/check_giftCard",
    payment_method: "gift-card",
    payment_details: testData_TOOLS_39.payment_details,
  },
];

// Iterate over test data
for (const testDataObj of testDataArr) {
  // Run test based on test data
  test(testDataObj.testName, async ({ request }) => {
    // Create instance of UserApi
    const paymentApi = new PaymentApi(request);

    // Save response in var
    const postCheckPaymentResponse: APIResponse =
      await paymentApi.postCheckPayment(
        testDataObj.payment_method,
        testDataObj.payment_details,
      );
    // Assert response status is equal to 2**
    expect(postCheckPaymentResponse.status()).toBe(200);

    const responseBody = await postCheckPaymentResponse.json();

    expect(responseBody).toStrictEqual(paymentApi.responseData.successPayment);
  });
}
