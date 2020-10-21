const { chai, app, expect } = require('./base')

// Login API test
describe('Login Test', () => {
  // test when no credentials are sent
  // test if 400 status is sent and a message key exists
  it('reject login when credentials are not sent', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body.message).to.have.length.gt(0)
        done()
      })
  })
  // test when a credential is sent
  // check if 200 status is sent and the token is a valid jwt token
  it('send a valid jwt token for a successful login', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send({ username: 'haileyesus', password: '1234' })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.token).to.match(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
        )
        done()
      })
  })
})
