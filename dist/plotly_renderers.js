"use strict";

// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

callWithJQuery(function ($, Plotly) {
  var makePlotlyChart = function makePlotlyChart(traceOptions, layoutOptions, transpose) {
    if (traceOptions == null) {
      traceOptions = {};
    }
    if (layoutOptions == null) {
      layoutOptions = {};
    }
    if (transpose == null) {
      transpose = false;
    }
    return function (pivotData, opts) {
      var groupByTitle, hAxisTitle;
      var defaults = {
        localeStrings: {
          vs: "vs",
          by: "by"
        },
        plotly: {},
        plotlyConfig: {}
      };
      opts = $.extend(true, {}, defaults, opts);
      var rowKeys = pivotData.getRowKeys();
      var colKeys = pivotData.getColKeys();
      var traceKeys = transpose ? colKeys : rowKeys;
      if (traceKeys.length === 0) {
        traceKeys.push([]);
      }
      var datumKeys = transpose ? rowKeys : colKeys;
      if (datumKeys.length === 0) {
        datumKeys.push([]);
      }
      var fullAggName = pivotData.aggregatorName;
      if (pivotData.valAttrs.length) {
        fullAggName += "(".concat(pivotData.valAttrs.join(", "), ")");
      }
      var data = traceKeys.map(function (traceKey) {
        var values = [];
        var labels = [];
        for (var _i = 0, _Array$from = Array.from(datumKeys); _i < _Array$from.length; _i++) {
          var datumKey = _Array$from[_i];
          var val = parseFloat(pivotData.getAggregator(transpose ? datumKey : traceKey, transpose ? traceKey : datumKey).value());
          values.push(isFinite(val) ? val : null);
          labels.push(datumKey.join('-') || ' ');
        }
        var trace = {
          name: traceKey.join('-') || fullAggName
        };
        if (traceOptions.type === "pie") {
          trace.values = values;
          trace.labels = labels.length > 1 ? labels : [fullAggName];
        } else {
          trace.x = transpose ? values : labels;
          trace.y = transpose ? labels : values;
        }
        return $.extend(trace, traceOptions);
      });
      if (transpose) {
        hAxisTitle = pivotData.rowAttrs.join("-");
        groupByTitle = pivotData.colAttrs.join("-");
      } else {
        hAxisTitle = pivotData.colAttrs.join("-");
        groupByTitle = pivotData.rowAttrs.join("-");
      }
      var titleText = fullAggName;
      if (hAxisTitle !== "") {
        titleText += " ".concat(opts.localeStrings.vs, " ").concat(hAxisTitle);
      }
      if (groupByTitle !== "") {
        titleText += " ".concat(opts.localeStrings.by, " ").concat(groupByTitle);
      }
      var layout = {
        title: titleText,
        hovermode: 'closest',
        width: window.innerWidth / 1.4,
        height: window.innerHeight / 1.4 - 50
      };
      if (traceOptions.type === 'pie') {
        var columns = Math.ceil(Math.sqrt(data.length));
        var rows = Math.ceil(data.length / columns);
        layout.grid = {
          columns: columns,
          rows: rows
        };
        for (var i in data) {
          var d = data[i];
          d.domain = {
            row: Math.floor(i / columns),
            column: i - columns * Math.floor(i / columns)
          };
          if (data.length > 1) {
            d.title = d.name;
          }
        }
        if (data[0].labels.length === 1) {
          layout.showlegend = false;
        }
      } else {
        layout.xaxis = {
          title: transpose ? fullAggName : null,
          automargin: true
        };
        layout.yaxis = {
          title: transpose ? null : fullAggName,
          automargin: true
        };
      }
      var result = $("<div>").appendTo($("body"));
      Plotly.newPlot(result[0], data, $.extend(layout, layoutOptions, opts.plotly), opts.plotlyConfig);
      return result.detach();
    };
  };
  var makePlotlyScatterChart = function makePlotlyScatterChart() {
    return function (pivotData, opts) {
      var defaults = {
        localeStrings: {
          vs: "vs",
          by: "by"
        },
        plotly: {},
        plotlyConfig: {}
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
      var data = {
        x: [],
        y: [],
        text: [],
        type: 'scatter',
        mode: 'markers'
      };
      for (var _i2 = 0, _Array$from2 = Array.from(rowKeys); _i2 < _Array$from2.length; _i2++) {
        var rowKey = _Array$from2[_i2];
        for (var _i3 = 0, _Array$from3 = Array.from(colKeys); _i3 < _Array$from3.length; _i3++) {
          var colKey = _Array$from3[_i3];
          var v = pivotData.getAggregator(rowKey, colKey).value();
          if (v != null) {
            data.x.push(colKey.join('-'));
            data.y.push(rowKey.join('-'));
            data.text.push(v);
          }
        }
      }
      var layout = {
        title: pivotData.rowAttrs.join("-") + ' vs ' + pivotData.colAttrs.join("-"),
        hovermode: 'closest',
        xaxis: {
          title: pivotData.colAttrs.join('-'),
          automargin: true
        },
        yaxis: {
          title: pivotData.rowAttrs.join('-'),
          automargin: true
        },
        width: window.innerWidth / 1.5,
        height: window.innerHeight / 1.4 - 50
      };
      var renderArea = $("<div>", {
        style: "display:none;"
      }).appendTo($("body"));
      var result = $("<div>").appendTo(renderArea);
      Plotly.newPlot(result[0], [data], $.extend(layout, opts.plotly), opts.plotlyConfig);
      result.detach();
      renderArea.remove();
      return result;
    };
  };
  return $.pivotUtilities.plotly_renderers = {
    "Horizontal Bar Chart": makePlotlyChart({
      type: 'bar',
      orientation: 'h'
    }, {
      barmode: 'group'
    }, true),
    "Horizontal Stacked Bar Chart": makePlotlyChart({
      type: 'bar',
      orientation: 'h'
    }, {
      barmode: 'relative'
    }, true),
    "Bar Chart": makePlotlyChart({
      type: 'bar'
    }, {
      barmode: 'group'
    }),
    "Stacked Bar Chart": makePlotlyChart({
      type: 'bar'
    }, {
      barmode: 'relative'
    }),
    "Line Chart": makePlotlyChart(),
    "Area Chart": makePlotlyChart({
      stackgroup: 1
    }),
    "Scatter Chart": makePlotlyScatterChart(),
    'Multiple Pie Chart': makePlotlyChart({
      type: 'pie',
      scalegroup: 1,
      hoverinfo: 'label+value',
      textinfo: 'none'
    }, {}, true)
  };
});
//# sourceMappingURL=plotly_renderers.js.map
