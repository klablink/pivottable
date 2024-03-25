"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function ($) {
  var c3;
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
    // CommonJS
    c3 = require('c3');
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['c3'], function (_c3) {
      return c3 = _c3;
    });
  } else {
    c3 = window.c3;
  }
  var makeC3Chart = function makeC3Chart(chartOpts) {
    if (chartOpts == null) {
      chartOpts = {};
    }
    return function (pivotData, opts) {
      var colKey, columns, groupByTitle, hAxisTitle, rowKey, scatterData, series, titleText, vAxisTitle, y;
      var c, x;
      var defaults = {
        localeStrings: {
          vs: 'vs',
          by: 'by'
        },
        c3: {}
      };
      opts = $.extend(true, {}, defaults, opts);
      if (opts.c3.size == null) {
        opts.c3.size = {};
      }
      if (opts.c3.size.width == null) {
        opts.c3.size.width = window.innerWidth / 1.4;
      }
      if (opts.c3.size.height == null) {
        opts.c3.size.height = window.innerHeight / 1.4 - 50;
      }
      if (chartOpts.type == null) {
        chartOpts.type = 'line';
      }
      if (chartOpts.horizontal == null) {
        chartOpts.horizontal = false;
      }
      if (chartOpts.stacked == null) {
        chartOpts.stacked = false;
      }
      var rowKeys = pivotData.getRowKeys();
      if (rowKeys.length === 0) {
        rowKeys.push([]);
      }
      var colKeys = pivotData.getColKeys();
      if (colKeys.length === 0) {
        colKeys.push([]);
      }
      var headers = colKeys.map(function (h) {
        return h.join('-');
      });
      var rotationAngle = 0;
      var fullAggName = pivotData.aggregatorName;
      if (pivotData.valAttrs.length) {
        fullAggName += "(".concat(pivotData.valAttrs.join(', '), ")");
      }
      if (chartOpts.type === 'scatter') {
        scatterData = {
          x: {},
          y: {},
          t: {}
        };
        var attrs = pivotData.rowAttrs.concat(pivotData.colAttrs);
        vAxisTitle = attrs[0] != null ? attrs[0] : '';
        hAxisTitle = attrs[1] != null ? attrs[1] : '';
        groupByTitle = attrs.slice(2).join('-');
        titleText = vAxisTitle;
        if (hAxisTitle !== '') {
          titleText += " ".concat(opts.localeStrings.vs, " ").concat(hAxisTitle);
        }
        if (groupByTitle !== '') {
          titleText += " ".concat(opts.localeStrings.by, " ").concat(groupByTitle);
        }
        var _iterator = _createForOfIteratorHelper(rowKeys),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            rowKey = _step.value;
            var _iterator2 = _createForOfIteratorHelper(colKeys),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                colKey = _step2.value;
                var agg = pivotData.getAggregator(rowKey, colKey);
                if (agg.value() != null) {
                  var vals = rowKey.concat(colKey);
                  series = vals.slice(2).join('-');
                  if (series === '') {
                    series = 'series';
                  }
                  if (scatterData.x[series] == null) {
                    scatterData.x[series] = [];
                  }
                  if (scatterData.y[series] == null) {
                    scatterData.y[series] = [];
                  }
                  y = vals[0] != null ? vals[0] : 0;
                  x = vals[1] != null ? vals[1] : 0;
                  scatterData.y[series].push(y);
                  scatterData.x[series].push(x);
                  if (scatterData.t[series] == null) {
                    scatterData.t[series] = {};
                  }
                  if (scatterData.t[series][x] == null) {
                    scatterData.t[series][x] = {};
                  }
                  scatterData.t[series][x][y] = agg.value();
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        var numCharsInHAxis = 0;
        for (var _i = 0, _Array$from = Array.from(headers); _i < _Array$from.length; _i++) {
          x = _Array$from[_i];
          numCharsInHAxis += x.length;
        }
        if (numCharsInHAxis > 50) {
          rotationAngle = 45;
        }
        columns = [];
        var _iterator3 = _createForOfIteratorHelper(rowKeys),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            rowKey = _step3.value;
            var rowHeader = rowKey.join('-');
            var row = [rowHeader === '' ? fullAggName : rowHeader];
            for (var _i2 = 0, _Array$from2 = Array.from(colKeys); _i2 < _Array$from2.length; _i2++) {
              colKey = _Array$from2[_i2];
              var val = parseFloat(pivotData.getAggregator(rowKey, colKey).value());
              if (isFinite(val)) {
                row.push(val);
              } else {
                row.push(null);
              }
            }
            columns.push(row);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        vAxisTitle = fullAggName;
        if (chartOpts.horizontal) {
          hAxisTitle = pivotData.rowAttrs.join('-');
          groupByTitle = pivotData.colAttrs.join('-');
        } else {
          hAxisTitle = pivotData.colAttrs.join('-');
          groupByTitle = pivotData.rowAttrs.join('-');
        }
        titleText = fullAggName;
        if (hAxisTitle !== '') {
          titleText += " ".concat(opts.localeStrings.vs, " ").concat(hAxisTitle);
        }
        if (groupByTitle !== '') {
          titleText += " ".concat(opts.localeStrings.by, " ").concat(groupByTitle);
        }
      }
      var title = $('<p>', {
        style: 'text-align: center; font-weight: bold'
      });
      title.text(titleText);
      var formatter = pivotData.getAggregator([], []).format;
      var params = {
        axis: {
          rotated: chartOpts.horizontal,
          y: {
            label: vAxisTitle,
            tick: {}
          },
          x: {
            label: hAxisTitle,
            tick: {
              rotate: rotationAngle,
              multiline: false
            }
          }
        },
        data: {
          type: chartOpts.type,
          order: null
        },
        tooltip: {
          grouped: false
        },
        color: {
          pattern: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac']
        }
      };
      params = $.extend(true, {}, params, opts.c3);
      if (chartOpts.type === 'scatter') {
        var xs = {};
        var numSeries = 0;
        var dataColumns = [];
        for (var s in scatterData.x) {
          numSeries += 1;
          xs[s] = s + '_x';
          dataColumns.push([s + '_x'].concat(scatterData.x[s]));
          dataColumns.push([s].concat(scatterData.y[s]));
        }
        params.data.xs = xs;
        params.data.columns = dataColumns;
        params.axis.x.tick = {
          fit: false
        };
        if (numSeries === 1) {
          params.legend = {
            show: false
          };
        }
        params.tooltip.format = {
          title: function title() {
            return fullAggName;
          },
          name: function name() {
            return '';
          },
          value: function value(a, b, c, d, e) {
            var _e$ = e[0];
            series = _e$.name;
            y = _e$.value;
            x = _e$.x;
            return formatter(scatterData.t[series][x][y]);
          }
        };
      } else {
        var categories;
        params.axis.x.type = 'category';
        if (params.axis.y.tick.format == null) {
          params.axis.y.tick.format = function (v) {
            return formatter(v);
          };
        }
        params.tooltip.format = {
          value: function value(v) {
            return formatter(v);
          }
        };
        if (chartOpts.horizontal) {
          categories = [];
          for (var _i3 = 0, _Array$from3 = Array.from(columns); _i3 < _Array$from3.length; _i3++) {
            c = _Array$from3[_i3];
            categories.push(c.shift());
          }
          if (categories.length === 1 && categories[0] === fullAggName) {
            categories = [''];
          }
          params.axis.x.categories = categories;
          if (headers.length === 1 && headers[0] === '') {
            headers = [fullAggName];
          }
          columns.unshift(headers);
          params.data.rows = columns;
        } else {
          params.axis.x.categories = headers;
          params.data.columns = columns;
        }
      }
      if (chartOpts.stacked) {
        if (chartOpts.horizontal) {
          var _result = [];
          for (var _i4 = 0, _Array$from4 = Array.from(colKeys); _i4 < _Array$from4.length; _i4++) {
            x = _Array$from4[_i4];
            _result.push(x.join('-'));
          }
          params.data.groups = [_result];
        } else {
          var _result2 = [];
          var _iterator4 = _createForOfIteratorHelper(rowKeys),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              x = _step4.value;
              _result2.push(x.join('-'));
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          params.data.groups = [_result2];
        }
      }
      var renderArea = $('<div>', {
        style: 'display:none;'
      }).appendTo($('body'));
      var result = $('<div>').appendTo(renderArea);
      params.bindto = result[0];
      c3.generate(params);
      result.detach();
      renderArea.remove();
      return $('<div>').append(title, result);
    };
  };
  return $.pivotUtilities.c3_renderers = {
    'Horizontal Bar Chart': makeC3Chart({
      type: 'bar',
      horizontal: true
    }),
    'Horizontal Stacked Bar Chart': makeC3Chart({
      type: 'bar',
      stacked: true,
      horizontal: true
    }),
    'Bar Chart': makeC3Chart({
      type: 'bar'
    }),
    'Stacked Bar Chart': makeC3Chart({
      type: 'bar',
      stacked: true
    }),
    'Line Chart': makeC3Chart(),
    'Area Chart': makeC3Chart({
      type: 'area',
      stacked: true
    }),
    'Scatter Chart': makeC3Chart({
      type: 'scatter'
    })
  };
})(jQuery);
//# sourceMappingURL=c3_renderers.js.map
