const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //Name Checks
  
  //Checks if Name field is empty
  if(Validator.isEmpty(data.name)){
    errors.name = "Name field is required!" 
  }

  //Email Checks
  
  //Checks if Email field is empty
  if(Validator.isEmpty(data.email)){
    errors.email = "Email field is required!"; 
  //Checks if Email field is an email
  } else if (!Validator.isEmail(data.email)){
    errors.email = "Email is invalid"; 
  }

  //Password Checks

  //Checks if Password field is empty
  if(Validator.isEmpty(data.password)){
    errors.password = "Password field is required!";
  }

  //Checks if Password-Confirmation field is empty
  if(Validator.isEmpty(data.password2)){
    errors.password2 = "Confirm password field is required!"; 
  }

  //Checks if Password Length is '< 6 or > 30'
  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = "Password must be at least 6 characters!"; 
  }

  //Checks if Password-Confirmation and Password are identical
  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = "Passwordsd must match!"; 
  }

  //Returns all errors, and an isValid bool that returns true if there are no errors, and false if not
  return {
    errors,
    isValid: isEmpty(errors) 
  };
};
