import { test, expect, APIResponse } from "@playwright/test";
import { PaymentApi } from "../../api/paymentApi";
import { testData_TOOLS_42 } from "../../testData/testData_TOOLS_42";

test.describe(
  "TOOLS_42_paymentByCreditCardNegative",
  { tag: ["@api", "@negative", "@regression"] },
  () => {
    test("POST /api/payment/check by card (negative)", async ({ request }) => {
      // Create instance of UserApi
      const paymentApi = new PaymentApi(request);

      for (const testDataObj of testData_TOOLS_42) {
        console.log("\nTesting with: ", testDataObj.scenarioName);

        // Send post request /api/payment/check and store the response in variable
        const postCheckPaymentResponse: APIResponse =
          await paymentApi.postCheckPayment(
            testDataObj.payment_method,
            testDataObj.payment_details,
          );

        // Assign body to var
        const responseBody = await postCheckPaymentResponse.json();

        // Assert response status
        expect
          .soft(postCheckPaymentResponse.status())
          .toBe(testDataObj.expectedStatus);

        // Assert error message
        expect.soft(responseBody).toStrictEqual(testDataObj.responseBody);
      }
    });
  },
);
