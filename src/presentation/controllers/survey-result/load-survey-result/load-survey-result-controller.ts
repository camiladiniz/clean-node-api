import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      return Promise.resolve(null as any)
    } catch (error) {
      return Promise.resolve(null as any)
    }
  }
}
