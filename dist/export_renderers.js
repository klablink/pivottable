"use strict";

// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

callWithJQuery(function ($) {
  return $.pivotUtilities.export_renderers = {
    "TSV Export": function TSVExport(pivotData, opts) {
      var colKey, r;
      var defaults = {
        localeStrings: {}
      };
      opts = $.extend(true, {}, defaults, opts);
      var rowKeys = pivotData.getRowKeys();
      if (rowKeys.length === 0) {
        rowKeys.push([]);
      }
      var colKeys = pivotData.getColKeys();
      if (colKeys.length === 0) {
        colKeys.push([]);
      }
      var rowAttrs = pivotData.rowAttrs;
      var colAttrs = pivotData.colAttrs;
      var result = [];
      var row = [];
      for (var _i = 0, _Array$from = Array.from(rowAttrs); _i < _Array$from.length; _i++) {
        var rowAttr = _Array$from[_i];
        row.push(rowAttr);
      }
      if (colKeys.length === 1 && colKeys[0].length === 0) {
        row.push(pivotData.aggregatorName);
      } else {
        for (var _i2 = 0, _Array$from2 = Array.from(colKeys); _i2 < _Array$from2.length; _i2++) {
          colKey = _Array$from2[_i2];
          row.push(colKey.join("-"));
        }
      }
      result.push(row);
      for (var _i3 = 0, _Array$from3 = Array.from(rowKeys); _i3 < _Array$from3.length; _i3++) {
        var rowKey = _Array$from3[_i3];
        row = [];
        for (var _i4 = 0, _Array$from4 = Array.from(rowKey); _i4 < _Array$from4.length; _i4++) {
          r = _Array$from4[_i4];
          row.push(r);
        }
        for (var _i5 = 0, _Array$from5 = Array.from(colKeys); _i5 < _Array$from5.length; _i5++) {
          colKey = _Array$from5[_i5];
          var agg = pivotData.getAggregator(rowKey, colKey);
          if (agg.value() != null) {
            row.push(agg.value());
          } else {
            row.push("");
          }
        }
        result.push(row);
      }
      var text = "";
      for (var _i6 = 0, _Array$from6 = Array.from(result); _i6 < _Array$from6.length; _i6++) {
        r = _Array$from6[_i6];
        text += r.join("\t") + "\n";
      }
      return $("<textarea>").text(text).css({
        width: $(window).width() / 2 + "px",
        height: $(window).height() / 2 + "px"
      });
    }
  };
});
//# sourceMappingURL=export_renderers.js.map
