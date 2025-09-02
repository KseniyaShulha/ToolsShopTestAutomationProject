import { faker } from "@faker-js/faker";

export const testData_TOOLS_38 = {
  payment_method: "bank-transfer",
  payment_details: {
    bank_name: faker.word.sample() + " bank",
    account_name: faker.finance.accountName(),
    account_number: faker.finance.accountNumber(),
  },
};
