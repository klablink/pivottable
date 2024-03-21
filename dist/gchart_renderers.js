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

callWithJQuery(function ($) {
  var makeGoogleChart = function makeGoogleChart(chartType, extraOptions) {
    return function (pivotData, opts) {
      var agg, dataArray, dataTable, hAxisTitle, title, vAxisTitle;
      var defaults = {
        localeStrings: {
          vs: "vs",
          by: "by"
        },
        gchart: {}
      };
      opts = $.extend(true, {}, defaults, opts);
      if (opts.gchart.width == null) {
        opts.gchart.width = window.innerWidth / 1.4;
      }
      if (opts.gchart.height == null) {
        opts.gchart.height = window.innerHeight / 1.4;
      }
      var rowKeys = pivotData.getRowKeys();
      if (rowKeys.length === 0) {
        rowKeys.push([]);
      }
      var colKeys = pivotData.getColKeys();
      if (colKeys.length === 0) {
        colKeys.push([]);
      }
      var fullAggName = pivotData.aggregatorName;
      if (pivotData.valAttrs.length) {
        fullAggName += "(".concat(pivotData.valAttrs.join(", "), ")");
      }
      var headers = Array.from(rowKeys).map(function (h) {
        return h.join("-");
      });
      headers.unshift("");
      var numCharsInHAxis = 0;
      if (chartType === "ScatterChart") {
        dataArray = [];
        for (var y in pivotData.tree) {
          var tree2 = pivotData.tree[y];
          for (var x in tree2) {
            agg = tree2[x];
            dataArray.push([parseFloat(x), parseFloat(y), fullAggName + ": \n" + agg.format(agg.value())]);
          }
        }
        dataTable = new google.visualization.DataTable();
        dataTable.addColumn('number', pivotData.colAttrs.join("-"));
        dataTable.addColumn('number', pivotData.rowAttrs.join("-"));
        dataTable.addColumn({
          type: "string",
          role: "tooltip"
        });
        dataTable.addRows(dataArray);
        hAxisTitle = pivotData.colAttrs.join("-");
        vAxisTitle = pivotData.rowAttrs.join("-");
        title = "";
      } else {
        dataArray = [headers];
        for (var _i = 0, _Array$from = Array.from(colKeys); _i < _Array$from.length; _i++) {
          var colKey = _Array$from[_i];
          var row = [colKey.join("-")];
          numCharsInHAxis += row[0].length;
          for (var _i2 = 0, _Array$from2 = Array.from(rowKeys); _i2 < _Array$from2.length; _i2++) {
            var rowKey = _Array$from2[_i2];
            agg = pivotData.getAggregator(rowKey, colKey);
            if (agg.value() != null) {
              var val = agg.value();
              if ($.isNumeric(val)) {
                if (val < 1) {
                  row.push(parseFloat(val.toPrecision(3)));
                } else {
                  row.push(parseFloat(val.toFixed(3)));
                }
              } else {
                row.push(val);
              }
            } else {
              row.push(null);
            }
          }
          dataArray.push(row);
        }
        dataTable = google.visualization.arrayToDataTable(dataArray);
        title = vAxisTitle = fullAggName;
        hAxisTitle = pivotData.colAttrs.join("-");
        if (hAxisTitle !== "") {
          title += " ".concat(opts.localeStrings.vs, " ").concat(hAxisTitle);
        }
        var groupByTitle = pivotData.rowAttrs.join("-");
        if (groupByTitle !== "") {
          title += " ".concat(opts.localeStrings.by, " ").concat(groupByTitle);
        }
      }
      var options = {
        title: title,
        hAxis: {
          title: hAxisTitle,
          slantedText: numCharsInHAxis > 50
        },
        vAxis: {
          title: vAxisTitle
        },
        tooltip: {
          textStyle: {
            fontName: 'Arial',
            fontSize: 12
          }
        }
      };
      if (chartType === "ColumnChart") {
        options.vAxis.minValue = 0;
      }
      if (chartType === "ScatterChart") {
        options.legend = {
          position: "none"
        };
        options.chartArea = {
          'width': '80%',
          'height': '80%'
        };
      } else if (dataArray[0].length === 2 && dataArray[0][1] === "") {
        options.legend = {
          position: "none"
        };
      }
      options = $.extend(true, {}, options, opts.gchart, extraOptions);
      var result = $("<div>").css({
        width: "100%",
        height: "100%"
      });
      var wrapper = new google.visualization.ChartWrapper({
        dataTable: dataTable,
        chartType: chartType,
        options: options
      });
      wrapper.draw(result[0]);
      result.bind("dblclick", function () {
        var editor = new google.visualization.ChartEditor();
        google.visualization.events.addListener(editor, 'ok', function () {
          return editor.getChartWrapper().draw(result[0]);
        });
        return editor.openDialog(wrapper);
      });
      return result;
    };
  };
  return $.pivotUtilities.gchart_renderers = {
    "Line Chart": makeGoogleChart("LineChart"),
    "Bar Chart": makeGoogleChart("ColumnChart"),
    "Stacked Bar Chart": makeGoogleChart("ColumnChart", {
      isStacked: true
    }),
    "Area Chart": makeGoogleChart("AreaChart", {
      isStacked: true
    }),
    "Scatter Chart": makeGoogleChart("ScatterChart")
  };
});
//# sourceMappingURL=gchart_renderers.js.map
