import { faker } from "@faker-js/faker";

export const testData_TOOLS_38: any = {
  payment_details: {
    bank_name: "Test bank",
    account_name: faker.finance.accountName(),
    account_number: faker.finance.accountNumber(),
  },
};
