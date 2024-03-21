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
    const r = $.pivotUtilities.renderers;
    const gcr = $.pivotUtilities.gchart_renderers;
    const d3r = $.pivotUtilities.d3_renderers;
    const c3r = $.pivotUtilities.c3_renderers;

    const frFmt =    nf({thousandsSep: ".", decimalSep: ","});
    const frFmtInt = nf({digitsAfterDecimal: 0, thousandsSep: ".", decimalSep: ","});
    const frFmtPct = nf({digitsAfterDecimal: 2, scaler: 100, suffix: "%", thousandsSep: ".", decimalSep: ","});

    $.pivotUtilities.locales.pt = {
        localeStrings: {
            renderError: "Ocorreu um error ao renderizar os resultados da Tabela Dinâmica.",
            computeError: "Ocorreu um error ao computar os resultados da Tabela Dinâmica.",
            uiRenderError: "Ocorreu um error ao renderizar a interface da Tabela Dinâmica.",
            selectAll: "Selecionar Tudo",
            selectNone: "Selecionar Nenhum",
            tooMany: "(demais para listar)",
            filterResults: "Filtrar resultados",
            totals: "Totais",
            apply:"Aplicar",
            cancel: "Cancelar",
            vs: "vs",
            by: "por",
            rendererLabel: "Renderizador",
            valuesLabel: "Valores",
            fieldsLabel: "Campos",
            colsLabel: "Colunas",
            rowsLabel: "Linhas",
            groupsLabel: "Grupos",
            "Count": "Contagem",
            "Count Unique Values": "Contagem de Valores Únicos",
            "List Unique Values": "Lista de Valores Únicos",
            "Sum": "Soma",
            "Integer Sum": "Soma de Inteiros",
            "Average": "Média",
            "Median": "Mediana",
            "Sample Variance": "Variância da Amostra",
            "Sample Standard Deviation": "Desvio Padrão da Amostra",
            "Minimum": "Mínimo",
            "Maximum": "Máximo",
            "First": "Primeiro",
            "Last": "Último",
            "Sum over Sum": "Soma sobre Soma",
            "80% Upper Bound": "Limite Superior a 80%",
            "80% Lower Bound": "Limite Inferior a 80%",
            "Sum as Fraction of Total": "Suma como Fração do Total",
            "Sum as Fraction of Rows": "Soma como Fração da Linha",
            "Sum as Fraction of Columns": "Soma como Fração da Coluna",
            "Count as Fraction of Total": "Contagem como Fração do Total",
            "Count as Fraction of Rows": "Contagem como Fração da Linha",
            "Count as Fraction of Columns": "Contagem como Fração da Coluna"
        },

        renderers: {
            "Tabela":                    r["Table"],
            "Tabela com Barras":         r["Table Barchart"],
            "Mapa de Calor":             r["Heatmap"],
            "Mapa de Calor por Linhas":  r["Row Heatmap"],
            "Mapa de Calor por Colunas": r["Col Heatmap"]
        }
    };

    if (gcr) {
        $.pivotUtilities.locales.pt.gchart_renderers = {
            "Gráfico de Linhas":            gcr["Line Chart"],
            "Gráfico de Barras":            gcr["Bar Chart"],
            "Gráfico de Barras Empilhadas": gcr["Stacked Bar Chart"],
            "Gráfico de Área":       gcr["Area Chart"]
        };
    }

    if (d3r) {
        $.pivotUtilities.locales.pt.d3_renderers =
            {"Mapa de Árvore": d3r["Treemap"]};
    }

    if (c3r) {
      $.pivotUtilities.locales.pt.c3_renderers = {
        "Gráfico de Linhas": c3r["Line Chart"],
        "Gráfico de Barras": c3r["Bar Chart"],
        "Gráfico de Barras Empilhadas": c3r["Stacked Bar Chart"],
        "Gráfico de Área":       c3r["Area Chart"]
    };
  }

    return $.pivotUtilities.locales.pt;
});
