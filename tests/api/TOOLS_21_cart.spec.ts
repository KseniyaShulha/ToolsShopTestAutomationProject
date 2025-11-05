import { test, expect } from "../fixtures/fixtures";
import { getTokenFromJson } from "../../api/apiHelper";
import { CartApi } from "../../api/cartApi";
import { testData_TOOLS_21 } from "../../testData/testData_TOOLS_21";
import { ProductsApi } from "../../api/productsApi";

let token: any;
let cartId: any;

test.describe(
  "TOOLS_21_cart",
  { tag: ["@api", "@critical", "@regression"] },
  () => {
    test.beforeEach(async ({ request }) => {
      const productApi = new ProductsApi(request);

      // Send GET req and save response in var
      const getProductResponse = await productApi.getProducts();

      // Save response body in var
      const getProductResponseBody = await getProductResponse.json();

      // Search item in stock and save it in var productId
      const productId = getProductResponseBody.data.find(
        (data: any) => data.in_stock === true,
      ).id;

      // Assert product id to be defined
      expect(productId).toBeDefined();

      // Reassign testData_TOOLS_21.product_id to productId var
      testData_TOOLS_21.product_id = productId;

      // Save customer's token after login
      token = await getTokenFromJson("customer2");
    });

    test("POST carts/itemId", async ({ request }) => {
      // Create instance of CartApi
      const cartApi = new CartApi(request);

      // Send POST req for creating cart and save response in var
      const createCartResponse: any = await cartApi.postCreateCart(token);

      // Assert response status to be 2**
      expect(createCartResponse.status()).toBe(201);

      // Save response body in var
      const createCartResponseBody = await createCartResponse.json();

      // Save cart id in var
      cartId = createCartResponseBody.id;

      // Assert cart id to be defined
      expect(cartId).toBeDefined();

      // Send post request /carts/cart id and storing the response in var
      const addToCartResponse: any = await cartApi.postAddToCart(
        token,
        testData_TOOLS_21,
        cartId,
      );

      const body = await addToCartResponse.json();
      console.log("\nResponse:", body);

      // Assert response status is equal to 2**
      expect(addToCartResponse.status()).toBe(200);

      // Seng GET req and save response in var
      const getCartResponse = await cartApi.getCart(token, cartId);

      // Assert response status is equal to 2**
      await expect(getCartResponse).toBeOK();

      // Save response body in var
      const getCartResponseBody = await getCartResponse.json();

      // Assert product id in cart to be the same as in testData_addToCart
      expect(getCartResponseBody.cart_items[0].product_id).toBe(
        testData_TOOLS_21.product_id,
      );

      // Assert quantity of product in cart to be the same as in testData_addToCart
      expect(getCartResponseBody.cart_items[0].quantity).toBe(
        testData_TOOLS_21.quantity,
      );
    });

    // afterEach hook to delete cart
    test.afterEach(async ({ adminApi }) => {
      await adminApi.deleteCart(cartId);
    });
  },
);
