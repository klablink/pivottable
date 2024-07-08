"use strict";

($ => $.pivotUtilities.export_renderers = {
  'TSV Export'(pivotData, opts) {
    let colKey, r;
    const defaults = {
      localeStrings: {}
    };
    opts = $.extend(true, {}, defaults, opts);
    const rowKeys = pivotData.getRowKeys();
    if (rowKeys.length === 0) {
      rowKeys.push([]);
    }
    const colKeys = pivotData.getColKeys();
    if (colKeys.length === 0) {
      colKeys.push([]);
    }
    const {
      rowAttrs
    } = pivotData;
    const {
      colAttrs
    } = pivotData;
    const result = [];
    let row = [];
    for (let rowAttr of rowAttrs) {
      row.push(rowAttr);
    }
    if (colKeys.length === 1 && colKeys[0].length === 0) {
      row.push(pivotData.aggregatorName);
    } else {
      for (colKey of colKeys) {
        row.push(colKey.join('-'));
      }
    }
    result.push(row);
    for (let rowKey of rowKeys) {
      row = [];
      for (r of rowKey) {
        row.push(r);
      }
      for (colKey of colKeys) {
        const agg = pivotData.getAggregator(rowKey, colKey);
        if (agg.value() != null) {
          row.push(agg.value());
        } else {
          row.push('');
        }
      }
      result.push(row);
    }
    let text = '';
    for (r of result) {
      text += r.join('\t') + '\n';
    }
    return $('<textarea>').text(text).css({
      width: $(window).width() / 2 + 'px',
      height: $(window).height() / 2 + 'px'
    });
  }
})(jQuery);
//# sourceMappingURL=export_renderers.js.map
