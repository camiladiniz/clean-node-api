/* eslint-disable @typescript-eslint/method-signature-style */
import { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  handle (httpRequest: HttpRequest): Promise<HttpResponse>
}
