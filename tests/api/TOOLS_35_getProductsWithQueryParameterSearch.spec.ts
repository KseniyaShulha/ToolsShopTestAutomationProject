import { test, expect } from "@playwright/test";
import { ProductsApi } from "../../api/productsApi";

let product: any;
let productsApi: ProductsApi;

test.describe("TOOLS_35_getProductsWithQueryParameterSearch @api @regression", async () => {
  test.beforeEach(async ({ request }) => {
    // Create instance of ProductsApi
    productsApi = new ProductsApi(request);

    // Send get request with querry params and save response in var
    const getAllProductsResponse = await productsApi.getProducts(
      "?page=1&between=price,0,200",
    );
    const responseBody = await getAllProductsResponse.json();

    product = responseBody.data.find((el: any) => el.name.includes(" "));
    console.log("\nProduct to test search: ", JSON.stringify(product, null, 2));
  });

  test("GET products/search?q=", async () => {
    const searchCombinations = [
      product.name,
      product.name.split(" ")[0],
      product.name.split(" ")[1],
    ];

    for (const q of searchCombinations) {
      console.log(`\nSearching by q: ${q}`);

      const getProductsBySearchResponse = await productsApi.getProducts(
        `/search?q=${encodeURIComponent(q)}`,
      );

      // Assert response status is equal to 2**
      await expect(getProductsBySearchResponse).toBeOK();

      //Save response body in json in var
      const responseBody = await getProductsBySearchResponse.json();

      // Itterate over response body data to check the price to be less or equal 5
      for (const product of responseBody.data) {
        // Assert full names of products from response body to be full product name
        expect.soft(product.name).toContain(q);
      }
      console.log("\n\n\n==============");
    }
  });
});
