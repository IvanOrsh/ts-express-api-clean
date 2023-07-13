import { jwtSignPromisified, jwtVerifyPromisified } from './jwt-promisified'
import { type Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { type Decrypter } from '../../../data/protocols/cryptography/decrypter'

export class JwtAdapter implements
  Encrypter,
  Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwtSignPromisified({ id: value }, this.secret)

    return accessToken
  }

  async decrypt (token: string): Promise<string | null> {
    const decoded = await jwtVerifyPromisified(token, this.secret)

    return decoded
  }
}
