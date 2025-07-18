import { faker } from "@faker-js/faker";

export const testData_TOOLS_12: any = {
  billingData: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
  },

  userData: {
    email: process.env.CUSTOMER_1_EMAIL,
    password: process.env.CUSTOMER_1_PASSWORD,
    surname: process.env.CUSTOMER_1_SURNAME,
  },
};
