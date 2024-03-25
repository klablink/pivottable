"use strict";

(function ($) {
  var nf = $.pivotUtilities.numberFormat;
  var tpl = $.pivotUtilities.aggregatorTemplates;
  var jpFmt = nf({
    thousandsSep: ',',
    decimalSep: '.'
  });
  var jpFmtInt = nf({
    digitsAfterDecimal: 0,
    thousandsSep: ',',
    decimalSep: '.'
  });
  var jpFmtPct = nf({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%',
    thousandsSep: ',',
    decimalSep: '.'
  });
  $.pivotUtilities.locales.ja = {
    formatters: {
      format: jpFmt,
      formatInt: jpFmtInt,
      formatPct: jpFmtPct
    },
    localeStrings: {
      renderError: '描画処理でエラーが発生しました。',
      computeError: '処理中にエラーが発生しました。',
      uiRenderError: '表示処理中にエラーが発生しました。',
      selectAll: '全選択',
      selectNone: '選択解除',
      tooMany: '項目が多すぎます',
      filterResults: '項目を検索する',
      totals: '合計',
      vs: 'vs',
      by: 'per',
      apply: '適用する',
      cancel: 'キャンセル',
      rendererLabel: 'レンダラー',
      valuesLabel: '値',
      fieldsLabel: 'フィールド',
      colsLabel: '列',
      rowsLabel: '行',
      groupsLabel: 'グループ',
      // aggregators
      'Count': '件数',
      'Count Unique Values': '件数（ユニーク',
      'List Unique Values': 'ユニーク値を表示 (CSV)',
      'Sum': '合計',
      'Integer Sum': '合計（整数',
      'Average': '平均',
      'Median': '中央値',
      'Sample Variance': '分散',
      'Sample Standard Deviation': '標準偏差',
      'Minimum': '最小',
      'Maximum': '最大',
      'First': '最初',
      'Last': '最後',
      'Sum over Sum': '選択２項目の比率',
      '80% Upper Bound': '選択２項目の比率（上限80%）',
      '80% Lower Bound': '選択２項目の比率（下限80%）',
      'Sum as Fraction of Total': '合計割合',
      'Sum as Fraction of Rows': '合計割合（行）',
      'Sum as Fraction of Columns': '合計割合（列）',
      'Count as Fraction of Total': '件数割合',
      'Count as Fraction of Rows': '件数割合（行',
      'Count as Fraction of Columns': '件数割合（列）',
      // renderers
      'Table': '表',
      'Table Barchart': '表（棒グラフ）',
      'Heatmap': 'ヒートマップ',
      'Row Heatmap': 'ヒートマップ（行）',
      'Col Heatmap': 'ヒートマップ（列）'
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.jp.js.map
