"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tokenTypes = _interopRequireDefault(require("./tokenTypes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var INLINE_MAX_LENGTH = 50;

/**
 * Bookkeeper for inline blocks.
 *
 * Inline blocks are parenthesized expressions that are shorter than INLINE_MAX_LENGTH.
 * These blocks are formatted on a single line, unlike longer parenthesized
 * expressions where open-parenthesis causes newline and increase of indentation.
 */
var InlineBlock = exports["default"] = /*#__PURE__*/function () {
  function InlineBlock() {
    _classCallCheck(this, InlineBlock);
    this.level = 0;
  }

  /**
   * Begins inline block when lookahead through upcoming tokens determines
   * that the block would be smaller than INLINE_MAX_LENGTH.
   * @param  {Object[]} tokens Array of all tokens
   * @param  {Number} index Current token position
   */
  return _createClass(InlineBlock, [{
    key: "beginIfPossible",
    value: function beginIfPossible(tokens, index) {
      if (this.level === 0 && this.isInlineBlock(tokens, index)) {
        this.level = 1;
      } else if (this.level > 0) {
        this.level++;
      } else {
        this.level = 0;
      }
    }

    /**
     * Finishes current inline block.
     * There might be several nested ones.
     */
  }, {
    key: "end",
    value: function end() {
      this.level--;
    }

    /**
     * True when inside an inline block
     * @return {Boolean}
     */
  }, {
    key: "isActive",
    value: function isActive() {
      return this.level > 0;
    }

    // Check if this should be an inline parentheses block
    // Examples are "NOW()", "COUNT(*)", "int(10)", key(`some_column`), DECIMAL(7,2)
  }, {
    key: "isInlineBlock",
    value: function isInlineBlock(tokens, index) {
      var length = 0;
      var level = 0;
      for (var i = index; i < tokens.length; i++) {
        var token = tokens[i];
        length += token.value.length;

        // Overran max length
        if (length > INLINE_MAX_LENGTH) {
          return false;
        }
        if (token.type === _tokenTypes["default"].OPEN_PAREN) {
          level++;
        } else if (token.type === _tokenTypes["default"].CLOSE_PAREN) {
          level--;
          if (level === 0) {
            return true;
          }
        }
        if (this.isForbiddenToken(token)) {
          return false;
        }
      }
      return false;
    }

    // Reserved words that cause newlines, comments and semicolons
    // are not allowed inside inline parentheses block
  }, {
    key: "isForbiddenToken",
    value: function isForbiddenToken(_ref) {
      var type = _ref.type,
        value = _ref.value;
      return type === _tokenTypes["default"].RESERVED_TOP_LEVEL || type === _tokenTypes["default"].RESERVED_NEWLINE || type === _tokenTypes["default"].COMMENT || type === _tokenTypes["default"].BLOCK_COMMENT || value === ';';
    }
  }]);
}();