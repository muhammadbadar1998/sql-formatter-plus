// Old ES Module syntax:
 import StandardSqlFormatter from './languages/StandardSqlFormatter';

// New CommonJS syntax:
//const StandardSqlFormatter = require('./languages/StandardSqlFormatter');

/**
 * Format whitespace in a query to make it easier to read.
 *
 * @param {String} query
 * @param {Object} cfg
 *  @param {String} cfg.language Query language, default is Standard SQL
 *  @param {String} cfg.indent Characters used for indentation, default is "  " (2 spaces)
 *  @param {Bool} cfg.uppercase Converts keywords to uppercase
 *  @param {Integer} cfg.linesBetweenQueries How many line breaks between queries
 *  @param {Object} cfg.params Collection of params for placeholder replacement
 * @return {String}
 */
export const format = (query, cfg = {}) => {
  // Directly use StandardSqlFormatter to format the query
  return new StandardSqlFormatter(cfg).format(query);
};

export default { format };
