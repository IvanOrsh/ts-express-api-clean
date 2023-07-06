import { type Authentication, type AuthenticationModel } from '../../../domain/usecases/authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { type HashCompare } from '../../protocols/cryptography/hash-compare'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!account) {
      return null
    }
    await this.hashCompare.compare(authentication.password, account.password)
    return 'accessToken'
  }
}
