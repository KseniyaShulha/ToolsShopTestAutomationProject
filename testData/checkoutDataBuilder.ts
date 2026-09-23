import { faker } from "@faker-js/faker";

type CustomerNumber = 1 | 2 | 3;

export class CheckoutDataBuilder {
  private data: any = {};

  withBillingData(): this {
    this.data.billingData = {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postcode: faker.location.zipCode(),
    };
    return this;
  }

  withUserData(customerNumber: CustomerNumber): this {
    this.data.userData = {
      email: process.env[`CUSTOMER_${customerNumber}_EMAIL`],
      password: process.env[`CUSTOMER_${customerNumber}_PASSWORD`],
      surname: process.env[`CUSTOMER_${customerNumber}_SURNAME`],
    };
    return this;
  }

  withCreditCard(): this {
    this.data.creditCard = {
      creditCardNumber: "4242-4242-4242-4242",
      expirationDate: "12/2025",
      cvvCode: "123",
      cardHolderName: faker.person.fullName(),
    };
    return this;
  }

  withBankData(): this {
    this.data.bankData = {
      bankName: faker.word.sample() + " bank",
      accountName: faker.finance.accountName(),
      accountNumber: faker.finance.accountNumber(),
    };
    return this;
  }

  withGiftCardData(): this {
    this.data.giftCardData = {
      giftCardNumber: faker.string.alphanumeric(),
      giftCardValidationCode: faker.string.alphanumeric(),
    };
    return this;
  }

  build(): any {
    return this.data;
  }
}
