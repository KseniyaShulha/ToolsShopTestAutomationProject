import { faker } from "@faker-js/faker";

export const testData_TOOLS_39: any = {
  payment_details: {
    gift_card_number: faker.string.alphanumeric({ length: 16 }),
    validation_code: faker.string.alphanumeric({ length: 4 }),
  },
};
