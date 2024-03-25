
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
            // aggregators
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
            // renderers
            'Table': 'Tabela',
            'Table Barchart': 'Tabela z Wykresem Słupkowym',
            'Heatmap': 'Mapa cieplna',
            'Row Heatmap': 'Mapa cieplna po Wierszach',
            'Col Heatmap': 'Mapa cieplna po Kolumnach',
            'Horizontal Bar Chart': 'Poziomy wykres słupkowy',
            'Horizontal Stacked Bar Chart': 'Poziomy wykres słupkowy ze stosami',
            'Bar Chart': 'Wykres słupkowy',
            'Line Chart': 'Wykres liniowy',
            'Stacked Bar Chart': 'Wykres słupkowy ze stosami',
            'Area Chart': 'Wykres obszarowy',
            'Scatter Chart': 'Wykres punktowy',
        },
    };
})(jQuery);
