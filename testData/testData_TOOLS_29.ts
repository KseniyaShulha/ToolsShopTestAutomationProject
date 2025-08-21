import { faker } from "@faker-js/faker";

export const testData_TOOLS_29 = {
  body: {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postal_code: faker.location.zipCode(),
    },
    phone: Date.now().toString(),
    dob: "1970-01-01",
    password: process.env.CUSTOMER_2_PASSWORD,
    email: process.env.CUSTOMER_2_EMAIL,
  },
};
