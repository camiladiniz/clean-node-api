import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'
// para não precisar criar as rotas dos controllers manualmente

// export default (router: Router): void => {
//   router.post('/signup', (req, res) => {
//     res.json({ ok: 'ok' })
//   })
// }

export default (router: Router): void => {
  // vai adaptar o controller e vai retornar em um formato que express entende
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
