const should = require('chai').should(),
       index = require('../index');

describe('index', () => {
  it('Should expose EstimateCalculator class', () => {
    index.EstimateCalculator.should.equal(require('../lib/EstimateCalculator'));
  });

  it('Should expose StringEstimateCalculator class', () => {
    index.StringEstimateCalculator.should.equal(require('../lib/StringEstimateCalculator'));
  });

  describe('estimator', () => {
    it('Should construct an estimator using default config', () => {
      index.estimator().should.be.a('function');
    });

    it('Should construct an estimator using an override config', () => {
      index.estimator({ flat: 1, labour: 2, materials: {}}).should.be.a('function');
    });

    let basicEstimator = index.estimator({ flat: 1, labour: 2, materials: { 'food': 3 }});

    it('Should use a work in library mode', () => {
      basicEstimator(1, 1, 'food').should.equal(12.00);
    });

    it('Should use a work in string mode', () => {
      basicEstimator('$1.00, 1 person, food').should.equal('$12.00');
    });

    it('Should only allow 1 argument in string mode', () => {
      (() => basicEstimator('$1.00, 1 person, food', 1)).should.throw(Error);
    });

    it('Should require all arguments in library mode', () => {
      (() => basicEstimator(1, 1)).should.throw(Error);
    });
  });

});