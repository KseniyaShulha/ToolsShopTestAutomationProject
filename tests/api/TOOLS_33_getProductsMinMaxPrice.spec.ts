import { test, expect } from "@playwright/test";
import { ProductsApi } from "../../api/productsApi";

test("TOOLS-33 GET products/?p=params&between=min,max price", async ({
  request,
}) => {
  // Create instance of ProductsApi
  const productsApi = new ProductsApi(request);

  // Send get request with querry params and save response in var
  const getAllProductsWithMinPriceResponse = await productsApi.getProducts(
    "?page=1&between=price,0,5",
  );

  // Asserting response status is equal to 2**
  await expect(getAllProductsWithMinPriceResponse).toBeOK();

  //Save response body in json in var
  const minPriceResponseBody = await getAllProductsWithMinPriceResponse.json();

  expect(minPriceResponseBody).toHaveProperty("data");

  // Itterate over response body data to check the price to be less or equal 5
  for (const product of minPriceResponseBody.data) {
    expect.soft(product.price).toBeLessThanOrEqual(5);
  }

  // Send get request with querry params and save response in var
  const getAllProductswithMaxPriceResponse = await productsApi.getProducts(
    "?page=1&between=price,150,200",
  );

  // Asserting response status is equal to 2**
  await expect(getAllProductswithMaxPriceResponse).toBeOK();

  //Save response body in json in var
  const maxPriceResponseBody = await getAllProductswithMaxPriceResponse.json();
  
  expect(maxPriceResponseBody).toHaveProperty("data");

  // Itterate over response body data to check the price to be greater or equal 150
  for (const product of maxPriceResponseBody.data) {
    expect.soft(product.price).toBeGreaterThanOrEqual(150);
  }
});
