import { test, expect } from "@playwright/test";
import { ProductsApi } from "../../api/productsApi";

let productId: any, productsApi;

test.describe("Get product by ID", async () => {
  test.beforeEach(async ({ request }) => {
    // Create instance of ProductsApi
    productsApi = new ProductsApi(request);
    // Send get request with querry params and save response in var
    const getAllProductsResponse = await productsApi.getProducts(
      "?page=1&between=price,1,100",
    );

    // Save response body to var
    const responseBody = await getAllProductsResponse.json();
    productId = responseBody.data[0].id;
  });

  test("TOOLS-32 Get product by id", async () => {
    // Send get request with querry params and save response in var
    const getProductByIDResponse = await productsApi.getProductByID(productId);

    // Asserting response status is equal to 2**
    await expect(getProductByIDResponse).toBeOK();

    // Save response body to var
    const responseBody = await getProductByIDResponse.json();

    // Assert received response body has the same body structure as a template response data for single product
    productsApi.assertResponseStructureAndTypesForSingleProduct(responseBody);

    // Assert the key "current page" has the value "1"
    expect(responseBody.id).toBe(productId);
  });
});
