import Validator = require("validator");
import isEmpty = require("is-empty");

interface ILoginErrors {
  email?: string;
  password?: string;
}

export function validateLoginInput(data: any) {
  let errors: ILoginErrors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Email Checks

  //Checks if Email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!";
    //Checks if Email field is an email
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Password Checks

  //Checks if Password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required!";
  }
  //Checks if Password Length is '< 6 or > 30'
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters!";
  }

  //Returns all errors, and an isValid bool that returns true if there are no errors, and false if not
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
