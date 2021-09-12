/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { badRequest, serverError } from '../helper/http-helper'
import { MissingParamError, InvalidParamError } from '../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      console.log('isValid', isValid)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
    return {
      statusCode: 200,
      body: null
    }
  }
}
