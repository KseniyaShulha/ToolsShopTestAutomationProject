import { CheckoutDataBuilder } from "./checkoutDataBuilder";

export const testData_TOOLS_11: any = new CheckoutDataBuilder()
  .withBillingData()
  .withUserData(2)
  .withBankData()
  .build();
