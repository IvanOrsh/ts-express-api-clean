import {
  type Middleware,
  type LoadAccountByToken,
  type HttpRequest,
  type HttpResponse
} from './auth-middleware-protocols'
import { forbidden, serverError, ok } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken: string | undefined = httpRequest.headers?.['x-access-token']
      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      const account = await this.loadAccountByToken.load(accessToken, this.role)

      if (!account) {
        return forbidden(new AccessDeniedError())
      }

      return ok({
        accountId: account.id
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
