import { Urls } from "../utils/urls";
import { APIRequestContext } from "@playwright/test";

export default abstract class BaseAPI {
  protected apiUrl: string;
  protected headersObj: Record<string, string> = {};
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    // Define apiUrl and assign to this class
    this.apiUrl = new Urls().getUrls().apiUrl;
    this.request = request;

    // Define headers
    this.headersObj = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
  }
}
