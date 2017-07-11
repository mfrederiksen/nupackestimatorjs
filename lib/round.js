/**
 * Rounds to the nearest precision.  Always rounds up from 5.
 * @param value
 * @param precision
 * @returns {number}
 */
module.exports = (value, precision) => {
  return Number(Math.round(value + `e${precision}`) + `e-${precision}`);
};