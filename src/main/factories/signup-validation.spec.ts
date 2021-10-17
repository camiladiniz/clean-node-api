import { RequiredFieldValidation } from '../../presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helper/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../presentation/helper/validators/validation'

jest.mock('../../presentation/helper/validators/validation-composite')

// garntir que qnd o metodo makeSignUpValidation o metodo validation composite seja chamado passando as instancias desejadas
// como estamos no mainlayer e n estamos injetando dependencias no construtor é mais chato pq estamos querendo testar um modulo do composite
describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
