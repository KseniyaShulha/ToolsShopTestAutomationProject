import { faker } from "@faker-js/faker";

export const testData_TOOLS_9 = {
  billingData: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: "AL",
    country: "Austria",
    postcode: faker.location.zipCode(),
  },
  creditCard: {
    creditCardNumber: "4242-4242-4242-4242",
    expirationDate: "12/2025",
    cvvCode: "123",
    cardHolderName: faker.person.fullName(),
  },
};
