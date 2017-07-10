const markup = require('./markup.json');

if (typeof(markup.flat) !== 'number' || typeof(markup.people) !== 'number' || typeof(markup.type ) !== 'object') throw new Error('Invalid config format.  See README.md for details.');

function estimate(basePrice, numPeople, type) {
  if (basePrice < 0) throw new Error('basePrice must be greater than 0');
  if (numPeople < 0) throw new Error('numPeople must be greater than 0');

  let baseMarkup = basePrice * (1.0 + markup.flat);
  let peopleMarkup = baseMarkup * (numPeople * markup.people);

  let typeMarkupRate = markup.type[type.toLowerCase()] || 0;
  if (typeof(typeMarkupRate) !== 'number') throw new Error(`Invalid config format.  Markup rate for '${type.toLowerCase()}' must be a number.`);

  let typeMarkup = baseMarkup * typeMarkupRate;
  let finalEstimate = baseMarkup + peopleMarkup + typeMarkup;

  // Round to 2 decimal points
  return Math.round(finalEstimate * 100) / 100;
}

module.exports = {
  estimate: estimate
};