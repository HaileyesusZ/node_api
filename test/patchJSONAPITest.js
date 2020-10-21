const { chai, app, expect } = require('./base')

// Patch JSON API test
describe('Patch JSON APi Test', () => {
  // test if the route is protected by omitting jwt token
  // from request
  it('reject if jwt cant be verified', (done) => {
    chai
      .request(app)
      .patch('/api/users/patch')
      .send({
        model: { name: 'haileyesus' },
        patch: [{ op: 'replace', path: '/name', value: 'haile' }],
      })
      .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body.message).to.have.length.gt(0)
        done()
      })
  })

  // test when a model paramter is missing from request
  // test if 400 status is sent and a message key exists
  it('reject patch when a model is missing from request body', (done) => {
    const sampleToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhaWxleWVzdXMiLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE2MDMyMjA5OTl9.Nmc1nV9py-3K7QbMdPIgsmbIjMJpnnZ8khC6CL0Se4M'
    chai
      .request(app)
      .patch('/api/users/patch')
      .set('x-auth-token', `${sampleToken}`)
      .send({ patch: [{ op: 'replace', path: '/name', value: 'haile' }] })
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body.message).to.have.length.gt(0)
        done()
      })
  })

  // test if correct patch is applied to the given model
  it('respond with the right patched object', (done) => {
    const sampleToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhaWxleWVzdXMiLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE2MDMyMjA5OTl9.Nmc1nV9py-3K7QbMdPIgsmbIjMJpnnZ8khC6CL0Se4M'
    chai
      .request(app)
      .patch('/api/users/patch')
      .set('x-auth-token', `${sampleToken}`)
      .send({
        model: { name: 'haileyesus' },
        patch: [{ op: 'replace', path: '/name', value: 'haile' }],
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.name).to.equal('haile')
        done()
      })
  })
})
