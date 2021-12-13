import { badRequest, serverError } from '../../../helper/http/http-helper'
import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers} = httpRequest.body
      await this.addSurvey.add({
        question,
        answers
      })
      return new Promise(resolve => resolve(null as any))
    }catch (error) {
      return serverError(error)
    }
  }
}
