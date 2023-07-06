import jwt from 'jsonwebtoken'

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
