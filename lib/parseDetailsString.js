const currency = require('./currency');

module.exports = (details) => {
  // Extracts the price, number of people and materials type, tyring to be as whitespace forgiving as possible.  Note (?:...) is for a non-capturing group.
  const detailsMatch = /^\s*([$\d,.]+)\s*,\s*(\d+)\s*(?:person|people)\s*,\s*(\w+)\s*$/i.exec(details);
  if (!detailsMatch) throw new Error(`Invalid details format (${details}).  Must be in the format: '$#,###.##, # people, material_name'`);

  return {
    basePrice: currency.parse(detailsMatch[1]),
    peopleRequired: parseFloat(detailsMatch[2]),
    materialsType: detailsMatch[3]
  };
};