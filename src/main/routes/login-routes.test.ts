import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    // verifica se o body é parseado e o server entenda
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Camila',
          email: 'camila@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    // verifica se o body é parseado e o server entenda
    test('Should return 200 on login', async () => {
      const password = await (hash('123', 12))
      const res = await accountCollection.insertOne({
        name: 'Camila',
        email: 'camila@gmail.com',
        password: password
      })
      console.log('res', res)
      await request(app)
        .post('/api/login')
        .send({
          email: 'camila@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
