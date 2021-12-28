import { SaveSurveyResultRepository } from "../protocols/db/survey-result/save-survey-result-repository"
import { SaveSurveyResultParams, SurveyResultModel } from "../usecases/survey-result/save-survey-result/db-save-survey-result-protocols"
import { mockSaveSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSaveSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
