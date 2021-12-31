import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogErrorRepository } from '@/data/protocols/db'

export class LogControllerDecorator implements Controller {
  // o decorator deve ter a mesma assinatura que a classe que será decorada (signup controller)
  // no construtor vai a classe que queremos decorar (a classe que será decorada será o mesmo tipo que a classe implementa, poderia sre herança)
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
