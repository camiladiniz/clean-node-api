import { SaveSurveyResultModel, SaveSurveyResultRepository } from '@/data/usecases/save-survey-result/db-save-survey-result-protocols'
import { MongoHelper } from '../../helpers/mongo-helper'
import { SurveyResultModel } from '@/domain/models/survey-result'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResult')
    //upsert diz que se não encontrar o objeto deve criá-lo com as informações do find e criation
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      account: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date,
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return res.value && MongoHelper.mapGet(res.value)
  }
}