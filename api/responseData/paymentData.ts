export const responseData = {
  successPayment: {
    message: "Payment was successful",
  },
  emptyBankNameFieldError: {
    message: "The payment details.bank name field is required.",
    errors: {
      "payment_details.bank_name": [
        "The payment details.bank name field is required.",
      ],
    },
  },
  emptyAccountNameFieldError: {
    message: "The payment details.account name field is required.",
    errors: {
      "payment_details.account_name": [
        "The payment details.account name field is required.",
      ],
    },
  },
  emptyAcccountNumberFieldError: {
    message: "The payment details.account number field is required.",
    errors: {
      "payment_details.account_number": [
        "The payment details.account number field is required.",
      ],
    },
  },
};
