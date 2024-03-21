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

    const plFmt = nf({ thousandsSep: '.', decimalSep: ',' });
    const plFmtInt = nf({ digitsAfterDecimal: 0, thousandsSep: '.', decimalSep: ',' });
    const plFmtPct = nf({ digitsAfterDecimal: 1, scaler: 100, suffix: '%', thousandsSep: '.', decimalSep: ',' });

    return $.pivotUtilities.locales.pl = {
        formatters: {
            format: plFmt,
            formatInt: plFmtInt,
            formatPct: plFmtPct,
        },
        localeStrings: {
            renderError: 'Wystąpił błąd podczas renderowania wyników PivotTable.',
            computeError: 'Wystąpił błąd podczas obliczania wyników PivotTable.',
            uiRenderError: 'Wystąpił błąd podczas renderowania UI PivotTable.',
            selectAll: 'Zaznacz wszystko',
            selectNone: 'Odznacz wszystkie',
            tooMany: '(za dużo do wylistowania)',
            filterResults: 'Filtruj wartości',
            apply: 'Zastosuj',
            cancel: 'Anuluj',
            totals: 'Podsumowanie',
            vs: 'vs',
            by: 'przez',
            rendererLabel: 'Renderowanie',
            valuesLabel: 'Wartości',
            fieldsLabel: 'Pola',
            colsLabel: 'Kolumny',
            rowsLabel: 'Wiersze',
            groupsLabel: 'Grupy',
            'Count': 'Liczba',
            'Count Unique Values': 'Liczba unikatowych wartości',
            'List Unique Values': 'Lista unikatowych wartości',
            'Sum': 'Suma',
            'Integer Sum': 'Suma całkowita',
            'Average': 'Średnia',
            'Median': 'Mediana',
            'Sample Variance': 'Wariancja próbki',
            'Sample Standard Deviation': 'Odchylenie standardowe próbki',
            'Minimum': 'Minimum',
            'Maximum': 'Maksimum',
            'First': 'Pierwszy',
            'Last': 'Ostatni',
            'Sum over Sum': 'Suma po sumie',
            '80% Upper Bound': '80% Kres Dolny',
            '80% Lower Bound': '80% Kres Górny',
            'Sum as Fraction of Total': 'Suma jako Ułamek Całości',
            'Sum as Fraction of Rows': 'Suma jako Ułamek w Wierszach',
            'Sum as Fraction of Columns': 'Suma jako Ułamek w Kolumnach',
            'Count as Fraction of Total': 'Liczba jako Ułamek Całości',
            'Count as Fraction of Rows': 'Liczba jako Ułamek w Wierszach',
            'Count as Fraction of Columns': 'Liczba jako Ułamek w Kolumnach',
        },

        renderers: {
            'Tabela': $.pivotUtilities.renderers['Table'],
            'Tabela z Wykresem Słupkowym': $.pivotUtilities.renderers['Table Barchart'],
            'Mapa cieplna': $.pivotUtilities.renderers['Heatmap'],
            'Mapa cieplna po Wierszach': $.pivotUtilities.renderers['Row Heatmap'],
            'Mapa cieplna po Kolumnach': $.pivotUtilities.renderers['Col Heatmap'],
        },
    };
})(jQuery)
