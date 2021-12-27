import { runInThisContext } from 'vm'
import { Controller, forbidden, HttpRequest, HttpResponse, InvalidParamError, LoadSurveyById, SaveSurveyResult, serverError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly LoadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      const survey = await this.LoadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.saveSurveyResult.save({
        accountId: accountId as string,
        surveyId,
        answer,
        date: new Date()
      })
      return null as any
    } catch (error) {
      return serverError(error)
    }
  }
}