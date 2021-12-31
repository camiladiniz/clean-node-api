import { makeSaveSurveyResultController, makeLoadSurveyResultController } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  // vai adaptar o controller e vai retornar em um formato que express entende
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
