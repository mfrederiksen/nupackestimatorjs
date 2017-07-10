const   EstimateCalculator = require('./lib/EstimateCalculator'),
  StringEstimateCalculator = require('./lib/StringEstimateCalculator'),
        markupConfigLoader = require('./lib/markupConfigLoader');
/***
 * Easy access to estimate calculator, initialized using markup.json.  Can operate in either numeric mode or string mode.
 * @param {object} markupConfig - Markup configuration object.  Bound away when called via estimator function.
 * @param {(number|string)} basePriceOrDetails - Either a number representing the base price for numeric mode or full details string for string mode.
 * @param {number=} peopleRequired - Number of people.  Required for numeric mode, must be undefined for string mode.
 * @param {string=} materialsType - Materials type.  Required for numeric mode, must be undefined for string mode.
 * @returns {(number|string)} - Price estimate as a number in numeric mode or string currency in string mode
 */
function calculate(markupConfig, basePriceOrDetails, peopleRequired, materialsType) {
  // all estimators have the same constructor signature.
  function createEstimator(estimatorType) {
    return new estimatorType(markupConfig.flat, markupConfig.labour, markupConfig.materials)
  }

  // switch the calculation mode based on the type of the basePriceOrDetails argument and validate argument length
  if (typeof(basePriceOrDetails) === 'number' && arguments.length === 4) {
    return createEstimator(EstimateCalculator).calculate(basePriceOrDetails, peopleRequired, materialsType);
  } else if (typeof(basePriceOrDetails) === 'string' && arguments.length === 2) {
    return createEstimator(StringEstimateCalculator).calculate(basePriceOrDetails);
  } else {
    throw new Error('Invalid arguments: estimate must be called using either estimate(\'$123.45, 2 people, food\') or estimate(123.45, 2, \'food\') syntax');
  }
}

/***
 * Creates an estimator using the optional markup file or defaults if not supplied.
 * @param {object=} markupConfig - Optional markupConfigObject.  Uses defaults if not supplied.
 * @returns
 */
function estimator(markupConfig) {
    return calculate.bind(null, markupConfigLoader(markupConfig));
}

module.exports = {
  estimator: estimator,
  // Allow direct access to calculators for advanced usage
  EstimateCalculator: EstimateCalculator,
  StringEstimateCalculator: StringEstimateCalculator

};
