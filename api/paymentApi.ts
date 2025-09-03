import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { responseData } from "./responseData/paymentData";

export class PaymentApi extends BaseAPI {
  protected path: string;
  response: any;
  responseData: any;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "payment/check";
    this.responseData = responseData;
  }

  async postCheckPayment(
    paymentMethod: string,
    paymentDetails: object,
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = this.apiUrl + this.path;

    const body = {
      payment_method: paymentMethod,
      payment_details: paymentDetails,
    };

    console.log(
      `Send POST ${url} with a body: ${JSON.stringify(body, null, 2)}`,
    );

    const response = await request.post(url, {
      data: body,
      headers: this.headersObj,
    });

    console.log(`Response ${url}: `, JSON.stringify(await response.json()));

    return response;
  }
}
