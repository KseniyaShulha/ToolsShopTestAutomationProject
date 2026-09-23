import { UserBuilder } from "./userBuilder";

export const testData_login: any = new UserBuilder()
  .withUserData("CUSTOMER_2")
  .build();
