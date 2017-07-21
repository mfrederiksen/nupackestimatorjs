const should = require('chai').should(),
       round = require('../lib/round').round;

describe('round', () => {
  it('Should round to 0 decimal places', () => {
    round(99.99, 0).should.equal(100);
  });

  it('Should round to 2 decimal places', () => {
    round(50.118, 2).should.equal(50.12);
  });

  it('Should round negative numbers', () => {
    round(-50.115, 2).should.equal(-50.11);
  });

  it('Should round up from 5', () => {
    round(50.1150, 2).should.equal(50.12);
  });

});