import * as jwtPromisified from './jwt-promisified'
import { JwtAdapter } from './jwt-adapter'

describe('Jwt Adapter', () => {
  test('Should call sign with correct', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwtPromisified, 'jwtSignPromisified')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith(
      { id: 'any_id' },
      'secret'
    )
  })
})
