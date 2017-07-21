
function round(value, precision) {
  return Number(Math.round(value + `e${precision}`) + `e-${precision}`);
}

function roundStandard(value) {
  return round(value, 2);
}

function roundCanadian(value) {
  return Math.round(value * 20) / 20;
}

/**
 * Rounds to the nearest precision.  Always rounds up from 5.
 * @param value
 * @param precision
 * @returns {number}
 */
module.exports = {
  round,
  roundStandard,
  roundCanadian
};