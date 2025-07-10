import { APIRequestContext, Request } from "@playwright/test";
import BaseAPI from "./baseAPI";

export class ProductsApi extends BaseAPI {
  protected path: string;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "products";
  }

  async getProduct(request: any = this.request) {
    const url = this.apiUrl + this.path;

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
}
