"use strict";

// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

(function ($) {
  var nf = $.pivotUtilities.numberFormat;
  var frFmt = nf({
    thousandsSep: '.',
    decimalSep: ','
  });
  var frFmtInt = nf({
    digitsAfterDecimal: 0,
    thousandsSep: '.',
    decimalSep: ','
  });
  var frFmtPct = nf({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%',
    thousandsSep: '.',
    decimalSep: ','
  });
  return $.pivotUtilities.locales.de = {
    formatters: {
      format: frFmt,
      formatInt: frFmtInt,
      formatPct: frFmtPct
    },
    localeStrings: {
      renderError: 'Bei der Darstellung der Pivot-Tabelle ist ein Fehler aufgetreten.',
      computeError: 'Bei der Berechnung der Pivot-Tabelle ist ein Fehler aufgetreten.',
      uiRenderError: 'Bei der Darstellung Oberfläche der Pivot-Tabelle ist ein Fehler aufgetreten.',
      selectAll: 'Alles auswählen',
      selectNone: 'Nichts auswählen',
      tooMany: '(zu viele für Liste)',
      filterResults: 'Ergebnisse filtern',
      apply: 'Anwenden',
      cancel: 'Abbrechen',
      totals: 'Gesamt',
      vs: 'gegen',
      by: 'pro',
      rendererLabel: 'Darstellung',
      valuesLabel: 'Werte',
      fieldsLabel: 'Felder',
      colsLabel: 'Spalten',
      rowsLabel: 'Zeilen',
      groupsLabel: 'Gruppen',
      'Count': 'Anzahl',
      'Count Unique Values': 'Anzahl eindeutiger Werte',
      'List Unique Values': 'Liste eindeutiger Werte',
      'Sum': 'Summe',
      'Integer Sum': 'Ganzzahlige Summe',
      'Average': 'Durchschnitt',
      'Median': 'Median',
      'Sample Variance': 'Stichprobenvarianz',
      'Sample Standard Deviation': 'Stichprobenstandardabweichung',
      'Minimum': 'Minimum',
      'Maximum': 'Maximum',
      'First': 'Erste',
      'Last': 'Letzte',
      'Sum over Sum': 'Summe über Summe',
      '80% Upper Bound': '80% Obergrenze',
      '80% Lower Bound': '80% Untergrenze',
      'Sum as Fraction of Total': 'Summe als Anteil von Gesamt',
      'Sum as Fraction of Rows': 'Summe als Anteil von Zeile',
      'Sum as Fraction of Columns': 'Summe als Anteil von Spalte',
      'Count as Fraction of Total': 'Anzahl als Anteil von Gesamt',
      'Count as Fraction of Rows': 'Anzahl als Anteil von Zeile',
      'Count as Fraction of Columns': 'Anzahl als Anteil von Spalte'
    },
    renderers: {
      'Tabelle': $.pivotUtilities.renderers['Table'],
      'Tabelle mit Balkendiagramm': $.pivotUtilities.renderers['Table Barchart'],
      'Heatmap': $.pivotUtilities.renderers['Heatmap'],
      'Heatmap pro Zeile': $.pivotUtilities.renderers['Row Heatmap'],
      'Heatmap pro Spalte': $.pivotUtilities.renderers['Col Heatmap']
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.de.js.map
