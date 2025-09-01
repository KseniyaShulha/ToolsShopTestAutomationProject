import { test, expect } from "@playwright/test";
import { loginApi } from "../../api/apiHelper";
import { CartApi } from "../../api/cartApi";
import { ProductsApi } from "../../api/productsApi";

let token: any;
let cartId: string;
let productApi: any, cartApi;
let testData_TOOLS_36: any;

test.describe("Cart API - delete product", () => {
  test.beforeEach(async ({ request }) => {
    productApi = new ProductsApi(request);
    cartApi = new CartApi(request);

    // Send GET request to get list of all products
    const getProductResponse = await productApi.getProducts();
    const getProductResponseBody = await getProductResponse.json();

    // Find product in stock
    const productId = getProductResponseBody.data.find(
      (data) => data.in_stock === true,
    ).id;
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

    // Assert response status is equal to 2**
    expect(createCartResponse.status()).toBe(201);

    // Save response body in var
    const createCartResponseBody = await createCartResponse.json();

    // Save cartId
    cartId = createCartResponseBody.id;
    expect(cartId).toBeDefined();

    // Put a product to a cart
    const addToCartResponse: any = await cartApi.postAddToCart(
      token,
      testData_TOOLS_36,
      cartId,
    );

    // Assert response status is equal to 2**
    expect(addToCartResponse.status()).toBe(200);
  });

  test("TOOLS-37 DELETE carts/cartId/product/{productId}", async () => {
    const deteProductFromCartResponse = await cartApi.deleteProductFromCart(
      token,
      cartId,
      testData_TOOLS_36.product_id,
    );

    // Assert response status is equal to 2**
    await expect(deteProductFromCartResponse).toBeOK();

    // Send get request to check the cart to assert the product was deleted
    const getCartResponse = await cartApi.getCart(token, cartId);

    // Assert cart still exists
    expect(getCartResponse.status()).toBe(200);
    const getCartResponseBody = await getCartResponse.json();

    // Assert that cart doesn't contain deleted product
    const productIds = (getCartResponseBody.cart_items ?? []).map(
       (item) => item.product_id,
     );
    expect(productIds).not.toContain(testData_TOOLS_36.product_id);
  });
});
