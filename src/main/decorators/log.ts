import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

// adicionar comportamento no controller sem alterar o controller
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  // o decorator deve ter a mesma assinatura que a classe que será decorada (signup controller)
  // no construtor vai a classe que queremos decorar (a classe que será decorada será o mesmo tipo que a classe implementa, poderia sre herança)
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {

    }
    return httpResponse
  }
}