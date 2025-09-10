import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { responseData } from "./responseData/invoiceData";

export class InvoicesApi extends BaseAPI {
  protected path: string;
  responseData: any;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "invoices";
    this.responseData = responseData;
  }

  async postCreateInvoice(
    token: string,
    body: object,
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = this.apiUrl + this.path;

    console.log(
      `\nSend POST ${url} with a body: ${JSON.stringify(body, null, 2)}`,
    );

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.post(url, {
      data: body,
      headers: this.headersObj,
    });

    console.log(
      `\nSend POST ${url} with a body: ${JSON.stringify(body, null, 2)}`,
    );

    return response;
  }

  assertResponseStructureAndTypes(response: APIRequestContext): void {
    const keys = Object.keys(responseData.responseStructure);

    // Assert response lentgh to be equal the length of response structure (number of keys)
    expect(keys.length).toBe(Object.keys(response).length);

    // Ittarate keys and check that the number of keys from response body and their type is equal response structure
    for (const key of keys) {
      console.log("\nChecking key: ", key);
      expect.soft(response).toHaveProperty(key);
      expect
        .soft(typeof response[key])
        .toBe(typeof responseData.responseStructure[key]);
    }
  }
}
