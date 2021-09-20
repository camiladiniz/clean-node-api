/* eslint-disable @typescript-eslint/no-floating-promises */
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl.toString())
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
// app.listen(5050, () => console.log('Server running at http://localhost:5050'))
