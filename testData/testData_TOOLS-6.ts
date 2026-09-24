import { faker } from "@faker-js/faker";

export const testData_TOOLS_6: any = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  dob: faker.date.birthdate().toISOString().split("T")[0],
  street: faker.location.streetAddress(),
  postalCode: faker.location.zipCode(),
  city: faker.location.city(),
  state: "IL",
  country: "AL",
  house_number: faker.location.buildingNumber(),
  phone: Date.now().toString(),
  email: faker.internet.email(),
  password: "1Qq!" + faker.internet.password({ length: 4 }),
};
