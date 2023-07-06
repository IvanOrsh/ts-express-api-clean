import { jwtSignPromisified } from './jwt-promisified'
import { type Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    await jwtSignPromisified({ id: value }, this.secret)

    return ''
  }
}
