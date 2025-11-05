import { test, expect } from "@playwright/test";
import { ProductsApi } from "../../api/productsApi";

let categoryId: any;
let productsApi: any;

test.describe(
  "TOOLS_34_getProductsWithQueryParameterCategory",
  { tag: ["@api", "@regression"] },
  async () => {
    test.beforeEach(async ({ request }) => {
      // Create instance of ProductsApi
      productsApi = new ProductsApi(request);

      // Send get request with querry params and save response in var
      const getAllProductsResponse = await productsApi.getProducts(
        "?page=1&between=price,0,200",
      );

      const responseBody = await getAllProductsResponse.json();
      console.log(
        "\nresponseBody.category.id",
        responseBody.data[0].category.id,
      );

      console.log("\n=============================");
      categoryId = responseBody.data[0].category.id;
    });

    test("GET products/?by_category=", async () => {
      const getProductsByCategoryResponse = await productsApi.getProducts(
        `?by_category=${categoryId}`,
      );

      await expect(getProductsByCategoryResponse).toBeOK();

      //Save response body in json in var
      const responseBody = await getProductsByCategoryResponse.json();

      // Itterate over response body data to check the price to be less or equal 5
      for (const product of responseBody.data) {
        expect.soft(product.category.id).toBe(categoryId);
      }
    });
  },
);
