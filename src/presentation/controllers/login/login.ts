import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { type HttpRequest, type HttpResponse } from '../../protocols'
import { type Controller } from '../../protocols/controller'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

    return new Promise(resolve => {
      resolve({
        statusCode: 200,
        body: {}
      })
    })
  }
}
