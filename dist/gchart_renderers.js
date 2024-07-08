"use strict";

(function ($) {
  const makeGoogleChart = (chartType, extraOptions) => function (pivotData, opts) {
    let agg, dataArray, dataTable, hAxisTitle, title, vAxisTitle;
    const defaults = {
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
    const rowKeys = pivotData.getRowKeys();
    if (rowKeys.length === 0) {
      rowKeys.push([]);
    }
    const colKeys = pivotData.getColKeys();
    if (colKeys.length === 0) {
      colKeys.push([]);
    }
    let fullAggName = pivotData.aggregatorName;
    if (pivotData.valAttrs.length) {
      fullAggName += `(${pivotData.valAttrs.join(', ')})`;
    }
    const headers = rowKeys.map(h => h.join('-'));
    headers.unshift('');
    let numCharsInHAxis = 0;
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
      for (var colKey of colKeys) {
        var row = [colKey.join('-')];
        numCharsInHAxis += row[0].length;
        for (var rowKey of rowKeys) {
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
      hAxisTitle = pivotData.colAttrs.join('-');
      if (hAxisTitle !== '') {
        title += ` ${opts.localeStrings.vs} ${hAxisTitle}`;
      }
      const groupByTitle = pivotData.rowAttrs.join('-');
      if (groupByTitle !== '') {
        title += ` ${opts.localeStrings.by} ${groupByTitle}`;
      }
    }
    let options = {
      title,
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
    const result = $('<div>').css({
      width: '100%',
      height: '100%'
    });
    const wrapper = new google.visualization.ChartWrapper({
      dataTable,
      chartType,
      options
    });
    wrapper.draw(result[0]);
    result.bind('dblclick', function () {
      const editor = new google.visualization.ChartEditor();
      google.visualization.events.addListener(editor, 'ok', () => editor.getChartWrapper().draw(result[0]));
      return editor.openDialog(wrapper);
    });
    return result;
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
