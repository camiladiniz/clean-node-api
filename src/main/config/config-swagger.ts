import swaggerConfig from '@/main/config/docs'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

// use() é como middlewares são definidos
export default (app: Express): void => {
  app.use('/api-docs', serve, setup(swaggerConfig))
}
