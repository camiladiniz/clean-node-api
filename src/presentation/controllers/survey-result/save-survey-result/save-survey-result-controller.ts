import { Controller, forbidden, HttpRequest, HttpResponse, InvalidParamError, LoadSurveyById, serverError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly LoadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.LoadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null as any
    } catch (error) {
      return serverError(error)
    }
  }
}