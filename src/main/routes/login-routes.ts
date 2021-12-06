/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'
// para não precisar criar as rotas dos controllers manualmente

// export default (router: Router): void => {
//   router.post('/signup', (req, res) => {
//     res.json({ ok: 'ok' })
//   })
// }

export default (router: Router): void => {
  // vai adaptar o controller e vai retornar em um formato que express entende
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
