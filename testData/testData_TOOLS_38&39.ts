import { faker } from "@faker-js/faker";

export const testData_TOOLS_38_39: any = [
  {
    bank_name: "Test bank",
    account_name: faker.finance.accountName(),
    account_number: faker.finance.accountNumber(),
  },

  {
    gift_card_number: faker.string.alphanumeric(),
    validation_code: faker.string.alphanumeric(),
  },
];
