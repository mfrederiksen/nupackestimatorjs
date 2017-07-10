const EstimateCalculator = require('./lib/EstimateCalculator'),
                  markup = require('./markup.json');

if (typeof(markup.flat) !== 'number' || typeof(markup.people) !== 'number' || typeof(markup.type ) !== 'object') throw new Error('Invalid config format.  See README.md for details.');

function estimate(basePrice, numPeople, type) {
  let estimator = new EstimateCalculator(markup.flat, markup.people, markup.type);
  return estimator.calculate(basePrice, numPeople, type);
}

module.exports = {
  estimate: estimate
};