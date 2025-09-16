import { test, expect } from "@playwright/test";
import {
  createCartAndAddProduct,
  getRandomProductInStock,
  loginApi,
} from "../../api/apiHelper";
import { CartApi } from "../../api/cartApi";

let token: any;
let cartId: string | null;
let cartApi: any;
let testData_TOOLS_36: any, product;

test.describe("Cart API - delete product", () => {
  test.beforeEach(async ({ request }) => {
    // Create instance of CartApi
    cartApi = new CartApi(request);

    // Find product in stock and save it in var
    product = await getRandomProductInStock(request);

    testData_TOOLS_36 = {
      product_id: product.id,
      quantity: 2,
    };

    // Get token
    token = await loginApi(
      {
        email: process.env.CUSTOMER_2_EMAIL,
        password: process.env.CUSTOMER_2_PASSWORD,
      },
      request,
    );

    // Create cart and add product to cart
    cartId = await createCartAndAddProduct(token, product.id, 2, request);
  });

  test("TOOLS-37 DELETE carts/cartId/product/{productId}", async () => {
    const deteProductFromCartResponse = await cartApi.deleteProductFromCart(
      token,
      cartId,
      testData_TOOLS_36.product_id,
    );

    // Assert response status is equal to 2**
    expect(deteProductFromCartResponse.status()).toBe(204);

    // Send get request to check the cart to assert the product was deleted
    const getCartResponse = await cartApi.getCart(token, cartId);

    // Assert cart still exists
    expect(getCartResponse.status()).toBe(200);
    const getCartResponseBody = await getCartResponse.json();

    // Assert that cart doesn't contain deleted product
    expect(getCartResponseBody.cart_items.length).toBe(0);
  });
});

// afterEach hook to delete cart
test.afterEach(async ({ request }) => {
  if (cartId) {
    const cartApi = new CartApi(request);
    await cartApi.deleteCart("", cartId, request);
  }
});
