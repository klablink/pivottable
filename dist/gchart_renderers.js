"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function ($) {
  var makeGoogleChart = function makeGoogleChart(chartType, extraOptions) {
    return function (pivotData, opts) {
      var agg, dataArray, dataTable, hAxisTitle, title, vAxisTitle;
      var defaults = {
        localeStrings: {
          vs: 'vs',
          by: 'by'
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
        fullAggName += "(".concat(pivotData.valAttrs.join(', '), ")");
      }
      var headers = rowKeys.map(function (h) {
        return h.join('-');
      });
      headers.unshift('');
      var numCharsInHAxis = 0;
      if (chartType === 'ScatterChart') {
        dataArray = [];
        for (var y in pivotData.tree) {
          var tree2 = pivotData.tree[y];
          for (var x in tree2) {
            agg = tree2[x];
            dataArray.push([parseFloat(x), parseFloat(y), fullAggName + ': \n' + agg.format(agg.value())]);
          }
        }
        dataTable = new google.visualization.DataTable();
        dataTable.addColumn('number', pivotData.colAttrs.join('-'));
        dataTable.addColumn('number', pivotData.rowAttrs.join('-'));
        dataTable.addColumn({
          type: 'string',
          role: 'tooltip'
        });
        dataTable.addRows(dataArray);
        hAxisTitle = pivotData.colAttrs.join('-');
        vAxisTitle = pivotData.rowAttrs.join('-');
        title = '';
      } else {
        dataArray = [headers];
        var _iterator = _createForOfIteratorHelper(colKeys),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var colKey = _step.value;
            var row = [colKey.join('-')];
            numCharsInHAxis += row[0].length;
            var _iterator2 = _createForOfIteratorHelper(rowKeys),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var rowKey = _step2.value;
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
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            dataArray.push(row);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        dataTable = google.visualization.arrayToDataTable(dataArray);
        title = vAxisTitle = fullAggName;
        hAxisTitle = pivotData.colAttrs.join('-');
        if (hAxisTitle !== '') {
          title += " ".concat(opts.localeStrings.vs, " ").concat(hAxisTitle);
        }
        var groupByTitle = pivotData.rowAttrs.join('-');
        if (groupByTitle !== '') {
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
      if (chartType === 'ColumnChart') {
        options.vAxis.minValue = 0;
      }
      if (chartType === 'ScatterChart') {
        options.legend = {
          position: 'none'
        };
        options.chartArea = {
          'width': '80%',
          'height': '80%'
        };
      } else if (dataArray[0].length === 2 && dataArray[0][1] === '') {
        options.legend = {
          position: 'none'
        };
      }
      options = $.extend(true, {}, options, opts.gchart, extraOptions);
      var result = $('<div>').css({
        width: '100%',
        height: '100%'
      });
      var wrapper = new google.visualization.ChartWrapper({
        dataTable: dataTable,
        chartType: chartType,
        options: options
      });
      wrapper.draw(result[0]);
      result.bind('dblclick', function () {
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
    'Line Chart': makeGoogleChart('LineChart'),
    'Bar Chart': makeGoogleChart('ColumnChart'),
    'Stacked Bar Chart': makeGoogleChart('ColumnChart', {
      isStacked: true
    }),
    'Area Chart': makeGoogleChart('AreaChart', {
      isStacked: true
    }),
    'Scatter Chart': makeGoogleChart('ScatterChart')
  };
})(jQuery);
//# sourceMappingURL=gchart_renderers.js.map
