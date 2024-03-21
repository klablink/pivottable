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

    const csFmt = nf({thousandsSep: ".", decimalSep: ","});
    const csFmtInt = nf({digitsAfterDecimal: 0, thousandsSep: ".", decimalSep: ","});
    const csFmtPct = nf({digitsAfterDecimal: 1, scaler: 100, suffix: "%", thousandsSep: ".", decimalSep: ","});

    return $.pivotUtilities.locales.cs = {
        localeStrings: {
            renderError: "Došlo k chybě při vykreslování výsledků PivotTable.",
            computeError: "Došlo k chybě při výpočtu výsledků PivotTable.",
            uiRenderError: "Došlo k chybě při vykreslování PivotTable UI.",
            selectAll: "Vybrat vše",
            selectNone: "Zrušit výběr",
            tooMany: "(příliš mnoho položek)",
            filterResults: "Hodnoty pro filtr",
            apply: "Použít",
            cancel: "Zrušit",
            totals: "Celkem",
            vs: "ku",
            by: "z",
            rendererLabel: "Vykreslování",
            valuesLabel: "Hodnoty",
            fieldsLabel: "Pole",
            colsLabel: "Sloupce",
            rowsLabel: "Řádky",
            groupsLabel: "Skupiny",
            "Count": "Počet",
            "Count Unique Values": "Počet unikátních hodnot",
            "List Unique Values": "Výčet unikátních hodnot",
            "Sum": "Součet",
            "Integer Sum": "Celočíselný součet",
            "Average": "Průměr",
            "Median": "Medián",
            "Sample Variance": "Rozptyl",
            "Sample Standard Deviation": "Směrodatná odchylka",
            "Minimum": "Minimum",
            "Maximum": "Maximum",
            "First": "První",
            "Last": "Poslední",
            "Sum over Sum": "Součet přes součet",
            "80% Upper Bound": "80% Horní Hranice",
            "80% Lower Bound": "80% Spodní Hranice",
            "Sum as Fraction of Total": "Součet jako zlomek součtu",
            "Sum as Fraction of Rows": "Součet jako zlomek řádků",
            "Sum as Fraction of Columns": "Součet jako zlomek sloupců",
            "Count as Fraction of Total": "Počítejte jako zlomek z celkového počtu",
            "Count as Fraction of Rows": "Počítejte jako zlomek řádků",
            "Count as Fraction of Columns": "Počítejte jako zlomek sloupců"
        },

        renderers: {
            "Tabulka": $.pivotUtilities.renderers["Table"],
            "Tabulka se sloupcovým grafem": $.pivotUtilities.renderers["Table Barchart"],
            "Teplotní mapa": $.pivotUtilities.renderers["Heatmap"],
            "Teplotní mapa z řádků": $.pivotUtilities.renderers["Row Heatmap"],
            "Teplotní mapa ze sloupců": $.pivotUtilities.renderers["Col Heatmap"]
        }
    };});
