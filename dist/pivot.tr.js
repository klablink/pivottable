(function() {
  var callWithJQuery;

  callWithJQuery = function(pivotModule) {
    if (typeof exports === "object" && typeof module === "object") {
      return pivotModule(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
      return define(["jquery"], pivotModule);
    } else {
      return pivotModule(jQuery);
    }
  };

  callWithJQuery(function($) {
    var c3r, d3r, frFmt, frFmtInt, frFmtPct, gcr, nf, r, tpl;
    nf = $.pivotUtilities.numberFormat;
    tpl = $.pivotUtilities.aggregatorTemplates;
    r = $.pivotUtilities.renderers;
    gcr = $.pivotUtilities.gchart_renderers;
    d3r = $.pivotUtilities.d3_renderers;
    c3r = $.pivotUtilities.c3_renderers;
    frFmt = nf({
      thousandsSep: ".",
      decimalSep: ","
    });
    frFmtInt = nf({
      digitsAfterDecimal: 0,
      thousandsSep: ".",
      decimalSep: ","
    });
    frFmtPct = nf({
      digitsAfterDecimal: 2,
      scaler: 100,
      suffix: "%",
      thousandsSep: ".",
      decimalSep: ","
    });
    $.pivotUtilities.locales.tr = {
      localeStrings: {
        renderError: "PivotTable sonuçlarını oluştuturken hata oluştu",
        computeError: "PivotTable sonuçlarını işlerken hata oluştu",
        uiRenderError: "PivotTable UI sonuçlarını oluştuturken hata oluştu",
        selectAll: "Tümünü Seç",
        selectNone: "Tümünü Bırak",
        tooMany: "(listelemek için fazla)",
        filterResults: "Sonuçları filtrele",
        totals: "Toplam",
        vs: "vs",
        by: "ile",
        rendererLabel: "Gösterim",
        valuesLabel: "Değerler",
        fieldsLabel: "Alanlar",
        colsLabel: "Kolonlar",
        rowsLabel: "Satırlar",
        groupsLabel: "Gruplar",
        "Count": "Sayı",
        "Count Unique Values": "Benzersiz değerler sayısı",
        "List Unique Values": "Benzersiz değerler listesi",
        "Sum": "Toplam",
        "Integer Sum": "Toplam (tam sayı)",
        "Average": "Ortalama",
        "Median": "Ortanca",
        "Sample Variance": "Örnek Varyans",
        "Sample Standard Deviation": "Örnek Standart Sapma",
        "Minimum": "Minimum",
        "Maximum": "Maksimum",
        "First": "İlk",
        "Last": "Son",
        "Sum over Sum": "Toplam oranı (toplam)",
        "80% Upper Bound": "%80 daha yüksek",
        "80% Lower Bound": "%80 daha düşük",
        "Sum as Fraction of Total": "Toplam oranı (toplam)",
        "Sum as Fraction of Rows": "Satır oranı (toplam)",
        "Sum as Fraction of Columns": "Sütunun oranı (toplam)",
        "Count as Fraction of Total": "Toplam oranı (sayı)",
        "Count as Fraction of Rows": "Satır oranı (sayı)",
        "Count as Fraction of Columns": "Sütunun oranı (sayı)"
      }
    };
    ({
      renderers: {
        "Tablo": r["Table"],
        "Tablo (Çubuklar)": r["Table Barchart"],
        "İlgi haritası": r["Heatmap"],
        "Satır ilgi haritası": r["Row Heatmap"],
        "Sütun ilgi haritası": r["Col Heatmap"]
      }
    });
    if (gcr) {
      $.pivotUtilities.locales.tr.gchart_renderers = {
        "Çizgi Grafiği": gcr["Line Chart"],
        "Bar Grafiği": gcr["Bar Chart"],
        "Yığılmış Çubuk Grafik ": gcr["Stacked Bar Chart"],
        "Alan Grafiği": gcr["Area Chart"]
      };
    }
    if (d3r) {
      $.pivotUtilities.locales.tr.d3_renderers = {
        "Hiyerarşik Alan Grafiği (Treemap)": d3r["Treemap"]
      };
    }
    if (c3r) {
      $.pivotUtilities.locales.tr.c3_renderers = {
        "Çizgi Grafiği": c3r["Line Chart"],
        "Bar Grafiği": c3r["Bar Chart"],
        "Yığılmış Çubuk Grafik ": c3r["Stacked Bar Chart"],
        "Alan Grafiği": c3r["Area Chart"]
      };
    }
    return $.pivotUtilities.locales.tr;
  });

}).call(this);

//# sourceMappingURL=pivot.tr.js.map
