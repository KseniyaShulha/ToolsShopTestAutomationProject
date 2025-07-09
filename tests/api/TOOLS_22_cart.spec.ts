import { test, expect } from "@playwright/test";
import { UsersApi } from "../../api/usersApi";
import { loginApi } from "../../api/helperApi";
import { CartApi } from "../../api/cartApi";

let token: any;
const testData_addToCart: any = {
  product_id: "01JZR5GR7B2Z1PNXD64QWJ5YAX",
  quantity: 1,
};

test.describe("add item to cart", () => {
  test.beforeEach(async ({ request }) => {
    //
    token = await loginApi(
      {
        email: process.env.CUSTOMER_2_EMAIL,
        password: process.env.CUSTOMER_2_PASSWORD,
      },
      request,
    );
  });

  test("TOOLS-22 add item to cart", async ({ request }) => {
    // Create instance of UserApi
    const cartApi = new CartApi(request);

    const createCartResponse: any = await cartApi.postCreateCart(token);

    expect(createCartResponse.status()).toBe(201);

    const createCartResponseBody = await createCartResponse.json();
    const cartId = createCartResponseBody.id;

    expect(cartId).toBeDefined();

    // Send post request /users/login and storing the response in variable
    const addToCartResponse: any = await cartApi.postAddToCart(
      token,
      testData_addToCart,
      cartId,
    );

    const body = await addToCartResponse.json();
    console.log("Response:", body);

    // Asserting response status is equal to 2**
    expect(addToCartResponse.status()).toBe(200);

    const getCartResponse = await cartApi.getCart(token, cartId);

    expect(getCartResponse.status()).toBe(200);

    const getCartResponseBody = await getCartResponse.json();

    expect(getCartResponseBody.cart_items[0].product_id).toBe(
      testData_addToCart.product_id,
    );

    expect(getCartResponseBody.cart_items[0].quantity).toBe(
      testData_addToCart.quantity,
    );
  });
});
