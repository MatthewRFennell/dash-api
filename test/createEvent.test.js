const { describe, it } = require('mocha')
const db = require('../src/db')
const sinon = require('sinon')
const createEvent = require('../src/routes/createEvent')
const httpMocks = require('node-mocks-http')

const req = {
  body : {
    email : 'john@smith.com'
  }
}

describe('Create event route', () => {
  it('should error if the given user is not in the database', (done) => {
    const accountStub = sinon.stub(db.Account, 'findOne')
    const res = httpMocks.createResponse()
    const spy = sinon.spy(db.Event, 'create')
    accountStub.resolves(null)
    createEvent(req, res)
    accountStub.restore()
    sinon.assert.callCount(spy, 0)
    spy.restore()
    done()
  })
})
