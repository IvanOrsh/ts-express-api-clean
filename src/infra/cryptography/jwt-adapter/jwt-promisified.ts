import jwt, { type Secret, type GetPublicKeyOrSecret } from 'jsonwebtoken'

export const jwtSignPromisified = async (
  payload: string | Buffer | object,
  secretOrPrivateKey: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, (err, payload) => {
      if (err) {
        reject(err)
      } else {
        resolve(payload as string)
      }
    })
  })
}

export const jwtVerifyPromisified = async (
  token: string,
  secretOrPublicKey: Secret | GetPublicKeyOrSecret
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded as string)
      }
    })
  })
}
