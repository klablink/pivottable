
(function($) {
    const nf = $.pivotUtilities.numberFormat;
    const tpl = $.pivotUtilities.aggregatorTemplates;
    const r = $.pivotUtilities.renderers;
    const gcr = $.pivotUtilities.gchart_renderers;
    const d3r = $.pivotUtilities.d3_renderers;
    const c3r = $.pivotUtilities.c3_renderers;

    const frFmt = nf({thousandsSep: '.', decimalSep: ','});
    const frFmtInt = nf({digitsAfterDecimal: 0, thousandsSep: '.', decimalSep: ','});
    const frFmtPct = nf({digitsAfterDecimal: 2, scaler: 100, suffix: '%', thousandsSep: '.', decimalSep: ','});

    $.pivotUtilities.locales.tr = {
        formatters: {
            format: frFmt,
            formatInt: frFmtInt,
            formatPct: frFmtPct
        },
        localeStrings: {
            renderError: 'PivotTable sonuçlarını oluştuturken hata oluştu',
            computeError: 'PivotTable sonuçlarını işlerken hata oluştu',
            uiRenderError: 'PivotTable UI sonuçlarını oluştuturken hata oluştu',
            selectAll: 'Tümünü Seç',
            selectNone: 'Tümünü Bırak',
            tooMany: '(listelemek için fazla)',
            filterResults: 'Sonuçları filtrele',
            totals: 'Toplam',
            vs: 'vs',
            by: 'ile',
            rendererLabel: 'Gösterim',
            valuesLabel: 'Değerler',
            fieldsLabel: 'Alanlar',
            colsLabel: 'Kolonlar',
            rowsLabel: 'Satırlar',
            groupsLabel: 'Gruplar',
            'Count': 'Sayı',
            'Count Unique Values': 'Benzersiz değerler sayısı',
            'List Unique Values': 'Benzersiz değerler listesi',
            'Sum': 'Toplam',
            'Integer Sum': 'Toplam (tam sayı)',
            'Average': 'Ortalama',
            'Median': 'Ortanca',
            'Sample Variance': 'Örnek Varyans',
            'Sample Standard Deviation': 'Örnek Standart Sapma',
            'Minimum': 'Minimum',
            'Maximum': 'Maksimum',
            'First': 'İlk',
            'Last': 'Son',
            'Sum over Sum': 'Toplam oranı (toplam)',
            '80% Upper Bound': '%80 daha yüksek',
            '80% Lower Bound': '%80 daha düşük',
            'Sum as Fraction of Total': 'Toplam oranı (toplam)',
            'Sum as Fraction of Rows': 'Satır oranı (toplam)',
            'Sum as Fraction of Columns': 'Sütunun oranı (toplam)',
            'Count as Fraction of Total': 'Toplam oranı (sayı)',
            'Count as Fraction of Rows': 'Satır oranı (sayı)',
            'Count as Fraction of Columns': 'Sütunun oranı (sayı)',
            // renderers
            'Table': 'Tablo',
            'Table Barchart': 'Tablo Çubuk Grafiği',
            'Heatmap': 'Isı Haritası',
            'Row Heatmap': 'Satır Isı Haritası',
            'Col Heatmap': 'Sütun Isı Haritası',
            'Horizontal Bar Chart': 'Yatay Çubuk Grafiği',
            'Horizontal Stacked Bar Chart': 'Yatay Yığılmış Çubuk Grafiği',
            'Bar Chart': 'Çubuk Grafiği',
            'Line Chart': 'Çizgi Grafiği',
            'Stacked Bar Chart': 'Yığılmış Çubuk Grafiği',
            'Area Chart': 'Alan Grafiği',
            'Scatter Chart': 'Dağılım Grafiği',
        }
    };

})(jQuery);

