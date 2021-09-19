import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  // verifica se o body é parseado e o server entenda
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Camila' })
      .expect({ name: 'Camila' })
  })
})
