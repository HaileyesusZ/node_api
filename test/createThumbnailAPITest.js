const { app, chai, expect } = require('./base')

// Create-Thumbnail API test

// CREATE THUMBNAIL API test
describe('CREATE THUMBNAIL API Test', () => {
  // test if the route is protected by omitting jwt token
  // from request
  it('reject if jwt cant be verified', (done) => {
    chai
      .request(app)
      .get('/api/users/create-thumbnail')
      .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body.message).to.have.length.gt(0)
        done()
      })
  })

  // test if the api responds with 400 for invalid image links
  it('reject when the image URL is invalid', (done) => {
    const sampleToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhaWxleWVzdXMiLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE2MDMyMjA5OTl9.Nmc1nV9py-3K7QbMdPIgsmbIjMJpnnZ8khC6CL0Se4M'
    chai
      .request(app)
      .get('/api/users/create-thumbnail')
      .set('x-auth-token', `${sampleToken}`)
      .send({ imageURL: 'https://jsonplaceholder.typicode.com/todos/1' })
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body.message).to.have.length.gt(0)
        done()
      })
  }).timeout(6000)
})
