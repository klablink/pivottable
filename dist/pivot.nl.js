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
    return $.pivotUtilities.locales.nl = {
      localeStrings: {
        renderError: "Er is een fout opgetreden bij het renderen van de kruistabel.",
        computeError: "Er is een fout opgetreden bij het berekenen van de kruistabel.",
        uiRenderError: "Er is een fout opgetreden bij het tekenen van de interface van de kruistabel.",
        selectAll: "Alles selecteren",
        selectNone: "Niets selecteren",
        tooMany: "(te veel waarden om weer te geven)",
        filterResults: "Filter resultaten",
        apply: "Toepassen",
        cancel: "Annuleren",
        totals: "Totaal",
        vs: "versus",
        by: "per",
        rendererLabel: "Weergeven als",
        valuesLabel: "Waarden",
        fieldsLabel: "Velden",
        colsLabel: "Kolommen",
        rowsLabel: "Rijen",
        groupsLabel: "Groepen",
        "Count": "Aantal",
        "Count Unique Values": "Aantal unieke waarden",
        "List Unique Values": "Lijst unieke waarden",
        "Sum": "Som",
        "Integer Sum": "Som van gehele getallen",
        "Average": "Gemiddelde",
        "Median": "Mediaan",
        "Sample Variance": "Steekproefvariantie",
        "Sample Standard Deviation": "Steekproefstandaardafwijking",
        "Minimum": "Minimum",
        "Maximum": "Maximum",
        "First": "Eerste",
        "Last": "Laatste",
        "Sum over Sum": "Som over som",
        "80% Upper Bound": "80% Bovengrens",
        "80% Lower Bound": "80% Ondergrens",
        "Sum as Fraction of Total": "Som als fractie van totaal",
        "Sum as Fraction of Rows": "Som als fractie van rijen",
        "Sum as Fraction of Columns": "Som als fractie van kolommen",
        "Count as Fraction of Total": "Aantal in verhouding tot het totaal",
        "Count as Fraction of Rows": "Aantal in verhouding tot de rij",
        "Count as Fraction of Columns": "Aantal in verhouding tot de kolom"
      },
      renderers: {
        "Tabel": $.pivotUtilities.renderers["Table"],
        "Tabel met staafdiagrammen": $.pivotUtilities.renderers["Table Barchart"],
        "Warmtekaart": $.pivotUtilities.renderers["Heatmap"],
        "Warmtekaart per rij": $.pivotUtilities.renderers["Row Heatmap"],
        "Warmtekaart per kolom": $.pivotUtilities.renderers["Col Heatmap"]
      }
    };
  });

}).call(this);

//# sourceMappingURL=pivot.nl.js.map
