/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  // vai adaptar o controller e vai retornar em um formato que express entende
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
