const defaultMarkupConfig = require('../default_markup.json');

/***
 * Returns a valid markup config object.  markupConfig is used when supplied.  Otherwise falls back to default_markup.json.
 * @param {object=} markupConfig - Optional markup config object to override defaults.
 * @returns {object} - Object containing the markup config
 */
module.exports = (markupConfig) => {
  const config = markupConfig || defaultMarkupConfig;

  // validate the config
  if (typeof config.flat !== 'number') throw new Error('Invalid config format.  \'flat\' key must be present and be a number.');
  if (typeof config.labour !== 'number') throw new Error('Invalid config format.  \'labour\' key must be present and be a number.');
  if (typeof config.materials !== 'object') throw new Error('Invalid config format.  \'materials\' key must be present and be an object.');

  return config;
};