import { test, expect } from "../fixtures/fixtures";
import { getTokenFromJson } from "../../api/apiHelper";
import { CartApi } from "../../api/cartApi";
import { InvoicesApi } from "../../api/invoiceApi";
import { testData_TOOLS_43 } from "../../testData/testData_TOOLS_43";

let token: string | null;
let cartId: any;
let cartApi: any;
let invoiceApi: any;
let testData = structuredClone(testData_TOOLS_43);

test.describe(
  "PostCreateInvoice",
  { tag: ["@api", "@regression", "@invoice"] },
  () => {
    test.beforeEach(async ({ request }) => {
      // Create instance of CartApi
      cartApi = new CartApi(request);

      // Get token
      token = await getTokenFromJson("customer2");

      // Send post request to /api/carts and store the response in variable
      const postCreateCartResponse = await cartApi.postCreateCart(
        token,
        request,
      );

      // Save response body in json
      const responseBody = await postCreateCartResponse.json();

      console.log("\nResponseBody", responseBody);

      // Save cart id from responce body in var and reassign it to cart_id from testData
      cartId = responseBody.id;
      testData.cart_id = cartId;
    });

    test("TOOLS_43 POST api/invoice", async ({ request }) => {
      // Create instance of InvoiceApi
      invoiceApi = new InvoicesApi(request);

      // Send post request to /api/invoise and store the response in variable
      const postCreateInvoiceResponse = await invoiceApi.postCreateInvoice(
        token,
        testData,
      );

      // Save response body in json
      const responseBody = await postCreateInvoiceResponse.json();

      console.log("\nResponseBody", responseBody);

      // Assert response status to be 201
      expect(postCreateInvoiceResponse.status()).toBe(201);

      // Assert received response body has the same body structure as a template response structure
      invoiceApi.assertResponseStructureAndTypes(responseBody);

      // Assert the "id" key's length to be greater than 0
      expect(responseBody.id.length).toBeGreaterThan(0);

      // Assert the "invoice_number" key's length to be greater than 0
      expect(responseBody.invoice_number.length).toBeGreaterThan(0);
    });

    // afterEach hook to delete cart
    test.afterEach(async ({ adminApi }) => {
      await adminApi.deleteCart(cartId);
    });
  },
);
