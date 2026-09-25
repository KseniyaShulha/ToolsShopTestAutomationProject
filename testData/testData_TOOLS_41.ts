import { faker } from "@faker-js/faker";

export const testData_TOOLS_41: any = {
  payment_details: {
    credit_card_number: "4242-4242-4242-4242",
    expiration_date: "12/2030",
    cvv: "123",
    card_holder_name:
      `${faker.person.firstName()} ${faker.person.lastName()}`.replace(
        /[^a-zA-Z\s]/g,
        "",
      ),
  },
};
