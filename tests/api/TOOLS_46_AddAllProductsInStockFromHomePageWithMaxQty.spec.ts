import { test, expect } from "../fixtures/fixtures";
import { CartApi } from "../../api/cartApi";
import { UserSteps } from "../../steps/steps";
import { testData_TOOLS_46_login } from "../../testData/testData_TOOLS_46";
import { AppPageObjects } from "../../pages/appPageObjects";
import { ShoppingCartPage } from "../../pages/shoppingCart/shoppingCartPage";
import { ProductsApi } from "../../api/productsApi";

let cartId: any;
let cartApi: any;

test.describe(
  "AddAllProductsInStockFromHomePageWithMaxQty",
  { tag: ["@api", "@regression", "@cart"] },
  () => {
    test("TOOLS_46 Add each product from home page with in_stock true from homepage via API and check cart via UI", async ({
      page,
      request,
    }) => {
      // Create instances
      const steps = new UserSteps(page);
      const appPageObjects = new AppPageObjects(page);
      cartApi = new CartApi(request);
      const shoppingCartPage = new ShoppingCartPage(page);
      const productApi = new ProductsApi(request);

      // Login as customer via UI
      await steps.loginUi(
        testData_TOOLS_46_login.userData.email,
        testData_TOOLS_46_login.userData.password,
        testData_TOOLS_46_login.userData.surname,
        false,
      );

      // Add random product in cart
      await steps.addRandomItemFromHomePageToCart();

      // Wait for url and response with staus 200 and save response in var
      let cartResponse: any = await shoppingCartPage.waitForCartId();

      // Save cart id in var
      cartId = cartResponse.cart_items[0].cart_id;

      // Send get products via API and save response body
      const getAllProductsFromHomePage = await productApi.getProducts();

      const getAllProductsFromHomePageresponseBody =
        await getAllProductsFromHomePage.json();

      // Filter products in stock
      const productsInStock =
        getAllProductsFromHomePageresponseBody.data.filter(
          (product: any) => product.in_stock,
        );

      // Add each product to the cart from products in stock
      for (const product of productsInStock) {
        // Send POST request and save response body
        const addProductsToCartResponse: any = await cartApi.postAddToCart(
          "",
          {
            product_id: product.id,
            quantity: 1,
          },
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

        // Find product on UI
        const productFromUi = shoppingCartTableContent.find(
          (el: { Item: any }) => el.Item === productName,
        );

        // Assert all products from API request exist in shopping cart on UI
        expect(productFromUi).toBeDefined();
      }

      // Assert total number of products in shopping cart on UI (API products + 1 random product)
      expect(shoppingCartTableContent.length).toBe(productsInStock.length);
    });

    // afterEach hook to delete cart
    test.afterEach(async ({ adminApi }) => {
      await adminApi.deleteCart(cartId);
    });
  },
);
