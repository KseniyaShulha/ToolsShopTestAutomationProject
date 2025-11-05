import { test, expect } from "../fixtures/fixtures";
import { getTokenFromJson } from "../../api/apiHelper";
import { CartApi } from "../../api/cartApi";
import { ProductsApi } from "../../api/productsApi";

let token: any;
let cartId: any;
let productApi: any;
let testData_TOOLS_36: any;
let cartApi: any;

test.describe(
  "TOOLS_36_putCartProductIdQuantity",
  { tag: ["@api", "@regression"] },
  () => {
    test.beforeEach(async ({ request }) => {
      productApi = new ProductsApi(request);
      cartApi = new CartApi(request);

      // Send GET request to get list of all products
      const getProductResponse = await productApi.getProducts();
      const getProductResponseBody = await getProductResponse.json();

      // Find product in stock
      const productId = getProductResponseBody.data.find(
        (data: any) => data.in_stock === true,
      ).id;
      expect(productId).toBeDefined();

      testData_TOOLS_36 = {
        product_id: productId,
        quantity: 2,
      };

      // Get token
      token = await getTokenFromJson("customer2");

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

    test("PUT carts/cartId/itemId/quantity", async () => {
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

      // Assert response status is equal to 2**
      expect(updateResponse.status()).toBe(200);

      const updateBody = await updateResponse.json();
      console.log("\nUpdated cart:", updateBody);

      // Send GET request to check the cart
      const getCartResponse = await cartApi.getCart(token, cartId);

      // Assert response status is equal to 2**
      expect(getCartResponse.status()).toBe(200);

      // Save response body
      const getCartBody = await getCartResponse.json();

      // Assert the quantity of product has changed
      expect(getCartBody.cart_items[0].quantity).toBe(newQuantity.quantity);
    });

    // afterEach hook to delete cart
    test.afterEach(async ({ adminApi }) => {
      await adminApi.deleteCart(cartId);
    });
  },
);
