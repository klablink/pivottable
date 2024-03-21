// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

($ => $.pivotUtilities.export_renderers = { "TSV Export"(pivotData, opts) {
    let colKey, r;
    const defaults = {localeStrings: {}};

    opts = $.extend(true, {}, defaults, opts);

    const rowKeys = pivotData.getRowKeys();
    if (rowKeys.length === 0) { rowKeys.push([]); }
    const colKeys = pivotData.getColKeys();
    if (colKeys.length === 0) { colKeys.push([]); }
    const {
        rowAttrs
    } = pivotData;
    const {
        colAttrs
    } = pivotData;

    const result = [];

    let row = [];
    for (var rowAttr of Array.from(rowAttrs)) {
        row.push(rowAttr);
    }
    if ((colKeys.length === 1) && (colKeys[0].length === 0)) {
        row.push(pivotData.aggregatorName);
    } else {
        for (colKey of Array.from(colKeys)) {
            row.push(colKey.join("-"));
        }
    }

    result.push(row);

    for (var rowKey of Array.from(rowKeys)) {
        row = [];
        for (r of Array.from(rowKey)) {
            row.push(r);
        }

        for (colKey of Array.from(colKeys)) {
            var agg = pivotData.getAggregator(rowKey, colKey);
            if (agg.value() != null) {
                row.push(agg.value());
            } else {
                row.push("");
            }
        }
        result.push(row);
    }
    let text = "";
    for (r of Array.from(result)) {
        text += r.join("\t")+"\n";
    }

    return  $("<textarea>").text(text).css({
            width: ($(window).width() / 2) + "px",
            height: ($(window).height() / 2) + "px"});
}
})(jQuery);
