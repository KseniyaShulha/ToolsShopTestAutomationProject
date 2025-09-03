import { APIRequestContext, expect } from "@playwright/test";
import { UsersApi } from "./usersApi";
import { ProductsApi } from "./productsApi";
import { CartApi } from "./cartApi";

// Define function to verify that credentials are correct
export async function loginApi(
  body: object,
  request: APIRequestContext,
): Promise<string | null> {
  const userApi = new UsersApi(request);

  // Send post request /users/register and storing the response in variable
  const logInResponse: any = await userApi.postLogin(body);
  await expect(logInResponse).toBeOK();

  // Assert response
  const data = await logInResponse.json();
  expect(data.access_token.length).toBeGreaterThan(10);

  // Return token
  return data.access_token;
}

export async function signUpApi(
  body: object,
  request: APIRequestContext,
): Promise<any | null> {
  const userApi = new UsersApi(request);

  // Send post request /users/register and storing the response in variable
  const signUpResponse: any = await userApi.postSignUp(body);
  await expect(signUpResponse).toBeOK();

  // Save response body
  const responseBody = await signUpResponse.json();

  return responseBody;
}

export async function getRandomProductInStock(
  request: APIRequestContext,
): Promise<any | null> {
  // Create instance of ProductsApi
  const productApi = new ProductsApi(request);

  // Send GET request to get list of all products
  const getProductResponse = await productApi.getProducts();
  const getProductResponseBody = await getProductResponse.json();

  // Find product in stock
  const randomProduct = getProductResponseBody.data.find(
    (data) => data.in_stock === true,
  );
  expect(randomProduct).toBeDefined();

  return randomProduct;
}

export async function createCartAndAddProduct(
  token: string,
  productId: string,
  productQty: number,
  request: APIRequestContext,
): Promise<any | null> {
  // Create instance of CartApi
  const cartApi = new CartApi(request);

  // Create a cart
  const createCartResponse: any = await cartApi.postCreateCart(token);

  // Assert response status is equal to 2**
  expect(createCartResponse.status()).toBe(201);

  // Save response body in var
  const createCartResponseBody = await createCartResponse.json();
  console.log(
    "createCartResponseBody=================",
    createCartResponseBody,
  );

  // Save cartId
  const cartId = createCartResponseBody.id;
  expect(cartId).toBeDefined();

  console.log("cartId=================", cartId);
  // Add a product to a cart
  const addToCartResponse: any = await cartApi.postAddToCart(
    token,
    {
      product_id: productId,
      quantity: productQty,
    },
    cartId,
  );

  // Assert response status is equal to 2**
  await expect(addToCartResponse).toBeOK();

  return cartId;
}
