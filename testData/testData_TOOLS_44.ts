import { faker } from "@faker-js/faker";

export const testData_TOOLS_44: any = {
  payment_method: "bank-transfer",
  payment_details: {
    bank_name: "Test bank",
    account_name: faker.finance.accountName(),
    account_number: faker.finance.accountNumber(),
  },
};

export const testData_TOOLS_44_login: any = {
  userData: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    surname: "Doe",
  },
};

export const testData_TOOLS_44_invoice: any = {
  billing_street: faker.location.streetAddress(),
  billing_city: faker.location.city(),
  billing_state: faker.location.state(),
  billing_country: faker.location.country(),
  billing_postal_code: faker.location.zipCode(),
  payment_method: "bank-transfer",
  cart_id: "",
  payment_details: {
    bank_name: "",
    account_name: "",
    account_number: "",
  },
};
