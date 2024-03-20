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
    return $.pivotUtilities.locales.fr = {
      localeStrings: {
        renderError: "Une erreur est survenue en dessinant le tableau croisé.",
        computeError: "Une erreur est survenue en calculant le tableau croisé.",
        uiRenderError: "Une erreur est survenue en dessinant l'interface du tableau croisé dynamique.",
        selectAll: "Sélectionner tout",
        selectNone: "Sélectionner rien",
        tooMany: "(trop de valeurs à afficher)",
        filterResults: "Filtrer les valeurs",
        totals: "Totaux",
        vs: "sur",
        by: "par",
        apply: "Appliquer",
        cancel: "Annuler",
        rendererLabel: "Moteur de rendu",
        valuesLabel: "Valeurs",
        fieldsLabel: "Champs",
        colsLabel: "Colonnes",
        rowsLabel: "Lignes",
        groupsLabel: "Groupes",
        "Count": "Nombre",
        "Count Unique Values": "Nombre de valeurs uniques",
        "List Unique Values": "Liste de valeurs uniques",
        "Sum": "Somme",
        "Integer Sum": "Somme en entiers",
        "Average": "Moyenne",
        "Median": "Médiane",
        "Sample Variance": "Variance de l'échantillon",
        "Sample Standard Deviation": "Écart-type de l'échantillon",
        "Minimum": "Minimum",
        "Maximum": "Maximum",
        "First": "Premier",
        "Last": "Dernier",
        "Sum over Sum": "Somme sur somme",
        "80% Upper Bound": "Borne supérieure 80%",
        "80% Lower Bound": "Borne inférieure 80%",
        "Sum as Fraction of Total": "Somme comme fraction du total",
        "Sum as Fraction of Rows": "Somme comme fraction de lignes",
        "Sum as Fraction of Columns": "Somme comme fraction de colonnes",
        "Count as Fraction of Total": "Compter comme fraction du tota",
        "Count as Fraction of Rows": "Compter comme fraction de lignes",
        "Count as Fraction of Columns": "Compter comme fraction de colonnes"
      },
      renderers: {
        "Table": $.pivotUtilities.renderers["Table"],
        "Table avec barres": $.pivotUtilities.renderers["Table Barchart"],
        "Carte de chaleur": $.pivotUtilities.renderers["Heatmap"],
        "Carte de chaleur par ligne": $.pivotUtilities.renderers["Row Heatmap"],
        "Carte de chaleur par colonne": $.pivotUtilities.renderers["Col Heatmap"]
      }
    };
  });

}).call(this);

//# sourceMappingURL=pivot.fr.js.map
