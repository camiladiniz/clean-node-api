import { LoadSurveyResultController } from './load-survey-result-controller'
import { HttpRequest, LoadSurveyById, SaveSurveyResult } from './load-survey-result-controller-protocols'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  },
  // body: {
  //   answer: 'any_answer'
  // },
  // accountId: 'any_account_id'
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const saveSurveyResultStub = mockSaveSurveyResult()
  const sut = new LoadSurveyResultController()
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('LoadSurveyResult Controller', () => {

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

})
