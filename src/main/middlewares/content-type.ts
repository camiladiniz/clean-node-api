import { Request, Response, NextFunction } from 'express'

export const contentType = (req: Request, res: Response, next: NextFunction): void => {
  // temos que chamar next dps de todos os middlewares senão requisição fica amarrada
  res.type('json')
  next()
}
