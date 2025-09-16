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

    console.log(`\nSend POST ${url}`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.post(url, {
      headers: this.headersObj,
    });

    console.log(
      `\nResponse ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

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
      `\nSend POST ${url} with a body: ${JSON.stringify(body, null, 2)}`,
    );

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.post(url, {
      data: body,
      headers: this.headersObj,
    });

    console.log(
      `\nResponse ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }

  async getCart(
    token: string,
    cartId: string,
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = this.apiUrl + this.path + "/" + cartId;

    console.log(`\nSend GET ${url} with a body`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.get(url, {
      headers: this.headersObj,
    });

    console.log(
      `\nResponse ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }

  async putUpdateQuantity(
    token: string,
    cartId: string,
    body: object,
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = `${this.apiUrl}${this.path}/${cartId}/product/quantity`;

    console.log(`\nSend PUT ${url} with quantity: ${body}`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    const response = await request.put(url, {
      data: body,
      headers: this.headersObj,
    });

    console.log(
      `\nResponse ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }

  async deleteProductFromCart(
    token: string,
    cartId: string,
    productIdToDelete: string,
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    {
      const url = `${this.apiUrl}${this.path}/${cartId}/product/${productIdToDelete}`;

      console.log(`\nSend DELETE ${url}`);

      const headers = { ...this.headersObj, Authorization: `Bearer ${token}` };
      const response = await request.delete(url, { headers });
      console.log(
        `Response ${url}: status=${response.status()} ok=${response.ok()}`,
      );
      return response;
    }
  }

  async deleteCart(
    token: string,
    cartId: string,
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = this.apiUrl + this.path + "/" + cartId;

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;
    const response = await request.delete(url, {
      headers: this.headersObj,
    });

    let body;
    try {
      body = await response.json();
    } catch {
      body = null; // handle empty response
    }

    console.log(`\nResponse ${url}:`, JSON.stringify(body, null, 2));
    return response;
  }
}
