import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { EmailValidator, AccountModel, AddAccount, AddAccountModel } from './signup-protocols'


const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valide_name',
        email: 'valide_email',
        password: 'valide_password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
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
}

const makeSut = (): SutTypes => {
  // injetando classe mockada de e-mail validator no controller
  // sutb- test double (tipo de teste que criamos uma função e retornamos uma resposta fixa)

  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  // se não tiver a propriedade name no cadastro retorna erro
  test('Should return 400 if no name is provider', () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) //tobe compara o ponteiro do objeto também (objs identicos)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('SignUp Controller', () => {
  // se não tiver a propriedade email no cadastro retorna erro
  test('Should return 400 if no email is provider', () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) //tobe compara o ponteiro do objeto também (objs identicos)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('SignUp Controller', () => {
  // se não tiver a propriedade name no cadastro retorna erro
  test('Should return 400 if no password is provider', () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) //tobe compara o ponteiro do objeto também (objs identicos)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is provider', () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) //tobe compara o ponteiro do objeto também (objs identicos)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if password confirmation fails', () => {
    // sut = system under text
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) //tobe compara o ponteiro do objeto também (objs identicos)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    // sut = system under text
    const { sut, emailValidatorStub } = makeSut()
    // utilizar o jest para espionar o método isValid da instancia
    // mockando o retorno do método
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    // sut = system under text
    const { sut, emailValidatorStub } = makeSut()
    // utilizar o jest para espionar o método isValid da instancia
    // mockando o retorno do método
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500) //tobe compara o ponteiro do objeto também (objs identicos)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddAccount with correct values', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
})