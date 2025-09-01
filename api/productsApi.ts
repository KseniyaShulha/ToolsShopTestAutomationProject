import { APIRequestContext, expect } from "@playwright/test";
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

  async getProducts(
    params: string = "?page=1",
    request: any = this.request,
  ): Promise<Response> {
    const url = this.apiUrl + this.path + params;

    console.log(`Send GET ${url}`);

    // Send get request to get products list
    const response = await request.get(url, {
      headers: this.headersObj,
    });

    console.log(
      `Response ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }

  assertResponseStructureAndTypes(response: APIRequestContext): void {
    const keys = Object.keys(responseData.responseStructure);

    // Assert response lentgh to be equal the length of response structure (number of keys)
    expect(keys.length).toBe(Object.keys(response).length);

    // Ittarate keys and check that the number of keys from response body and their type is equal response structure
    for (const key of keys) {
      console.log("Checking key: ", key);
      expect.soft(response).toHaveProperty(key);
      expect
        .soft(typeof response[key])
        .toBe(typeof responseData.responseStructure[key]);
    }
    // Assert response data length to be greater than or equal 0
    expect.soft(response["data"].length).toBeGreaterThanOrEqual(0);
  }

  assertResponseStructureAndTypesForSingleProduct(
    response: APIRequestContext,
  ): void {
    const keys = Object.keys(responseData.responseDataSingleProduct);

    // Assert response lentgh to be equal the length of response structure (number of keys)
    expect(keys.length).toBe(Object.keys(response).length);

    // Ittarate keys and check that the number of keys from response body and their type is equal response structure
    for (const key of keys) {
      console.log("Checking key: ", key);
      expect.soft(response).toHaveProperty(key);
      expect
        .soft(typeof response[key])
        .toBe(typeof responseData.responseDataSingleProduct[key]);
    }
  }

  async getProductByID(
    productId: string,
    request: any = this.request,
  ): Promise<Response> {
    const url = this.apiUrl + this.path + "/" + productId;

    console.log(`Send GET ${url}`);

    // Send get request to get products list
    const response = await request.get(url, {
      headers: this.headersObj,
    });

    console.log(
      `Response ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }
}
