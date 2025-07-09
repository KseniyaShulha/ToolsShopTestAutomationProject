import { APIRequestContext, Request } from "@playwright/test";
import BaseAPI from "./baseAPI";

export class UsersApi extends BaseAPI {
  protected path: string;

  // Constructor for the class
  constructor(request: APIRequestContext) {
    super(request);

    // Define common path for each req of class
    this.path = "product/";
  }
}
