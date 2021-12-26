import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

// adapta o controlador para que ele consiga se comunicar com o express de forma correta
// então, agora o express está desacoplano do controller
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
