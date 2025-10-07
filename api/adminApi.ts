import { APIRequestContext, APIResponse } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { UsersApi } from "./usersApi";
import { loginApi } from "./apiHelper";
import { CartApi } from "./cartApi";

export class AdminApi extends BaseAPI {
  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);
  }

  // Methods
  async searchUser(q: string): Promise<APIResponse> {
    const usersApi = new UsersApi(this.request);

    const token: any = await loginApi(
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      this.request,
    );

    return await usersApi.searchUser(token, q);
  }

  async deleteUser(userId: string): Promise<APIResponse> {
    const usersApi = new UsersApi(this.request);

    const token: any = await loginApi(
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      this.request,
    );

    return await usersApi.deleteUser(token, userId);
  }

  async getUser(userId: string): Promise<APIResponse> {
    const usersApi = new UsersApi(this.request);

    const token: any = await loginApi(
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      this.request,
    );
    return await usersApi.getUser(token, userId);
  }

  async deleteCart(cartId: string): Promise<APIResponse> {
    const cartApi = new CartApi(this.request);
    const token: any = await loginApi(
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      this.request,
    );

    return await cartApi.deleteCart(token, cartId);
  }
}
