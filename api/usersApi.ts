import { APIRequestContext, Request } from "@playwright/test";
import BaseAPI from "./baseAPI";

export class UsersApi extends BaseAPI {
  protected path: string;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "users/";
  }

  // Login req
  async postLogin(body: object, request: any = this.request) {
    const url = this.apiUrl + this.path + "login";

    console.log(
      `Send POST ${url} with a body: ${JSON.stringify(body, null, 2)}`,
    );

    // Send POST req
    const response = await request.post(url, {
      data: body,
      headers: this.headersObj,
    });

    console.log(`Response ${url}: `, JSON.stringify(await response.json()));

    return response;
  }

  async getLogout(token: string, request: any = this.request) {
    const url = this.apiUrl + this.path + "logout";

    console.log(`Send GET ${url}`);

    // Add header Authorization with token
    this.headersObj["Authorization"] = `Bearer ${token}`;

    // Send req
    const response = await request.get(url, {
      headers: this.headersObj,
    });

    console.log(`Response ${url}: `, JSON.stringify(await response.json()));

    return response;
  }
}
