import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { type HttpRequest, type HttpResponse } from '../protocols'
import { type Middleware } from '../protocols/middleware'
import { type LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken: string | undefined = httpRequest.headers?.['x-access-token']
      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      const account = await this.loadAccountByToken.load(accessToken)

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
