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
    return $.pivotUtilities.locales.sq = {
      localeStrings: {
        renderError: "Ka ndodhur një gabim gjatë shfaqjes së rezultateve të PivotTable.",
        computeError: "Ka ndodhur një gabim gjatë llogaritjes së rezultateve të PivotTable.",
        uiRenderError: "Ka ndodhur një gabim gjatë shfaqjes së ndërfaqes së PivotTable.",
        selectAll: "Përzgjedh të gjitha",
        selectNone: "Mos përzgjedh asnjërën",
        tooMany: "(shumë për t'u listuar)",
        filterResults: "Filtro vlerat",
        totals: "Totalet",
        vs: "kundër",
        by: "për",
        rendererLabel: "Shfaq si",
        valuesLabel: "Vlerat",
        fieldsLabel: "Fushat",
        colsLabel: "Kolonat",
        rowsLabel: "Rreshtat",
        groupsLabel: "Grupet",
        "Count": "Numëro",
        "Count Unique Values": "Numëro vlerat unike",
        "List Unique Values": "Listo vlerat unike",
        "Sum": "Shuma",
        "Integer Sum": "Shuma si numër i plotë",
        "Average": "Mesatarja",
        "Median": "Mesatarja e vlerave të renditura",
        "Sample Variance": "Variance e mostrës",
        "Sample Standard Deviation": "Devijimi standard i mostrës",
        "Minimum": "Minimumi",
        "Maximum": "Maksimumi",
        "First": "Përparësi e parë",
        "Last": "Përparësi e fundit",
        "Sum over Sum": "Shuma mbi shumë",
        "80% Upper Bound": "80% Kufiri i sipërm",
        "80% Lower Bound": "80% Kufiri i poshtëm",
        "Sum as Fraction of Total": "Shuma si thyesë e totalit",
        "Sum as Fraction of Rows": "Shuma si thyesë e rreshtave",
        "Sum as Fraction of Columns": "Shuma si thyesë e kolonave",
        "Count as Fraction of Total": "Numërimi si thyesë e totalit",
        "Count as Fraction of Rows": "Numërimi si thyesë e rreshtave",
        "Count as Fraction of Columns": "Numërimi si thyesë e kolonave"
      },
      renderers: {
        "Tabela": $.pivotUtilities.renderers["Table"],
        "Tabela me diagram vertikal": $.pivotUtilities.renderers["Table Barchart"],
        "Heatmap": $.pivotUtilities.renderers["Heatmap"],
        "Heatmap për rresht": $.pivotUtilities.renderers["Row Heatmap"],
        "Heatmap për kolonë": $.pivotUtilities.renderers["Col Heatmap"]
      }
    };
  });

}).call(this);

//# sourceMappingURL=pivot.sq.js.map
