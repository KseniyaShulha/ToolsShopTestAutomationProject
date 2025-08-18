import { faker } from "@faker-js/faker";

const INVALID_LOGIN_ERROR = "Invalid login request";
const UNAUTHORIZED_ERROR = "Unauthorized";

export const testData_TOOLS_26: any = [
  {
    scenarioName: "empty body",
    body: {},
    expcetedStatus: 401,
    errorMessage: INVALID_LOGIN_ERROR,
  },
  {
    scenarioName: "empty password and valid email",
    body: {
      email: process.env.ADMIN_EMAIL,
      password: "",
    },
    expcetedStatus: 401,
    errorMessage: INVALID_LOGIN_ERROR,
  },
  {
    scenarioName: "empty email and valid password",
    body: {
      email: "",
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    expcetedStatus: 401,
    errorMessage: INVALID_LOGIN_ERROR,
  },
  {
    scenarioName: "invalid email and valid password",
    body: {
      email: "test@domain",
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "long email and valid password",
    body: {
      email: `${faker.string.alphanumeric(240)}@example.com`,
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "long password and valid email",
    body: {
      email: process.env.CUSTOMER_2_EMAIL,
      password: faker.internet.password({ length: 250 }),
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "sql email and valid password",
    body: {
      email: "admin' OR '1'='1",
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "sql password and valid email",
    body: {
      email: process.env.ADMIN_EMAIL,
      password: "' OR ''='",
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "xss email and valid password",
    body: {
      email: "<script>alert(1)</script>",
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "xss password and valid email",
    body: {
      email: process.env.ADMIN_EMAIL,
      password: "<script>alert(1)</script>",
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "null as an email and valid password",
    body: {
      email: null,
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    expcetedStatus: 401,
    errorMessage: INVALID_LOGIN_ERROR,
  },
  {
    scenarioName: "null as a password and valid email",
    body: {
      email: process.env.ADMIN_EMAIL,
      password: null,
    },
    expcetedStatus: 401,
    errorMessage: INVALID_LOGIN_ERROR,
  },
  {
    scenarioName: "short password and valid email",
    body: {
      email: process.env.ADMIN_EMAIL,
      password: faker.internet.password({ length: 1 }),
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
  {
    scenarioName: "short email and valid password",
    body: {
      email: "1@gmail.com",
      password: process.env.CUSTOMER_2_PASSWORD,
    },
    expcetedStatus: 401,
    errorMessage: UNAUTHORIZED_ERROR,
  },
];
