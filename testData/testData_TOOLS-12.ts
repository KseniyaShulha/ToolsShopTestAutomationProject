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
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
    surname: "Doe",
  },
};
