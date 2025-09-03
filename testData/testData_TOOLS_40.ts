import { faker } from "@faker-js/faker";

const BANK_NAME_FIELD_ERROR =
  "The payment details.bank name field is required.";
const ACCOUNT_NAME_FIELD_ERROR =
  "The payment details.account name field is required.";
const ACCOUNT_NUMBER_FIELD_ERROR =
  "The payment details.account number field is required.";

export const testData_TOOLS_40: any = [
  {
    scenarioName: "empty bank name field",
    payment_method: "bank-transfer",
    payment_details: {
      bank_name: "",
      account_name: faker.finance.accountName(),
      account_number: faker.finance.accountNumber(),
    },
    expcetedStatus: 422,
    errorMessage: BANK_NAME_FIELD_ERROR,
  },
  {
    scenarioName: "empty account name field",
    payment_method: "bank-transfer",
    payment_details: {
      bank_name: "Test Bank",
      account_name: "",
      account_number: faker.finance.accountNumber(),
    },
    expcetedStatus: 422,
    errorMessage: ACCOUNT_NAME_FIELD_ERROR,
  },
  {
    scenarioName: "empty account number field",
    payment_method: "bank-transfer",
    payment_details: {
      bank_name: "Test Bank",
      account_name: faker.finance.accountName(),
      account_number: "",
    },
    expcetedStatus: 422,
    errorMessage: ACCOUNT_NUMBER_FIELD_ERROR,
  },
];
