import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  // verifica se o body é parseado e o server entenda
  test('Should return an account on success', async () => {
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
