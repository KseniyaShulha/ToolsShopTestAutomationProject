import { APIRequestContext, expect, Request } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { responseData } from "./requestData/productsData";

export class ProductsApi extends BaseAPI {
  protected path: string;
  responseData: any;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "products";
    this.responseData = responseData;
  }

  async getProducts(params: string = "?page=1", request: any = this.request) {
    const url = this.apiUrl + this.path + params;

    console.log(`Send GET ${url}`);

    const response = await request.get(url, {
      headers: this.headersObj,
    });

    console.log(
      `Response ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }

  assertResponseStructure(response) {
    const keys = Object.keys(responseData.responseStructure);

    expect(keys.length).toBe(
      Object.keys(response).length,
    );

    for (const key of keys) {
      console.log("Checking key: ", key);
      expect.soft(response).toHaveProperty(key);
      expect
        .soft(typeof response[key])
        .toBe(typeof responseData.responseStructure[key]);
    }
    expect.soft(response.data.length).toBeGreaterThanOrEqual(0);
  }
}
