import { faker } from "@faker-js/faker";

export const testData_TOOLS_43: any = {
  billing_street: faker.location.streetAddress(),
  billing_city: faker.location.city(),
  billing_state: faker.location.state(),
  billing_country: faker.location.country(),
  billing_postal_code: faker.location.zipCode(),
  payment_method: "bank-transfer",
  cart_id: "",
  payment_details: {
    bank_name: "Test Bank",
    account_name: faker.finance.accountName(),
    account_number: faker.finance.accountNumber(),
  },
};
