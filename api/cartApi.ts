import { APIRequestContext, APIResponse } from "@playwright/test";
import BaseAPI from "./baseAPI";

export class CartApi extends BaseAPI {
  protected path: string;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "carts";
  }

  async postCreateCart(
    token: string,
    request: any = this.request,
  ): Promise<Response> {
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
  ): Promise<Response> {
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

  async getCart(
    token: string,
    itemId: string,
    request: any = this.request,
  ): Promise<APIResponse> {
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

  async putUpdateQuantity(
    token: string,
    cartId: string,
    body: object,
    request: any = this.request,
  ): Promise<Response> {
    const url = `${this.apiUrl}${this.path}/${cartId}/product/quantity`;

    console.log(`Send PUT ${url} with quantity: ${body}`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.put(url, {
      data: body,
      headers: this.headersObj,
    });

    console.log(`Response ${url}: `, JSON.stringify(await response.json()));

    return response;
  }

  async deleteProductFromCart(
    token: string,
    cartId: string,
    productIdToDelete: string,
    request: any = this.request,
  ): Promise<Response> {
    const url = `${this.apiUrl}${this.path}/${cartId}/product/${productIdToDelete}`;

    console.log(`Send DELETE ${url}`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.delete(url, {
      headers: this.headersObj,
    });

    console.log(`Response ${url}: `, response);
    return response;
  }
}
