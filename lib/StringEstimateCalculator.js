const EstimateCalculator = require('./EstimateCalculator'),
                currency = require('./currency');

/***
 * Calculates Nupack estimates using Strings for input/output
 */
class StringEstimateCalculator extends EstimateCalculator {

  /***
   * Constructs StringEstimateCalculator with markup rates.  Rates must be decimal percentages (eg 0.05 for 5%).
   * @param {number} flatRate - Flat rate applied directly to base price.
   * @param {number} labourRate - Per-person labour rate.
   * @param {object} [materialsRateMap={}] - Object map of material type names to rates.  Optional, assumes empty rate map if not supplied.
   */
  constructor(flatRate, labourRate, materialsRateMap) {
    super(flatRate, labourRate, materialsRateMap);
  }

  /***
   * Calculates price estimate using supplied base price, people required and materials type against rates defined at construction time.
   * @param {string} details - Job details string
   * @returns {string} - Cost estimate in currency format rounded to 2 decimal places
   */
  calculate(details) {
    // Extracts the price, number of people and materials type, tyring to be as whitespace forgiving as possible.  Note (?:...) is for a non-capturing group.
    let detailsMatch = /^\s*([$\d,.]+)\s*,\s*(\d+)\s*(?:person|people)\s*,\s*(\w+)\s*$/i.exec(details);
    if (!detailsMatch) throw new Error(`Invalid details format (${details}).  Must be in the format: '$#,###.##, # people, material_name'`);

    let basePrice = currency.parse(detailsMatch[1]);
    let peopleRequired = parseFloat(detailsMatch[2]);
    let materialsType = detailsMatch[3];

    // Round to 2 decimal points
    return currency.format(super.calculate(basePrice, peopleRequired, materialsType));
  }
}

module.exports = StringEstimateCalculator;