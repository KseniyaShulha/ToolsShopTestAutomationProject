import { faker } from "@faker-js/faker";

export const testData_TOOLS_6 = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  dateOfBirth: faker.date.birthdate(),
  street: faker.location.streetAddress(),
  postalCode: faker.location.zipCode(),
  city: faker.location.city(),
  state: "IL",
  country: "AL",
  phone: Date.now().toString(),
  email: faker.internet.email(),
  password: "1Qq!" + faker.internet.password({ length: 4 }),
};
