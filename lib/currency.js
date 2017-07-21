/***
 * Utility library for converting currency between strings and numbers
 */
module.exports = {
  /***
   * Parses a string currency in the form '$10,232.12' to a number.  The '$' sign, commas and decimal places are all optional.  Leading or trailing whitespace is ignored.
   * @param {string} value - currency value
   * @returns {number} - Numeric representation of value
   */
  parse: (value) => {
    if (typeof value !== 'string') throw new TypeError('value must be a string');

    // strip the $ and ,'s
    const cleanValue = value.trim().replace(/[$,]/g, '');

    // at this point the string should be in valid format
    if (!/^-?\d+(\.\d+)?$/.test(cleanValue)) throw new Error(`Invalid currency format (${value}).  Must be in the format $##,###,###.##.`);

    const numberValue = parseFloat(cleanValue);
    if (isNaN(numberValue)) throw new Error(`Invalid currency format (${value}).  Must be in the format $##,###,###.##.`);
    return numberValue;
  },

  /***
   * Formats a number to en-us currency format.
   * @param {number} value - numeric value
   * @returns {string} - Currency representation of value
   */
  format: (value) => {
    if (typeof value !== 'number') throw new TypeError('value must be a number');
    return value.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
  }
};