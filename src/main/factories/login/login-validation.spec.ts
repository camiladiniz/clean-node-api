import { RequiredFieldValidation } from '../../../presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/helper/validators/validation-composite'
import { makeLoginValidation } from './login-validation'
import { Validation } from '../../../presentation/helper/validators/validation'
import { EmailValidation } from '../../../presentation/helper/validators/email-validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helper/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

// garntir que qnd o metodo makeSignUpValidation o metodo validation composite seja chamado passando as instancias desejadas
// como estamos no mainlayer e n estamos injetando dependencias no construtor é mais chato pq estamos querendo testar um modulo do composite
describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
