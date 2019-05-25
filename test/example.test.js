const { describe, it } = require('mocha')
const chai = require('chai')
const expect = chai.expect

describe('Test', () => {
  it('should test', (done) => {
    const foo = 'bar'
    expect(foo).to.be.a('string')
    expect(foo).to.equal('bar')
    expect(foo).to.have.lengthOf(3)
    done()
  })
})
