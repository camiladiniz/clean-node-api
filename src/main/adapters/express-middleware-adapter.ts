import { Middleware } from '@/presentation/protocols'

import { Request, Response, NextFunction } from 'express'

// adapta o middleware para que ele consiga se comunicar com o express de forma correta
// então, agora o express está desacoplano do middleware
export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      // colocar no req do express a resposta do middleware
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
