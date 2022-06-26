import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 6,
  max: 20,
  requirementCount: 2
}

const passwordComplexityOptions = () => {
  return passwordComplexity(complexityOptions)
}

function validateRegister (body: any) {
  const schema = Joi.object({
    // ValidateLength(d.Username, 6, "Username").
    // ValidateLength(d.FirstName, 2, "Firstname").
    // ValidateLength(d.LastName, 2, "Lastname").
    // ValidateLength(d.Password, 6, "Password").
    // ValidateLength(d.ConfirmPassword, 6, "Confirm_Password").
    // ValidateLength(d.ReferrerID, 9, "Referral_Code").
    // ValidatePassword(d.Password, d.ConfirmPassword).

    username: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    password: passwordComplexityOptions().required(),
    referrerID: Joi.string().min(9).required(),
    confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required(),
  })

  return schema.validate(body)
}


export {
    validateRegister
}