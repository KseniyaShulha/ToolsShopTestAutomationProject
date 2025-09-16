import { test, expect } from "@playwright/test";
import { CartApi } from "../../api/cartApi";
import { UserSteps } from "../../steps/steps";
import { testData_TOOLS_46_login } from "../../testData/testData_TOOLS_46";
import { AppPageObjects } from "../../pages/appPageObjects";
import { ShoppingCartPage } from "../../pages/shoppingCart/shoppingCartPage";
import { ProductsApi } from "../../api/productsApi";

test("TOOLS-46 Add each product from home page with in_stock true from homepage via API and check cart via UI", async ({
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
  const token: any = await steps.loginUi(
    testData_TOOLS_46_login.userData.email,
    testData_TOOLS_46_login.userData.password,
    testData_TOOLS_46_login.userData.surname,
    false,
  );

  // Add random product in cart
  await steps.addRandomItemFromHomePageToCart();

  // Wait for url and response with staus 200 and save response in var
  const cartResponse = await page.waitForResponse(
    (resp) => resp.url().includes(`/carts/`) && resp.status() === 200,
  );

  // Save response body in json
  const responseBody = await cartResponse.json();

  // Save cart id in var
  const cartId = responseBody.cart_items[0].cart_id;

  // Send get products via API and save response body
  const getAllProductsFromHomePage = await productApi.getProducts();
  const getAllProductsFromHomePageresponseBody =
    await getAllProductsFromHomePage.json();

  // Filter products in stock
  const productsInStock = getAllProductsFromHomePageresponseBody.data.filter(
    (product: any) => product.in_stock,
  );

  // Add each product to the cart from products in stock
  for (const product of productsInStock) {
    const testData_TOOLS_46 = {
      product_id: product.id,
      quantity: 1,
    };

    // Send POST request and save response body
    const addProductsToCartResponse: any = await cartApi.postAddToCart(
      token,
      testData_TOOLS_46,
      cartId,
      request,
    );

    expect(addProductsToCartResponse.status()).toBe(200);
  }

  // Open home page
  await appPageObjects.homePage().openHomePage();

  // Go to the shopping cart
  await appPageObjects.headerSection().clickShoppingCartIcon();

  // Convert shopping cart table in json format
  const shoppingCartTableContent: any =
    await shoppingCartPage.getShoppingCartTableContent();

  // Assert item name from table to strict equal name var
  for (const product of productsInStock) {
    const productName = product.name;
    const productFromUi = shoppingCartTableContent.find(
      (el: { Item: any }) => el.Item === productName,
    );
    expect(productFromUi).toBeDefined();
  }
});
