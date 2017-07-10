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

  it('Should return base price with base markup when people is 0 and type is other', () => {
    estimate(111.11, 0, '???').should.equal(116.67);
  });
});