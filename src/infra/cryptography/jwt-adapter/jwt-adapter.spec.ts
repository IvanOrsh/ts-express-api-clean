import * as jwtPromisified from './jwt-promisified'
import { JwtAdapter } from './jwt-adapter'

jest.mock('./jwt-promisified', () => ({
  __esModule: true,
  async jwtSignPromisified (): Promise<string> {
    return new Promise(resolve => {
      resolve('accessToken')
    })
  }
}))

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

  test('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('accessToken')
  })

  test('Should throw if sign throw', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwtPromisified, 'jwtSignPromisified').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
