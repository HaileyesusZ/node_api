const app = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const match = require('chai-match')

chai.use(chaiHttp)
chai.use(match)
const { expect } = chai

module.exports = { chai, expect, app }
