import { faker } from "@faker-js/faker";

export const testData_TOOLS_14: any = {
  billingData: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
  },

  userData: {
    email: "customer2@practicesoftwaretesting.com",
    password: "welcome01",
    surname: "Howe",
  },

  giftCardData: {
    giftCardNumber: faker.string.alphanumeric(),
    giftCardValidationCode: faker.string.alphanumeric(),
  },
};
