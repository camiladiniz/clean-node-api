import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // retorna uma lista com o nome e path completo desses arquivos
  // fg.sync('**/src/main/routes/**routes.ts').map(async file => {
  //   const route = (await import(`../../../${file}`)).default
  //   route(router)
  // })
  // fg.sync('**/src/main/routes/**routes.ts').map(async file => console.log(file))
  fg.sync('**/src/main/routes/**routes.ts').map(async file => (await import(`../../../${file}`)).default(router))
}
