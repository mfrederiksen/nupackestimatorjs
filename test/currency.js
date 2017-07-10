const should = require('chai').should(),
    currency = require('../lib/currency'),
       parse = currency.parse,
      format = currency.format;


describe('currency', () => {
  describe('parse', () => {
    it('Should parse a string without a $ sign', () => {
      parse('1').should.equal(1);
    });

    it('Should parse a string with a $ sign', () => {
      parse('$1').should.equal(1);
    });

    it('Should parse a string with a comma', () => {
      parse('$1,000').should.equal(1000);
    });

    it('Should parse a string with multiple commas', () => {
      parse('$1,000,000').should.equal(1000000);
    });

    it('Should parse a string with decimals', () => {
      parse('$1,000,000.123').should.equal(1000000.123);
    });

    it('Should parse a string with leading or trailing whitespace', () => {
      parse('   $1,000,000.123   ').should.equal(1000000.123);
    });

    it('Should handle negative values', () => {
      parse('-1').should.equal(-1);
    });

    it('Should not allow empty strings', () => {
      (() => parse('')).should.throw(Error);
    });

    it('Should not allow non-string values', () => {
      (() => parse(1)).should.throw(Error);
    });

    it('Should not parse an invalid number', () => {
      (() => parse('$1asd.123')).should.throw(Error);
      (() => parse('$1!.123')).should.throw(Error);
      (() => parse('$1.1.23')).should.throw(Error);
      (() => parse('$1.')).should.throw(Error);
    });
  });

  describe('format', () => {
    it('Should format a number to 2 decimal places', () => {
      format(1.052).should.equal('$1.05');
    });

    it('Should format an integer to 2 decimal places', () => {
      format(1).should.equal('$1.00');
    });

    it('Should separate thousands with commas', () => {
      format(1000000).should.equal('$1,000,000.00');
    });

    it('Should handle 0', () => {
      format(0).should.equal('$0.00');
    });

    it('Should handle negative values', () => {
      format(-1).should.equal('-$1.00');
    });

    it('Should not allow non-numeric values', () => {
      (() => format('1000000')).should.throw(Error);
    });
  });

});