import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  // se não tiver a propriedade name no cadastro retorna erro
  test('Should return 400 if no name is provider', () => {
    // sut = system under text
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) //tobe compara o ponteiro do objeto também (objs identicos)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})

