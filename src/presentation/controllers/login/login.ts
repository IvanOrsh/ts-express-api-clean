import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { type HttpRequest, type HttpResponse } from '../../protocols'
import { type Controller } from '../../protocols/controller'
import { type EmailValidator } from '../signup/signup-protocols'
import { type Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return new Promise(resolve => {
          resolve(badRequest(new MissingParamError('email')))
        })
      }
      if (!password) {
        return new Promise(resolve => {
          resolve(badRequest(new MissingParamError('password')))
        })
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return new Promise(resolve => {
          resolve(badRequest(new InvalidParamError('email')))
        })
      }
      await this.authentication.auth(email, password)
      return new Promise(resolve => {
        resolve({
          statusCode: 200,
          body: {}
        })
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
