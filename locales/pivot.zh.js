// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// example: http://zhoulvjun.github.io/2016/02/08/pivottable/

callWithJQuery(function($) {
    const nf = $.pivotUtilities.numberFormat;
    const tpl = $.pivotUtilities.aggregatorTemplates;
    const r = $.pivotUtilities.renderers;
    const gcr = $.pivotUtilities.gchart_renderers;
    const d3r = $.pivotUtilities.d3_renderers;
    const c3r = $.pivotUtilities.c3_renderers;

    const frFmt =    nf({thousandsSep: ",", decimalSep: "."});
    const frFmtInt = nf({digitsAfterDecimal: 0, thousandsSep: ",", decimalSep: "."});
    const frFmtPct = nf({digitsAfterDecimal: 2, scaler: 100, suffix: "%", thousandsSep: ",", decimalSep: "."});

    $.pivotUtilities.locales.zh = {
        formatters: {
            format: frFmt,
            formatInt: frFmtInt,
            formatPct: frFmtPct
        },
        localeStrings: {
            renderError: "展示结果时出错。",
            computeError: "计算结果时出错。",
            uiRenderError: "展示界面时出错。",
            selectAll: "选择全部",
            selectNone: "全部不选",
            tooMany: "(因数据过多而无法列出)",
            filterResults: "输入值帮助筛选",
            totals: "合计",
            vs: "于",
            by: "分组于",
            rendererLabel: "渲染器",
            valuesLabel: "值",
            fieldsLabel: "字段",
            colsLabel: "列",
            rowsLabel: "行",
            groupsLabel: "分组",
            "Count": "频数",
            "Count Unique Values": "非重复值的个数",
            "List Unique Values": "列出非重复值",
            "Sum": "求和",
            "Integer Sum": "求和后取整",
            "Average": "平均值",
            "Median": "中位数",
            "Sample Variance": "方差",
            "Sample Standard Deviation": "样本标准偏差",
            "Minimum": "最小值",
            "Maximum": "最大值",
            "First": "第一",
            "Last": "最后",
            "Sum over Sum": "两和之比",
            "80% Upper Bound": "二项分布：置信度为80%时的区间上限",
            "80% Lower Bound": "二项分布：置信度为80%时的区间下限",
            "Sum as Fraction of Total": "和在总计中的比例",
            "Sum as Fraction of Rows": "和在行合计中的比例",
            "Sum as Fraction of Columns": "和在列合计中的比例",
            "Count as Fraction of Total": "频数在总计中的比例",
            "Count as Fraction of Rows": "频数在行合计中的比例",
            "Count as Fraction of Columns": "频数在列合计中的比例"
        },

        renderers: {
            "表格": r["Table"],
            "表格内柱状图": r["Table Barchart"],
            "热图": r["Heatmap"],
            "行热图": r["Row Heatmap"],
            "列热图": r["Col Heatmap"]
        }
    };

    if (gcr) {
        $.pivotUtilities.locales.zh.gchart_renderers = {
            "折线图(g)":            gcr["Line Chart"],
            "柱形图(g)":            gcr["Bar Chart"],
            "堆栈柱形图(g)": gcr["Stacked Bar Chart"],
            "面积图(g)":       gcr["Area Chart"]
        };
        $.pivotUtilities.locales.zh.renderers = $.extend(
            $.pivotUtilities.locales.zh.renderers,
            $.pivotUtilities.locales.zh.gchart_renderers);
    }

    if (d3r) {
        $.pivotUtilities.locales.zh.d3_renderers =
            {"树图": d3r["Treemap"]};
        $.pivotUtilities.locales.zh.renderers = $.extend(
            $.pivotUtilities.locales.zh.renderers,
            $.pivotUtilities.locales.zh.d3_renderers);
    }

    if (c3r) {
        $.pivotUtilities.locales.zh.c3_renderers = {
            "折线图": c3r["Line Chart"],
            "柱形图": c3r["Bar Chart"],
            "堆栈柱形图": c3r["Stacked Bar Chart"],
            "面积图": c3r["Area Chart"],
            "散点图": c3r["Scatter Chart"]
        };
        $.pivotUtilities.locales.zh.renderers = $.extend(
            $.pivotUtilities.locales.zh.renderers,
            $.pivotUtilities.locales.zh.c3_renderers);
    }

    return $.pivotUtilities.locales.zh;
});
