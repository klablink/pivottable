"use strict";

(function ($) {
  var nf = $.pivotUtilities.numberFormat;
  var tpl = $.pivotUtilities.aggregatorTemplates;
  var r = $.pivotUtilities.renderers;
  var gcr = $.pivotUtilities.gchart_renderers;
  var d3r = $.pivotUtilities.d3_renderers;
  var c3r = $.pivotUtilities.c3_renderers;
  var frFmt = nf({
    thousandsSep: ',',
    decimalSep: '.'
  });
  var frFmtInt = nf({
    digitsAfterDecimal: 0,
    thousandsSep: ',',
    decimalSep: '.'
  });
  var frFmtPct = nf({
    digitsAfterDecimal: 2,
    scaler: 100,
    suffix: '%',
    thousandsSep: ',',
    decimalSep: '.'
  });
  $.pivotUtilities.locales.zh = {
    formatters: {
      format: frFmt,
      formatInt: frFmtInt,
      formatPct: frFmtPct
    },
    localeStrings: {
      renderError: '展示结果时出错。',
      computeError: '计算结果时出错。',
      uiRenderError: '展示界面时出错。',
      selectAll: '选择全部',
      selectNone: '全部不选',
      tooMany: '(因数据过多而无法列出)',
      filterResults: '输入值帮助筛选',
      totals: '合计',
      vs: '于',
      by: '分组于',
      rendererLabel: '渲染器',
      valuesLabel: '值',
      fieldsLabel: '字段',
      colsLabel: '列',
      rowsLabel: '行',
      groupsLabel: '分组',
      'Count': '频数',
      'Count Unique Values': '非重复值的个数',
      'List Unique Values': '列出非重复值',
      'Sum': '求和',
      'Integer Sum': '求和后取整',
      'Average': '平均值',
      'Median': '中位数',
      'Sample Variance': '方差',
      'Sample Standard Deviation': '样本标准偏差',
      'Minimum': '最小值',
      'Maximum': '最大值',
      'First': '第一',
      'Last': '最后',
      'Sum over Sum': '两和之比',
      '80% Upper Bound': '二项分布：置信度为80%时的区间上限',
      '80% Lower Bound': '二项分布：置信度为80%时的区间下限',
      'Sum as Fraction of Total': '和在总计中的比例',
      'Sum as Fraction of Rows': '和在行合计中的比例',
      'Sum as Fraction of Columns': '和在列合计中的比例',
      'Count as Fraction of Total': '频数在总计中的比例',
      'Count as Fraction of Rows': '频数在行合计中的比例',
      'Count as Fraction of Columns': '频数在列合计中的比例',
      // renderers
      'Table': '表格',
      'Table Barchart': '表格内柱状图',
      'Heatmap': '热图',
      'Row Heatmap': '行热图',
      'Col Heatmap': '列热图',
      'Horizontal Bar Chart': '水平柱状图',
      'Horizontal Stacked Bar Chart': '水平堆叠柱状图',
      'Bar Chart': '柱状图',
      'Stacked Bar Chart': '堆叠柱状图',
      'Area Chart': '面积图',
      'Scatter Chart': '散点图'
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.zh.js.map
