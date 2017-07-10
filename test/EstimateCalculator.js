const         should = require('chai').should(),
  EstimateCalculator = require('../lib/EstimateCalculator');

describe('EstimateCalculator', () => {
  describe('calculate', () => {
    describe('Examples', () => {
      let exampleEstimator = new EstimateCalculator(0.05, 0.012, { "drugs" : 0.075, "food": 0.13, "electronics": 0.02 });

      it('Should pass example 1', () => {
        exampleEstimator.calculate(1299.99, 3, 'food').should.equal(1591.58);
      });

      it('Should pass example 2', () => {
        exampleEstimator.calculate(5432.00, 1, 'drugs').should.equal(6199.81);
      });

      it('Should pass example 3', () => {
        exampleEstimator.calculate(12456.95, 4, 'books').should.equal(13707.63);
      });
    });

    describe('Construction', () => {
      it('Should not allow null flat rates', () => {
        (() => new EstimateCalculator(null, 1, {})).should.throw(TypeError);
      });

      it('Should not allow non number flat rates', () => {
        (() => new EstimateCalculator('', 1, {})).should.throw(TypeError);
      });

      it('Should not allow null people rates', () => {
        (() => new EstimateCalculator(1, null, {})).should.throw(TypeError);
      });

      it('Should not allow non number people rates', () => {
        (() => new EstimateCalculator(1, '', {})).should.throw(TypeError);
      });

      it('Should assume empty rate map if not supplied', () => {
        (new EstimateCalculator(1, 0)).calculate(1, 0, 'food').should.equal(2);
      });
    });

    describe('estimate calculations', () => {
      let es = new EstimateCalculator(1, 2, {'food': 3});

      it('Should return 0 when base price is 0', () => {
        es.calculate(0, 1, 'food').should.equal(0);
      });

      it('Should assume materials rate of 0 when material type is not found', () => {
        es.calculate(1, 1, 'asd').should.equal(6);
      });

      it('Should calculate base markup when people is 0 and material rate is not set', () => {
        es.calculate(1, 0, 'asd').should.equal(2);
      });

      it('Should calculate base markup and material rate when people is 0 and material rate is set', () => {
        es.calculate(1, 0, 'food').should.equal(8);
      });

      it('Should calculate all markups when all are set', () => {
        es.calculate(1, 1, 'food').should.equal(12);
      });

      it('Should allow case insensitive material types', () => {
        es.calculate(1, 1, 'fOOd').should.equal(12);
      });

      it('Should not allow negative base price', () => {
        (() => es.calculate(-1, 1, 'food')).should.throw(Error);
      });

      it('Should not allow negative people', () => {
        (() => es.calculate(0, -1, 'food')).should.throw(Error);
      });

      it('Should round to 2 decimal places', () => {
        (new EstimateCalculator(0.055, 0, {})).calculate(1, 0, '').should.equal(1.06);
      });
    });

  });
});