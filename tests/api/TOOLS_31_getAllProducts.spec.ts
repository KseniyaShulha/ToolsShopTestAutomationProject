import { test, expect } from "@playwright/test";
import { ProductsApi } from "../../api/productsApi";

test("TOOLS-31 Get all products", async ({ request }) => {
  // Create instance of ProductsApi
  const productsApi = new ProductsApi(request);

  // Send get request with querry params and save response in var
  const getAllProductsResponse = await productsApi.getProducts(
    "?page=1&between=price,1,100",
  );

  // Asserting response status is equal to 2**
  await expect(getAllProductsResponse).toBeOK();

  // Save response body to var
  const responseBody = await getAllProductsResponse.json();

  // Assert received response body has the same body structure as a template response structure
  productsApi.assertResponseStructure(responseBody);

  // Assert the key "current page" has the value "1"
  expect(responseBody.current_page).toBe(1);

  // Assert the key "from" has the value "1"
  expect(responseBody.from).toBe(1);

  // Assert the key "per_page" has the value "9"
  expect(responseBody.per_page).toBe(9);

  // Assert the key "to" has the value "9"
  expect(responseBody.to).toBe(9);
});
