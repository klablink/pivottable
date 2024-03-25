"use strict";

(function ($) {
  var nf = $.pivotUtilities.numberFormat;
  var tpl = $.pivotUtilities.tpl;
  var fmt = nf({
    thousandsSep: '.',
    decimalSep: ','
  });
  var fmtInt = nf({
    digitsAfterDecimal: 0,
    thousandsSep: '.',
    decimalSep: ','
  });
  var fmtPct = nf({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%',
    thousandsSep: '.',
    decimalSep: ','
  });
  return $.pivotUtilities.locales.cs = {
    formatters: {
      format: fmt,
      formatInt: fmtInt,
      formatPct: fmtPct
    },
    localeStrings: {
      renderError: 'Došlo k chybě při vykreslování výsledků PivotTable.',
      computeError: 'Došlo k chybě při výpočtu výsledků PivotTable.',
      uiRenderError: 'Došlo k chybě při vykreslování PivotTable UI.',
      selectAll: 'Vybrat vše',
      selectNone: 'Zrušit výběr',
      tooMany: '(příliš mnoho položek)',
      filterResults: 'Hodnoty pro filtr',
      apply: 'Použít',
      cancel: 'Zrušit',
      totals: 'Celkem',
      vs: 'ku',
      by: 'z',
      rendererLabel: 'Vykreslování',
      valuesLabel: 'Hodnoty',
      fieldsLabel: 'Pole',
      colsLabel: 'Sloupce',
      rowsLabel: 'Řádky',
      groupsLabel: 'Skupiny',
      // aggregators
      'Count': 'Počet',
      'Count Unique Values': 'Počet unikátních hodnot',
      'List Unique Values': 'Výčet unikátních hodnot',
      'Sum': 'Součet',
      'Integer Sum': 'Celočíselný součet',
      'Average': 'Průměr',
      'Median': 'Medián',
      'Sample Variance': 'Rozptyl',
      'Sample Standard Deviation': 'Směrodatná odchylka',
      'Minimum': 'Minimum',
      'Maximum': 'Maximum',
      'First': 'První',
      'Last': 'Poslední',
      'Sum over Sum': 'Součet přes součet',
      '80% Upper Bound': '80% Horní Hranice',
      '80% Lower Bound': '80% Spodní Hranice',
      'Sum as Fraction of Total': 'Součet jako zlomek součtu',
      'Sum as Fraction of Rows': 'Součet jako zlomek řádků',
      'Sum as Fraction of Columns': 'Součet jako zlomek sloupců',
      'Count as Fraction of Total': 'Počítejte jako zlomek z celkového počtu',
      'Count as Fraction of Rows': 'Počítejte jako zlomek řádků',
      'Count as Fraction of Columns': 'Počítejte jako zlomek sloupců',
      // renderers
      'Table': 'Tabulka',
      'Table Barchart': 'Tabulka se sloupcovým grafem',
      'Heatmap': 'Teplotní mapa',
      'Row Heatmap': 'Teplotní mapa z řádků',
      'Col Heatmap': 'Teplotní mapa ze sloupců'
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.cs.js.map
