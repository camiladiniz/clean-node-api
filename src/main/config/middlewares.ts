import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

// use() é como middlewares são definidos
export default (app: Express): void => {
  app.use(bodyParser)
}
