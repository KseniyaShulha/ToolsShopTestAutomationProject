import { faker } from "@faker-js/faker";

export const testData_TOOLS_43: any = {
  billing_street: "5439 Mohr Loaf",
  billing_city: "Kozienice",
  billing_state: "podkarpackie",
  billing_country: "PL",
  billing_postal_code: "50-001",
  payment_method: "bank-transfer",
  cart_id: "",
  payment_details: {
    bank_name: "Test Bank",
    account_name: faker.finance.accountName(),
    account_number: faker.finance.accountNumber(),
  },
};
