import { APIRequestContext, Request } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { UsersApi } from "./usersApi";

export class CartApi extends BaseAPI {
  protected path: string;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "carts";
  }

  async postCreateCart(token: string, request: any = this.request) {
    const url = this.apiUrl + this.path;

    console.log(`Send POST ${url}`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.post(url, {
      headers: this.headersObj,
    });

    console.log(`Response ${url}: `, JSON.stringify(await response.json()));

    return response;
  }
  // Add item to cart POST req

  async postAddToCart(
    token: string,
    body: object,
    itemId: string,
    request: any = this.request,
  ) {
    const url = this.apiUrl + this.path + "/" + itemId;

    console.log(
      `Send POST ${url} with a body: ${JSON.stringify(body, null, 2)}`,
    );

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.post(url, {
      data: body,
      headers: this.headersObj,
    });

    console.log(`Response ${url}: `, JSON.stringify(await response.json()));

    return response;
  }

  async getCart(token: string, itemId: string, request: any = this.request) {
    const url = this.apiUrl + this.path + "/" + itemId;

    console.log(`Send GET ${url} with a body`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

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
