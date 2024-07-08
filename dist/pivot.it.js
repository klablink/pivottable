"use strict";

(function ($) {
  const nf = $.pivotUtilities.numberFormat;
  const tpl = $.pivotUtilities.aggregatorTemplates;
  const frFmt = nf({
    thousandsSep: '.',
    decimalSep: ','
  });
  const frFmtInt = nf({
    digitsAfterDecimal: 0,
    thousandsSep: '.',
    decimalSep: ','
  });
  const frFmtPct = nf({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%',
    thousandsSep: '.',
    decimalSep: ','
  });
  return $.pivotUtilities.locales.it = {
    formatters: {
      format: frFmt,
      formatInt: frFmtInt,
      formatPct: frFmtPct
    },
    localeStrings: {
      renderError: 'Si è verificato un errore durante la creazione della tabella.',
      computeError: 'Si è verificato un errore di calcolo nella tabella.',
      uiRenderError: 'Si è verificato un errore durante il disegno di interfaccia della tabella pivot.',
      selectAll: 'Seleziona tutto',
      selectNone: 'Deseleziona tutto',
      tooMany: '(troppi valori da visualizzare)',
      filterResults: 'Filtra i valori',
      apply: 'Applica',
      cancel: 'Annulla',
      totals: 'Totali',
      vs: 'su',
      by: 'da',
      rendererLabel: 'Visualizza come',
      valuesLabel: 'Valori',
      fieldsLabel: 'Campi',
      colsLabel: 'Colonne',
      rowsLabel: 'Righe',
      groupsLabel: 'Gruppi',
      // aggregators
      'Count': 'Conteggio',
      'Count Unique Values': 'Conteggio valori unici',
      'List Unique Values': 'Elenco valori unici',
      'Sum': 'Somma',
      'Integer Sum': 'Somma intera',
      'Average': 'Media',
      'Median': 'Mediana',
      'Sample Variance': 'Variazione standard',
      'Sample Standard Deviation': 'Deviazione standard',
      'Minimum': 'Minimo',
      'Maximum': 'Massimo',
      'First': 'Primo',
      'Last': 'Ultimo',
      'Sum over Sum': 'Somma su somma',
      '80% Upper Bound': 'Limite superiore 80%',
      '80% Lower Bound': 'Limite inferiore 80%',
      'Sum as Fraction of Total': 'Somma come frazione del totale',
      'Sum as Fraction of Rows': 'Somma come frazione di righe',
      'Sum as Fraction of Columns': 'Somma come frazione di colonne',
      'Count as Fraction of Total': 'Conteggio come frazione del totale',
      'Count as Fraction of Rows': 'Conteggio come frazione di righe',
      'Count as Fraction of Columns': 'Conteggio come frazione di colonne',
      // renderers
      'Table': 'Tabella',
      'Table Barchart': 'Tabella con grafico',
      'Heatmap': 'Mappa di calore',
      'Row Heatmap': 'Mappa di calore per righe',
      'Col Heatmap': 'Mappa di calore per colonne',
      'Horizontal Bar Chart': 'Grafico a barre orizzontali',
      'Horizontal Stacked Bar Chart': 'Grafico a barre orizzontali impilate',
      'Bar Chart': 'Grafico a barre',
      'Line Chart': 'Grafico a linee',
      'Stacked Bar Chart': 'Grafico a barre impilate',
      'Area Chart': 'Grafico ad area',
      'Scatter Chart': 'Grafico a dispersione'
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.it.js.map
