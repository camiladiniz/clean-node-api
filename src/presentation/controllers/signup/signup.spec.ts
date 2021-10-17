import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { EmailValidator, AccountModel, AddAccount, AddAccountModel, HttpRequest, Validation } from './signup-protocols'
import { ok, serverError, badRequest } from '../../helper/http-helper'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount()
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    // any pq cada request vem com um body diferente
    validate (input: any): Error {
      return new Error()
    }
  }
  return new ValidationStub()
}

// não é mais usado porque alteramos o retorno pelo spyOn
// const makeEmailValidatorWithError = (): EmailValidator => {
//   class EmailValidatorStub implements EmailValidator {
//     isValid (email: string): boolean {
//       throw new Error()
//     }
//   }
//   return new EmailValidatorStub()
// }

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  // injetando classe mockada de e-mail validator no controller
  // sutb- test double (tipo de teste que criamos uma função e retornamos uma resposta fixa)

  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(emailValidatorStub, addAccountStub, validationStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  // se não tiver a propriedade name no cadastro retorna erro
  test('Should return 400 if no name is provider', async () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    // expect(httpResponse.statusCode).toBe(400) // tobe compara o ponteiro do objeto também (objs identicos) imrpove:
    // expect(httpResponse.body).toEqual(new MissingParamError('name'))
    // essa linha substitui as duas anteriores:
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})

describe('SignUp Controller', () => {
  // se não tiver a propriedade email no cadastro retorna erro
  test('Should return 400 if no email is provider', async () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    // expect(httpResponse.statusCode).toBe(400) // tobe compara o ponteiro do objeto também (objs identicos)
    // expect(httpResponse.body).toEqual(new MissingParamError('email'))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})

describe('SignUp Controller', () => {
  // se não tiver a propriedade name no cadastro retorna erro
  test('Should return 400 if no password is provider', async () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    // expect(httpResponse.statusCode).toBe(400) // tobe compara o ponteiro do objeto também (objs identicos)
    // expect(httpResponse.body).toEqual(new MissingParamError('password'))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no password confirmation is provider', async () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    // expect(httpResponse.statusCode).toBe(400) // tobe compara o ponteiro do objeto também (objs identicos)
    // expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  // test('Should return 400 if password confirmation fails', async () => {
  //   // sut = system under text
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email@mail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'invalid_password'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(400) // tobe compara o ponteiro do objeto também (objs identicos)
  //   // expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  //   expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  // })

  test('Should return 400 if an invalid email is provided', async () => {
    // sut = system under text
    const { sut, emailValidatorStub } = makeSut()
    // utilizar o jest para espionar o método isValid da instancia
    // mockando o retorno do método
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    // expect(httpResponse.statusCode).toBe(400)
    // expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', async () => {
    // sut = system under text
    const { sut, emailValidatorStub } = makeSut()
    // utilizar o jest para espionar o método isValid da instancia
    // mockando o retorno do método
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)))
    // expect(httpResponse.statusCode).toBe(500) // tobe compara o ponteiro do objeto também (objs identicos)
    // expect(httpResponse.body).toEqual(new ServerError(undefined))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)))
    // expect(httpResponse.statusCode).toBe(500) // tobe compara o ponteiro do objeto também (objs identicos)
    // expect(httpResponse.body).toEqual(new ServerError(undefined))
  })

  test('Should return 200 if data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
    // expect(httpResponse.statusCode).toBe(200) // tobe compara o ponteiro do objeto também (objs identicos)
    // expect(httpResponse.body).toEqual(makeFakeAccount())
  })

  test('Should call Validate with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
