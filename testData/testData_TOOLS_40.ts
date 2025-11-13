import { faker } from "@faker-js/faker";
import { responseData } from "../api/responseData/paymentData";

export const testData_TOOLS_40: any = [
  {
    scenarioName: "empty bank name field",
    payment_method: "bank-transfer",
    payment_details: {
      bank_name: "",
      account_name: faker.finance.accountName(),
      account_number: faker.finance.accountNumber(),
    },
    expectedStatus: 422,
    responseBody: responseData.emptyBankNameFieldError,
  },
  {
    scenarioName: "empty account name field",
    payment_method: "bank-transfer",
    payment_details: {
      bank_name: "Test Bank",
      account_name: "",
      account_number: faker.finance.accountNumber(),
    },
    expectedStatus: 422,
    responseBody: responseData.emptyAccountNameFieldError,
  },
  {
    scenarioName: "empty account number field",
    payment_method: "bank-transfer",
    payment_details: {
      bank_name: "Test Bank",
      account_name: faker.finance.accountName(),
      account_number: "",
    },
    expectedStatus: 422,
    responseBody: responseData.emptyAcccountNumberFieldError,
  },
];
