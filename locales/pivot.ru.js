
callWithJQuery(function ($) {
    const nf = $.pivotUtilities.numberFormat;
    const tpl = $.pivotUtilities.aggregatorTemplates;

    const frFmt = nf({ thousandsSep: '.', decimalSep: ',' });
    const frFmtInt = nf({ digitsAfterDecimal: 0, thousandsSep: '.', decimalSep: ',' });
    const frFmtPct = nf({ digitsAfterDecimal: 1, scaler: 100, suffix: '%', thousandsSep: '.', decimalSep: ',' });

    return $.pivotUtilities.locales.ru = {
        formatters: {
            format: frFmt,
            formatInt: frFmtInt,
            formatPct: frFmtPct,
        },
        localeStrings: {
            renderError: 'Ошибка рендеринга страницы.',
            computeError: 'Ошибка табличных расчетов.',
            uiRenderError: 'Ошибка во время прорисовки и динамического расчета таблицы.',
            selectAll: 'Выбрать все',
            selectNone: 'Снять выделение',
            tooMany: '(Выбрано слишком много значений)',
            filterResults: 'Возможные значения',
            totals: 'Всего',
            vs: 'на',
            by: 'с',
            rendererLabel: 'Тип отображения',
            valuesLabel: 'Значения',
            fieldsLabel: 'Поля',
            colsLabel: 'Колонки',
            rowsLabel: 'Строки',
            groupsLabel: 'Группы',
            'Count': 'Количество',
            'Count Unique Values': 'Количество уникальных значений',
            'List Unique Values': 'Список уникальных значений',
            'Sum': 'Сумма',
            'Integer Sum': 'Целая сумма',
            'Average': 'Среднее',
            'Median': 'Медиана',
            'Sample Variance': 'Выборочная дисперсия',
            'Sample Standard Deviation': 'Выборочное стандартное отклонение',
            'Minimum': 'Минимум',
            'Maximum': 'Максимум',
            'First': 'Первый',
            'Last': 'Последний',
            'Sum over Sum': 'Сумма по сумме',
            '80% Upper Bound': '80% Верхняя граница',
            '80% Lower Bound': '80% Нижняя граница',
            'Sum as Fraction of Total': 'Сумма как Доля от Общего',
            'Sum as Fraction of Rows': 'Сумма как Доля от Строк',
            'Sum as Fraction of Columns': 'Сумма как Доля от Колонок',
            'Count as Fraction of Total': 'Кол-во как Доля от Общего',
            'Count as Fraction of Rows': 'Кол-во как Доля от Строк',
            'Count as Fraction of Columns': 'Кол-во как Доля от Колонок',
        },

        renderers: {
            'Таблица': $.pivotUtilities.renderers['Table'],
            'График столбцы': $.pivotUtilities.renderers['Table Barchart'], // TODO придумать более понятный вариант
            'Тепловая карта': $.pivotUtilities.renderers['Heatmap'],
            'Тепловая карта по строке': $.pivotUtilities.renderers['Row Heatmap'],
            'Тепловая карта по столбцу': $.pivotUtilities.renderers['Col Heatmap'],
        },
    };
})(jQuery)

