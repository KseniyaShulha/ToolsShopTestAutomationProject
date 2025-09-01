import { APIRequestContext } from "@playwright/test";
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
}
