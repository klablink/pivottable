"use strict";

(function ($) {
  var nf = $.pivotUtilities.numberFormat;
  var tpl = $.pivotUtilities.aggregatorTemplates;
  var r = nf({
    thousandsSep: '.',
    decimalSep: ','
  });
  var t = nf({
    digitsAfterDecimal: 0,
    thousandsSep: '.',
    decimalSep: ','
  });
  var o = nf({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%',
    thousandsSep: '.',
    decimalSep: ','
  });
  return $.pivotUtilities.locales.da = {
    formatters: {
      format: r,
      formatInt: t,
      formatPct: o
    },
    localeStrings: {
      renderError: 'Der opstod en fejl, mens du trak i feltet',
      computeError: 'Der opstod en fejl ved beregningen af feltet',
      uiRenderError: 'Der opstod en fejl, mens den grafiske brugerflade blev beregnet',
      selectAll: 'Vælg alle',
      selectNone: 'Vælg ingen',
      tooMany: '(for mange værdier til at vise)',
      filterResults: 'Filter værdier',
      totals: 'I alt',
      vs: 'vs',
      by: 'af',
      rendererLabel: 'Renderering',
      valuesLabel: 'Værdier',
      fieldsLabel: 'Felter',
      colsLabel: 'Kolonner',
      rowsLabel: 'Rækker',
      groupsLabel: 'Grupper',
      'Count': 'Antal',
      'Count Unique Values': 'Antal unikke værdier',
      'List Unique Values': 'Liste unikke værdier',
      'Sum': 'Sum',
      'Integer Sum': 'Sum i heltal',
      'Average': 'Gennemsnit',
      'Median': 'Median',
      'Sample Variance': 'Varians',
      'Sample Standard Deviation': 'Standardafvigelse',
      'Minimum': 'Minimum',
      'Maximum': 'Maksimum',
      'First': 'Første',
      'Last': 'Sidste',
      'Sum over Sum': 'Sum i forhold til sum',
      '80% Upper Bound': 'Sum iforhold til sum, øverst 80%',
      '80% Lower Bound': 'Sum iforhold til sum, lavest  80%',
      'Sum as Fraction of Total': 'Sum som brøkdel af total',
      'Sum as Fraction of Rows': 'Sum som brøkdel af rækker',
      'Sum as Fraction of Columns': 'Sum som brøkdel af kolonner',
      'Count as Fraction of Total': 'Tæl som en brøkdel af totalen',
      'Count as Fraction of Rows': 'Tæl som brøkdel af rækker',
      'Count as Fraction of Columns': 'Tæl som brøkdel af kolonner'
    },
    renderers: {
      'Tabel': $.pivotUtilities.renderers.Table,
      'Tabel med søjler': $.pivotUtilities.renderers['Table Barchart'],
      'Heatmap': $.pivotUtilities.renderers.Heatmap,
      'Heatmap per række': $.pivotUtilities.renderers['Row Heatmap'],
      'Heatmap per kolonne': $.pivotUtilities.renderers['Col Heatmap']
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.da.js.map
