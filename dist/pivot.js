"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
// noinspection JSUnresolvedReference

/*
 * decaffeinate suggestions:
 * DS201: Simplify complex destructure assignments
 * DS202: Simplify dynamic range loops
 * DS203: Remove `|| {}` from converted for-own loops
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

(function ($) {
  var expandWithSpan = function expandWithSpan(cell, rows, keys, nth) {
    var parent;
    var table = $(cell).closest('table');
    var span = rows ? 'rowSpan' : 'colSpan';
    var dft = !rows ? Math.max(1, this.aggregator.length) : 1;
    var _ref = [cell[span], cell._span != null ? cell._span : dft];
    cell._span = _ref[0];
    cell[span] = _ref[1];
    var change = cell[span] - cell._span;
    var object = parentKeysIndices(keys, nth);
    for (var i in object) {
      var p = object[i];
      parent = getHeader(table, rows, p)[0];
      if (parent[span] === 1) {
        parent._span += change;
        break;
      }
      parent[span] += change;
    }
    return expandRowCol(cell, rows, keys, nth, parent);
  };
  /*
      Utilities
      */

  var getExpandAllHandler;
  var addSeparators = function addSeparators(nStr, thousandsSep, decimalSep) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? decimalSep + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
    }
    return x1 + x2;
  };
  var numberFormat = function numberFormat(opts) {
    var defaults = {
      digitsAfterDecimal: 2,
      scaler: 1,
      thousandsSep: ',',
      decimalSep: '.',
      prefix: '',
      suffix: ''
    };
    opts = $.extend({}, defaults, opts);
    return function (x) {
      if (isNaN(x) || !isFinite(x)) {
        return '';
      }
      var result = addSeparators((opts.scaler * x).toFixed(opts.digitsAfterDecimal), opts.thousandsSep, opts.decimalSep);
      return '' + opts.prefix + result + opts.suffix;
    };
  };

  //aggregator templates default to US number formatting, but this is overrideable
  var usFmt = numberFormat();
  var usFmtInt = numberFormat({
    digitsAfterDecimal: 0
  });
  var usFmtPct = numberFormat({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%'
  });
  var aggregatorTemplates = {
    count: function count(formatter) {
      if (formatter == null) {
        formatter = usFmtInt;
      }
      return function () {
        return function (data, rowKey, colKey) {
          return {
            count: 0,
            push: function push() {
              return this.count++;
            },
            value: function value() {
              return this.count;
            },
            format: formatter
          };
        };
      };
    },
    uniques: function uniques(fn, formatter) {
      if (formatter == null) {
        formatter = usFmtInt;
      }
      return function () {
        var _ref2 = arguments.length <= 0 ? undefined : arguments[0],
          _ref3 = _slicedToArray(_ref2, 1),
          attr = _ref3[0];
        return function (data, rowKey, colKey) {
          return {
            uniq: [],
            push: function push(record) {
              if (!this.uniq.includes(record[attr])) {
                return this.uniq.push(record[attr]);
              }
            },
            value: function value() {
              return fn(this.uniq);
            },
            format: formatter,
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    sum: function sum(formatter) {
      if (formatter == null) {
        formatter = usFmt;
      }
      return function () {
        var _ref4 = arguments.length <= 0 ? undefined : arguments[0],
          _ref5 = _slicedToArray(_ref4, 1),
          attr = _ref5[0];
        return function (data, rowKey, colKey) {
          return {
            sum: 0,
            push: function push(record) {
              if (!isNaN(parseFloat(record[attr]))) {
                return this.sum += parseFloat(record[attr]);
              }
            },
            value: function value() {
              return this.sum;
            },
            format: formatter,
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    extremes: function extremes(mode, formatter) {
      if (formatter == null) {
        formatter = usFmt;
      }
      return function () {
        var _ref6 = arguments.length <= 0 ? undefined : arguments[0],
          _ref7 = _slicedToArray(_ref6, 1),
          attr = _ref7[0];
        return function (data, rowKey, colKey) {
          return {
            val: null,
            sorter: getSort(data != null ? data.sorters : undefined, attr),
            push: function push(record) {
              var x = record[attr];
              if (['min', 'max'].includes(mode)) {
                x = parseFloat(x);
                if (!isNaN(x)) {
                  this.val = Math[mode](x, this.val != null ? this.val : x);
                }
              }
              if (mode === 'first') {
                if (this.sorter(x, this.val != null ? this.val : x) <= 0) {
                  this.val = x;
                }
              }
              if (mode === 'last') {
                if (this.sorter(x, this.val != null ? this.val : x) >= 0) {
                  return this.val = x;
                }
              }
            },
            value: function value() {
              return this.val;
            },
            format: function format(x) {
              if (isNaN(x)) {
                return x;
              } else {
                return formatter(x);
              }
            },
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    quantile: function quantile(q, formatter) {
      if (formatter == null) {
        formatter = usFmt;
      }
      return function () {
        var _ref8 = arguments.length <= 0 ? undefined : arguments[0],
          _ref9 = _slicedToArray(_ref8, 1),
          attr = _ref9[0];
        return function (data, rowKey, colKey) {
          return {
            vals: [],
            push: function push(record) {
              var x = parseFloat(record[attr]);
              if (!isNaN(x)) {
                return this.vals.push(x);
              }
            },
            value: function value() {
              if (this.vals.length === 0) {
                return null;
              }
              this.vals.sort(function (a, b) {
                return a - b;
              });
              var i = (this.vals.length - 1) * q;
              return (this.vals[Math.floor(i)] + this.vals[Math.ceil(i)]) / 2.0;
            },
            format: formatter,
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    runningStat: function runningStat(mode, ddof, formatter) {
      if (mode == null) {
        mode = 'mean';
      }
      if (ddof == null) {
        ddof = 1;
      }
      if (formatter == null) {
        formatter = usFmt;
      }
      return function () {
        var _ref10 = arguments.length <= 0 ? undefined : arguments[0],
          _ref11 = _slicedToArray(_ref10, 1),
          attr = _ref11[0];
        return function (data, rowKey, colKey) {
          return {
            n: 0.0,
            m: 0.0,
            s: 0.0,
            push: function push(record) {
              var x = parseFloat(record[attr]);
              if (isNaN(x)) {
                return;
              }
              this.n += 1.0;
              if (this.n === 1.0) {
                return this.m = x;
              } else {
                var m_new = this.m + (x - this.m) / this.n;
                this.s = this.s + (x - this.m) * (x - m_new);
                return this.m = m_new;
              }
            },
            value: function value() {
              if (mode === 'mean') {
                if (this.n === 0) {
                  return 0 / 0;
                } else {
                  return this.m;
                }
              }
              if (this.n <= ddof) {
                return 0;
              }
              switch (mode) {
                case 'var':
                  return this.s / (this.n - ddof);
                case 'stdev':
                  return Math.sqrt(this.s / (this.n - ddof));
              }
            },
            format: formatter,
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    sumOverSum: function sumOverSum(formatter) {
      if (formatter == null) {
        formatter = usFmt;
      }
      return function () {
        var _ref12 = arguments.length <= 0 ? undefined : arguments[0],
          _ref13 = _slicedToArray(_ref12, 2),
          num = _ref13[0],
          denom = _ref13[1];
        return function (data, rowKey, colKey) {
          return {
            sumNum: 0,
            sumDenom: 0,
            push: function push(record) {
              if (!isNaN(parseFloat(record[num]))) {
                this.sumNum += parseFloat(record[num]);
              }
              if (!isNaN(parseFloat(record[denom]))) {
                return this.sumDenom += parseFloat(record[denom]);
              }
            },
            value: function value() {
              return this.sumNum / this.sumDenom;
            },
            format: formatter,
            numInputs: num != null && denom != null ? 0 : 2
          };
        };
      };
    },
    sumOverSumBound80: function sumOverSumBound80(upper, formatter) {
      if (upper == null) {
        upper = true;
      }
      if (formatter == null) {
        formatter = usFmt;
      }
      return function () {
        var _ref14 = arguments.length <= 0 ? undefined : arguments[0],
          _ref15 = _slicedToArray(_ref14, 2),
          num = _ref15[0],
          denom = _ref15[1];
        return function (data, rowKey, colKey) {
          return {
            sumNum: 0,
            sumDenom: 0,
            push: function push(record) {
              if (!isNaN(parseFloat(record[num]))) {
                this.sumNum += parseFloat(record[num]);
              }
              if (!isNaN(parseFloat(record[denom]))) {
                return this.sumDenom += parseFloat(record[denom]);
              }
            },
            value: function value() {
              var sign = upper ? 1 : -1;
              return (0.821187207574908 / this.sumDenom + this.sumNum / this.sumDenom + 1.2815515655446004 * sign * Math.sqrt(0.410593603787454 / (this.sumDenom * this.sumDenom) + this.sumNum * (1 - this.sumNum / this.sumDenom) / (this.sumDenom * this.sumDenom))) / (1 + 1.642374415149816 / this.sumDenom);
            },
            format: formatter,
            numInputs: num != null && denom != null ? 0 : 2
          };
        };
      };
    },
    fractionOf: function fractionOf(wrapped, type, formatter) {
      if (type == null) {
        type = 'total';
      }
      if (formatter == null) {
        formatter = usFmtPct;
      }
      return function () {
        for (var _len = arguments.length, x = new Array(_len), _key = 0; _key < _len; _key++) {
          x[_key] = arguments[_key];
        }
        return function (data, rowKey, colKey) {
          return {
            selector: {
              total: [[], []],
              row: [rowKey, []],
              col: [[], colKey]
            }[type],
            inner: wrapped.apply(void 0, _toConsumableArray(x || []))(data, rowKey, colKey),
            push: function push(record) {
              return this.inner.push(record);
            },
            format: formatter,
            value: function value(id) {
              var agg = data.getAggregator.apply(data, _toConsumableArray([].concat(_toConsumableArray(this.selector), [id]) || []));
              return this.inner.value() / agg.inner.value();
            },
            numInputs: wrapped.apply(void 0, _toConsumableArray(x || []))().numInputs
          };
        };
      };
    }
  };
  aggregatorTemplates.countUnique = function (f) {
    return aggregatorTemplates.uniques(function (x) {
      return x.length;
    }, f);
  };
  aggregatorTemplates.listUnique = function (s) {
    return aggregatorTemplates.uniques(function (x) {
      return x.sort(naturalSort).join(s);
    }, function (x) {
      return x;
    });
  };
  aggregatorTemplates.max = function (f) {
    return aggregatorTemplates.extremes('max', f);
  };
  aggregatorTemplates.min = function (f) {
    return aggregatorTemplates.extremes('min', f);
  };
  aggregatorTemplates.first = function (f) {
    return aggregatorTemplates.extremes('first', f);
  };
  aggregatorTemplates.last = function (f) {
    return aggregatorTemplates.extremes('last', f);
  };
  aggregatorTemplates.median = function (f) {
    return aggregatorTemplates.quantile(0.5, f);
  };
  aggregatorTemplates.average = function (f) {
    return aggregatorTemplates.runningStat('mean', 1, f);
  };
  aggregatorTemplates.var = function (ddof, f) {
    return aggregatorTemplates.runningStat('var', ddof, f);
  };
  aggregatorTemplates.stdev = function (ddof, f) {
    return aggregatorTemplates.runningStat('stdev', ddof, f);
  };
  function makeAggregators(fmt, fmtInt, fmtPct) {
    return {
      'Count': aggregatorTemplates.count(fmtInt),
      'Count Unique Values': aggregatorTemplates.countUnique(fmtInt),
      'List Unique Values': aggregatorTemplates.listUnique(', '),
      'Sum': aggregatorTemplates.sum(fmt),
      'Integer Sum': aggregatorTemplates.sum(fmtInt),
      'Average': aggregatorTemplates.average(fmt),
      'Median': aggregatorTemplates.median(fmt),
      'Sample Variance': aggregatorTemplates.var(1, fmt),
      'Sample Standard Deviation': aggregatorTemplates.stdev(1, fmt),
      'Minimum': aggregatorTemplates.min(fmt),
      'Maximum': aggregatorTemplates.max(fmt),
      'First': aggregatorTemplates.first(fmt),
      'Last': aggregatorTemplates.last(fmt),
      'Sum over Sum': aggregatorTemplates.sumOverSum(fmt),
      '80% Upper Bound': aggregatorTemplates.sumOverSumBound80(true, fmt),
      '80% Lower Bound': aggregatorTemplates.sumOverSumBound80(false, fmt),
      'Sum as Fraction of Total': aggregatorTemplates.fractionOf(aggregatorTemplates.sum(), 'total', fmtPct),
      'Sum as Fraction of Rows': aggregatorTemplates.fractionOf(aggregatorTemplates.sum(), 'row', fmtPct),
      'Sum as Fraction of Columns': aggregatorTemplates.fractionOf(aggregatorTemplates.sum(), 'col', fmtPct),
      'Count as Fraction of Total': aggregatorTemplates.fractionOf(aggregatorTemplates.count(), 'total', fmtPct),
      'Count as Fraction of Rows': aggregatorTemplates.fractionOf(aggregatorTemplates.count(), 'row', fmtPct),
      'Count as Fraction of Columns': aggregatorTemplates.fractionOf(aggregatorTemplates.count(), 'col', fmtPct)
    };
  }

  //default aggregators & renderers use US naming and number formatting
  var defaultAggregators = makeAggregators(usFmt, usFmtInt, usFmtPct);
  var renderers = {
    'Table': function Table(data, opts) {
      return pivotTableRenderer(data, opts);
    },
    'Table Barchart': function TableBarchart(data, opts) {
      return $(pivotTableRenderer(data, opts)).barchart();
    },
    'Heatmap': function Heatmap(data, opts) {
      return $(pivotTableRenderer(data, opts)).heatmap('heatmap', opts);
    },
    'Row Heatmap': function RowHeatmap(data, opts) {
      return $(pivotTableRenderer(data, opts)).heatmap('rowheatmap', opts);
    },
    'Col Heatmap': function ColHeatmap(data, opts) {
      return $(pivotTableRenderer(data, opts)).heatmap('colheatmap', opts);
    }
  };
  var locales = {
    en: {
      formatters: {
        format: usFmt,
        formatInt: usFmtInt,
        formatPct: usFmtPct
      },
      renderers: renderers,
      localeStrings: {
        renderError: 'An error occurred rendering the PivotTable results.',
        computeError: 'An error occurred computing the PivotTable results.',
        uiRenderError: 'An error occurred rendering the PivotTable UI.',
        selectAll: 'Select All',
        selectNone: 'Select None',
        tooMany: '(too many to list)',
        filterResults: 'Filter values',
        apply: 'Apply',
        cancel: 'Cancel',
        totals: 'Totals',
        //for table renderer
        vs: 'vs',
        //for gchart renderer
        by: 'by',
        //for gchart renderer
        rendererLabel: 'Renderer',
        valuesLabel: 'Values',
        fieldsLabel: 'Fields',
        colsLabel: 'Columns',
        rowsLabel: 'Rows',
        groupsLabel: 'Groups'
      }
    }
  };
  for (var _i = 0, _Object$keys = Object.keys(defaultAggregators); _i < _Object$keys.length; _i++) {
    var agg = _Object$keys[_i];
    locales.en.localeStrings[agg] = agg;
  }

  //dateFormat deriver l10n requires month and day names to be passed in directly
  var mthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var zeroPad = function zeroPad(number) {
    return ('0' + number).substr(-2, 2);
  };
  var derivers = {
    bin: function bin(col, binWidth) {
      return function (record) {
        return record[col] - record[col] % binWidth;
      };
    },
    dateFormat: function dateFormat(col, formatString, utcOutput, mthNames, dayNames) {
      if (utcOutput == null) {
        utcOutput = false;
      }
      if (mthNames == null) {
        mthNames = mthNamesEn;
      }
      if (dayNames == null) {
        dayNames = dayNamesEn;
      }
      var utc = utcOutput ? 'UTC' : '';
      return function (record) {
        //thanks http://stackoverflow.com/a/12213072/112871
        var date = new Date(Date.parse(record[col]));
        if (isNaN(date)) {
          return '';
        }
        return formatString.replace(/%(.)/g, function (m, p) {
          switch (p) {
            case 'y':
              return date["get".concat(utc, "FullYear")]();
            case 'm':
              return zeroPad(date["get".concat(utc, "Month")]() + 1);
            case 'n':
              return mthNames[date["get".concat(utc, "Month")]()];
            case 'd':
              return zeroPad(date["get".concat(utc, "Date")]());
            case 'w':
              return dayNames[date["get".concat(utc, "Day")]()];
            case 'x':
              return date["get".concat(utc, "Day")]();
            case 'H':
              return zeroPad(date["get".concat(utc, "Hours")]());
            case 'M':
              return zeroPad(date["get".concat(utc, "Minutes")]());
            case 'S':
              return zeroPad(date["get".concat(utc, "Seconds")]());
            default:
              return '%' + p;
          }
        });
      };
    }
  };
  var rx = /(\d+)|(\D+)/g;
  var rd = /\d/;
  var rz = /^0/;
  var naturalSort = function naturalSort(as, bs, nulls_first) {
    //nulls first
    if (nulls_first == null) {
      nulls_first = true;
    }
    var nf = nulls_first ? 1 : -1;
    if (bs != null && as == null) {
      return -1 * nf;
    }
    if (as != null && bs == null) {
      return 1 * nf;
    }

    //then raw NaNs
    if (typeof as === 'number' && isNaN(as)) {
      return -1;
    }
    if (typeof bs === 'number' && isNaN(bs)) {
      return 1;
    }

    //numbers and numbery strings group together
    var nas = +as;
    var nbs = +bs;
    if (nas < nbs) {
      return -1;
    }
    if (nas > nbs) {
      return 1;
    }

    //within that, true numbers before numbery strings
    if (typeof as === 'number' && typeof bs !== 'number') {
      return -1;
    }
    if (typeof bs === 'number' && typeof as !== 'number') {
      return 1;
    }
    if (typeof as === 'number' && typeof bs === 'number') {
      return 0;
    }

    // 'Infinity' is a textual number, so less than 'A'
    if (isNaN(nbs) && !isNaN(nas)) {
      return -1;
    }
    if (isNaN(nas) && !isNaN(nbs)) {
      return 1;
    }

    //finally, "smart" string sorting per http://stackoverflow.com/a/4373421/112871
    var a = String(as);
    var b = String(bs);
    if (a === b) {
      return 0;
    }
    if (!rd.test(a) || !rd.test(b)) {
      return a > b ? 1 : -1;
    }

    //special treatment for strings containing digits
    a = a.match(rx); //create digits vs. non-digit chunks and iterate through
    b = b.match(rx);
    while (a.length && b.length) {
      var a1 = a.shift();
      var b1 = b.shift();
      if (a1 !== b1) {
        if (rd.test(a1) && rd.test(b1)) {
          //both are digit chunks
          return a1.replace(rz, '.0') - b1.replace(rz, '.0');
        } else {
          return a1 > b1 ? 1 : -1;
        }
      }
    }
    return a.length - b.length;
  };
  var sortAs = function sortAs(order) {
    var mapping = {};
    var l_mapping = {}; // sort lowercased keys similarly
    for (var i in order) {
      var x = order[i];
      mapping[x] = i;
      if (typeof x === 'string') {
        l_mapping[x.toLowerCase()] = i;
      }
    }
    return function (a, b) {
      if (mapping[a] != null && mapping[b] != null) {
        return mapping[a] - mapping[b];
      } else if (mapping[a] != null) {
        return -1;
      } else if (mapping[b] != null) {
        return 1;
      } else if (l_mapping[a] != null && l_mapping[b] != null) {
        return l_mapping[a] - l_mapping[b];
      } else if (l_mapping[a] != null) {
        return -1;
      } else if (l_mapping[b] != null) {
        return 1;
      } else {
        return naturalSort(a, b);
      }
    };
  };
  function getSort(sorters, attr) {
    if (sorters != null) {
      if ($.isFunction(sorters)) {
        var sort = sorters(attr);
        if ($.isFunction(sort)) {
          return sort;
        }
      } else if (sorters[attr] != null) {
        return sorters[attr];
      }
    }
    return naturalSort;
  }
  var filterByLength = function filterByLength(keys, length) {
    return keys.filter(function (x) {
      return x.length === length;
    });
  };
  var subarrays = function subarrays(array) {
    return array.map(function (d, i) {
      return array.slice(0, i + 1);
    });
  }; // [1,2,3] => [[1], [1,2], [1,2,3]]

  /*
  Data Model class
  */
  var PivotData = /*#__PURE__*/function () {
    function PivotData(input, opts) {
      var _this = this;
      _classCallCheck(this, PivotData);
      this.arrSort = this.arrSort.bind(this);
      this.sortKeys = this.sortKeys.bind(this);
      this.getColKeys = this.getColKeys.bind(this);
      this.getRowKeys = this.getRowKeys.bind(this);
      this.getAggregator = this.getAggregator.bind(this);
      if (opts == null) {
        opts = {};
      }
      this.input = input;
      if (!Array.isArray(opts.aggregator)) {
        opts.aggregator = opts.aggregator != null ? opts.aggregator : aggregatorTemplates.count()();
        opts.aggregator = [opts.aggregator];
      }
      this.aggregator = opts.aggregator != null ? opts.aggregator : [aggregatorTemplates.count()()];
      this.aggregatorName = opts.aggregatorName != null ? opts.aggregatorName : 'Count';
      this.colAttrs = opts.cols != null ? opts.cols : [];
      this.rowAttrs = opts.rows != null ? opts.rows : [];
      this.valAttrs = opts.vals != null ? opts.vals : [];
      this.sorters = opts.sorters != null ? opts.sorters : {};
      this.rowOrder = opts.rowOrder != null ? opts.rowOrder : 'key_a_to_z';
      this.colOrder = opts.colOrder != null ? opts.colOrder : 'key_a_to_z';
      this.derivedAttributes = opts.derivedAttributes != null ? opts.derivedAttributes : {};
      this.filter = opts.filter != null ? opts.filter : function () {
        return true;
      };
      this.tree = {};
      this.rowKeys = [];
      this.colKeys = [];
      this.rowTotals = {};
      this.colTotals = {};
      this.allTotal = this.aggregator.map(function (agg) {
        return agg(_this, [], []);
      });
      this.sorted = false;
      this.aggregatorsLabel = opts.aggregatorsLabel != null ? opts.aggregatorsLabel : [];
      this.grouping = opts.grouping != null ? opts.grouping : false;
      this.rowGroupBefore = (opts.grouping != null ? opts.grouping.rowGroupBefore : undefined) != null ? opts.grouping != null ? opts.grouping.rowGroupBefore : undefined : true;
      this.colGroupBefore = (opts.grouping != null ? opts.grouping.colGroupBefore : undefined) != null ? opts.grouping != null ? opts.grouping.colGroupBefore : undefined : false;
      var itemsId = 0;
      if (this.aggregatorName != null) {
        this.aggregators = [];
        this.aggregatorName = Array.isArray(this.aggregatorName) ? this.aggregatorName : [this.aggregatorName];
        for (var idx = 0; idx < this.aggregatorName.length; idx++) {
          var _agg = this.aggregatorName[idx];
          this.aggregators.push({
            id: ++itemsId,
            value: _agg,
            vals: opts.vals != null ? opts.vals[idx] : undefined
          });
          renameAggregators(this.aggregators);
        }
      }

      // iterate through input, accumulating data for cells
      PivotData.forEachRecord(this.input, this.derivedAttributes, function (record) {
        if (_this.filter(record)) {
          return _this.processRecord(record);
        }
      });
    }

    //can handle arrays or jQuery selections of tables
    return _createClass(PivotData, [{
      key: "forEachMatchingRecord",
      value: function forEachMatchingRecord(criteria, callback) {
        var _this2 = this;
        return PivotData.forEachRecord(this.input, this.derivedAttributes, function (record) {
          if (!_this2.filter(record)) {
            return;
          }
          for (var k in criteria) {
            var v = criteria[k];
            if (v !== (record[k] != null ? record[k] : 'null')) {
              return;
            }
          }
          return callback(record);
        });
      }
    }, {
      key: "arrSort",
      value: function arrSort(attrs, nulls_first) {
        var sortersArr = [];
        var _iterator = _createForOfIteratorHelper(attrs),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var a = _step.value;
            sortersArr.push(getSort(this.sorters, a));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return function (a, b) {
          for (var _i2 = 0, _Object$keys2 = Object.keys(sortersArr || {}); _i2 < _Object$keys2.length; _i2++) {
            var i = _Object$keys2[_i2];
            var sorter = sortersArr[i];
            var comparison = sorter(a[i], b[i], nulls_first);
            if (comparison !== 0) {
              return comparison;
            }
          }
          return 0;
        };
      }
    }, {
      key: "sortKeys",
      value: function sortKeys() {
        var _this3 = this;
        if (!this.sorted) {
          this.sorted = true;
          var v = function v(r, c) {
            return _this3.getAggregator(r, c).value();
          };
          switch (this.rowOrder) {
            case 'value_a_to_z':
              this.rowKeys.sort(function (a, b) {
                return naturalSort(v(a, []), v(b, []));
              });
              break;
            case 'value_z_to_a':
              this.rowKeys.sort(function (a, b) {
                return -naturalSort(v(a, []), v(b, []));
              });
              break;
            default:
              this.rowKeys.sort(this.arrSort(this.rowAttrs, this.rowGroupBefore));
          }
          switch (this.colOrder) {
            case 'value_a_to_z':
              return this.colKeys.sort(function (a, b) {
                return naturalSort(v([], a), v([], b));
              });
            case 'value_z_to_a':
              return this.colKeys.sort(function (a, b) {
                return -naturalSort(v([], a), v([], b));
              });
            default:
              return this.colKeys.sort(this.arrSort(this.colAttrs, this.colGroupBefore));
          }
        }
      }
    }, {
      key: "getColKeys",
      value: function getColKeys(all_keys) {
        if (all_keys == null) {
          all_keys = false;
        }
        this.sortKeys();
        if (all_keys) {
          return this.colKeys;
        } else {
          return filterByLength(this.colKeys, this.colAttrs.length);
        }
      }
    }, {
      key: "getRowKeys",
      value: function getRowKeys(all_keys) {
        if (all_keys == null) {
          all_keys = false;
        }
        this.sortKeys();
        if (all_keys) {
          return this.rowKeys;
        } else {
          return filterByLength(this.rowKeys, this.rowAttrs.length);
        }
      }
    }, {
      key: "processRecord",
      value: function processRecord(record) {
        var _this4 = this;
        //this code is called in a tight loop
        var x;
        var colKeys = [];
        var rowKeys = [];
        var _iterator2 = _createForOfIteratorHelper(this.colAttrs),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            x = _step2.value;
            colKeys.push(record[x] != null ? record[x] : 'null');
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        var _iterator3 = _createForOfIteratorHelper(this.rowAttrs),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            x = _step3.value;
            rowKeys.push(record[x] != null ? record[x] : 'null');
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        colKeys = this.grouping && colKeys.length ? subarrays(colKeys) : [colKeys];
        rowKeys = this.grouping && rowKeys.length ? subarrays(rowKeys) : [rowKeys];
        this.aggregator.forEach(function (agg, id) {
          return _this4.allTotal[id].push(record);
        });
        var result = [];
        var _loop = function _loop() {
          var rowKey = rowKeys[j];
          var flatRowKey = rowKey.join(String.fromCharCode(0));
          var result1 = [];
          var _loop2 = function _loop2() {
            var colKey = colKeys[i];
            var flatColKey = colKey.join(String.fromCharCode(0));
            if (rowKey.length !== 0) {
              if (!_this4.rowTotals[flatRowKey]) {
                _this4.rowKeys.push(rowKey);
                _this4.rowTotals[flatRowKey] = _this4.aggregator.map(function (agg) {
                  return agg(_this4, rowKey, []);
                });
              }
              _this4.rowTotals[flatRowKey].forEach(function (agg, id) {
                if (!_this4.grouping || colKey.length === 1) {
                  return agg.push(record);
                }
              });
            }
            if (colKey.length !== 0) {
              if (!_this4.colTotals[flatColKey]) {
                _this4.colKeys.push(colKey);
                _this4.colTotals[flatColKey] = _this4.aggregator.map(function (agg) {
                  return agg(_this4, [], colKey);
                });
              }
              _this4.colTotals[flatColKey].forEach(function (agg, id) {
                if (!_this4.grouping || rowKey.length === 1) {
                  return agg.push(record);
                }
              });
            }
            if (colKey.length !== 0 && rowKey.length !== 0) {
              if (!_this4.tree[flatRowKey]) {
                _this4.tree[flatRowKey] = {};
              }
              if (!_this4.tree[flatRowKey][flatColKey]) {
                _this4.tree[flatRowKey][flatColKey] = _this4.aggregator.map(function (agg) {
                  return agg(_this4, rowKey, colKey);
                });
              }
              result1.push(_this4.tree[flatRowKey][flatColKey].forEach(function (agg, id) {
                return agg.push(record);
              }));
            } else {
              result1.push(undefined);
            }
          };
          for (var i in colKeys) {
            _loop2();
          }
          result.push(result1);
        };
        for (var j in rowKeys) {
          _loop();
        }
        return result;
      }
    }, {
      key: "getAggregator",
      value: function getAggregator(rowKey, colKey, id) {
        var agg;
        if (id == null) {
          id = 0;
        }
        var flatRowKey = rowKey.join(String.fromCharCode(0));
        var flatColKey = colKey.join(String.fromCharCode(0));
        if (rowKey.length === 0 && colKey.length === 0) {
          agg = this.allTotal[id];
        } else if (rowKey.length === 0) {
          agg = this.colTotals[flatColKey] && this.colTotals[flatColKey][id];
        } else if (colKey.length === 0) {
          agg = this.rowTotals[flatRowKey] && this.rowTotals[flatRowKey][id];
        } else {
          agg = this.tree[flatRowKey][flatColKey] && this.tree[flatRowKey][flatColKey][id];
        }
        return agg != null ? agg : {
          value: function value() {
            return null;
          },
          format: function format() {
            return '';
          }
        };
      }
    }], [{
      key: "forEachRecord",
      value: function forEachRecord(input, derivedAttributes, f) {
        var addRecord;
        if ($.isEmptyObject(derivedAttributes)) {
          addRecord = f;
        } else {
          addRecord = function addRecord(record) {
            for (var k in derivedAttributes) {
              var v = derivedAttributes[k];
              var left = v(record);
              if (left != null) {
                record[k] = left;
              }
            }
            return f(record);
          };
        }

        //if it's a function, have its calls us back
        if ($.isFunction(input)) {
          return input(addRecord);
        } else if ($.isArray(input)) {
          if ($.isArray(input[0])) {
            //array of arrays
            return function () {
              var result = [];
              for (var _i3 = 0, _Object$keys3 = Object.keys(input || {}); _i3 < _Object$keys3.length; _i3++) {
                var i = _Object$keys3[_i3];
                var compactRecord = input[i];
                if (i > 0) {
                  var record = {};
                  for (var _i4 = 0, _Object$keys4 = Object.keys(input[0] || {}); _i4 < _Object$keys4.length; _i4++) {
                    var j = _Object$keys4[_i4];
                    var k = input[0][j];
                    record[k] = compactRecord[j];
                  }
                  result.push(addRecord(record));
                }
              }
              return result;
            }();
          } else {
            //array of objects
            return function () {
              var result1 = [];
              var _iterator4 = _createForOfIteratorHelper(input),
                _step4;
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var record = _step4.value;
                  result1.push(addRecord(record));
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
              return result1;
            }();
          }
        } else if (input instanceof $) {
          var tblCols = [];
          $('thead > tr > th', input).each(function (i) {
            return tblCols.push($(this).text());
          });
          return $('tbody > tr', input).each(function (i) {
            var record = {};
            $('td', this).each(function (j) {
              return record[tblCols[j]] = $(this).text();
            });
            return addRecord(record);
          });
        } else {
          throw new Error('unknown input format');
        }
      }
    }]);
  }();
  var renameAggregators = function renameAggregators(aggregators) {
    return aggregators.map(function (agg, id) {
      return agg.displayName = String.fromCharCode(97 + id).toUpperCase();
    });
  };

  //expose these to the outside world
  $.pivotUtilities = {
    aggregatorTemplates: aggregatorTemplates,
    aggregators: defaultAggregators,
    renderers: renderers,
    derivers: derivers,
    locales: locales,
    naturalSort: naturalSort,
    numberFormat: numberFormat,
    sortAs: sortAs,
    PivotData: PivotData
  };

  /*
  Default Renderer for hierarchical table layout
  */

  function pivotTableRenderer(pivotData, opts) {
    var agg, aggregator, colKey, getClickHandler, i, id, j, td, th, totalAggregator, tr, val, x;
    var defaults = {
      table: {
        clickCallback: null,
        rowTotals: true,
        colTotals: true
      },
      localeStrings: {
        totals: 'Totals'
      }
    };
    opts = $.extend(true, {}, defaults, opts);
    var colAttrs = pivotData.colAttrs;
    var rowAttrs = pivotData.rowAttrs;
    var rowKeys = pivotData.getRowKeys(true);
    var colKeys = pivotData.getColKeys(true);
    if (opts.table.clickCallback) {
      getClickHandler = function getClickHandler(value, rowValues, colValues) {
        var attr, i;
        var filters = {};
        for (var _i5 = 0, _Object$keys5 = Object.keys(colAttrs || {}); _i5 < _Object$keys5.length; _i5++) {
          i = _Object$keys5[_i5];
          attr = colAttrs[i];
          if (colValues[i] != null) {
            filters[attr] = colValues[i];
          }
        }
        for (var _i6 = 0, _Object$keys6 = Object.keys(rowAttrs || {}); _i6 < _Object$keys6.length; _i6++) {
          i = _Object$keys6[_i6];
          attr = rowAttrs[i];
          if (rowValues[i] != null) {
            filters[attr] = rowValues[i];
          }
        }
        return function (e) {
          return opts.table.clickCallback(e, value, filters, pivotData);
        };
      };
    }
    var compactLayout = (opts.table.compactLayout != null ? opts.table.compactLayout : true) && pivotData.grouping;
    var rowExpandHandler = compactLayout ? expandRowCol : pivotData.rowGroupBefore ? expandWithSpan : expandRowsGroupAfter;
    var rowsExpandHandler = getExpandHandler(rowKeys, true, rowExpandHandler.bind(pivotData));
    var colsExpandHandler = getExpandHandler(colKeys, false, expandWithSpan.bind(pivotData));

    //now actually build the outpu
    var result = document.createElement('table');
    result.className = 'pvtTable';

    //helper function for setting row/col-span in pivotTableRenderer
    var spanSize = function spanSize(arr, i, j) {
      var x;
      if (i !== 0) {
        var asc, end;
        var noDraw = true;
        for (x = 0, end = j, asc = 0 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) {
          if (arr[i - 1][x] !== arr[i][x]) {
            noDraw = false;
          }
        }
        if (noDraw) {
          return -1; //do not draw cell
        }
      }
      var len = 0;
      while (i + len < arr.length) {
        var asc1 = void 0,
          end1 = void 0;
        var stop = false;
        for (x = 0, end1 = j, asc1 = 0 <= end1; asc1 ? x <= end1 : x >= end1; asc1 ? x++ : x--) {
          if (arr[i][x] !== arr[i + len][x]) {
            stop = true;
          }
        }
        if (stop) {
          break;
        }
        len++;
      }
      return len;
    };

    //the first few rows are for col headers
    var thead = document.createElement('thead');
    for (var _i7 = 0, _Object$keys7 = Object.keys(colAttrs || {}); _i7 < _Object$keys7.length; _i7++) {
      j = _Object$keys7[_i7];
      var c = colAttrs[j];
      tr = document.createElement('tr');
      if (parseInt(j) === 0 && rowAttrs.length !== 0) {
        th = document.createElement('th');
        th.setAttribute('colspan', rowAttrs.length);
        th.setAttribute('rowspan', colAttrs.length);
        tr.appendChild(th);
      }
      th = document.createElement('th');
      th.className = 'pvtAxisLabel';
      th.textContent = c;
      if (pivotData.grouping && j < colAttrs.length - 1) {
        th.onclick = getExpandAllHandler(pivotData, +j, false);
        th.className += " open level".concat(j);
      }
      tr.appendChild(th);
      for (var _i8 = 0, _Object$keys8 = Object.keys(colKeys || {}); _i8 < _Object$keys8.length; _i8++) {
        i = _Object$keys8[_i8];
        colKey = colKeys[i];
        x = spanSize(colKeys, parseInt(i), parseInt(j));
        if (x !== -1) {
          th = document.createElement('th');
          th.className = 'pvtColLabel';
          th.className += " col".concat(pivotData.colGroupBefore ? +i : +i + x - 1);
          th.textContent = colKey[j];
          th.setAttribute('colspan', x * Math.max(1, pivotData.aggregator.length));
          if (parseInt(j) === colAttrs.length - 1 && rowAttrs.length !== 0) {
            th.setAttribute('rowspan', 2);
          }
          if (pivotData.grouping && j < colAttrs.length - 1 && colKey[j]) {
            th.className += ' pvtSubtotal open';
            th.setAttribute('colspan', x * Math.max(1, pivotData.aggregator.length));
            th.onclick = colsExpandHandler;
          }
          tr.appendChild(th);
        }
      }
      if (parseInt(j) === 0 && opts.table.rowTotals) {
        th = document.createElement('th');
        th.className = 'pvtTotalLabel pvtRowTotalLabel';
        th.innerHTML = opts.localeStrings.totals;
        th.setAttribute('colspan', Math.max(1, pivotData.aggregator.length));
        th.setAttribute('rowspan', colAttrs.length + (rowAttrs.length === 0 ? 0 : 1));
        tr.appendChild(th);
      }
      thead.appendChild(tr);
    }

    //then a row for row header headers
    if (rowAttrs.length !== 0) {
      tr = document.createElement('tr');
      for (var _i9 = 0, _Object$keys9 = Object.keys(rowAttrs || {}); _i9 < _Object$keys9.length; _i9++) {
        i = _Object$keys9[_i9];
        var r = rowAttrs[i];
        th = document.createElement('th');
        th.className = 'pvtAxisLabel';
        th.textContent = r;
        if (pivotData.grouping && i < rowAttrs.length - 1) {
          th.className += " open level".concat(i);
          th.onclick = getExpandAllHandler(pivotData, +i, true);
        }
        tr.appendChild(th);
      }
      th = document.createElement('th');
      if (colAttrs.length === 0) {
        th.className = 'pvtTotalLabel pvtRowTotalLabel';
        th.innerHTML = opts.localeStrings.totals;
        th.setAttribute('colspan', pivotData.aggregator.length);
      }
      tr.appendChild(th);
      thead.appendChild(tr);
    }
    result.appendChild(thead);

    //now the actual data rows, with their row headers and totals
    var tbody = document.createElement('tbody');
    if (pivotData.aggregatorsLabel && pivotData.aggregatorsLabel.length > 1) {
      var lbl;
      tr = document.createElement('tr');
      th = document.createElement('th');
      var colspan = rowAttrs.length + (colAttrs.length === 0 ? 0 : 1);
      th.setAttribute('colspan', colspan);
      tr.appendChild(th);
      for (var _i10 = 0, _Object$keys10 = Object.keys(colKeys || {}); _i10 < _Object$keys10.length; _i10++) {
        j = _Object$keys10[_i10];
        //this is a tight loop
        colKey = colKeys[j];
        var _iterator5 = _createForOfIteratorHelper(pivotData.aggregatorsLabel),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            lbl = _step5.value;
            th = document.createElement('th');
            th.className = "pvtAggregatorLabel col".concat(j);
            th.textContent = lbl;
            tr.appendChild(th);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      var _iterator6 = _createForOfIteratorHelper(pivotData.aggregatorsLabel),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          lbl = _step6.value;
          th = document.createElement('th');
          th.className = 'pvtAggregatorLabel';
          th.textContent = lbl;
          tr.appendChild(th);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      tbody.appendChild(tr);
    }
    for (var _i11 = 0, _Object$keys11 = Object.keys(rowKeys || {}); _i11 < _Object$keys11.length; _i11++) {
      i = _Object$keys11[_i11];
      var rowKey = rowKeys[i];
      tr = document.createElement('tr');
      var rowGap = rowAttrs.length - rowKey.length;
      tr.className = rowGap ? "pvtSubtotal level".concat(rowKey.length) : 'pvtData';
      for (var _i12 = 0, _Object$keys12 = Object.keys(rowKey || {}); _i12 < _Object$keys12.length; _i12++) {
        j = _Object$keys12[_i12];
        var txt = rowKey[j];
        if (compactLayout && j < rowKey.length - 1) {
          continue;
        }
        x = compactLayout ? 1 : spanSize(rowKeys, parseInt(i), parseInt(j));
        if (x !== -1) {
          th = document.createElement('th');
          th.className = 'pvtRowLabel';
          th.className += " row".concat(pivotData.rowGroupBefore ? +i : +i + x - 1);
          th.textContent = txt;
          th.setAttribute('rowspan', x);
          if (compactLayout) {
            th.colSpan = rowAttrs.length;
            th.style.paddingLeft = 5 + parseInt(j) * 20 + 'px';
          }
          if (pivotData.grouping && j < rowAttrs.length - 1) {
            th.className += ' open';
            th.onclick = rowsExpandHandler;
          }
          tr.appendChild(th);
        }
      }
      if (!compactLayout && rowGap) {
        th = document.createElement('th');
        th.colSpan = rowGap;
        th.textContent = "Total (".concat(rowKey[j], ")");
        tr.appendChild(th);
      }
      if (colAttrs.length) {
        th.colSpan++;
      }
      for (var _i13 = 0, _Object$keys13 = Object.keys(colKeys || {}); _i13 < _Object$keys13.length; _i13++) {
        j = _Object$keys13[_i13];
        //this is a tight loop
        colKey = colKeys[j];
        for (id = 0; id < pivotData.aggregator.length; id++) {
          agg = pivotData.aggregator[id];
          aggregator = pivotData.getAggregator(rowKey, colKey, id);
          val = aggregator.value(id);
          td = document.createElement('td');
          if (!rowGap) {
            td.className = 'pvtVal ';
          }
          td.className += "row".concat(i, " col").concat(j);
          if (colAttrs.length - colKey.length) {
            td.className = "pvtSubtotal level".concat(colKey.length, " row").concat(i, " col").concat(j);
          }
          td.textContent = aggregator.format(val);
          td.setAttribute('data-value', val);
          if (getClickHandler != null) {
            td.onclick = getClickHandler(val, rowKey, colKey);
          }
          tr.appendChild(td);
        }
      }
      if (opts.table.rowTotals || colAttrs.length === 0) {
        for (id = 0; id < pivotData.aggregator.length; id++) {
          agg = pivotData.aggregator[id];
          totalAggregator = pivotData.getAggregator(rowKey, [], id);
          val = totalAggregator.value(id);
          td = document.createElement('td');
          td.className = 'pvtTotal rowTotal';
          td.textContent = totalAggregator.format(val);
          td.setAttribute('data-value', val);
          if (getClickHandler != null) {
            td.onclick = getClickHandler(val, rowKey, []);
          }
          td.setAttribute('data-for', 'row' + i);
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    }

    //finally, the row for col totals, and a grand total
    if (opts.table.colTotals || rowAttrs.length === 0) {
      tr = document.createElement('tr');
      if (opts.table.colTotals || rowAttrs.length === 0) {
        th = document.createElement('th');
        th.className = 'pvtTotalLabel pvtColTotalLabel';
        th.innerHTML = opts.localeStrings.totals;
        th.setAttribute('colspan', rowAttrs.length + (colAttrs.length === 0 ? 0 : 1));
        tr.appendChild(th);
      }
      for (var _i14 = 0, _Object$keys14 = Object.keys(colKeys || {}); _i14 < _Object$keys14.length; _i14++) {
        j = _Object$keys14[_i14];
        colKey = colKeys[j];
        for (id = 0; id < pivotData.aggregator.length; id++) {
          agg = pivotData.aggregator[id];
          totalAggregator = pivotData.getAggregator([], colKey, id);
          val = totalAggregator.value(id);
          td = document.createElement('td');
          td.className = "pvtTotal colTotal col".concat(j);
          if (colKey.length !== colAttrs.length) {
            td.className += " pvtSubtotal level".concat(colKey.length);
          }
          td.textContent = totalAggregator.format(val);
          td.setAttribute('data-value', val);
          if (getClickHandler != null) {
            td.onclick = getClickHandler(val, [], colKey);
          }
          td.setAttribute('data-for', 'col' + j);
          tr.appendChild(td);
        }
      }
      if (opts.table.rowTotals || colAttrs.length === 0) {
        for (id = 0; id < pivotData.aggregator.length; id++) {
          agg = pivotData.aggregator[id];
          totalAggregator = pivotData.getAggregator([], [], id);
          val = totalAggregator.value(id);
          td = document.createElement('td');
          td.className = 'pvtGrandTotal';
          td.textContent = totalAggregator.format(val);
          td.setAttribute('data-value', val);
          if (getClickHandler != null) {
            td.onclick = getClickHandler(val, [], []);
          }
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    }
    result.appendChild(tbody);

    //squirrel this away for later
    result.setAttribute('data-numrows', rowKeys.length);
    result.setAttribute('data-numcols', colKeys.length);
    return result;
  }

  /*
  Pivot Table core: create PivotData object and call Renderer on it
  */

  $.fn.pivot = function (input, inputOpts, locale) {
    var e;
    if (locale == null) {
      locale = 'en';
    }
    if (locales[locale] == null) {
      locale = 'en';
    }
    inputOpts = inputOpts || {};
    var defaults = {
      cols: [],
      rows: [],
      vals: [],
      rowOrder: 'key_a_to_z',
      colOrder: 'key_a_to_z',
      dataClass: PivotData,
      filter: function filter() {
        return true;
      },
      aggregator: aggregatorTemplates.count()(),
      aggregatorName: 'Count',
      sorters: {},
      derivedAttributes: {},
      renderer: pivotTableRenderer
    };
    var localeStrings = $.extend(true, {}, locales.en.localeStrings, locales[locale].localeStrings);
    var localeDefaults = {
      rendererOptions: {
        localeStrings: localeStrings
      },
      localeStrings: localeStrings
    };
    var opts = $.extend(true, {}, localeDefaults, $.extend({}, defaults, inputOpts));
    var result;
    inputOpts.pivotData = null;
    try {
      var pivotData = new opts.dataClass(input, opts);
      try {
        result = opts.renderer(pivotData, opts.rendererOptions);
        inputOpts.pivotData = pivotData;
      } catch (error) {
        e = error;
        if (typeof console !== 'undefined' && console !== null) {
          console.error(e.stack);
        }
        result = $('<span>').html(opts.localeStrings.renderError);
      }
    } catch (error1) {
      e = error1;
      if (typeof console !== 'undefined' && console !== null) {
        console.error(e.stack);
      }
      result = $('<span>').html(opts.localeStrings.computeError);
    }
    var x = this[0];
    while (x.hasChildNodes()) {
      x.removeChild(x.lastChild);
    }
    return this.append(result);
  };

  /*
  Pivot Table UI: calls the Pivot Table core above with options set by user
  */

  $.fn.pivotUI = function (input, inputOpts, overwrite, locale) {
    var _this5 = this;
    var opts;
    var a, c;
    if (overwrite == null) {
      overwrite = false;
    }
    if (locale == null) {
      locale = 'fr';
    }
    if (locales[locale] == null) {
      locale = 'en';
    }
    var defaults = {
      derivedAttributes: {},
      aggregators: defaultAggregators,
      renderers: locales[locale].renderers,
      hiddenAttributes: [],
      hiddenFromAggregators: [],
      hiddenFromDragDrop: [],
      menuLimit: 500,
      cols: [],
      rows: [],
      vals: [],
      rowOrder: 'key_a_to_z',
      colOrder: 'key_a_to_z',
      dataClass: PivotData,
      exclusions: {},
      inclusions: {},
      unusedAttrsVertical: 85,
      autoSortUnusedAttrs: false,
      onRefresh: null,
      showUI: true,
      filter: function filter() {
        return true;
      },
      sorters: {},
      multiple: true,
      parametersActive: false
    };
    var itemsId = 0;
    var aggregators = [];
    var localeStrings = $.extend(true, {}, locales.en.localeStrings, locales[locale].localeStrings);
    var localeDefaults = {
      rendererOptions: {
        localeStrings: localeStrings
      },
      localeStrings: localeStrings
    };
    var existingOpts = this.data('pivotUIOptions');
    if (existingOpts == null || overwrite) {
      opts = $.extend(true, {}, localeDefaults, $.extend({}, defaults, inputOpts));
    } else {
      opts = existingOpts;
    }
    if (!(inputOpts !== null && inputOpts !== void 0 && inputOpts.aggregators) && locales[locale].formatters) {
      opts.aggregators = makeAggregators(locales[locale].formatters.format, locales[locale].formatters.formatInt, locales[locale].formatters.formatPct);
    }
    try {
      // do a first pass on the data to cache a materialized copy of any
      // function-valued inputs and to compute dimension cardinalities
      var attr, i, unusedAttrsVerticalAutoCutoff, x;
      var attrValues = {};
      var materializedInput = [];
      var recordsProcessed = 0;
      PivotData.forEachRecord(input, opts.derivedAttributes, function (record) {
        var attr;
        if (!opts.filter(record)) {
          return;
        }
        materializedInput.push(record);
        for (var _i15 = 0, _Object$keys15 = Object.keys(record || {}); _i15 < _Object$keys15.length; _i15++) {
          attr = _Object$keys15[_i15];
          if (attrValues[attr] == null) {
            attrValues[attr] = {};
            if (recordsProcessed > 0) {
              attrValues[attr]['null'] = recordsProcessed;
            }
          }
        }
        for (attr in attrValues) {
          var value = record[attr] != null ? record[attr] : 'null';
          if (attrValues[attr][value] == null) {
            attrValues[attr][value] = 0;
          }
          attrValues[attr][value]++;
        }
        return recordsProcessed++;
      });
      var uiContainer = $('<div>').addClass('pvtUi');
      var uiMenu = $('<div>').addClass('pvtUiMenu');
      var uiParameters = $('<div>').addClass('pvtUiParameters');
      var uiPivotContainer = $('<div>').addClass('pvtUiContainer');
      var uiButtonColumns = $('<div>').addClass('pvtUiVerticalButton').addClass('pvtUiButtonColumns').addClass('active').text(localeStrings.colsLabel).on('click', function () {
        opts.parametersActive = !opts.parametersActive;
        if (opts.parametersActive) {
          uiButtonColumns.addClass('active');
          return uiParameters.show();
        } else {
          uiButtonColumns.removeClass('active');
          return uiParameters.hide();
        }
      }).appendTo(uiMenu);
      var uiButtonGroups = $('<div>').addClass('pvtUiVerticalButton').addClass('pvtUiButtonGroups').text(localeStrings.groupsLabel).on('click', function () {
        if (opts.grouping) {
          uiButtonGroups.removeClass('active');
          opts.grouping = false;
        } else {
          uiButtonGroups.addClass('active');
          opts.grouping = {
            colGroupBefore: false
          };
        }
        return refresh();
      }).appendTo(uiMenu);
      uiContainer.append(uiMenu).append(uiParameters).append(uiPivotContainer);

      //# Render type
      $('<div>').addClass('pvtParameterLabel').appendTo(uiParameters).text(localeStrings.rendererLabel);
      var pvtRenderType = $('<div>').addClass('pvtRendererType').addClass('pvtParameter').appendTo(uiParameters);
      var renderer = $('<select>').addClass('pvtRenderer').appendTo(pvtRenderType).bind('change', function () {
        return refresh();
      }); //capture reference
      for (var _i16 = 0, _Object$keys16 = Object.keys(opts.renderers || {}); _i16 < _Object$keys16.length; _i16++) {
        x = _Object$keys16[_i16];
        $('<option>').val(x).html(x).appendTo(renderer);
      }

      //axis list, including the double click menu
      var unused = $('<div>').addClass('pvtAxisContainer pvtUnused');
      var shownAttributes = [];
      for (a in attrValues) {
        if (!opts.hiddenAttributes.includes(a)) {
          shownAttributes.push(a);
        }
      }
      var shownInAggregators = [];
      for (var _i17 = 0, _shownAttributes = shownAttributes; _i17 < _shownAttributes.length; _i17++) {
        c = _shownAttributes[_i17];
        if (!opts.hiddenFromAggregators.includes(c)) {
          shownInAggregators.push(c);
        }
      }
      var shownInDragDrop = [];
      for (var _i18 = 0, _shownAttributes2 = shownAttributes; _i18 < _shownAttributes2.length; _i18++) {
        c = _shownAttributes2[_i18];
        if (!opts.hiddenFromDragDrop.includes(c)) {
          shownInDragDrop.push(c);
        }
      }
      var unusedAttrsVerticalAutoOverride = false;
      if (opts.unusedAttrsVertical === 'auto') {
        unusedAttrsVerticalAutoCutoff = 120; // legacy support
      } else {
        unusedAttrsVerticalAutoCutoff = parseInt(opts.unusedAttrsVertical);
      }
      if (!isNaN(unusedAttrsVerticalAutoCutoff)) {
        var attrLength = 0;
        var _iterator7 = _createForOfIteratorHelper(shownInDragDrop),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            a = _step7.value;
            attrLength += a.length;
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        unusedAttrsVerticalAutoOverride = attrLength > unusedAttrsVerticalAutoCutoff;
      }
      var _loop3 = function _loop3() {
        i = _Object$keys17[_i19];
        attr = shownInDragDrop[i];
        var values = [];
        for (var v in attrValues[attr]) {
          values.push(v);
        }
        var hasExcludedItem = false;
        var valueList = $('<div>').addClass('pvtFilterBox').hide();
        valueList.append($('<h4>').append($('<span>').text(attr), $('<span>').addClass('count').text("(".concat(values.length, ")"))));
        if (values.length > opts.menuLimit) {
          valueList.append($('<p>').html(opts.localeStrings.tooMany));
        } else {
          if (values.length > 5) {
            var controls = $('<p>').appendTo(valueList);
            var sorter = getSort(opts.sorters, attr);
            var placeholder = opts.localeStrings.filterResults;
            $('<input>', {
              type: 'text'
            }).appendTo(controls).attr({
              placeholder: placeholder,
              class: 'pvtSearch'
            }).bind('keyup', function () {
              var filter = $(this).val().toLowerCase().trim();
              var accept_gen = function accept_gen(prefix, accepted) {
                return function (v) {
                  var real_filter = filter.substring(prefix.length).trim();
                  if (real_filter.length === 0) {
                    return true;
                  }
                  var needle = Math.sign(sorter(v.toLowerCase(), real_filter));
                  return accepted.includes(needle);
                };
              };
              var accept = filter.indexOf('>=') === 0 ? accept_gen('>=', [1, 0]) : filter.indexOf('<=') === 0 ? accept_gen('<=', [-1, 0]) : filter.indexOf('>') === 0 ? accept_gen('>', [1]) : filter.indexOf('<') === 0 ? accept_gen('<', [-1]) : filter.indexOf('~') === 0 ? function (v) {
                if (filter.substring(1).trim().length === 0) {
                  return true;
                }
                return v.toLowerCase().match(filter.substring(1));
              } : function (v) {
                return v.toLowerCase().indexOf(filter) !== -1;
              };
              return valueList.find('.pvtCheckContainer p label span.value').each(function () {
                if (accept($(this).text())) {
                  return $(this).parent().parent().show();
                } else {
                  return $(this).parent().parent().hide();
                }
              });
            });
            controls.append($('<br>'));
            $('<button>', {
              type: 'button'
            }).appendTo(controls).html(opts.localeStrings.selectAll).bind('click', function () {
              valueList.find('input:visible:not(:checked)').prop('checked', true).toggleClass('changed');
              return false;
            });
            $('<button>', {
              type: 'button'
            }).appendTo(controls).html(opts.localeStrings.selectNone).bind('click', function () {
              valueList.find('input:visible:checked').prop('checked', false).toggleClass('changed');
              return false;
            });
          }
          var checkContainer = $('<div>').addClass('pvtCheckContainer').appendTo(valueList);
          var _iterator8 = _createForOfIteratorHelper(values.sort(getSort(opts.sorters, attr))),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var value = _step8.value;
              var valueCount = attrValues[attr][value];
              var filterItem = $('<label>');
              var filterItemExcluded = false;
              if (opts.inclusions[attr]) {
                filterItemExcluded = !opts.inclusions[attr].includes(value);
              } else if (opts.exclusions[attr]) {
                filterItemExcluded = opts.exclusions[attr].includes(value);
              }
              if (!hasExcludedItem) {
                hasExcludedItem = filterItemExcluded;
              }
              $('<input>').attr('type', 'checkbox').addClass('pvtFilter').attr('checked', !filterItemExcluded).data('filter', [attr, value]).appendTo(filterItem).bind('change', function () {
                return $(this).toggleClass('changed');
              });
              filterItem.append($('<span>').addClass('value').text(value));
              filterItem.append($('<span>').addClass('count').text('(' + valueCount + ')'));
              checkContainer.append($('<p>').append(filterItem));
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
        var closeFilterBox = function closeFilterBox() {
          if (valueList.find('[type=\'checkbox\']').length > valueList.find('[type=\'checkbox\']:checked').length) {
            attrElem.addClass('pvtFilteredAttribute');
          } else {
            attrElem.removeClass('pvtFilteredAttribute');
          }
          valueList.find('.pvtSearch').val('');
          valueList.find('.pvtCheckContainer p').show();
          return valueList.hide();
        };
        var finalButtons = $('<p>').appendTo(valueList);
        if (values.length <= opts.menuLimit) {
          $('<button>', {
            type: 'button'
          }).text(opts.localeStrings.apply).appendTo(finalButtons).bind('click', function () {
            if (valueList.find('.changed').removeClass('changed').length) {
              refresh();
            }
            return closeFilterBox();
          });
        }
        $('<button>', {
          type: 'button'
        }).text(opts.localeStrings.cancel).appendTo(finalButtons).bind('click', function () {
          valueList.find('.changed:checked').removeClass('changed').prop('checked', false);
          valueList.find('.changed:not(:checked)').removeClass('changed').prop('checked', true);
          return closeFilterBox();
        });
        var triangleLink = $('<span>').addClass('pvtTriangle').html(' &#x25BE;').bind('click', function (e) {
          var _$$position = $(e.currentTarget).position(),
            left = _$$position.left,
            top = _$$position.top;
          return valueList.css({
            left: left + 10,
            top: top + 10
          }).show();
        });
        var attrElem = $('<li>').addClass("axis_".concat(i)).append($('<span>').addClass('pvtAttr').text(attr).data('attrName', attr).append(triangleLink));
        if (hasExcludedItem) {
          attrElem.addClass('pvtFilteredAttribute');
        }
        unused.append(attrElem).append(valueList);
      };
      for (var _i19 = 0, _Object$keys17 = Object.keys(shownInDragDrop || {}); _i19 < _Object$keys17.length; _i19++) {
        _loop3();
      }
      $('<div>').addClass('pvtParameterLabel').appendTo(uiParameters).text(localeStrings.valuesLabel);

      //aggregator menu and value area
      var divAggregator = $('<div>').addClass('pvtAggregatorChoose').addClass('pvtParameter').appendTo(uiParameters);
      var aggregator = $('<select>').addClass('pvtAggregator').appendTo(divAggregator).bind('change', function () {
        if (!opts.multiple) {
          _this5.find('.pvtVals .pvtAttrDropdown').each(function () {
            return this.remove();
          });
          aggregators = [{
            id: 1,
            value: aggregator.val()
          }];
          return refresh();
        }
      }); //capture reference

      for (var _i20 = 0, _Object$keys18 = Object.keys(opts.aggregators || {}); _i20 < _Object$keys18.length; _i20++) {
        x = _Object$keys18[_i20];
        aggregator.append($('<option>').val(x).html(locales[locale].localeStrings[x] || locales['en'].localeStrings[x] || x));
      }
      if (opts.multiple) {
        $('<a>', {
          role: 'button'
        }).addClass('pvtAddAggregator').addClass('pvtToolButton').appendTo(divAggregator).html('+').bind('click', function () {
          aggregators.push({
            id: ++itemsId,
            value: aggregator.val()
          });
          renameAggregators(aggregators);
          return refresh();
        });
      }
      var ordering = {
        key_a_to_z: {
          rowSymbol: '&varr;',
          colSymbol: '&harr;',
          next: 'value_a_to_z'
        },
        value_a_to_z: {
          rowSymbol: '&darr;',
          colSymbol: '&rarr;',
          next: 'value_z_to_a'
        },
        value_z_to_a: {
          rowSymbol: '&uarr;',
          colSymbol: '&larr;',
          next: 'key_a_to_z'
        }
      };
      var rowOrderArrow = $('<a>', {
        role: 'button'
      }).addClass('pvtRowOrder').addClass('pvtToolButton').appendTo(divAggregator).data('order', opts.rowOrder).html(ordering[opts.rowOrder].rowSymbol).bind('click', function () {
        $(this).data('order', ordering[$(this).data('order')].next);
        $(this).html(ordering[$(this).data('order')].rowSymbol);
        return refresh();
      });
      var colOrderArrow = $('<a>', {
        role: 'button'
      }).addClass('pvtColOrder').addClass('pvtToolButton').appendTo(divAggregator).data('order', opts.colOrder).html(ordering[opts.colOrder].colSymbol).bind('click', function () {
        $(this).data('order', ordering[$(this).data('order')].next);
        $(this).html(ordering[$(this).data('order')].colSymbol);
        return refresh();
      });
      var pvVals = $('<div>').addClass('pvtVals').addClass('pvtParameter').appendTo(uiParameters);
      uiParameters.append(pvVals);

      // Available fields
      $('<div>').addClass('pvtParameterLabel').appendTo(uiParameters).text(localeStrings.fieldsLabel);
      uiParameters.append(unused);

      //column axes
      $('<div>').addClass('pvtParameterLabel').appendTo(uiParameters).text(localeStrings.colsLabel);
      $('<div>').addClass('pvtAxisContainer pvtCols').appendTo(uiParameters);

      //row axes
      $('<div>').addClass('pvtParameterLabel').appendTo(uiParameters).text(localeStrings.rowsLabel);
      $('<div>').addClass('pvtAxisContainer pvtRows').appendTo(uiParameters);

      //the actual pivot table container
      var pivotTable = $('<div>').addClass('pvtRendererArea').appendTo(uiPivotContainer);

      //render the UI in its default state
      this.html(uiContainer);
      if (!opts.parametersActive) {
        uiButtonColumns.removeClass('active');
        uiParameters.hide();
      }

      //set up the UI initial state as requested by moving elements around

      var initialRender = true;

      //set up for refreshing
      var refreshDelayed = function refreshDelayed() {
        var vals;
        var subopts = {
          derivedAttributes: opts.derivedAttributes,
          localeStrings: opts.localeStrings,
          rendererOptions: opts.rendererOptions,
          sorters: opts.sorters,
          cols: [],
          rows: [],
          dataClass: opts.dataClass,
          grouping: opts.grouping
        };
        _this5.find('.pvtRows li span.pvtAttr').each(function () {
          return subopts.rows.push($(this).data('attrName'));
        });
        _this5.find('.pvtCols li span.pvtAttr').each(function () {
          return subopts.cols.push($(this).data('attrName'));
        });
        var numInputsToProcess = 0;
        var aggVals = [];
        var j = 0,
          idx = j;
        var _loop4 = function _loop4() {
          var aggregatorType;
          var agg = aggregators[idx];
          if (_typeof(agg) === 'object') {
            aggregatorType = agg.value;
          }
          var aggIdx = agg.id;
          var initialVals = agg.vals;
          var left = opts.aggregators[aggregatorType]([])().numInputs;
          if (left != null) {
            numInputsToProcess = left;
          } else {
            numInputsToProcess = 0;
          }
          vals = [];
          _this5.find('.pvtVals select.pvtAttrDropdown' + aggIdx).each(function () {
            if (numInputsToProcess !== 0) {
              numInputsToProcess--;
              if ($(this).val() !== '') {
                return vals.push($(this).val());
              }
            }
          });
          var pvtVals = _this5.find('.pvtVals');
          var container = _this5.find('.pvtVals .pvtAttrDropdownContainer' + aggIdx);
          var found = container.length > 0;
          if (opts.multiple) {
            var labelAggregator;
            if (!found) {
              container = $('<div>').addClass('pvtAttrDropdownContainer').addClass('pvtAttrDropdownContainer' + aggIdx).appendTo(pvtVals);
              labelAggregator = locales[locale].localeStrings[aggregatorType] || locales['en'].localeStrings[aggregatorType] || aggregatorType;
              $('<label>').addClass('pvtAttrDropdown').addClass('pvtAttrDropdown' + aggIdx).appendTo(container).html('<b>' + agg.displayName + '</b>) ' + labelAggregator);
              initialRender = true;
            }
            if (!initialRender) {
              _this5.find('.pvtVals .pvtAttrDropdownContainer' + aggIdx + ' label.pvtAttrDropdown').each(function () {
                labelAggregator = locales[locale].localeStrings[aggregatorType] || locales['en'].localeStrings[aggregatorType] || aggregatorType;
                return $(this).html('<b>' + agg.displayName + '</b>) ' + labelAggregator);
              });
            }
          } else {
            container = pvtVals;
          }
          if (numInputsToProcess !== 0) {
            var asc, end;
            for (x = 0, end = numInputsToProcess, asc = 0 <= end; asc ? x < end : x > end; asc ? x++ : x--) {
              var newDropdown = $('<select>').addClass('pvtAttrDropdown' + aggIdx).addClass('pvtAttrDropdown').append($('<option>')).bind('change', function () {
                return refresh();
              });
              for (var _i21 = 0, _shownInAggregators = shownInAggregators; _i21 < _shownInAggregators.length; _i21++) {
                attr = _shownInAggregators[_i21];
                newDropdown.append($('<option>').val(attr).text(attr));
              }
              container.append(newDropdown);
            }
          }
          if (opts.multiple && !found) {
            $('<a>').html('x').addClass('pvtRemoveAggregator').addClass('pvtToolButton').addClass('pvtAttrDropdown' + aggIdx).appendTo(container).bind('click', function () {
              var _this6 = this;
              this.instance.find('.pvtVals .pvtAttrDropdownContainer' + this.aggIdx).remove();
              idx = aggregators.findIndex(function (agg) {
                return agg.id === _this6.aggIdx;
              });
              aggregators.splice(idx, 1);
              renameAggregators(aggregators);
              return refresh();
            }.bind({
              instance: _this5,
              aggIdx: aggIdx
            }));
          }
          if (initialRender) {
            vals = initialVals != null ? initialVals : opts.vals;
            i = 0;
            _this5.find('.pvtVals select.pvtAttrDropdown' + aggIdx).each(function () {
              $(this).val(vals[i]);
              return i++;
            });
            initialRender = false;
          }
          aggVals.push(vals);
        };
        for (; j < aggregators.length; j++, idx = j) {
          _loop4();
        }
        subopts.aggregatorName = aggregators.map(function (agg) {
          return agg.value;
        });
        subopts.vals = aggVals;
        subopts.aggregator = aggregators.map(function (agg, i) {
          return opts.aggregators[agg.value](aggVals[i]);
        });
        subopts.renderer = opts.renderers[renderer.val()];
        subopts.rowOrder = rowOrderArrow.data('order');
        subopts.colOrder = colOrderArrow.data('order');
        if (opts.multiple) {
          subopts.aggregatorsLabel = aggregators.map(function (agg) {
            return agg.displayName;
          });
        }

        //construct filter here
        var exclusions = {};
        _this5.find('input.pvtFilter').not(':checked').each(function () {
          var filter = $(this).data('filter');
          if (exclusions[filter[0]] != null) {
            return exclusions[filter[0]].push(filter[1]);
          } else {
            return exclusions[filter[0]] = [filter[1]];
          }
        });
        //include inclusions when exclusions present
        var inclusions = {};
        _this5.find('input.pvtFilter:checked').each(function () {
          var filter = $(this).data('filter');
          if (exclusions[filter[0]] != null) {
            if (inclusions[filter[0]] != null) {
              return inclusions[filter[0]].push(filter[1]);
            } else {
              return inclusions[filter[0]] = [filter[1]];
            }
          }
        });
        subopts.filter = function (record) {
          if (!opts.filter(record)) {
            return false;
          }
          for (var k in exclusions) {
            var excludedItems = exclusions[k];
            if (excludedItems.includes('' + (record[k] != null ? record[k] : 'null'))) {
              return false;
            }
          }
          return true;
        };
        pivotTable.pivot(materializedInput, subopts);
        var pivotUIOptions = $.extend({}, opts, {
          cols: subopts.cols,
          rows: subopts.rows,
          colOrder: subopts.colOrder,
          rowOrder: subopts.rowOrder,
          vals: aggVals,
          exclusions: exclusions,
          inclusions: inclusions,
          inclusionsInfo: inclusions,
          //duplicated for backwards-compatibility
          aggregatorName: aggregators.map(function (agg) {
            return agg.value;
          }),
          rendererName: renderer.val()
        });
        var currentPivotData = subopts.pivotData;
        delete subopts.pivotData;
        _this5.data('pivotUIOptions', pivotUIOptions);

        // if requested, make sure unused columns are in alphabetical order
        if (opts.autoSortUnusedAttrs) {
          var unusedAttrsContainer = _this5.find('td.pvtUnused.pvtAxisContainer');
          $(unusedAttrsContainer).children('li').sort(function (a, b) {
            return naturalSort($(a).text(), $(b).text());
          }).appendTo(unusedAttrsContainer);
        }
        pivotTable.css('opacity', 1);
        if (opts.onRefresh != null) {
          return opts.onRefresh(pivotUIOptions, currentPivotData);
        }
      };
      var refresh = function refresh() {
        pivotTable.css('opacity', 0.5);
        return setTimeout(refreshDelayed, 10);
      };
      var _iterator9 = _createForOfIteratorHelper(opts.cols),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          x = _step9.value;
          this.find('.pvtCols').append(this.find(".axis_".concat($.inArray(x, shownInDragDrop))));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      var _iterator10 = _createForOfIteratorHelper(opts.rows),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          x = _step10.value;
          this.find('.pvtRows').append(this.find(".axis_".concat($.inArray(x, shownInDragDrop))));
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      if (opts.aggregatorName != null) {
        if (opts.multiple) {
          opts.aggregatorName = Array.isArray(opts.aggregatorName) ? opts.aggregatorName : [opts.aggregatorName];
          for (var idx = 0; idx < opts.aggregatorName.length; idx++) {
            var _agg2 = opts.aggregatorName[idx];
            aggregators.push({
              id: ++itemsId,
              value: _agg2,
              vals: opts.vals != null ? opts.vals[idx] : undefined
            });
            renameAggregators(aggregators);
          }
        } else {
          this.find('.pvtVals').append(this.find('.pvtAttrDropdown'));
          this.find('.pvtAggregator').val(opts.aggregatorName).change();
        }
      } else {
        this.find('.pvtAggregator').change();
      }
      if (opts.rendererName != null) {
        this.find('.pvtRenderer').val(opts.rendererName);
      }
      if (!opts.showUI) {
        this.find('.pvtUiCell').hide();
      }

      //the very first refresh will actually display the table
      refresh();
      this.find('.pvtAxisContainer').sortable({
        update: function update(e, ui) {
          if (ui.sender == null) {
            return refresh();
          }
        },
        connectWith: this.find('.pvtAxisContainer'),
        items: 'li',
        placeholder: 'pvtPlaceholder'
      });
    } catch (error) {
      console.error(error);
      this.html(opts.localeStrings.uiRenderError);
    }
    return this;
  };

  /*
  Heatmap post-processing
  */

  $.fn.heatmap = function (scope, opts) {
    var _opts$heatmap,
      _this7 = this;
    if (scope == null) {
      scope = 'heatmap';
    }
    var numRows = this.data('numrows');
    var numCols = this.data('numcols');

    // given a series of values
    // must return a function to map a given value to a CSS color
    var colorScaleGenerator = opts === null || opts === void 0 || (_opts$heatmap = opts.heatmap) === null || _opts$heatmap === void 0 ? void 0 : _opts$heatmap.colorScaleGenerator;
    if (colorScaleGenerator == null) {
      colorScaleGenerator = function colorScaleGenerator(values) {
        var min = Math.min.apply(Math, _toConsumableArray(values || []));
        var max = Math.max.apply(Math, _toConsumableArray(values || []));
        return function (x) {
          var nonRed = 255 - Math.round(255 * (x - min) / (max - min));
          return "rgb(255,".concat(nonRed, ",").concat(nonRed, ")");
        };
      };
    }
    var heatmapper = function heatmapper(scope) {
      var forEachCell = function forEachCell(f) {
        return _this7.find(scope).each(function () {
          var x = $(this).data('value');
          if (x != null && isFinite(x)) {
            return f(x, $(this));
          }
        });
      };
      var values = [];
      forEachCell(function (x) {
        return values.push(x);
      });
      var colorScale = colorScaleGenerator(values);
      return forEachCell(function (x, elem) {
        return elem.css('background-color', colorScale(x));
      });
    };
    switch (scope) {
      case 'heatmap':
        heatmapper('.pvtVal');
        break;
      case 'rowheatmap':
        for (var i = 0, end = numRows, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
          heatmapper(".pvtVal.row".concat(i));
        }
        break;
      case 'colheatmap':
        for (var j = 0, end1 = numCols, asc1 = 0 <= end1; asc1 ? j < end1 : j > end1; asc1 ? j++ : j--) {
          heatmapper(".pvtVal.col".concat(j));
        }
        break;
    }
    heatmapper('.pvtTotal.rowTotal');
    heatmapper('.pvtTotal.colTotal');
    return this;
  };

  /*
  Barchart post-processing
  */

  $.fn.barchart = function (opts) {
    var _this8 = this;
    var numRows = this.data('numrows');
    var numCols = this.data('numcols');
    var barcharter = function barcharter(scope) {
      var forEachCell = function forEachCell(f) {
        return _this8.find(scope).each(function () {
          var x = $(this).data('value');
          if (x != null && isFinite(x)) {
            return f(x, $(this));
          }
        });
      };
      var values = [];
      forEachCell(function (x) {
        return values.push(x);
      });
      var max = Math.max.apply(Math, _toConsumableArray(values || []));
      if (max < 0) {
        max = 0;
      }
      var range = max;
      var min = Math.min.apply(Math, _toConsumableArray(values || []));
      if (min < 0) {
        range = max - min;
      }
      var scaler = function scaler(x) {
        return 100 * x / (1.4 * range);
      };
      return forEachCell(function (x, elem) {
        var text = elem.text();
        var wrapper = $('<div>').css({
          'position': 'relative',
          'height': '55px'
        });
        var bgColor = 'gray';
        var bBase = 0;
        if (min < 0) {
          bBase = scaler(-min);
        }
        if (x < 0) {
          bBase += scaler(x);
          bgColor = 'darkred';
          x = -x;
        }
        wrapper.append($('<div>').css({
          'position': 'absolute',
          'bottom': bBase + '%',
          'left': 0,
          'right': 0,
          'height': scaler(x) + '%',
          'background-color': bgColor
        }));
        wrapper.append($('<div>').text(text).css({
          'position': 'relative',
          'padding-left': '5px',
          'padding-right': '5px'
        }));
        return elem.css({
          'padding': 0,
          'padding-top': '5px',
          'text-align': 'center'
        }).html(wrapper);
      });
    };
    for (var i = 0, end = numRows, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
      barcharter(".pvtVal.row".concat(i));
    }
    barcharter('.pvtTotal.colTotal');
    return this;
  };

  /*
  Grouping fold/expand rows and cols
  */

  var childIndex = function childIndex(el) {
    return Array.prototype.indexOf.call(el.parentNode.children, el);
  };
  var childKeysIndices = function childKeysIndices(keys, n) {
    var up = keys[0].length === 1 ? 1 : -1;
    var len = keys[n].length;
    var result = [];
    n = n + up;
    var key = keys[n];
    while (key && key.length > len) {
      if (key.length === len + 1) {
        result.push(n);
      } else {
        continue;
      }
      n = n + up;
      key = keys[n];
    }
    return result;
  };
  var parentKeysIndices = function parentKeysIndices(keys, n) {
    var up = keys[0].length === 1 ? 1 : -1;
    var result = [];
    var len = keys[n].length;
    while (len > 1) {
      var key = void 0;
      n = n - up;
      key = keys[n];
      while (key && key.length >= len) {
        n = n - up;
        key = keys[n];
      }
      result.push(n);
      len = keys[n].length;
    }
    return result;
  };
  var levelKeysIndices = function levelKeysIndices(keys, level) {
    return keys.filter(function (d) {
      return d.length === level;
    }).map(keys.indexOf.bind(keys));
  };
  var getAxis = function getAxis(table, rows, level) {
    if (rows) {
      return table.find("thead tr:last-child th.pvtAxisLabel:nth-of-type(".concat(level, ")"));
    } else {
      return table.find("thead tr:nth-child(".concat(level, ") th.pvtAxisLabel"));
    }
  };
  var getHeader = function getHeader(table, rows, n) {
    return table.find(rows ? "tbody tr th.row".concat(n) : "thead th.col".concat(n));
  };
  var rowGetter = function rowGetter(table) {
    var selecttion = table.find('tbody tr');
    return function (n) {
      return $(selecttion[n]);
    };
  };
  var colGetter = function colGetter(table) {
    var selecttion = table.find('tr');
    return function (n) {
      return selecttion.find(".col".concat(n));
    };
  };
  var showHide = function showHide(getter, keys, nth, offset, show) {
    var object = childKeysIndices(keys, nth);
    for (var i in object) {
      var n = object[i];
      var row = getter(n + offset);
      var fn = show ? $.fn.show : $.fn.hide;
      fn.call(row);
      if (!row.hasClass('collapsed')) {
        showHide(getter, keys, n, offset, show);
      }
    }
    return true;
  };
  var expandRowsGroupAfter = function expandRowsGroupAfter(cell, rows, keys, nth) {
    var table = $(cell).closest('table');
    var initIndex = childIndex(cell.parentNode);
    var getter = rowGetter(table);
    var row = getter(nth);
    var insertPoint = row.hasClass('collapsed') ? getter(cell._old) : row;
    if (!row.hasClass('collapsed')) {
      cell._old = childIndex(cell.parentNode);
    }
    insertPoint.prepend(cell);
    var object = parentKeysIndices(keys, nth);
    for (var i in object) {
      var p = object[i];
      var parent = getHeader(table, rows, p)[0];
      var parentIndex = childIndex(parent.parentNode);
      parent._old = parent._old != null ? parent._old : parentIndex;
      if (parent._old === initIndex && parent.rowSpan === 1) {
        parent._old -= initIndex - childIndex(cell.parentNode);
      }
      if (initIndex === parentIndex) {
        insertPoint.prepend(parent);
      }
    }
    return expandWithSpan(cell, rows, keys, nth);
  };
  var expandRowCol = function expandRowCol(cell, rows, keys, nth, parent) {
    var table = $(cell).closest('table');
    var getter = rows ? rowGetter(table) : colGetter(table);
    var span = rows ? 'rowSpan' : 'colSpan';
    var offset = rows && this.aggregator.length > 1 ? 1 : 0;
    if ((parent != null ? parent[span] : undefined) !== 1) {
      showHide(getter, keys, nth, offset, getter(nth + offset).hasClass('collapsed'));
    }
    getter(nth + offset).toggleClass('collapsed');
    return $(cell).toggleClass('open close');
  };
  var expandAll = function expandAll(pivotData, table, level, rows, expand) {
    var i;
    if (expand && level > 1) {
      getAxis(table, rows, level - 1).removeClass('close').addClass('open');
      expandAll(pivotData, table, level - 1, rows, expand);
    }
    var levels = (rows ? pivotData.rowAttrs : pivotData.colAttrs).length - 1;
    if (!expand && level < levels) {
      var asc, end, start;
      for (start = level + 1, i = start, end = levels, asc = start <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
        getAxis(table, rows, i).removeClass('open').addClass('close');
      }
    }
    var keys = rows ? pivotData.rowKeys : pivotData.colKeys;
    var object = levelKeysIndices(keys, level);
    for (i in object) {
      var n = object[i];
      var el = getHeader(table, rows, n);
      if (expand === el.hasClass('close')) {
        el.trigger('click');
      }
    }
    return null;
  };
  var getExpandHandler = function getExpandHandler(keys, rows, handler) {
    return function (ev) {
      var match = ev.target.className.match(rows ? /row(\d+)/ : /col(\d+)/);
      if (match) {
        return handler(ev.target, rows, keys, +match[1]);
      }
    };
  };
  return getExpandAllHandler = function getExpandAllHandler(pivotData, level, rows) {
    return function (ev) {
      expandAll(pivotData, $(ev.target).closest('table'), level + 1, rows, $(ev.target).hasClass('close'));
      return $(ev.target).toggleClass('open close');
    };
  };
})(jQuery);
//# sourceMappingURL=pivot.js.map
