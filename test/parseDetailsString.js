const should = require('chai').should(),
       parse = require('../lib/parseDetailsString');

describe('parseDetailsString', () => {
  const testDetails = {
    basePrice: 1.00,
    peopleRequired: 1,
    materialsType: 'food'
  };

  it('Should allow additional whitespace', () => {
    parse('  $1.00   ,   1   people   ,    food   ').should.deep.equal(testDetails);
  });

  it('Should allow no whitespace', () => {
    parse('$1.00,1people,food').should.deep.equal(testDetails);
  });

  it('Should allow no $ sign', () => {
    parse('1.00,1people,food').should.deep.equal(testDetails);
  });

  it('Should allow people', () => {
    parse('1.00,1people,food').should.deep.equal(testDetails);
  });

  it('Should allow person', () => {
    parse('1.00,1person,food').should.deep.equal(testDetails);
  });

  it('Should not allow people or person to be missing', () => {
    (() => parse('1.00,1,food')).should.throw(Error);
  });

  it('Should only allow people or person', () => {
    (() => parse('1.00,1cats,food')).should.throw(Error);
  });

  it('Should not allow missing people', () => {
    (() => parse('1.00')).should.throw(Error);
  });

  it('Should not allow missing people materials', () => {
    (() => parse('1.00,1person')).should.throw(Error);
  });

  it('Should not allow leading characters', () => {
    (() => parse('a1.00,1person,food')).should.throw(Error);
  });
});