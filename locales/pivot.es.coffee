callWithJQuery = (pivotModule) ->
    if typeof exports is "object" and typeof module is "object" # CommonJS
        pivotModule require("jquery")
    else if typeof define is "function" and define.amd # AMD
        define ["jquery"], pivotModule
    # Plain browser env
    else
        pivotModule jQuery

callWithJQuery ($) ->
    nf = $.pivotUtilities.numberFormat
    tpl = $.pivotUtilities.aggregatorTemplates

    frFmt =    nf(thousandsSep: ".", decimalSep: ",")
    frFmtInt = nf(digitsAfterDecimal: 0, thousandsSep: " ", decimalSep: ",")
    frFmtPct = nf(digitsAfterDecimal: 1, scaler: 100, suffix: "%", thousandsSep: " ", decimalSep: ",")

    $.pivotUtilities.locales.es =
        localeStrings:
            renderError: "Ocurrió un error durante la interpretación de la tabla dinámica."
            computeError: "Ocurrió un error durante el cálculo de la tabla dinámica."
            uiRenderError: "Ocurrió un error durante el dibujado de la tabla dinámica."
            selectAll: "Seleccionar todo"
            selectNone: "Deseleccionar todo"
            tooMany: "(demasiados valores)"
            filterResults: "Filtrar resultados"
            apply: "Aplicar"
            cancel: "Cancelar"
            totals: "Totales"
            vs: "vs"
            by: "por"
            rendererLabel: "Renderizador"
            valuesLabel: "Valores"
            fieldsLabel: "Campos"
            colsLabel: "Columnas"
            rowsLabel: "Filas"
            groupsLabel: "Grupos"
            "Count": "Cuenta"
            "Count Unique Values": "Cuenta de valores únicos"
            "List Unique Values": "Lista de valores únicos"
            "Sum": "Suma"
            "Integer Sum": "Suma de enteros"
            "Average": "Promedio"
            "Median": "Mediana"
            "Sample Variance": "Diferencia"
            "Sample Standard Deviation": "Desviación estándar de la muestra"
            "Minimum": "Mínimo"
            "Maximum": "Máximo"
            "First": "Primero"
            "Last": "Pasado"
            "Sum over Sum": "Suma de sumas"
            "80% Upper Bound": "Cota 80% superior"
            "80% Lower Bound": "Cota 80% inferior"
            "Sum as Fraction of Total": "Suma como fracción del total"
            "Sum as Fraction of Rows": "Suma como fracción de filas"
            "Sum as Fraction of Columns": "Suma como fracción de columnas"
            "Count as Fraction of Total": "Contar como fracción del total"
            "Count as Fraction of Rows": "Contar como fracción de filas"
            "Count as Fraction of Columns": "Contar como fracción de columnas"


        renderers:
            "Tabla":                           $.pivotUtilities.renderers["Table"]
            "Tabla con barras":               $.pivotUtilities.renderers["Table Barchart"]
            "Heatmap":                $.pivotUtilities.renderers["Heatmap"]
            "Heatmap por filas":      $.pivotUtilities.renderers["Row Heatmap"]
            "Heatmap por columnas":    $.pivotUtilities.renderers["Col Heatmap"]


