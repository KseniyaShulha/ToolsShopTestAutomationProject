import { APIRequestContext } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { faker } from "@faker-js/faker";

export class PaymentApi extends BaseAPI {
  protected path: string;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "payment/check";
  }

  async postCheckPayment(
    paymentMethod: string,
    paymentDetails: object,
    request: any = this.request,
  ): Promise<Response> {
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
