/*
Rounding is javascript using Math.round or Number.toFixed is a little broken.  Specifically, rounding to 2 decimal places
where the number ends in a 5 (eg 1.005 will become 1.00) will yield a rounded down (rather than rounded up) result.  To fix this, we can force the
calculation to exponential notation which produces correct results.

See: http://www.jacklmoore.com/notes/rounding-in-javascript/
 */
module.exports = {
  round: function (value, precision) {
    return Number(Math.round(value + 'e' + precision) + 'e-' + precision);
  }
};