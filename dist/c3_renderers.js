"use strict";

// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

callWithJQuery(function ($, c3) {
  var makeC3Chart = function makeC3Chart(chartOpts) {
    if (chartOpts == null) {
      chartOpts = {};
    }
    return function (pivotData, opts) {
      var colKey, columns, groupByTitle, hAxisTitle, rowKey, scatterData, series, titleText, vAxisTitle, y;
      var c, x;
      var defaults = {
        localeStrings: {
          vs: "vs",
          by: "by"
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
        chartOpts.type = "line";
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
      var headers = Array.from(colKeys).map(function (h) {
        return h.join("-");
      });
      var rotationAngle = 0;
      var fullAggName = pivotData.aggregatorName;
      if (pivotData.valAttrs.length) {
        fullAggName += "(".concat(pivotData.valAttrs.join(", "), ")");
      }
      if (chartOpts.type === "scatter") {
        scatterData = {
          x: {},
          y: {},
          t: {}
        };
        var attrs = pivotData.rowAttrs.concat(pivotData.colAttrs);
        vAxisTitle = attrs[0] != null ? attrs[0] : "";
        hAxisTitle = attrs[1] != null ? attrs[1] : "";
        groupByTitle = attrs.slice(2).join("-");
        titleText = vAxisTitle;
        if (hAxisTitle !== "") {
          titleText += " ".concat(opts.localeStrings.vs, " ").concat(hAxisTitle);
        }
        if (groupByTitle !== "") {
          titleText += " ".concat(opts.localeStrings.by, " ").concat(groupByTitle);
        }
        for (var _i = 0, _Array$from = Array.from(rowKeys); _i < _Array$from.length; _i++) {
          rowKey = _Array$from[_i];
          for (var _i2 = 0, _Array$from2 = Array.from(colKeys); _i2 < _Array$from2.length; _i2++) {
            colKey = _Array$from2[_i2];
            var agg = pivotData.getAggregator(rowKey, colKey);
            if (agg.value() != null) {
              var vals = rowKey.concat(colKey);
              series = vals.slice(2).join("-");
              if (series === "") {
                series = "series";
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
        }
      } else {
        var numCharsInHAxis = 0;
        for (var _i3 = 0, _Array$from3 = Array.from(headers); _i3 < _Array$from3.length; _i3++) {
          x = _Array$from3[_i3];
          numCharsInHAxis += x.length;
        }
        if (numCharsInHAxis > 50) {
          rotationAngle = 45;
        }
        columns = [];
        for (var _i4 = 0, _Array$from4 = Array.from(rowKeys); _i4 < _Array$from4.length; _i4++) {
          rowKey = _Array$from4[_i4];
          var rowHeader = rowKey.join("-");
          var row = [rowHeader === "" ? fullAggName : rowHeader];
          for (var _i5 = 0, _Array$from5 = Array.from(colKeys); _i5 < _Array$from5.length; _i5++) {
            colKey = _Array$from5[_i5];
            var val = parseFloat(pivotData.getAggregator(rowKey, colKey).value());
            if (isFinite(val)) {
              row.push(val);
            } else {
              row.push(null);
            }
          }
          columns.push(row);
        }
        vAxisTitle = fullAggName;
        if (chartOpts.horizontal) {
          hAxisTitle = pivotData.rowAttrs.join("-");
          groupByTitle = pivotData.colAttrs.join("-");
        } else {
          hAxisTitle = pivotData.colAttrs.join("-");
          groupByTitle = pivotData.rowAttrs.join("-");
        }
        titleText = fullAggName;
        if (hAxisTitle !== "") {
          titleText += " ".concat(opts.localeStrings.vs, " ").concat(hAxisTitle);
        }
        if (groupByTitle !== "") {
          titleText += " ".concat(opts.localeStrings.by, " ").concat(groupByTitle);
        }
      }
      var title = $("<p>", {
        style: "text-align: center; font-weight: bold"
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
          pattern: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"]
        }
      };
      params = $.extend(true, {}, params, opts.c3);
      if (chartOpts.type === "scatter") {
        var xs = {};
        var numSeries = 0;
        var dataColumns = [];
        for (var s in scatterData.x) {
          numSeries += 1;
          xs[s] = s + "_x";
          dataColumns.push([s + "_x"].concat(scatterData.x[s]));
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
            return "";
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
          categories = function () {
            var result1 = [];
            for (var _i6 = 0, _Array$from6 = Array.from(columns); _i6 < _Array$from6.length; _i6++) {
              c = _Array$from6[_i6];
              result1.push(c.shift());
            }
            return result1;
          }();
          if (categories.length === 1 && categories[0] === fullAggName) {
            categories = [""];
          }
          params.axis.x.categories = categories;
          if (headers.length === 1 && headers[0] === "") {
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
          params.data.groups = [function () {
            var result2 = [];
            for (var _i7 = 0, _Array$from7 = Array.from(colKeys); _i7 < _Array$from7.length; _i7++) {
              x = _Array$from7[_i7];
              result2.push(x.join("-"));
            }
            return result2;
          }()];
        } else {
          params.data.groups = [function () {
            var result3 = [];
            for (var _i8 = 0, _Array$from8 = Array.from(rowKeys); _i8 < _Array$from8.length; _i8++) {
              x = _Array$from8[_i8];
              result3.push(x.join("-"));
            }
            return result3;
          }()];
        }
      }
      var renderArea = $("<div>", {
        style: "display:none;"
      }).appendTo($("body"));
      var result = $("<div>").appendTo(renderArea);
      params.bindto = result[0];
      c3.generate(params);
      result.detach();
      renderArea.remove();
      return $("<div>").append(title, result);
    };
  };
  return $.pivotUtilities.c3_renderers = {
    "Horizontal Bar Chart": makeC3Chart({
      type: "bar",
      horizontal: true
    }),
    "Horizontal Stacked Bar Chart": makeC3Chart({
      type: "bar",
      stacked: true,
      horizontal: true
    }),
    "Bar Chart": makeC3Chart({
      type: "bar"
    }),
    "Stacked Bar Chart": makeC3Chart({
      type: "bar",
      stacked: true
    }),
    "Line Chart": makeC3Chart(),
    "Area Chart": makeC3Chart({
      type: "area",
      stacked: true
    }),
    "Scatter Chart": makeC3Chart({
      type: "scatter"
    })
  };
});
//# sourceMappingURL=c3_renderers.js.map
