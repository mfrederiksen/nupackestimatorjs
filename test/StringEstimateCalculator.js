const         should = require('chai').should(),
  StringEstimateCalculator = require('../lib/StringEstimateCalculator');

describe('StringEstimateCalculator', () => {
  describe('calculate', () => {
    describe('Examples', () => {
      let exampleEstimator = new StringEstimateCalculator(0.05, 0.012, {"drugs": 0.075, "food": 0.13, "electronics": 0.02});

      it('Should pass example 1', () => {
        exampleEstimator.calculate('$1,299.99, 3 people, food').should.equal('$1,591.58');
      });

      it('Should pass example 2', () => {
        exampleEstimator.calculate('$5,432.00, 1 person, drugs').should.equal('$6,199.81');
      });

      it('Should pass example 3', () => {
        exampleEstimator.calculate('$12,456.95, 4 people, books').should.equal('$13,707.63');
      });
    });

    describe('parsing', () => {
      let sec = new StringEstimateCalculator(1, 2, {"food": 3});

      it('Should allow additional whitespace', () => {
        sec.calculate('  $1.00   ,   1   people   ,    food   ').should.equal('$12.00');
      });

      it('Should allow no whitespace', () => {
        sec.calculate('$1.00,1people,food').should.equal('$12.00');
      });

      it('Should allow no $ sign', () => {
        sec.calculate('1.00,1people,food').should.equal('$12.00');
      });

      it('Should not allow either people or person', () => {
        sec.calculate('1.00,1people,food').should.equal('$12.00');
        sec.calculate('1.00,1person,food').should.equal('$12.00');
      });

      it('Should not allow people or person to be missing', () => {
        (() => sec.calculate('1.00,1,food')).should.throw(Error);
      });

      it('Should only allow people or person', () => {
        (() => sec.calculate('1.00,1cats,food')).should.throw(Error);
      });

      it('Should not allow missing people', () => {
        (() => sec.calculate('1.00')).should.throw(Error);
      });

      it('Should not allow missing people materials', () => {
        (() => sec.calculate('1.00,1person')).should.throw(Error);
      });

      it('Should not allow leading characters', () => {
        (() => sec.calculate('a1.00,1person,food')).should.throw(Error);
      });
    });
  });
});