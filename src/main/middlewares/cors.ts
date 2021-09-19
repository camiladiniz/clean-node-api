import { Request, Response, NextFunction } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  // temos que chamar enxt dps de todos os middlewares senão requisição fica amarrada
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}
