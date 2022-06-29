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
    email: Joi.string().email().required(),
    username: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    password: passwordComplexityOptions().required(),
    referrerID: Joi.string().min(9).optional(),
    confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required(),
  })

  return schema.validate(body)
}


function validateLogin (body: any) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: passwordComplexityOptions().required()
  })

  return schema.validate(body)
}

export {
    validateRegister,
    validateLogin
}