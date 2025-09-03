import { test, expect, APIResponse } from "@playwright/test";
import { PaymentApi } from "../../api/paymentApi";
import { testData_TOOLS_40 } from "../../testData/testData_TOOLS_40";

test("TOOLS_26 POST users/login (negative)", async ({ request }) => {
  // Create instance of UserApi
  const paymentApi = new PaymentApi(request);

  for (const testDataObj of testData_TOOLS_40) {
    console.log("Testing with: ", testDataObj.scenarioName);

    // Send post request /users/login and storing the response in variable
    const postCheckPaymentResponse: APIResponse = await paymentApi.postCheckPayment(
      testDataObj.payment_method,
      testDataObj.payment_details,
    );

    // Assign body to var
    const responseBody = await postCheckPaymentResponse.json();

    // Assert response status
    expect
      .soft(postCheckPaymentResponse.status())
      .toBe(testDataObj.expcetedStatus);

    //Assert error message
    expect.soft(responseBody.message).toBe(testDataObj.errorMessage);
  }
});
