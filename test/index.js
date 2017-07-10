const should = require('chai').should(),
    estimate = require('../index').estimate;

describe('estimate', () => {
  it('Passes Example 1', () => {
    estimate(1299.99, 3, 'food').should.equal(1591.58);
  });

  it('Passes Example 2', () => {
    estimate(5432.00, 1, 'drugs').should.equal(6199.81);
  });

  it('Passes Example 3', () => {
    estimate(12456.95, 4, 'books').should.equal(13707.63);
  });

  it('Should return 0 when base is 0', () => {
    estimate(0, 1, 'food').should.equal(0);
  });

  it('Should return base price with base markup when people is 0 and type is unknown', () => {
    estimate(111.11, 0, '???').should.equal(116.67);
  });

  it('Should not apply type markup when type is unknown', () => {
    estimate(111.11, 1, '???').should.equal(118.07);
  });

  it('Should not apply people markup when people is 0', () => {
    estimate(111.11, 0, 'food').should.equal(131.83);
  });

  it('Should allow case insensitive types', () => {
    estimate(5432.00, 1, 'DruGs').should.equal(6199.81);
  });

  it('Should not allow negative base price', () => {
    (() => estimate(-1, 1, 'food')).should.throw(Error);
  });

  it('Should not allow negative people', () => {
    (() => estimate(0, -1, 'food')).should.throw(Error);
  });

});