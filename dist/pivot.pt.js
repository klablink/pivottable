"use strict";

(function ($) {
  var nf = $.pivotUtilities.numberFormat;
  var tpl = $.pivotUtilities.aggregatorTemplates;
  var r = $.pivotUtilities.renderers;
  var gcr = $.pivotUtilities.gchart_renderers;
  var d3r = $.pivotUtilities.d3_renderers;
  var c3r = $.pivotUtilities.c3_renderers;
  var frFmt = nf({
    thousandsSep: '.',
    decimalSep: ','
  });
  var frFmtInt = nf({
    digitsAfterDecimal: 0,
    thousandsSep: '.',
    decimalSep: ','
  });
  var frFmtPct = nf({
    digitsAfterDecimal: 2,
    scaler: 100,
    suffix: '%',
    thousandsSep: '.',
    decimalSep: ','
  });
  $.pivotUtilities.locales.pt = {
    formatters: {
      format: frFmt,
      formatInt: frFmtInt,
      formatPct: frFmtPct
    },
    localeStrings: {
      renderError: 'Ocorreu um error ao renderizar os resultados da Tabela Dinâmica.',
      computeError: 'Ocorreu um error ao computar os resultados da Tabela Dinâmica.',
      uiRenderError: 'Ocorreu um error ao renderizar a interface da Tabela Dinâmica.',
      selectAll: 'Selecionar Tudo',
      selectNone: 'Selecionar Nenhum',
      tooMany: '(demais para listar)',
      filterResults: 'Filtrar resultados',
      totals: 'Totais',
      apply: 'Aplicar',
      cancel: 'Cancelar',
      vs: 'vs',
      by: 'por',
      rendererLabel: 'Renderizador',
      valuesLabel: 'Valores',
      fieldsLabel: 'Campos',
      colsLabel: 'Colunas',
      rowsLabel: 'Linhas',
      groupsLabel: 'Grupos',
      'Count': 'Contagem',
      'Count Unique Values': 'Contagem de Valores Únicos',
      'List Unique Values': 'Lista de Valores Únicos',
      'Sum': 'Soma',
      'Integer Sum': 'Soma de Inteiros',
      'Average': 'Média',
      'Median': 'Mediana',
      'Sample Variance': 'Variância da Amostra',
      'Sample Standard Deviation': 'Desvio Padrão da Amostra',
      'Minimum': 'Mínimo',
      'Maximum': 'Máximo',
      'First': 'Primeiro',
      'Last': 'Último',
      'Sum over Sum': 'Soma sobre Soma',
      '80% Upper Bound': 'Limite Superior a 80%',
      '80% Lower Bound': 'Limite Inferior a 80%',
      'Sum as Fraction of Total': 'Suma como Fração do Total',
      'Sum as Fraction of Rows': 'Soma como Fração da Linha',
      'Sum as Fraction of Columns': 'Soma como Fração da Coluna',
      'Count as Fraction of Total': 'Contagem como Fração do Total',
      'Count as Fraction of Rows': 'Contagem como Fração da Linha',
      'Count as Fraction of Columns': 'Contagem como Fração da Coluna',
      // renderers
      'Table': 'Tabela',
      'Table Barchart': 'Tabela com Barras',
      'Heatmap': 'Mapa de Calor',
      'Row Heatmap': 'Mapa de Calor por Linhas',
      'Col Heatmap': 'Mapa de Calor por Colunas',
      'Horizontal Bar Chart': 'Gráfico de barras horizontais',
      'Horizontal Stacked Bar Chart': 'Gráfico de barras horizontais empilhadas',
      'Bar Chart': 'Gráfico de barras',
      'Stacked Bar Chart': 'Gráfico de barras empilhadas',
      'Area Chart': 'Gráfico de área',
      'Scatter Chart': 'Gráfico de dispersão'
    }
  };
})(jQuery);
//# sourceMappingURL=pivot.pt.js.map
