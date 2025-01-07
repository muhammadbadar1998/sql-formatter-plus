"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = exports["default"] = void 0;
var _StandardSqlFormatter = _interopRequireDefault(require("./languages/StandardSqlFormatter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Old ES Module syntax:

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
var format = exports.format = function format(query) {
  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Directly use StandardSqlFormatter to format the query
  return new _StandardSqlFormatter["default"](cfg).format(query);
};
var _default = exports["default"] = {
  format: format
};