const flatMarkup = 1.05,
    peopleMarkup = 0.012;

const typeMarkupMap = {
       'drugs' : 0.075,
        'food' : 0.13,
  'electronics': 0.02
};

function estimate(basePrice, numPeople, type) {
  if (basePrice < 0) throw new Error('basePrice must be greater than 0');
  if (numPeople < 0) throw new Error('numPeople must be greater than 0');

  let baseWithFlat = basePrice * flatMarkup;
  let typeMarkup = typeMarkupMap[type.toLowerCase()] || 0;
  let finalEstimate = (baseWithFlat * (1.0 + (numPeople * peopleMarkup))) + (baseWithFlat * typeMarkup);

  // Round to 2 decimal points
  return Math.round(finalEstimate * 100) / 100;
}

module.exports = {
  estimate: estimate
};