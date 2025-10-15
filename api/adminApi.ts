import { APIRequestContext, APIResponse } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { UsersApi } from "./usersApi";
import { CartApi } from "./cartApi";

export class AdminApi extends BaseAPI {
  private token: string;

  // Constructor for the class
  constructor(request: APIRequestContext, token: string) {
    super(request);
    this.token = token;
  }

  // Methods
  async searchUser(q: string): Promise<APIResponse> {
    const usersApi = new UsersApi(this.request);

    return await usersApi.searchUser(this.token, q);
  }

  async deleteUser(userId: string): Promise<APIResponse> {
    const usersApi = new UsersApi(this.request);

    return await usersApi.deleteUser(this.token, userId);
  }

  async getUser(userId: string): Promise<APIResponse> {
    const usersApi = new UsersApi(this.request);

    return await usersApi.getUser(this.token, userId);
  }

  async deleteCart(cartId: string): Promise<APIResponse> {
    const cartApi = new CartApi(this.request);

    return await cartApi.deleteCart(this.token, cartId);
  }
}
