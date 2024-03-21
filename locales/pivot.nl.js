// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

(function ($) {
    const nf = $.pivotUtilities.numberFormat;
    const tpl = $.pivotUtilities.aggregatorTemplates;

    const frFmt = nf({ thousandsSep: '.', decimalSep: ',' });
    const frFmtInt = nf({ digitsAfterDecimal: 0, thousandsSep: '.', decimalSep: ',' });
    const frFmtPct = nf({ digitsAfterDecimal: 1, scaler: 100, suffix: '%', thousandsSep: '.', decimalSep: ',' });

    return $.pivotUtilities.locales.nl = {
        formatters: {
            format: frFmt,
            formatInt: frFmtInt,
            formatPct: frFmtPct,
        },
        localeStrings: {
            renderError: 'Er is een fout opgetreden bij het renderen van de kruistabel.',
            computeError: 'Er is een fout opgetreden bij het berekenen van de kruistabel.',
            uiRenderError: 'Er is een fout opgetreden bij het tekenen van de interface van de kruistabel.',
            selectAll: 'Alles selecteren',
            selectNone: 'Niets selecteren',
            tooMany: '(te veel waarden om weer te geven)',
            filterResults: 'Filter resultaten',
            apply: 'Toepassen',
            cancel: 'Annuleren',
            totals: 'Totaal',
            vs: 'versus',
            by: 'per',
            rendererLabel: 'Weergeven als',
            valuesLabel: 'Waarden',
            fieldsLabel: 'Velden',
            colsLabel: 'Kolommen',
            rowsLabel: 'Rijen',
            groupsLabel: 'Groepen',
            'Count': 'Aantal',
            'Count Unique Values': 'Aantal unieke waarden',
            'List Unique Values': 'Lijst unieke waarden',
            'Sum': 'Som',
            'Integer Sum': 'Som van gehele getallen',
            'Average': 'Gemiddelde',
            'Median': 'Mediaan',
            'Sample Variance': 'Steekproefvariantie',
            'Sample Standard Deviation': 'Steekproefstandaardafwijking',
            'Minimum': 'Minimum',
            'Maximum': 'Maximum',
            'First': 'Eerste',
            'Last': 'Laatste',
            'Sum over Sum': 'Som over som',
            '80% Upper Bound': '80% Bovengrens',
            '80% Lower Bound': '80% Ondergrens',
            'Sum as Fraction of Total': 'Som als fractie van totaal',
            'Sum as Fraction of Rows': 'Som als fractie van rijen',
            'Sum as Fraction of Columns': 'Som als fractie van kolommen',
            'Count as Fraction of Total': 'Aantal in verhouding tot het totaal',
            'Count as Fraction of Rows': 'Aantal in verhouding tot de rij',
            'Count as Fraction of Columns': 'Aantal in verhouding tot de kolom',
        },


        renderers: {
            'Tabel': $.pivotUtilities.renderers['Table'],
            'Tabel met staafdiagrammen': $.pivotUtilities.renderers['Table Barchart'],
            'Warmtekaart': $.pivotUtilities.renderers['Heatmap'],
            'Warmtekaart per rij': $.pivotUtilities.renderers['Row Heatmap'],
            'Warmtekaart per kolom': $.pivotUtilities.renderers['Col Heatmap'],
        },
    };
})(jQuery);
