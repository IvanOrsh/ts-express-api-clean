import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URI as string)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        name: 'Abdullah',
        email: 'abdullah@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)

    const { name, email, password } = response.body
    expect(name).toBe('Abdullah')
    expect(email).toBe('abdullah@email.com')
    expect(password).toBeTruthy()
  })
})
