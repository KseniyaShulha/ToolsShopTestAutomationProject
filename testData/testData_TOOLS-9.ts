import { CheckoutDataBuilder } from "./checkoutDataBuilder";

export const testData_TOOLS_9: any = new CheckoutDataBuilder()
  .withBillingData()
  .withUserData(3)
  .withCreditCard()
  .build();
