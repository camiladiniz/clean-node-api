/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
// import { makeSignUpController } from '../factories/signup'
// import { adaptRoute } from '../adapters/express-route-adapter'
// para não precisar criar as rotas dos controllers manualmente

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}

// export default (router: Router): void => {
//   router.post('/signup', adaptRoute(makeSignUpController()))
// }
