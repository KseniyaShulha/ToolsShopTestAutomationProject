import { test, expect } from "../fixtures/fixtures";
import { CartApi } from "../../api/cartApi";
import { UserSteps } from "../../steps/steps";
import { getTokenFromJson } from "../../api/apiHelper";
import { testData_TOOLS_45_login } from "../../testData/testData_TOOLS_45";
import { AppPageObjects } from "../../pages/appPageObjects";
import { ShoppingCartPage } from "../../pages/shoppingCart/shoppingCartPage";
import { ProductsApi } from "../../api/productsApi";

let cartId: string;

test.describe(
  "TOOLS_45_updateProductViaApiCheckViaUi",
  { tag: ["@api", "@integration", "@regression"] },
  () => {
    test("Update product quantity via API and check quantity via UI", async ({
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
      const cartResponse: any = await shoppingCartPage.waitForCartId();

      // Save cart id in var
      cartId = cartResponse.cart_items[0].cart_id;

      // Save product id in var
      const productId = cartResponse.cart_items[0].product_id;

      // Create body with product id and new quantity
      const newQuantity: { product_id: string; quantity: number } = {
        product_id: productId,
        quantity: 4,
      };

      // / Get token via API
      const token = await getTokenFromJson("customer2");

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

    // afterEach hook to delete cart
    test.afterEach(async ({ adminApi }) => {
      await adminApi.deleteCart(cartId);
    });
  },
);
