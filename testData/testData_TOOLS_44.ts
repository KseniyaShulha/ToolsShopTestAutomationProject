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
    surname: process.env.ADMIN_SURNAME,
  },
};

export const testData_TOOLS_44_invoice: any = {
  billing_street: "5439 Mohr Loaf",
  billing_city: "Kozienice",
  billing_state: "podkarpackie",
  billing_country: "PL",
  billing_postal_code: "50-001",
  payment_method: "bank-transfer",
  cart_id: "",
  payment_details: {
    bank_name: "",
    account_name: "",
    account_number: "",
  },
};
