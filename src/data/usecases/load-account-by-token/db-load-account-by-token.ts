import { type LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { type Decrypter } from '../../protocols/cryptography/decrypter'
import { type AccountModel } from '../add-account/db-add-account-protocols'
import { type LoadAccountByTokenRepository } from '../../../data/protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) {
      return null
    }

    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    if (!account) {
      return null
    }

    return account
  }
}
