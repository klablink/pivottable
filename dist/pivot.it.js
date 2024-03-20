(function() {
  var callWithJQuery;

  callWithJQuery = function(pivotModule) {
    if (typeof exports === "object" && typeof module === "object") {
      return pivotModule(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
      return define(["jquery"], pivotModule);
    } else {
      return pivotModule(jQuery);
    }
  };

  callWithJQuery(function($) {
    var frFmt, frFmtInt, frFmtPct, nf, tpl;
    nf = $.pivotUtilities.numberFormat;
    tpl = $.pivotUtilities.aggregatorTemplates;
    frFmt = nf({
      thousandsSep: ".",
      decimalSep: ","
    });
    frFmtInt = nf({
      digitsAfterDecimal: 0,
      thousandsSep: ".",
      decimalSep: ","
    });
    frFmtPct = nf({
      digitsAfterDecimal: 1,
      scaler: 100,
      suffix: "%",
      thousandsSep: ".",
      decimalSep: ","
    });
    $.pivotUtilities.locales.it = {
      localeStrings: {
        renderError: "Si è verificato un errore durante la creazione della tabella.",
        computeError: "Si è verificato un errore di calcolo nella tabella.",
        uiRenderError: "Si è verificato un errore durante il disegno di interfaccia della tabella pivot.",
        selectAll: "Seleziona tutto",
        selectNone: "Deseleziona tutto",
        tooMany: "(troppi valori da visualizzare)",
        filterResults: "Filtra i valori",
        apply: "Applica",
        cancel: "Annulla",
        totals: "Totali",
        vs: "su",
        by: "da",
        rendererLabel: "Visualizza come",
        valuesLabel: "Valori",
        fieldsLabel: "Campi",
        colsLabel: "Colonne",
        rowsLabel: "Righe",
        groupsLabel: "Gruppi",
        "Count": "Conteggio",
        "Count Unique Values": "Conteggio valori unici",
        "List Unique Values": "Elenco valori unici",
        "Sum": "Somma",
        "Integer Sum": "Somma intera",
        "Average": "Media",
        "Median": "Mediana",
        "Sample Variance": "Variazione standard",
        "Sample Standard Deviation": "Deviazione standard",
        "Minimum": "Minimo",
        "Maximum": "Massimo",
        "First": "Primo",
        "Last": "Ultimo",
        "Sum over Sum": "Somma su somma",
        "80% Upper Bound": "Limite superiore 80%",
        "80% Lower Bound": "Limite inferiore 80%",
        "Sum as Fraction of Total": "Somma come frazione del totale",
        "Sum as Fraction of Rows": "Somma come frazione di righe",
        "Sum as Fraction of Columns": "Somma come frazione di colonne",
        "Count as Fraction of Total": "Conteggio come frazione del totale",
        "Count as Fraction of Rows": "Conteggio come frazione di righe",
        "Count as Fraction of Columns": "Conteggio come frazione di colonne"
      }
    };
    return {
      renderers: {
        "Tabella": $.pivotUtilities.renderers["Table"],
        "Tabella con grafico": $.pivotUtilities.renderers["Table Barchart"],
        "Mappa di calore": $.pivotUtilities.renderers["Heatmap"],
        "Mappa di calore per righe": $.pivotUtilities.renderers["Row Heatmap"],
        "Mappa di calore per colonne": $.pivotUtilities.renderers["Col Heatmap"]
      }
    };
  });

}).call(this);

//# sourceMappingURL=pivot.it.js.map
