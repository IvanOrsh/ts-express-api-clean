import * as jwtPromisified from './jwt-promisified'
import { JwtAdapter } from './jwt-adapter'

jest.mock('./jwt-promisified', () => ({
  __esModule: true,
  async jwtSignPromisified (): Promise<string> {
    return new Promise(resolve => {
      resolve('accessToken')
    })
  },
  async jwtVerifyPromisified (): Promise<string> {
    return new Promise(resolve => {
      resolve('decodedValue')
    })
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwtPromisified, 'jwtSignPromisified')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith(
        { id: 'any_id' },
        'secret'
      )
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('accessToken')
    })

    test('Should throw if sign throw', async () => {
      const sut = makeSut()
      jest.spyOn(jwtPromisified, 'jwtSignPromisified').mockReturnValueOnce(new Promise((resolve, reject) => {
        reject(new Error())
      }))
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwtPromisified, 'jwtVerifyPromisified')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const accessToken = await sut.decrypt('any_token')
      expect(accessToken).toBe('decodedValue')
    })
  })
})
