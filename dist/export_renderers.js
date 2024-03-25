"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function ($) {
  return $.pivotUtilities.export_renderers = {
    'TSV Export': function TSVExport(pivotData, opts) {
      var colKey, r;
      var defaults = {
        localeStrings: {}
      };
      opts = $.extend(true, {}, defaults, opts);
      var rowKeys = pivotData.getRowKeys();
      if (rowKeys.length === 0) {
        rowKeys.push([]);
      }
      var colKeys = pivotData.getColKeys();
      if (colKeys.length === 0) {
        colKeys.push([]);
      }
      var rowAttrs = pivotData.rowAttrs;
      var colAttrs = pivotData.colAttrs;
      var result = [];
      var row = [];
      var _iterator = _createForOfIteratorHelper(rowAttrs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rowAttr = _step.value;
          row.push(rowAttr);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (colKeys.length === 1 && colKeys[0].length === 0) {
        row.push(pivotData.aggregatorName);
      } else {
        var _iterator2 = _createForOfIteratorHelper(colKeys),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            colKey = _step2.value;
            row.push(colKey.join('-'));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      result.push(row);
      var _iterator3 = _createForOfIteratorHelper(rowKeys),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var rowKey = _step3.value;
          row = [];
          var _iterator4 = _createForOfIteratorHelper(rowKey),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              r = _step4.value;
              row.push(r);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          var _iterator5 = _createForOfIteratorHelper(colKeys),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              colKey = _step5.value;
              var agg = pivotData.getAggregator(rowKey, colKey);
              if (agg.value() != null) {
                row.push(agg.value());
              } else {
                row.push('');
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          result.push(row);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var text = '';
      for (var _i = 0, _result = result; _i < _result.length; _i++) {
        r = _result[_i];
        text += r.join('\t') + '\n';
      }
      return $('<textarea>').text(text).css({
        width: $(window).width() / 2 + 'px',
        height: $(window).height() / 2 + 'px'
      });
    }
  };
})(jQuery);
//# sourceMappingURL=export_renderers.js.map
