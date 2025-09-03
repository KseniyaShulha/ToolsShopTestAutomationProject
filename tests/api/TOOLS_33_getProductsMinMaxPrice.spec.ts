import { test, expect } from "@playwright/test";
import { ProductsApi } from "../../api/productsApi";
import { testData_TOOLS_33 } from "../../testData/testData_TOOLS_33";

test("TOOLS-33 GET products/?q=params&between=min,max price", async ({
  request,
}) => {
  // Create instance of ProductsApi
  const productsApi = new ProductsApi(request);

  for (const price of testData_TOOLS_33) {
    console.log(`\n\nCheck scenario for min: ${price.min}, max: ${price.max}`);
    // Send get request with querry params and save response in var
    const getAllProductsResponse = await productsApi.getProducts(
      `?page=1&between=price,${price.min},${price.max}`,
    );

    // Asserting response status is equal to 2**
    await expect(getAllProductsResponse).toBeOK();

    //Save response body in json in var
    const responseBody = await getAllProductsResponse.json();

    expect(responseBody).toHaveProperty("data");

    // Itterate over response body data to check the price to be less or equal 5
    for (const product of responseBody.data) {
      expect.soft(product.price).toBeLessThanOrEqual(price.max);
      expect.soft(product.price).toBeGreaterThanOrEqual(price.min);
    }

    console.log("=============================");
  }
});
