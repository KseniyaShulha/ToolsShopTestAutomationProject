import { faker } from "@faker-js/faker";

export const testData_TOOLS_9: any = {
  billingData: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
  },
  creditCard: {
    creditCardNumber: "4242-4242-4242-4242",
    expirationDate: "12/2025",
    cvvCode: "123",
    cardHolderName: faker.person.fullName(),
  },

  userData: {
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
    fullName: "John Doe",
  },

  bankData: {
    bankName: faker.word.sample() + " bank",
    accountName: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
  },
};
