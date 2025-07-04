import { faker } from "@faker-js/faker";

export const testData_TOOLS_11: any = {
  billingData: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
  },

  userData: {
    email: process.env.CUSTOMER_2_EMAIL,
    password: process.env.CUSTOMER_2_PASSWORD,
    surname: process.env.CUSTOMER_2_SURNAME,
  },

  bankData: {
    bankName: faker.word.sample() + " bank",
    accountName: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
  },
};
