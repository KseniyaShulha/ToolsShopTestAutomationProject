import { APIRequestContext, APIResponse } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { responseData } from "./requestData/productsData";

export class CategoryApi extends BaseAPI {
  protected path: string;
  responseData: any;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "category";
    this.responseData = responseData;
  }

  async getProducts(
    params: string = "?page=1",
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = this.apiUrl + this.path + params;

    console.log(`\nSend GET ${url}`);

    // Send get request to get products list
    const response = await request.get(url, {
      headers: this.headersObj,
    });

    console.log(
      `\nResponse ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }
}
