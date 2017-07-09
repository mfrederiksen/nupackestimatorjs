const round = require('./lib/round').round;

const flatMarkup = 1.05,
    peopleMarkup = 0.012;

const typeMarkupMap = {
       'drugs' : 0.075,
        'food' : 0.13,
  'electronics': 0.02
};

function estimate(basePrice, numPeople, type) {
  let baseWithFlat = basePrice * flatMarkup;
  let typeMarkup = typeMarkupMap[type] || 0;
  let finalEstimate = (baseWithFlat * (1.0 + (numPeople * peopleMarkup))) + (baseWithFlat * typeMarkup);
  return round(finalEstimate, 2);
}

module.exports = {
  estimate: estimate
};