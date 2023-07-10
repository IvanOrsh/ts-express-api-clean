import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { type Authentication } from '../../../../domain/usecases/authentication'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt) // Hasher, HashCompare
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret) // Encrypter
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
