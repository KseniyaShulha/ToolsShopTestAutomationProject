import { faker } from "@faker-js/faker";

export const testData_TOOLS_20_signUp: any = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postal_code: faker.location.zipCode(),
  },
  phone: Date.now().toString(),
  dob: faker.date.birthdate().toISOString().split("T")[0],
  password: "1Qq!" + faker.internet.password({ length: 4 }),
  email: faker.internet.email(),
};