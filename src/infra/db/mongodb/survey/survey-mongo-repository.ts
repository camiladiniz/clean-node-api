import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (accountData: AddSurveyModel): Promise<void> {
    const accountCollection = MongoHelper.getCollection('surveys')
    const result = await accountCollection.insertOne(accountData)
  }   

}
