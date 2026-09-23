import { CheckoutDataBuilder } from "./checkoutDataBuilder";

export const testData_TOOLS_12: any = new CheckoutDataBuilder()
  .withBillingData()
  .withUserData(1)
  .build();
