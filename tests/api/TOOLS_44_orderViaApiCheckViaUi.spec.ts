import { test, expect, APIResponse } from "@playwright/test";
import {
  createCartAndAddProduct,
  getRandomProductInStock,
  loginApi,
} from "../../api/apiHelper";
import { InvoicesApi } from "../../api/invoiceApi";
import { Header } from "../../pages/header/header";
import { UserSteps } from "../../steps/steps";
import { PaymentApi } from "../../api/paymentApi";
import {
  testData_TOOLS_44,
  testData_TOOLS_44_login,
  testData_TOOLS_44_invoice,
} from "../../testData/testData_TOOLS_44";
import { OrdersPage } from "../../pages/ordersPage/ordersPage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
let token: any;
let cartId: string;
let invoiceApi: any, header, paymentApi;
let product: any;

test("TOOLS-44 Proceed payment via API and check invoice via UI", async ({
  page,
  request,
}) => {
  // Create instance of CartApi and InvoiceApi
  invoiceApi = new InvoicesApi(request);
  const steps: UserSteps = new UserSteps(page);
  header = new Header(page);
  paymentApi = new PaymentApi(request);
  invoiceApi = new InvoicesApi(request);
  const ordersPage = new OrdersPage(page);

  // Find product in stock and save it in var
  product = await getRandomProductInStock(request);

  // Get token
  token = await loginApi(
    {
      email: process.env.CUSTOMER_2_EMAIL,
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    request,
  );

  expect(token).toBeTruthy();

  // Create cart and add product to cart
  cartId = await createCartAndAddProduct(token, product.id, 2, request);

  // Save response in var
  const postCheckPaymentResponse: APIResponse =
    await paymentApi.postCheckPayment(
      testData_TOOLS_44.payment_method,
      testData_TOOLS_44.payment_details,
    );
  // Assert response status is equal to 2**
  expect(postCheckPaymentResponse.status()).toBe(200);

  // Reassign values
  testData_TOOLS_44_invoice.payment_details.bank_name =
    testData_TOOLS_44.payment_details.bank_name;
  testData_TOOLS_44_invoice.payment_details.account_name =
    testData_TOOLS_44.payment_details.account_name;
  testData_TOOLS_44_invoice.payment_details.account_number =
    testData_TOOLS_44.payment_details.account_number;
  testData_TOOLS_44_invoice.cart_id = cartId;

  // Save response in var
  const postCreateInvoiceResponse = await invoiceApi.postCreateInvoice(
    token,
    testData_TOOLS_44_invoice,
  );

  // Save response body in json
  const responseBody = await postCreateInvoiceResponse.json();

  // Assert response status to be 201
  expect(postCreateInvoiceResponse.status()).toBe(201);

  // Reassign invoice number
  const invoiceNumber = responseBody.invoice_number;

  // Login as admin
  await steps.loginUi(
    testData_TOOLS_44_login.userData.email,
    testData_TOOLS_44_login.userData.password,
    testData_TOOLS_44_login.userData.surname,
    true,
  );

  // Click on user dropdown menu in header
  await header.clickUserDropdownMenu();

  // Click on orders
  await header.clickOrdersAsAdmin();

  // Fill in search field with invoice number
  await ordersPage.fillInSearchFieldInOrders(invoiceNumber);

  // Click on search button
  await ordersPage.clickOnSearchButton();

  // Wait for url /search?page=0&q=${invoiceNumber} and status 200
  await page.waitForResponse(
    (resp) =>
      resp.url().includes(`/search?page=0&q=${invoiceNumber}`) &&
      resp.status() === 200,
  );

  // Convert table in json format
  const ordersTableContent = await ordersPage.getOrdersTableContent();

  expect(ordersTableContent.length).toBeGreaterThan(0);

  // Assert invoice number from table to be the same as invoice number from response body
  expect.soft(ordersTableContent[0]["Invoice Number"]).toBe(invoiceNumber);

  // Assert billing adress from table to be the same as billing street from response body
  expect
    .soft(ordersTableContent[0]["Billing Address"])
    .toBe(responseBody.billing_street);

  // Convert invoice dates to dayjs format
  const d1 = responseBody.invoice_date;
  const d2 = ordersTableContent[0]["Invoice Date"];

  const date1 = dayjs.utc(d1).format("YYYY-MM-DDTHH:mm");
  const date2 = dayjs.utc(d2, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm");

  // Assert invoice date from table to be the same as invoice date from response body
  expect.soft(date1).toBe(date2);

  // Assert total price from table to be the same as total price from response body
  expect
    .soft(Number(ordersTableContent[0]["Total"].slice(1)))
    .toBe(responseBody.total);
});
