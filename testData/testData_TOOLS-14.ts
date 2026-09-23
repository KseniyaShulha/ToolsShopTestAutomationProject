import { CheckoutDataBuilder } from "./checkoutDataBuilder";

export const testData_TOOLS_14: any = new CheckoutDataBuilder()
  .withBillingData()
  .withUserData(2)
  .withGiftCardData()
  .build();
