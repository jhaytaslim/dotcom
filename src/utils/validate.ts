import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 6,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
}

const passwordComplexityOptions = () => {
  return passwordComplexity(complexityOptions)
}

function validateRegister (body: any) {
  const schema = Joi.object({
    username: passwordComplexityOptions().required(),
    name: Joi.string().optional()
  })

  return schema.validate(body)
}


export {
    validateRegister
}