"use strict";

(function ($) {
  const nf = $.pivotUtilities.numberFormat;
  const tpl = $.pivotUtilities.aggregatorTemplates;
  const frFmt = nf({
    thousandsSep: ' ',
    decimalSep: ','
  });
  const frFmtInt = nf({
    digitsAfterDecimal: 0,
    thousandsSep: ' ',
    decimalSep: ','
  });
  const frFmtPct = nf({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%',
    thousandsSep: ' ',
    decimalSep: ','
  });
  return $.pivotUtilities.locales.fr = {
    formatters: {
      format: frFmt,
      formatInt: frFmtInt,
      formatPct: frFmtPct
    },
    localeStrings: {
      renderError: 'Une erreur est survenue en dessinant le tableau croisé.',
      computeError: 'Une erreur est survenue en calculant le tableau croisé.',
      uiRenderError: 'Une erreur est survenue en dessinant l\'interface du tableau croisé dynamique.',
      selectAll: 'Sélectionner tout',
      selectNone: 'Sélectionner rien',
      tooMany: '(trop de valeurs à afficher)',
      filterResults: 'Filtrer les valeurs',
      totals: 'Totaux',
      vs: 'sur',
      by: 'par',
      apply: 'Appliquer',
      cancel: 'Annuler',
      rendererLabel: 'Moteur de rendu',
      valuesLabel: 'Valeurs',
      fieldsLabel: 'Champs',
      colsLabel: 'Colonnes',
      rowsLabel: 'Lignes',
      groupsLabel: 'Groupes',
      // aggregators
      'Count': 'Nombre',
      'Count Unique Values': 'Nombre de valeurs uniques',
      'List Unique Values': 'Liste de valeurs uniques',
      'Sum': 'Somme',
      'Integer Sum': 'Somme en entiers',
      'Average': 'Moyenne',
      'Median': 'Médiane',
      'Sample Variance': 'Variance de l\'échantillon',
      'Sample Standard Deviation': 'Écart-type de l\'échantillon',
      'Minimum': 'Minimum',
      'Maximum': 'Maximum',
      'First': 'Premier',
      'Last': 'Dernier',
      'Sum over Sum': 'Somme sur somme',
      '80% Upper Bound': 'Borne supérieure 80%',
      '80% Lower Bound': 'Borne inférieure 80%',
      'Sum as Fraction of Total': 'Somme comme fraction du total',
      'Sum as Fraction of Rows': 'Somme comme fraction de lignes',
      'Sum as Fraction of Columns': 'Somme comme fraction de colonnes',
      'Count as Fraction of Total': 'Compter comme fraction du tota',
      'Count as Fraction of Rows': 'Compter comme fraction de lignes',
      'Count as Fraction of Columns': 'Compter comme fraction de colonnes',
      // renderers
      'Table': 'Table',
      'Table Barchart': 'Table avec barres',
      'Heatmap': 'Carte de chaleur',
      'Row Heatmap': 'Carte de chaleur par ligne',
      'Col Heatmap': 'Carte de chaleur par colonne',
      'Horizontal Bar Chart': 'Graphique à barres horizontales',
      'Horizontal Stacked Bar Chart': 'Graphique à barres empilées horizontales',
      'Bar Chart': 'Graphique à barres',
      'Line Chart': 'Graphique en lignes',
      'Stacked Bar Chart': 'Graphique à barres empilées',
      'Area Chart': 'Graphique en aires',
      'Scatter Chart': 'Nuage de points'
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.fr.js.map
