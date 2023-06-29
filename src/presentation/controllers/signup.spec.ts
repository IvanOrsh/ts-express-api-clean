import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if name is not provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'tester',
        email: 'tester@email.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
