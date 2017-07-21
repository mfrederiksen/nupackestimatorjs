const       currency = require('./currency'),
  parseDetailsString = require('./parseDetailsString');

/***
 * Calculates price estimate using supplied base price, people required and materials type against rates defined at construction time.
 * @param {string} detailsString - Job details string
 * @returns {string} - Cost estimate in currency format rounded to 2 decimal places
 */
module.exports = (calculatorFn, detailsString) => {
  const details = parseDetailsString(detailsString);
  return currency.format(calculatorFn(details.basePrice, details.peopleRequired, details.materialsType));
};