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
  emptyCreditCardFieldError: {
    message: "The payment details.credit card number field is required.",
    errors: {
      "payment_details.credit_card_number": [
        "The payment details.credit card number field is required.",
      ],
    },
  },
  emptyExpirationDateFieldError: {
    message: "The payment details.expiration date field is required.",
    errors: {
      "payment_details.expiration_date": [
        "The payment details.expiration date field is required.",
      ],
    },
  },
  emptyCvvFieldError: {
    message: "The payment details.cvv field is required.",
    errors: {
      "payment_details.cvv": ["The payment details.cvv field is required."],
    },
  },
  emptyCardHolderNameFieldError: {
    message: "The payment details.card holder name field is required.",
    errors: {
      "payment_details.card_holder_name": [
        "The payment details.card holder name field is required.",
      ],
    },
  },
  InvalidFormatCreditCardFieldError: {
    message: "The payment details.credit card number field format is invalid.",
    errors: {
      "payment_details.credit_card_number": [
        "The payment details.credit card number field format is invalid.",
      ],
    },
  },
  InvalidMonthFormatExpirationDateFieldError: {
    message:
      "The payment details.expiration date field must match the format m/Y.",
    errors: {
      "payment_details.expiration_date": [
        "The payment details.expiration date field must match the format m/Y.",
      ],
    },
  },
  InvalidFormatExpirationDateFieldError: {
    message:
      "The payment details.expiration date field must match the format m/Y. (and 1 more error)",
    errors: {
      "payment_details.expiration_date": [
        "The payment details.expiration date field must match the format m/Y.",
        "The payment details.expiration date field must be a date after today.",
      ],
    },
  },
  InvalidMonthAndYearFormatExpirationDateFieldError: {
    message:
      "The payment details.expiration date field must match the format m/Y. (and 1 more error)",
    errors: {
      "payment_details.expiration_date": [
        "The payment details.expiration date field must match the format m/Y.",
        "The payment details.expiration date field must be a date after today.",
      ],
    },
  },
  ExpiredExpirationDateFieldError: {
    message:
      "The payment details.expiration date field must be a date after today.",
    errors: {
      "payment_details.expiration_date": [
        "The payment details.expiration date field must be a date after today.",
      ],
    },
  },
  cvvFieldError: {
    message: "The payment details.cvv field format is invalid.",
    errors: {
      "payment_details.cvv": [
        "The payment details.cvv field format is invalid.",
      ],
    },
  },
  invalidCardHolderNameFieldError: {
    message: "The payment details.card holder name field format is invalid.",
    errors: {
      "payment_details.card_holder_name": [
        "The payment details.card holder name field format is invalid.",
      ],
    },
  },
  LongCardHolderNameFieldError: {
    message:
      "The payment details.card holder name field must not be greater than 255 characters.",
    errors: {
      "payment_details.card_holder_name": [
        "The payment details.card holder name field must not be greater than 255 characters.",
      ],
    },
  },
};
