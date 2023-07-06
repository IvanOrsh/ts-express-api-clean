import { type Authentication, type AuthenticationModel } from '../../../domain/usecases/authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { type HashCompare } from '../../protocols/cryptography/hash-compare'
import { type TokenGenerator } from '../../protocols/cryptography/token-generator'
import { type UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!account) {
      return null
    }

    const isValid = await this.hashCompare.compare(authentication.password, account.password)
    if (!isValid) {
      return null
    }

    const accessToken = await this.tokenGenerator.generate(account.id)

    await this.updateAccessTokenRepository.update(account.id, accessToken)

    return accessToken
  }
}
