import { test, expect } from "@playwright/test";
import { CartApi } from "../../api/cartApi";
import { UserSteps } from "../../steps/steps";
import { loginApi } from "../../api/apiHelper";
import { testData_TOOLS_45_login } from "../../testData/testData_TOOLS_45";
import { AppPageObjects } from "../../pages/appPageObjects";
import { ShoppingCartPage } from "../../pages/shoppingCart/shoppingCartPage";
import { ProductsApi } from "../../api/productsApi";

test("TOOLS-45 Update product quantity via API and check quantity via UI", async ({
  page,
  request,
}) => {
  // Create instances
  const steps: UserSteps = new UserSteps(page);
  const appPageObjects = new AppPageObjects(page);
  const cartApi = new CartApi(request);
  const shoppingCartPage = new ShoppingCartPage(page);
  const productApi = new ProductsApi(request);

  // Login as customer via UI
  await steps.loginUi(
    testData_TOOLS_45_login.userData.email,
    testData_TOOLS_45_login.userData.password,
    testData_TOOLS_45_login.userData.surname,
    false,
  );

  // Add random product in cart
  await steps.addRandomItemFromHomePageToCart();

  // Wait for url and response with status 200 and save response in var
  const cartResponse = await page.waitForResponse(
    (resp) => resp.url().includes(`/carts/`) && resp.status() === 200,
  );
  console.log(
    "\nresponse =================================================",
    cartResponse,
  );

  // Save response body in json
  const responseBody = await cartResponse.json();
  console.log(
    "\nresponseBody =================================================",
    responseBody,
  );

  // Save cart id in var
  const cartId = responseBody.cart_items[0].cart_id;

  // Save product id in var
  const productId = responseBody.cart_items[0].product_id;

  // Create body with product id and new quantity
  const newQuantity: { product_id: string; quantity: number } = {
    product_id: productId,
    quantity: 4,
  };

  // / Get token via API
  const token: any = await loginApi(
    {
      email: process.env.CUSTOMER_2_EMAIL,
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    request,
  );

  // Send PUT request to update quantity of product
  const updateResponse: any = await cartApi.putUpdateQuantity(
    token,
    cartId,
    newQuantity,
  );

  // Assert response status is equal to 2**
  expect(updateResponse.status()).toBe(200);

  // Send request to get all products from page 1
  const getProducts = await productApi.getProducts("?page=1");

  // Save response body in json
  const getProductsResponseBody = await getProducts.json();
  console.log("\ngetProductsResponseBody", getProductsResponseBody);

  // Get the product with the same product id and save name in var
  const name = getProductsResponseBody.data.find(
    (el: { id: any }) => el.id === productId,
  ).name;

  // Open home page
  await appPageObjects.homePage().openHomePage();

  // Go to the shopping cart
  await appPageObjects.headerSection().clickShoppingCartIcon();

  // Convert shopping cart table in json format
  const shoppingCartTableContent =
    await shoppingCartPage.getShoppingCartTableContent();

  // Assert the naumber of products in cart to strict equal qty from newQuantity
  expect(Number(shoppingCartTableContent[0]["Quantity"])).toStrictEqual(
    newQuantity.quantity,
  );

  // Assert item name from table to strict equal name var
  expect(shoppingCartTableContent[0]["Item"]).toStrictEqual(name);
});
