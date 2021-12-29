import { Request, Response, NextFunction } from 'express'

export const noCache = (req: Request, res: Response, next: NextFunction): void => {
  // temos que chamar next dps de todos os middlewares senão requisição fica amarrada
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('pragma', 'no-cache')
  res.set('expires', '0')
  res.set('surrogate-control', 'no-store')
  next()
}