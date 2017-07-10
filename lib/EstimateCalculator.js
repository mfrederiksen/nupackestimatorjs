/***
 * Main class for calculating Nupack estimates.
 */
class EstimateCalculator {

  /***
   * Constructs EstimateCalculator with markup rates.  Rates must be decimal percentages (eg 0.05 for 5%).
   * @param {number} flatRate - Flat rate applied directly to base price.
   * @param {number} labourRate - Per-person labour rate.
   * @param {object} [materialsRateMap={}] - Object map of material type names to rates.  Optional, assumes empty rate map if not supplied.
   */
  constructor(flatRate, labourRate, materialsRateMap) {
    if (typeof(flatRate) !== 'number') throw new TypeError('flatRate must be a number');
    if (typeof(labourRate) !== 'number') throw new TypeError('labourRate must be a number');

    if (materialsRateMap) {
      if (typeof(materialsRateMap) !== 'object') throw new TypeError('materialsRateMap must be an object');
    } else {
      materialsRateMap = {};
    }

    this.flatRate = flatRate;
    this.labourRate = labourRate;
    this.materialsRateMap = materialsRateMap;
  }

  /***
   * Calculates the base markup from the flat rate against the base price.
   * @param {number} basePrice - base price.  Must be >= 0.
   * @returns {number} - basePrice X (1 + flat rate).
   * @private
   */
  _calcBaseMarkup(basePrice) {
    if (basePrice < 0) throw new Error('basePrice must be >= 0');

    return basePrice * (1.0 + this.flatRate);
  }

  /***
   * Calculates the labour markup using the marked up base against the number of people required and the labour rate.
   * @param baseMarkup - base price with flat markup applied.
   * @param peopleRequired - number of people required.  Must be >= 0.
   * @returns {number} - baseMarkup X peopleRequired X people rate.
   * @private
   */
  _calcLabourMarkup(baseMarkup, peopleRequired) {
    if (peopleRequired < 0) throw new Error('peopleRequired must be >= 0');

    return baseMarkup * peopleRequired * this.labourRate;
  }

  /***
   * Calculates the materials markup for the given materialsType using the marked up base against the material type rate if found or 0 otherwise.
   * @param {number} baseMarkup - base price with flat markup applied.
   * @param {string} materialsType - materials rate to apply.  Sets the materials rate from the materials rate map if found or 0 if not.
   * @returns {number} - baseMarkup X materials rate.
   * @private
   */
  _calcMaterialsMarkup(baseMarkup, materialsType) {
    let materialsMarkupRate = this.materialsRateMap[materialsType.toLowerCase()] || 0;
    if (typeof(materialsMarkupRate) !== 'number') throw new Error(`Markup rate for '${materialsType.toLowerCase()}' must be a number.`);

    return baseMarkup * materialsMarkupRate;
  }

  /***
   * Calculates price estimate using supplied base price, people required and materials type against rates defined at construction time.
   * @param {number} basePrice - Base price.  Must be >= 0.
   * @param {number} peopleRequired - Number of people needed for labour calculation.  Must be >= 0.
   * @param {string} materialsType - Materials materials type from materials rate map.  0 markup is assumed if the materials type key is not found in the materials rate map.
   * @returns {number} - Cost estimate rounded to 2 decimal places
   */
  calculate(basePrice, peopleRequired, materialsType) {
    let baseMarkup = this._calcBaseMarkup(basePrice);
    let labourMarkup = this._calcLabourMarkup(baseMarkup, peopleRequired);
    let materialsMarkup = this._calcMaterialsMarkup(baseMarkup, materialsType);
    let finalEstimate = baseMarkup + labourMarkup + materialsMarkup;

    // Round to 2 decimal points
    return Math.round(finalEstimate * 100) / 100;
  }
}

module.exports = EstimateCalculator;