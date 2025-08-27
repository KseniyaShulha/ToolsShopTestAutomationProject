import { test, expect } from "@playwright/test";
import { ProductsApi } from "../../api/productsApi";

let product: any, productsApi;

test.describe("GET/products with query parameter search", async () => {
  test.beforeEach(async ({ request }) => {
    // Create instance of ProductsApi
    productsApi = new ProductsApi(request);

    // Send get request with querry params and save response in var
    const getAllProductsResponse = await productsApi.getProducts(
      "?page=1&between=price,0,200",
    );

    const responseBody = await getAllProductsResponse.json();

    product = responseBody.data.find((el) => el.name.includes(" "));
    console.log("Product to test search: ", JSON.stringify(product, null, 2));
  });

  test("TOOLS-35 GET products/search?q=", async ({ request }) => {
    // Send GET request with query parameter search and save response in var
    const getProductsBySearchResponse = await productsApi.getProducts(
      `/search?q=${encodeURIComponent(product.name)}`,
    );

    // Assert response status is equal to 2**
    await expect(getProductsBySearchResponse).toBeOK();

    //Save response body in json in var
    const responseBody = await getProductsBySearchResponse.json();

    let nameArr = product.name.split(" ");
    let firstWord = nameArr[0];
    let secondWord = nameArr[1];

    // Itterate over response body data to check the price to be less or equal 5
    for (const key of responseBody.data) {
      // Assert full names of products from response body to be full product name
      expect.soft(key.name).toBe(product.name);

      // Assert full names of products from response body to to contain first word from product name
      expect.soft(key.name).toContain(firstWord);

      // Assert full names of products from response body to to contain second word from product name
      expect.soft(key.name).toContain(secondWord);
    }
  });
});
