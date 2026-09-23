import { CheckoutDataBuilder } from "./checkoutDataBuilder";

export const testData_TOOLS_13: any = new CheckoutDataBuilder()
  .withBillingData()
  .withUserData(1)
  .build();
