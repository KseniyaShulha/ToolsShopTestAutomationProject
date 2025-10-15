import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import BaseAPI from "./baseAPI";
import { responseData } from "./responseData/productsData";

// Type of the expected data structure from productsData
type ProductListResponse = {
  data: unknown[];
  [key: string]: unknown;
};

type SingleProductResponse = {
  id: string | number;
  name: string;
  price: number;
  [key: string]: unknown;
};

export class ProductsApi extends BaseAPI {
  protected path: string;
  responseData: typeof responseData;

  constructor(request: APIRequestContext) {
    super(request);
    this.path = "products";
    this.responseData = responseData;
  }

  // Executes a GET request to retrieve the list of products
  async getProducts(
    params: string = "?page=1",
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = this.apiUrl + this.path + params;

    console.log(`\nSend GET ${url}`);

    const response = await request.get(url, { headers: this.headersObj });
    console.log(
      `\nResponse ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }

  // Validates the structure and field types of the product list response
  async assertResponseStructureAndTypes(response: APIResponse): Promise<void> {
    const body: ProductListResponse = await response.json();
    const expectedKeys = Object.keys(this.responseData.responseStructure);

    expect(expectedKeys.length).toBe(Object.keys(body).length);

    for (const key of expectedKeys) {
      console.log("\nChecking key:", key);
      expect.soft(body).toHaveProperty(key);

      const actualType = typeof body[key];
      const expectedType = typeof (this.responseData.responseStructure as any)[
        key
      ];

      expect.soft(actualType).toBe(expectedType);
    }

    expect.soft(Array.isArray(body.data)).toBeTruthy();
    expect.soft(body.data.length).toBeGreaterThanOrEqual(0);
  }

  // Validates the structure and field types of the single product response
  async assertResponseStructureAndTypesForSingleProduct(
    response: APIResponse,
  ): Promise<void> {
    const body: SingleProductResponse = await response.json();
    const expectedKeys = Object.keys(
      this.responseData.responseDataSingleProduct,
    );

    console.log("Response:", JSON.stringify(body, null, 2));
    console.log("Object.keys(response).length:", Object.keys(body).length);
    console.log("Keys:", JSON.stringify(expectedKeys, null, 2));

    expect(expectedKeys.length).toBe(Object.keys(body).length);

    for (const key of expectedKeys) {
      console.log("\nChecking key:", key);
      expect.soft(body).toHaveProperty(key);

      const actualType = typeof body[key];
      const expectedType = typeof (
        this.responseData.responseDataSingleProduct as any
      )[key];

      expect.soft(actualType).toBe(expectedType);
    }
  }

  // Retrieves data for a specific product by its ID
  async getProductByID(
    productId: string,
    request: APIRequestContext = this.request,
  ): Promise<APIResponse> {
    const url = `${this.apiUrl}${this.path}/${productId}`;
    console.log(`\nSend GET ${url}`);

    const response = await request.get(url, { headers: this.headersObj });
    console.log(
      `\nResponse ${url}: `,
      JSON.stringify(await response.json(), null, 2),
    );

    return response;
  }
}
