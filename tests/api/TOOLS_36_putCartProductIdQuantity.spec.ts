import { test, expect } from "@playwright/test";
import { loginApi } from "../../api/apiHelper";
import { CartApi } from "../../api/cartApi";
import { ProductsApi } from "../../api/productsApi";

let token: any;
let cartId: string;
let productApi: any, cartApi;
let testData_TOOLS_36: any;

test.describe("Cart API - Update quantity", () => {
  test.beforeEach(async ({ request }) => {
    productApi = new ProductsApi(request);
    cartApi = new CartApi(request);

    // Send GET request to find the item in stock
    const getProductResponse = await productApi.getProducts();
    const getProductResponseBody = await getProductResponse.json();
    const productId = getProductResponseBody.data.find(
      (data) => data.in_stock === true,
    ).id;

    console.log("===============================");
    console.log("productId", productId);

    expect(productId).toBeDefined();

    testData_TOOLS_36 = {
      product_id: productId,
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

    // Create a cart
    const createCartResponse: any = await cartApi.postCreateCart(token);
    expect(createCartResponse.status()).toBe(201);
    const createCartResponseBody = await createCartResponse.json();
    cartId = createCartResponseBody.id;
    expect(cartId).toBeDefined();
    console.log("cartId", cartId);
    console.log("===============================");

    // Put a product to a cart
    const addToCartResponse: any = await cartApi.postAddToCart(
      token,
      testData_TOOLS_36,
      cartId,
    );
    expect(addToCartResponse.status()).toBe(200);
    console.log(
      "addToCartResponse",
      JSON.stringify(addToCartResponse, null, 2),
    );
    console.log("===============================");
  });

  test("TOOLS-36 PUT carts/cartId/itemId/quantity", async () => {
    const newQuantity: any = {
      product_id: testData_TOOLS_36.product_id,
      quantity: 3,
    };

    // Update quantity of products
    const updateResponse: any = await cartApi.putUpdateQuantity(
      token,
      cartId,
      newQuantity,
    );

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();
    console.log("Updated cart:", updateBody);

    // Assert the quantity of product has changed
    const getCartResponse = await cartApi.getCart(token, cartId);
    expect(getCartResponse.status()).toBe(200);
    const getCartBody = await getCartResponse.json();

    expect(getCartBody.cart_items[0].quantity).toBe(newQuantity.quantity);
  });
});
