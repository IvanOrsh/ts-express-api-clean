import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URI as string)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return an account on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return an 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Abdullah',
        email: 'abdullah@email.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'abdullah@email.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
