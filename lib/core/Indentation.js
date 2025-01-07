"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _repeat = _interopRequireDefault(require("lodash/repeat"));
var _last = _interopRequireDefault(require("lodash/last"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var INDENT_TYPE_TOP_LEVEL = 'top-level';
var INDENT_TYPE_BLOCK_LEVEL = 'block-level';

/**
 * Manages indentation levels.
 *
 * There are two types of indentation levels:
 *
 * - BLOCK_LEVEL : increased by open-parenthesis
 * - TOP_LEVEL : increased by RESERVED_TOP_LEVEL words
 */
var Indentation = exports["default"] = /*#__PURE__*/function () {
  /**
   * @param {String} indent Indent value, default is "  " (2 spaces)
   */
  function Indentation(indent) {
    _classCallCheck(this, Indentation);
    this.indent = indent || '  ';
    this.indentTypes = [];
  }

  /**
   * Returns current indentation string.
   * @return {String}
   */
  return _createClass(Indentation, [{
    key: "getIndent",
    value: function getIndent() {
      return (0, _repeat["default"])(this.indent, this.indentTypes.length);
    }

    /**
     * Increases indentation by one top-level indent.
     */
  }, {
    key: "increaseTopLevel",
    value: function increaseTopLevel() {
      this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
    }

    /**
     * Increases indentation by one block-level indent.
     */
  }, {
    key: "increaseBlockLevel",
    value: function increaseBlockLevel() {
      this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
    }

    /**
     * Decreases indentation by one top-level indent.
     * Does nothing when the previous indent is not top-level.
     */
  }, {
    key: "decreaseTopLevel",
    value: function decreaseTopLevel() {
      if ((0, _last["default"])(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
        this.indentTypes.pop();
      }
    }

    /**
     * Decreases indentation by one block-level indent.
     * If there are top-level indents within the block-level indent,
     * throws away these as well.
     */
  }, {
    key: "decreaseBlockLevel",
    value: function decreaseBlockLevel() {
      while (this.indentTypes.length > 0) {
        var type = this.indentTypes.pop();
        if (type !== INDENT_TYPE_TOP_LEVEL) {
          break;
        }
      }
    }
  }, {
    key: "resetIndentation",
    value: function resetIndentation() {
      this.indentTypes = [];
    }
  }]);
}();