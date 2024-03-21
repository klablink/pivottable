// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const callWithJQuery = function(pivotModule) {
    if ((typeof exports === "object") && (typeof module === "object")) { // CommonJS
        return pivotModule(require("jquery"));
    } else if ((typeof define === "function") && define.amd) { // AMD
        return define(["jquery"], pivotModule);
    // Plain browser env
    } else {
        return pivotModule(jQuery);
    }
};

callWithJQuery(function($) {
    const nf = $.pivotUtilities.numberFormat;
    const tpl = $.pivotUtilities.aggregatorTemplates;

    const frFmt =    nf({thousandsSep: ".", decimalSep: ","});
    const frFmtInt = nf({digitsAfterDecimal: 0, thousandsSep: ".", decimalSep: ","});
    const frFmtPct = nf({digitsAfterDecimal: 1, scaler: 100, suffix: "%", thousandsSep: ".", decimalSep: ","});

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
            "Tabela":                      $.pivotUtilities.renderers["Table"],
            "Tabela me diagram vertikal":   $.pivotUtilities.renderers["Table Barchart"],
            "Heatmap":                      $.pivotUtilities.renderers["Heatmap"],
            "Heatmap për rresht":            $.pivotUtilities.renderers["Row Heatmap"],
            "Heatmap për kolonë":           $.pivotUtilities.renderers["Col Heatmap"]
        }
    };});
