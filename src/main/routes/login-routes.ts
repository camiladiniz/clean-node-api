import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { Router } from 'express'

// para não precisar criar as rotas dos controllers manualmente

// export default (router: Router): void => {
//   router.post('/signup', (req, res) => {
//     res.json({ ok: 'ok' })
//   })
// }

export default (router: Router): void => {
  // vai adaptar o controller e vai retornar em um formato que express entenda
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
