// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
// noinspection JSUnresolvedReference

/*
 * decaffeinate suggestions:
 * DS201: Simplify complex destructure assignments
 * DS202: Simplify dynamic range loops
 * DS203: Remove `|| {}` from converted for-own loops
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

(function ($) {

    const expandWithSpan = function (cell, rows, keys, nth) {
        let parent;
        const table = $(cell).closest('table');
        const span = rows ? 'rowSpan' : 'colSpan';

        const dft = !rows ? Math.max(1, this.aggregator.length) : 1;
        [cell._span, cell[span]] = [cell[span], cell._span != null ? cell._span : dft];
        const change = cell[span] - cell._span;

        const object = parentKeysIndices(keys, nth);
        for (let i in object) {
            const p = object[i];
            parent = (getHeader(table, rows, p))[0];
            if (parent[span] === 1) {
                parent._span += change;
                break;
            }
            parent[span] += change;
        }

        return expandRowCol(cell, rows, keys, nth, parent);
    };
    /*
        Utilities
        */

    let getExpandAllHandler;
    const addSeparators = function (nStr, thousandsSep, decimalSep) {
        nStr += '';
        const x = nStr.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? decimalSep + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
        }
        return x1 + x2;
    };

    const numberFormat = function (opts) {
        const defaults = {
            digitsAfterDecimal: 2, scaler: 1,
            thousandsSep: ',', decimalSep: '.',
            prefix: '', suffix: '',
        };
        opts = $.extend({}, defaults, opts);
        return function (x) {
            if (isNaN(x) || !isFinite(x)) {
                return '';
            }
            const result = addSeparators((opts.scaler * x).toFixed(opts.digitsAfterDecimal), opts.thousandsSep, opts.decimalSep);
            return '' + opts.prefix + result + opts.suffix;
        };
    };

    //aggregator templates default to US number formatting, but this is overrideable
    const usFmt = numberFormat();
    const usFmtInt = numberFormat({ digitsAfterDecimal: 0 });
    const usFmtPct = numberFormat({ digitsAfterDecimal: 1, scaler: 100, suffix: '%' });

    const aggregatorTemplates = {
        count(formatter) {
            if (formatter == null) {
                formatter = usFmtInt;
            }
            return () => (function (data, rowKey, colKey) {
                return {
                    count: 0,
                    push() {
                        return this.count++;
                    },
                    value() {
                        return this.count;
                    },
                    format: formatter,
                };
            });
        },

        uniques(fn, formatter) {
            if (formatter == null) {
                formatter = usFmtInt;
            }
            return function (...args) {
                const [attr] = args[0];
                return function (data, rowKey, colKey) {
                    return {
                        uniq: [],
                        push(record) {
                            if (!this.uniq.includes(record[attr])) {
                                return this.uniq.push(record[attr]);
                            }
                        },
                        value() {
                            return fn(this.uniq);
                        },
                        format: formatter,
                        numInputs: (attr != null) ? 0 : 1,
                    };
                };
            };
        },

        sum(formatter) {
            if (formatter == null) {
                formatter = usFmt;
            }
            return function (...args) {
                const [attr] = args[0];
                return function (data, rowKey, colKey) {
                    return {
                        sum: 0,
                        push(record) {
                            if (!isNaN(parseFloat(record[attr]))) {
                                return this.sum += parseFloat(record[attr]);
                            }
                        },
                        value() {
                            return this.sum;
                        },
                        format: formatter,
                        numInputs: (attr != null) ? 0 : 1,
                    };
                };
            };
        },

        extremes(mode, formatter) {
            if (formatter == null) {
                formatter = usFmt;
            }
            return function (...args) {
                const [attr] = args[0];
                return function (data, rowKey, colKey) {
                    return {
                        val: null,
                        sorter: getSort(data != null ? data.sorters : undefined, attr),
                        push(record) {
                            let x = record[attr];
                            if (['min', 'max'].includes(mode)) {
                                x = parseFloat(x);
                                if (!isNaN(x)) {
                                    this.val = Math[mode](x, this.val != null ? this.val : x);
                                }
                            }
                            if (mode === 'first') {
                                if (this.sorter(x, this.val != null ? this.val : x) <= 0) {
                                    this.val = x;
                                }
                            }
                            if (mode === 'last') {
                                if (this.sorter(x, this.val != null ? this.val : x) >= 0) {
                                    return this.val = x;
                                }
                            }
                        },
                        value() {
                            return this.val;
                        },
                        format(x) {
                            if (isNaN(x)) {
                                return x;
                            } else {
                                return formatter(x);
                            }
                        },
                        numInputs: (attr != null) ? 0 : 1,
                    };
                };
            };
        },

        quantile(q, formatter) {
            if (formatter == null) {
                formatter = usFmt;
            }
            return function (...args) {
                const [attr] = args[0];
                return function (data, rowKey, colKey) {
                    return {
                        vals: [],
                        push(record) {
                            const x = parseFloat(record[attr]);
                            if (!isNaN(x)) {
                                return this.vals.push(x);
                            }
                        },
                        value() {
                            if (this.vals.length === 0) {
                                return null;
                            }
                            this.vals.sort((a, b) => a - b);
                            const i = (this.vals.length - 1) * q;
                            return (this.vals[Math.floor(i)] + this.vals[Math.ceil(i)]) / 2.0;
                        },
                        format: formatter,
                        numInputs: (attr != null) ? 0 : 1,
                    };
                };
            };
        },

        runningStat(mode, ddof, formatter) {
            if (mode == null) {
                mode = 'mean';
            }
            if (ddof == null) {
                ddof = 1;
            }
            if (formatter == null) {
                formatter = usFmt;
            }
            return function (...args) {
                const [attr] = args[0];
                return function (data, rowKey, colKey) {
                    return {
                        n: 0.0, m: 0.0, s: 0.0,
                        push(record) {
                            const x = parseFloat(record[attr]);
                            if (isNaN(x)) {
                                return;
                            }
                            this.n += 1.0;
                            if (this.n === 1.0) {
                                return this.m = x;
                            } else {
                                const m_new = this.m + ((x - this.m) / this.n);
                                this.s = this.s + ((x - this.m) * (x - m_new));
                                return this.m = m_new;
                            }
                        },
                        value() {
                            if (mode === 'mean') {
                                if (this.n === 0) {
                                    return 0 / 0;
                                } else {
                                    return this.m;
                                }
                            }
                            if (this.n <= ddof) {
                                return 0;
                            }
                            switch (mode) {
                                case 'var':
                                    return this.s / (this.n - ddof);
                                case 'stdev':
                                    return Math.sqrt(this.s / (this.n - ddof));
                            }
                        },
                        format: formatter,
                        numInputs: (attr != null) ? 0 : 1,
                    };
                };
            };
        },

        sumOverSum(formatter) {
            if (formatter == null) {
                formatter = usFmt;
            }
            return function (...args) {
                const [num, denom] = args[0];
                return function (data, rowKey, colKey) {
                    return {
                        sumNum: 0,
                        sumDenom: 0,
                        push(record) {
                            if (!isNaN(parseFloat(record[num]))) {
                                this.sumNum += parseFloat(record[num]);
                            }
                            if (!isNaN(parseFloat(record[denom]))) {
                                return this.sumDenom += parseFloat(record[denom]);
                            }
                        },
                        value() {
                            return this.sumNum / this.sumDenom;
                        },
                        format: formatter,
                        numInputs: (num != null) && (denom != null) ? 0 : 2,
                    };
                };
            };
        },

        sumOverSumBound80(upper, formatter) {
            if (upper == null) {
                upper = true;
            }
            if (formatter == null) {
                formatter = usFmt;
            }
            return function (...args) {
                const [num, denom] = args[0];
                return function (data, rowKey, colKey) {
                    return {
                        sumNum: 0,
                        sumDenom: 0,
                        push(record) {
                            if (!isNaN(parseFloat(record[num]))) {
                                this.sumNum += parseFloat(record[num]);
                            }
                            if (!isNaN(parseFloat(record[denom]))) {
                                return this.sumDenom += parseFloat(record[denom]);
                            }
                        },
                        value() {
                            const sign = upper ? 1 : -1;
                            return ((0.821187207574908 / this.sumDenom) + (this.sumNum / this.sumDenom) + (1.2815515655446004 * sign *
                                    Math.sqrt((0.410593603787454 / (this.sumDenom * this.sumDenom)) + ((this.sumNum * (1 - (this.sumNum / this.sumDenom))) / (this.sumDenom * this.sumDenom))))) /
                                (1 + (1.642374415149816 / this.sumDenom));
                        },
                        format: formatter,
                        numInputs: (num != null) && (denom != null) ? 0 : 2,
                    };
                };
            };
        },

        fractionOf(wrapped, type, formatter) {
            if (type == null) {
                type = 'total';
            }
            if (formatter == null) {
                formatter = usFmtPct;
            }
            return (...x) => (function (data, rowKey, colKey) {
                return {
                    selector: { total: [[], []], row: [rowKey, []], col: [[], colKey] }[type],
                    inner: wrapped(...(x || []))(data, rowKey, colKey),
                    push(record) {
                        return this.inner.push(record);
                    },
                    format: formatter,
                    value(id) {
                        const agg = data.getAggregator(...([...this.selector, id] || []));
                        return this.inner.value() / agg.inner.value();
                    },
                    numInputs: wrapped(...(x || []))().numInputs,
                };
            });
        },
    };

    aggregatorTemplates.countUnique = f => aggregatorTemplates.uniques((x => x.length), f);
    aggregatorTemplates.listUnique = s => aggregatorTemplates.uniques((x => x.sort(naturalSort).join(s)), (x => x));
    aggregatorTemplates.max = f => aggregatorTemplates.extremes('max', f);
    aggregatorTemplates.min = f => aggregatorTemplates.extremes('min', f);
    aggregatorTemplates.first = f => aggregatorTemplates.extremes('first', f);
    aggregatorTemplates.last = f => aggregatorTemplates.extremes('last', f);
    aggregatorTemplates.median = f => aggregatorTemplates.quantile(0.5, f);
    aggregatorTemplates.average = f => aggregatorTemplates.runningStat('mean', 1, f);
    aggregatorTemplates.var = (ddof, f) => aggregatorTemplates.runningStat('var', ddof, f);
    aggregatorTemplates.stdev = (ddof, f) => aggregatorTemplates.runningStat('stdev', ddof, f);

    function makeAggregators(fmt, fmtInt, fmtPct) {
        return {
            'Count': aggregatorTemplates.count(fmtInt),
            'Count Unique Values': aggregatorTemplates.countUnique(fmtInt),
            'List Unique Values': aggregatorTemplates.listUnique(', '),
            'Sum': aggregatorTemplates.sum(fmt),
            'Integer Sum': aggregatorTemplates.sum(fmtInt),
            'Average': aggregatorTemplates.average(fmt),
            'Median': aggregatorTemplates.median(fmt),
            'Sample Variance': aggregatorTemplates.var(1, fmt),
            'Sample Standard Deviation': aggregatorTemplates.stdev(1, fmt),
            'Minimum': aggregatorTemplates.min(fmt),
            'Maximum': aggregatorTemplates.max(fmt),
            'First': aggregatorTemplates.first(fmt),
            'Last': aggregatorTemplates.last(fmt),
            'Sum over Sum': aggregatorTemplates.sumOverSum(fmt),
            '80% Upper Bound': aggregatorTemplates.sumOverSumBound80(true, fmt),
            '80% Lower Bound': aggregatorTemplates.sumOverSumBound80(false, fmt),
            'Sum as Fraction of Total': aggregatorTemplates.fractionOf(aggregatorTemplates.sum(), 'total', fmtPct),
            'Sum as Fraction of Rows': aggregatorTemplates.fractionOf(aggregatorTemplates.sum(), 'row', fmtPct),
            'Sum as Fraction of Columns': aggregatorTemplates.fractionOf(aggregatorTemplates.sum(), 'col', fmtPct),
            'Count as Fraction of Total': aggregatorTemplates.fractionOf(aggregatorTemplates.count(), 'total', fmtPct),
            'Count as Fraction of Rows': aggregatorTemplates.fractionOf(aggregatorTemplates.count(), 'row', fmtPct),
            'Count as Fraction of Columns': aggregatorTemplates.fractionOf(aggregatorTemplates.count(), 'col', fmtPct),
        };
    }

    //default aggregators & renderers use US naming and number formatting
    const defaultAggregators = makeAggregators(usFmt, usFmtInt, usFmtPct);

    const renderers = {
        'Table'(data, opts) {
            return pivotTableRenderer(data, opts);
        },
        'Table Barchart'(data, opts) {
            return $(pivotTableRenderer(data, opts)).barchart();
        },
        'Heatmap'(data, opts) {
            return $(pivotTableRenderer(data, opts)).heatmap('heatmap', opts);
        },
        'Row Heatmap'(data, opts) {
            return $(pivotTableRenderer(data, opts)).heatmap('rowheatmap', opts);
        },
        'Col Heatmap'(data, opts) {
            return $(pivotTableRenderer(data, opts)).heatmap('colheatmap', opts);
        },
    };

    const locales = {
        en: {
            formatters: {
                format: usFmt,
                formatInt: usFmtInt,
                formatPct: usFmtPct,
            },
            renderers,
            localeStrings: {
                renderError: 'An error occurred rendering the PivotTable results.',
                computeError: 'An error occurred computing the PivotTable results.',
                uiRenderError: 'An error occurred rendering the PivotTable UI.',
                selectAll: 'Select All',
                selectNone: 'Select None',
                tooMany: '(too many to list)',
                filterResults: 'Filter values',
                apply: 'Apply',
                cancel: 'Cancel',
                totals: 'Totals', //for table renderer
                vs: 'vs', //for gchart renderer
                by: 'by', //for gchart renderer
                rendererLabel: 'Renderer',
                valuesLabel: 'Values',
                fieldsLabel: 'Fields',
                colsLabel: 'Columns',
                rowsLabel: 'Rows',
                groupsLabel: 'Groups',
            },
        },
    };

    for (const agg of Object.keys(defaultAggregators)) {
        locales.en.localeStrings[agg] = agg;
    }

    //dateFormat deriver l10n requires month and day names to be passed in directly
    const mthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const zeroPad = number => ('0' + number).substr(-2, 2);

    const derivers = {
        bin(col, binWidth) {
            return record => record[col] - (record[col] % binWidth);
        },
        dateFormat(col, formatString, utcOutput, mthNames, dayNames) {
            if (utcOutput == null) {
                utcOutput = false;
            }
            if (mthNames == null) {
                mthNames = mthNamesEn;
            }
            if (dayNames == null) {
                dayNames = dayNamesEn;
            }
            const utc = utcOutput ? 'UTC' : '';
            return function (record) { //thanks http://stackoverflow.com/a/12213072/112871
                const date = new Date(Date.parse(record[col]));
                if (isNaN(date)) {
                    return '';
                }
                return formatString.replace(/%(.)/g, function (m, p) {
                    switch (p) {
                        case 'y':
                            return date[`get${utc}FullYear`]();
                        case 'm':
                            return zeroPad(date[`get${utc}Month`]() + 1);
                        case 'n':
                            return mthNames[date[`get${utc}Month`]()];
                        case 'd':
                            return zeroPad(date[`get${utc}Date`]());
                        case 'w':
                            return dayNames[date[`get${utc}Day`]()];
                        case 'x':
                            return date[`get${utc}Day`]();
                        case 'H':
                            return zeroPad(date[`get${utc}Hours`]());
                        case 'M':
                            return zeroPad(date[`get${utc}Minutes`]());
                        case 'S':
                            return zeroPad(date[`get${utc}Seconds`]());
                        default:
                            return '%' + p;
                    }
                });
            };
        },
    };

    const rx = /(\d+)|(\D+)/g;
    const rd = /\d/;
    const rz = /^0/;
    const naturalSort = (as, bs, nulls_first) => {
        //nulls first
        if (nulls_first == null) {
            nulls_first = true;
        }
        const nf = nulls_first ? 1 : -1;
        if ((bs != null) && (as == null)) {
            return -1 * nf;
        }
        if ((as != null) && (bs == null)) {
            return 1 * nf;
        }

        //then raw NaNs
        if ((typeof as === 'number') && isNaN(as)) {
            return -1;
        }
        if ((typeof bs === 'number') && isNaN(bs)) {
            return 1;
        }

        //numbers and numbery strings group together
        const nas = +as;
        const nbs = +bs;
        if (nas < nbs) {
            return -1;
        }
        if (nas > nbs) {
            return 1;
        }

        //within that, true numbers before numbery strings
        if ((typeof as === 'number') && (typeof bs !== 'number')) {
            return -1;
        }
        if ((typeof bs === 'number') && (typeof as !== 'number')) {
            return 1;
        }
        if ((typeof as === 'number') && (typeof bs === 'number')) {
            return 0;
        }

        // 'Infinity' is a textual number, so less than 'A'
        if (isNaN(nbs) && !isNaN(nas)) {
            return -1;
        }
        if (isNaN(nas) && !isNaN(nbs)) {
            return 1;
        }

        //finally, "smart" string sorting per http://stackoverflow.com/a/4373421/112871
        let a = String(as);
        let b = String(bs);
        if (a === b) {
            return 0;
        }
        if (!rd.test(a) || !rd.test(b)) {
            return (a > b ? 1 : -1);
        }

        //special treatment for strings containing digits
        a = a.match(rx); //create digits vs. non-digit chunks and iterate through
        b = b.match(rx);
        while (a.length && b.length) {
            const a1 = a.shift();
            const b1 = b.shift();
            if (a1 !== b1) {
                if (rd.test(a1) && rd.test(b1)) { //both are digit chunks
                    return a1.replace(rz, '.0') - b1.replace(rz, '.0');
                } else {
                    return (a1 > b1 ? 1 : -1);
                }
            }
        }
        return a.length - b.length;
    };

    const sortAs = function (order) {
        const mapping = {};
        const l_mapping = {}; // sort lowercased keys similarly
        for (let i in order) {
            const x = order[i];
            mapping[x] = i;
            if (typeof x === 'string') {
                l_mapping[x.toLowerCase()] = i;
            }
        }
        return function (a, b) {
            if ((mapping[a] != null) && (mapping[b] != null)) {
                return mapping[a] - mapping[b];
            } else if (mapping[a] != null) {
                return -1;
            } else if (mapping[b] != null) {
                return 1;
            } else if ((l_mapping[a] != null) && (l_mapping[b] != null)) {
                return l_mapping[a] - l_mapping[b];
            } else if (l_mapping[a] != null) {
                return -1;
            } else if (l_mapping[b] != null) {
                return 1;
            } else {
                return naturalSort(a, b);
            }
        };
    };

    function getSort (sorters, attr) {
        if (sorters != null) {
            if ($.isFunction(sorters)) {
                const sort = sorters(attr);
                if ($.isFunction(sort)) {
                    return sort;
                }
            } else if (sorters[attr] != null) {
                return sorters[attr];
            }
        }
        return naturalSort;
    }

    const filterByLength = (keys, length) => keys.filter(x => x.length === length);

    const subarrays = array => array.map((d, i) => array.slice(0, i + 1));  // [1,2,3] => [[1], [1,2], [1,2,3]]

    /*
    Data Model class
    */

    class PivotData {
        constructor(input, opts) {
            this.arrSort = this.arrSort.bind(this);
            this.sortKeys = this.sortKeys.bind(this);
            this.getColKeys = this.getColKeys.bind(this);
            this.getRowKeys = this.getRowKeys.bind(this);
            this.getAggregator = this.getAggregator.bind(this);
            if (opts == null) {
                opts = {};
            }
            this.input = input;
            if (!Array.isArray(opts.aggregator)) {
                opts.aggregator = opts.aggregator != null ? opts.aggregator : aggregatorTemplates.count()();
                opts.aggregator = [opts.aggregator];
            }
            this.aggregator = opts.aggregator != null ? opts.aggregator : [aggregatorTemplates.count()()];
            this.aggregatorName = opts.aggregatorName != null ? opts.aggregatorName : 'Count';
            this.colAttrs = opts.cols != null ? opts.cols : [];
            this.rowAttrs = opts.rows != null ? opts.rows : [];
            this.valAttrs = opts.vals != null ? opts.vals : [];
            this.sorters = opts.sorters != null ? opts.sorters : {};
            this.rowOrder = opts.rowOrder != null ? opts.rowOrder : 'key_a_to_z';
            this.colOrder = opts.colOrder != null ? opts.colOrder : 'key_a_to_z';
            this.derivedAttributes = opts.derivedAttributes != null ? opts.derivedAttributes : {};
            this.filter = opts.filter != null ? opts.filter : (() => true);
            this.tree = {};
            this.rowKeys = [];
            this.colKeys = [];
            this.rowTotals = {};
            this.colTotals = {};
            this.allTotal = this.aggregator.map(agg => agg(this, [], []));
            this.sorted = false;
            this.aggregatorsLabel = opts.aggregatorsLabel != null ? opts.aggregatorsLabel : [];
            this.grouping = opts.grouping != null ? opts.grouping : false;
            this.rowGroupBefore = (opts.grouping != null ? opts.grouping.rowGroupBefore : undefined) != null ? (opts.grouping != null ? opts.grouping.rowGroupBefore : undefined) : true;
            this.colGroupBefore = (opts.grouping != null ? opts.grouping.colGroupBefore : undefined) != null ? (opts.grouping != null ? opts.grouping.colGroupBefore : undefined) : false;

            // iterate through input, accumulating data for cells
            PivotData.forEachRecord(this.input, this.derivedAttributes, record => {
                if (this.filter(record)) {
                    return this.processRecord(record);
                }
            });
        }

        //can handle arrays or jQuery selections of tables
        static forEachRecord(input, derivedAttributes, f) {
            let addRecord;
            if ($.isEmptyObject(derivedAttributes)) {
                addRecord = f;
            } else {
                addRecord = function (record) {
                    for (let k in derivedAttributes) {
                        const v = derivedAttributes[k];
                        const left = v(record);
                        if (left != null) {
                            record[k] = left;
                        }
                    }
                    return f(record);
                };
            }

            //if it's a function, have its calls us back
            if ($.isFunction(input)) {
                return input(addRecord);
            } else if ($.isArray(input)) {
                if ($.isArray(input[0])) { //array of arrays
                    return (() => {
                        const result = [];
                        for (let i of Object.keys(input || {})) {
                            const compactRecord = input[i];
                            if (i > 0) {
                                const record = {};
                                for (let j of Object.keys(input[0] || {})) {
                                    const k = input[0][j];
                                    record[k] = compactRecord[j];
                                }
                                result.push(addRecord(record));
                            }
                        }
                        return result;
                    })();
                } else { //array of objects
                    return (() => {
                        const result1 = [];
                        for (let record of input) {
                            result1.push(addRecord(record));
                        }
                        return result1;
                    })();
                }
            } else if (input instanceof $) {
                const tblCols = [];
                $('thead > tr > th', input).each(function (i) {
                    return tblCols.push($(this).text());
                });
                return $('tbody > tr', input).each(function (i) {
                    const record = {};
                    $('td', this).each(function (j) {
                        return record[tblCols[j]] = $(this).text();
                    });
                    return addRecord(record);
                });
            } else {
                throw new Error('unknown input format');
            }
        }

        forEachMatchingRecord(criteria, callback) {
            return PivotData.forEachRecord(this.input, this.derivedAttributes, record => {
                if (!this.filter(record)) {
                    return;
                }
                for (let k in criteria) {
                    const v = criteria[k];
                    if (v !== (record[k] != null ? record[k] : 'null')) {
                        return;
                    }
                }
                return callback(record);
            });
        }

        arrSort(attrs, nulls_first) {

            const sortersArr = [];
            for (const a of attrs) {
                sortersArr.push(getSort(this.sorters, a));
            }

            return function (a, b) {
                for (let i of Object.keys(sortersArr || {})) {
                    const sorter = sortersArr[i];
                    const comparison = sorter(a[i], b[i], nulls_first);
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
                return 0;
            };
        }

        sortKeys() {
            if (!this.sorted) {
                this.sorted = true;
                const v = (r, c) => this.getAggregator(r, c).value();
                switch (this.rowOrder) {
                    case 'value_a_to_z':
                        this.rowKeys.sort((a, b) => naturalSort(v(a, []), v(b, [])));
                        break;
                    case 'value_z_to_a':
                        this.rowKeys.sort((a, b) => -naturalSort(v(a, []), v(b, [])));
                        break;
                    default:
                        this.rowKeys.sort(this.arrSort(this.rowAttrs, this.rowGroupBefore));
                }
                switch (this.colOrder) {
                    case 'value_a_to_z':
                        return this.colKeys.sort((a, b) => naturalSort(v([], a), v([], b)));
                    case 'value_z_to_a':
                        return this.colKeys.sort((a, b) => -naturalSort(v([], a), v([], b)));
                    default:
                        return this.colKeys.sort(this.arrSort(this.colAttrs, this.colGroupBefore));
                }
            }
        }

        getColKeys(all_keys) {
            if (all_keys == null) {
                all_keys = false;
            }
            this.sortKeys();
            if (all_keys) {
                return this.colKeys;
            } else {
                return filterByLength(this.colKeys, this.colAttrs.length);
            }
        }

        getRowKeys(all_keys) {
            if (all_keys == null) {
                all_keys = false;
            }
            this.sortKeys();
            if (all_keys) {
                return this.rowKeys;
            } else {
                return filterByLength(this.rowKeys, this.rowAttrs.length);
            }
        }

        processRecord(record) { //this code is called in a tight loop
            let x;
            let colKeys = [];
            let rowKeys = [];
            for (x of this.colAttrs) {
                colKeys.push(record[x] != null ? record[x] : 'null');
            }
            for (x of this.rowAttrs) {
                rowKeys.push(record[x] != null ? record[x] : 'null');
            }
            colKeys = this.grouping && colKeys.length ? subarrays(colKeys) : [colKeys];
            rowKeys = this.grouping && rowKeys.length ? subarrays(rowKeys) : [rowKeys];

            this.aggregator.forEach((agg, id) => {
                return this.allTotal[id].push(record);
            });

            const result = [];
            for (let j in rowKeys) {
                const rowKey = rowKeys[j];
                const flatRowKey = rowKey.join(String.fromCharCode(0));

                const result1 = [];
                for (let i in colKeys) {
                    const colKey = colKeys[i];
                    const flatColKey = colKey.join(String.fromCharCode(0));

                    if (rowKey.length !== 0) {
                        if (!this.rowTotals[flatRowKey]) {
                            this.rowKeys.push(rowKey);
                            this.rowTotals[flatRowKey] = this.aggregator.map(agg => agg(this, rowKey, []));
                        }
                        this.rowTotals[flatRowKey].forEach((agg, id) => {
                            if (!this.grouping || (colKey.length === 1)) {
                                return agg.push(record);
                            }
                        });
                    }

                    if (colKey.length !== 0) {
                        if (!this.colTotals[flatColKey]) {
                            this.colKeys.push(colKey);
                            this.colTotals[flatColKey] = this.aggregator.map(agg => agg(this, [], colKey));
                        }
                        this.colTotals[flatColKey].forEach((agg, id) => {
                            if (!this.grouping || (rowKey.length === 1)) {
                                return agg.push(record);
                            }
                        });
                    }

                    if ((colKey.length !== 0) && (rowKey.length !== 0)) {
                        if (!this.tree[flatRowKey]) {
                            this.tree[flatRowKey] = {};
                        }
                        if (!this.tree[flatRowKey][flatColKey]) {
                            this.tree[flatRowKey][flatColKey] = this.aggregator.map(agg => agg(this, rowKey, colKey));
                        }
                        result1.push(this.tree[flatRowKey][flatColKey].forEach((agg, id) => agg.push(record)));
                    } else {
                        result1.push(undefined);
                    }
                }
                result.push(result1);
            }
            return result;
        }

        getAggregator(rowKey, colKey, id) {
            let agg;
            if (id == null) {
                id = 0;
            }
            const flatRowKey = rowKey.join(String.fromCharCode(0));
            const flatColKey = colKey.join(String.fromCharCode(0));
            if ((rowKey.length === 0) && (colKey.length === 0)) {
                agg = this.allTotal[id];
            } else if (rowKey.length === 0) {
                agg = this.colTotals[flatColKey] && this.colTotals[flatColKey][id];
            } else if (colKey.length === 0) {
                agg = this.rowTotals[flatRowKey] && this.rowTotals[flatRowKey][id];
            } else {
                agg = this.tree[flatRowKey][flatColKey] && this.tree[flatRowKey][flatColKey][id];
            }
            return agg != null ? agg : {
                value() {
                    return null;
                }, format() {
                    return '';
                },
            };
        }
    }

    //expose these to the outside world
    $.pivotUtilities = {
        aggregatorTemplates, aggregators: defaultAggregators, renderers, derivers, locales,
        naturalSort, numberFormat, sortAs, PivotData,
    };

    /*
    Default Renderer for hierarchical table layout
    */

    function pivotTableRenderer (pivotData, opts) {

        let agg, aggregator, colKey, getClickHandler, i, id, j, td, th, totalAggregator, tr, val, x;
        const defaults = {
            table: {
                clickCallback: null,
                rowTotals: true,
                colTotals: true,
            },
            localeStrings: {
                totals: 'Totals',
            },
        };

        opts = $.extend(true, {}, defaults, opts);

        const {
            colAttrs,
        } = pivotData;
        const {
            rowAttrs,
        } = pivotData;
        const rowKeys = pivotData.getRowKeys(true);
        const colKeys = pivotData.getColKeys(true);

        if (opts.table.clickCallback) {
            getClickHandler = function (value, rowValues, colValues) {
                let attr, i;
                const filters = {};
                for (i of Object.keys(colAttrs || {})) {
                    attr = colAttrs[i];
                    if (colValues[i] != null) {
                        filters[attr] = colValues[i];
                    }
                }
                for (i of Object.keys(rowAttrs || {})) {
                    attr = rowAttrs[i];
                    if (rowValues[i] != null) {
                        filters[attr] = rowValues[i];
                    }
                }
                return e => opts.table.clickCallback(e, value, filters, pivotData);
            };
        }

        const compactLayout = (opts.table.compactLayout != null ? opts.table.compactLayout : true) && pivotData.grouping;
        const rowExpandHandler = compactLayout ? expandRowCol : pivotData.rowGroupBefore ? expandWithSpan : expandRowsGroupAfter;

        const rowsExpandHandler = getExpandHandler(rowKeys, true, rowExpandHandler.bind(pivotData));
        const colsExpandHandler = getExpandHandler(colKeys, false, expandWithSpan.bind(pivotData));

        //now actually build the outpu
        const result = document.createElement('table');
        result.className = 'pvtTable';

        //helper function for setting row/col-span in pivotTableRenderer
        const spanSize = function (arr, i, j) {
            let x;
            if (i !== 0) {
                let asc, end;
                let noDraw = true;
                for (x = 0, end = j, asc = 0 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) {
                    if (arr[i - 1][x] !== arr[i][x]) {
                        noDraw = false;
                    }
                }
                if (noDraw) {
                    return -1; //do not draw cell
                }
            }
            let len = 0;
            while ((i + len) < arr.length) {
                let asc1, end1;
                let stop = false;
                for (x = 0, end1 = j, asc1 = 0 <= end1; asc1 ? x <= end1 : x >= end1; asc1 ? x++ : x--) {
                    if (arr[i][x] !== arr[i + len][x]) {
                        stop = true;
                    }
                }
                if (stop) {
                    break;
                }
                len++;
            }
            return len;
        };

        //the first few rows are for col headers
        const thead = document.createElement('thead');
        for (j of Object.keys(colAttrs || {})) {
            const c = colAttrs[j];
            tr = document.createElement('tr');
            if ((parseInt(j) === 0) && (rowAttrs.length !== 0)) {
                th = document.createElement('th');
                th.setAttribute('colspan', rowAttrs.length);
                th.setAttribute('rowspan', colAttrs.length);
                tr.appendChild(th);
            }
            th = document.createElement('th');
            th.className = 'pvtAxisLabel';
            th.textContent = c;
            if (pivotData.grouping && (j < (colAttrs.length - 1))) {
                th.onclick = getExpandAllHandler(pivotData, +j, false);
                th.className += ` open level${j}`;
            }
            tr.appendChild(th);
            for (i of Object.keys(colKeys || {})) {
                colKey = colKeys[i];
                x = spanSize(colKeys, parseInt(i), parseInt(j));
                if (x !== -1) {
                    th = document.createElement('th');
                    th.className = 'pvtColLabel';
                    th.className += ` col${pivotData.colGroupBefore ? +i : (+i + x) - 1}`;
                    th.textContent = colKey[j];
                    th.setAttribute('colspan', x * Math.max(1, pivotData.aggregator.length));
                    if ((parseInt(j) === (colAttrs.length - 1)) && (rowAttrs.length !== 0)) {
                        th.setAttribute('rowspan', 2);
                    }
                    if (pivotData.grouping && (j < (colAttrs.length - 1)) && colKey[j]) {
                        th.className += ' pvtSubtotal open';
                        th.setAttribute('colspan', x * Math.max(1, pivotData.aggregator.length));
                        th.onclick = colsExpandHandler;
                    }
                    tr.appendChild(th);
                }
            }
            if ((parseInt(j) === 0) && opts.table.rowTotals) {
                th = document.createElement('th');
                th.className = 'pvtTotalLabel pvtRowTotalLabel';
                th.innerHTML = opts.localeStrings.totals;
                th.setAttribute('colspan', Math.max(1, pivotData.aggregator.length));
                th.setAttribute('rowspan', colAttrs.length + (rowAttrs.length === 0 ? 0 : 1));
                tr.appendChild(th);
            }
            thead.appendChild(tr);
        }

        //then a row for row header headers
        if (rowAttrs.length !== 0) {
            tr = document.createElement('tr');
            for (i of Object.keys(rowAttrs || {})) {
                const r = rowAttrs[i];
                th = document.createElement('th');
                th.className = 'pvtAxisLabel';
                th.textContent = r;
                if (pivotData.grouping && (i < (rowAttrs.length - 1))) {
                    th.className += ` open level${i}`;
                    th.onclick = getExpandAllHandler(pivotData, +i, true);
                }
                tr.appendChild(th);
            }
            th = document.createElement('th');
            if (colAttrs.length === 0) {
                th.className = 'pvtTotalLabel pvtRowTotalLabel';
                th.innerHTML = opts.localeStrings.totals;
                th.setAttribute('colspan', pivotData.aggregator.length);
            }
            tr.appendChild(th);
            thead.appendChild(tr);
        }
        result.appendChild(thead);

        //now the actual data rows, with their row headers and totals
        const tbody = document.createElement('tbody');

        if (pivotData.aggregatorsLabel && (pivotData.aggregatorsLabel.length > 1)) {
            let lbl;
            tr = document.createElement('tr');
            th = document.createElement('th');
            const colspan = rowAttrs.length + (colAttrs.length === 0 ? 0 : 1);
            th.setAttribute('colspan', colspan);
            tr.appendChild(th);

            for (j of Object.keys(colKeys || {})) { //this is a tight loop
                colKey = colKeys[j];
                for (lbl of pivotData.aggregatorsLabel) {
                    th = document.createElement('th');
                    th.className = `pvtAggregatorLabel col${j}`;
                    th.textContent = lbl;
                    tr.appendChild(th);
                }
            }

            for (lbl of pivotData.aggregatorsLabel) {
                th = document.createElement('th');
                th.className = 'pvtAggregatorLabel';
                th.textContent = lbl;
                tr.appendChild(th);
            }

            tbody.appendChild(tr);
        }


        for (i of Object.keys(rowKeys || {})) {
            const rowKey = rowKeys[i];
            tr = document.createElement('tr');
            const rowGap = rowAttrs.length - rowKey.length;
            tr.className = rowGap ? `pvtSubtotal level${rowKey.length}` : 'pvtData';
            for (j of Object.keys(rowKey || {})) {
                const txt = rowKey[j];
                if (compactLayout && (j < (rowKey.length - 1))) {
                    continue;
                }
                x = compactLayout ? 1 : spanSize(rowKeys, parseInt(i), parseInt(j));
                if (x !== -1) {
                    th = document.createElement('th');
                    th.className = 'pvtRowLabel';
                    th.className += ` row${pivotData.rowGroupBefore ? +i : (+i + x) - 1}`;
                    th.textContent = txt;
                    th.setAttribute('rowspan', x);
                    if (compactLayout) {
                        th.colSpan = rowAttrs.length;
                        th.style.paddingLeft = 5 + (parseInt(j) * 20) + 'px';
                    }
                    if (pivotData.grouping && (j < (rowAttrs.length - 1))) {
                        th.className += ' open';
                        th.onclick = rowsExpandHandler;
                    }
                    tr.appendChild(th);
                }
            }

            if (!compactLayout && rowGap) {
                th = document.createElement('th');
                th.colSpan = rowGap;
                th.textContent = `Total (${rowKey[j]})`;
                tr.appendChild(th);
            }

            if (colAttrs.length) {
                th.colSpan++;
            }

            for (j of Object.keys(colKeys || {})) { //this is a tight loop
                colKey = colKeys[j];
                for (id = 0; id < pivotData.aggregator.length; id++) {
                    agg = pivotData.aggregator[id];
                    aggregator = pivotData.getAggregator(rowKey, colKey, id);
                    val = aggregator.value(id);
                    td = document.createElement('td');
                    if (!rowGap) {
                        td.className = 'pvtVal ';
                    }
                    td.className += `row${i} col${j}`;
                    if (colAttrs.length - colKey.length) {
                        td.className = `pvtSubtotal level${colKey.length} row${i} col${j}`;
                    }
                    td.textContent = aggregator.format(val);
                    td.setAttribute('data-value', val);
                    if (getClickHandler != null) {
                        td.onclick = getClickHandler(val, rowKey, colKey);
                    }
                    tr.appendChild(td);
                }
            }

            if (opts.table.rowTotals || (colAttrs.length === 0)) {
                for (id = 0; id < pivotData.aggregator.length; id++) {
                    agg = pivotData.aggregator[id];
                    totalAggregator = pivotData.getAggregator(rowKey, [], id);
                    val = totalAggregator.value(id);
                    td = document.createElement('td');
                    td.className = 'pvtTotal rowTotal';
                    td.textContent = totalAggregator.format(val);
                    td.setAttribute('data-value', val);
                    if (getClickHandler != null) {
                        td.onclick = getClickHandler(val, rowKey, []);
                    }
                    td.setAttribute('data-for', 'row' + i);
                    tr.appendChild(td);
                }
            }
            tbody.appendChild(tr);
        }

        //finally, the row for col totals, and a grand total
        if (opts.table.colTotals || (rowAttrs.length === 0)) {
            tr = document.createElement('tr');
            if (opts.table.colTotals || (rowAttrs.length === 0)) {
                th = document.createElement('th');
                th.className = 'pvtTotalLabel pvtColTotalLabel';
                th.innerHTML = opts.localeStrings.totals;
                th.setAttribute('colspan', rowAttrs.length + (colAttrs.length === 0 ? 0 : 1));
                tr.appendChild(th);
            }
            for (j of Object.keys(colKeys || {})) {
                colKey = colKeys[j];
                for (id = 0; id < pivotData.aggregator.length; id++) {
                    agg = pivotData.aggregator[id];
                    totalAggregator = pivotData.getAggregator([], colKey, id);
                    val = totalAggregator.value(id);
                    td = document.createElement('td');
                    td.className = `pvtTotal colTotal col${j}`;
                    if (colKey.length !== colAttrs.length) {
                        td.className += ` pvtSubtotal level${colKey.length}`;
                    }
                    td.textContent = totalAggregator.format(val);
                    td.setAttribute('data-value', val);
                    if (getClickHandler != null) {
                        td.onclick = getClickHandler(val, [], colKey);
                    }
                    td.setAttribute('data-for', 'col' + j);
                    tr.appendChild(td);
                }
            }
            if (opts.table.rowTotals || (colAttrs.length === 0)) {
                for (id = 0; id < pivotData.aggregator.length; id++) {
                    agg = pivotData.aggregator[id];
                    totalAggregator = pivotData.getAggregator([], [], id);
                    val = totalAggregator.value(id);
                    td = document.createElement('td');
                    td.className = 'pvtGrandTotal';
                    td.textContent = totalAggregator.format(val);
                    td.setAttribute('data-value', val);
                    if (getClickHandler != null) {
                        td.onclick = getClickHandler(val, [], []);
                    }
                    tr.appendChild(td);
                }
            }
            tbody.appendChild(tr);
        }
        result.appendChild(tbody);

        //squirrel this away for later
        result.setAttribute('data-numrows', rowKeys.length);
        result.setAttribute('data-numcols', colKeys.length);

        return result;
    }

    /*
    Pivot Table core: create PivotData object and call Renderer on it
    */

    $.fn.pivot = function (input, inputOpts, locale) {
        let e;
        if (locale == null) {
            locale = 'en';
        }
        if ((locales[locale] == null)) {
            locale = 'en';
        }
        inputOpts = inputOpts || {};
        const defaults = {
            cols: [], rows: [], vals: [],
            rowOrder: 'key_a_to_z', colOrder: 'key_a_to_z',
            dataClass: PivotData,
            filter() {
                return true;
            },
            aggregator: aggregatorTemplates.count()(),
            aggregatorName: 'Count',
            sorters: {},
            derivedAttributes: {},
            renderer: pivotTableRenderer,
        };

        const localeStrings = $.extend(true, {}, locales.en.localeStrings, locales[locale].localeStrings);
        const localeDefaults = {
            rendererOptions: { localeStrings },
            localeStrings,
        };

        const opts = $.extend(true, {}, localeDefaults, $.extend({}, defaults, inputOpts));

        let result;
        inputOpts.pivotData = null;
        try {
            const pivotData = new opts.dataClass(input, opts);
            try {
                result = opts.renderer(pivotData, opts.rendererOptions);
                inputOpts.pivotData = pivotData;
            } catch (error) {
                e = error;
                if (typeof console !== 'undefined' && console !== null) {
                    console.error(e.stack);
                }
                result = $('<span>').html(opts.localeStrings.renderError);
            }
        } catch (error1) {
            e = error1;
            if (typeof console !== 'undefined' && console !== null) {
                console.error(e.stack);
            }
            result = $('<span>').html(opts.localeStrings.computeError);
        }

        const x = this[0];
        while (x.hasChildNodes()) {
            x.removeChild(x.lastChild);
        }
        return this.append(result);
    };


    /*
    Pivot Table UI: calls the Pivot Table core above with options set by user
    */

    $.fn.pivotUI = function (input, inputOpts, overwrite, locale) {
        let opts;
        let a, c;
        if (overwrite == null) {
            overwrite = false;
        }
        if (locale == null) {
            locale = 'fr';
        }
        if ((locales[locale] == null)) {
            locale = 'en';
        }

        const defaults = {
            derivedAttributes: {},
            aggregators: defaultAggregators,
            renderers: locales[locale].renderers,
            hiddenAttributes: [],
            hiddenFromAggregators: [],
            hiddenFromDragDrop: [],
            menuLimit: 500,
            cols: [], rows: [], vals: [],
            rowOrder: 'key_a_to_z', colOrder: 'key_a_to_z',
            dataClass: PivotData,
            exclusions: {},
            inclusions: {},
            unusedAttrsVertical: 85,
            autoSortUnusedAttrs: false,
            onRefresh: null,
            showUI: true,
            filter() {
                return true;
            },
            sorters: {},
            multiple: true,
            parametersActive: false,
        };

        let itemsId = 0;
        let aggregators = [];
        const localeStrings = $.extend(true, {}, locales.en.localeStrings, locales[locale].localeStrings);
        const localeDefaults = {
            rendererOptions: { localeStrings },
            localeStrings,
        };

        const renameAggregators = () => aggregators.map((agg, id) =>
            (agg.displayName = String.fromCharCode(97 + id).toUpperCase()));

        const existingOpts = this.data('pivotUIOptions');
        if ((existingOpts == null) || overwrite) {
            opts = $.extend(true, {}, localeDefaults, $.extend({}, defaults, inputOpts));
        } else {
            opts = existingOpts;
        }

        if (!inputOpts?.aggregators && locales[locale].formatters) {
            opts.aggregators = makeAggregators(
                locales[locale].formatters.format,
                locales[locale].formatters.formatInt,
                locales[locale].formatters.formatPct);
        }

        try {
            // do a first pass on the data to cache a materialized copy of any
            // function-valued inputs and to compute dimension cardinalities
            let attr, i, unusedAttrsVerticalAutoCutoff, x;
            const attrValues = {};
            const materializedInput = [];
            let recordsProcessed = 0;
            PivotData.forEachRecord(input, opts.derivedAttributes, function (record) {
                let attr;
                if (!opts.filter(record)) {
                    return;
                }
                materializedInput.push(record);
                for (attr of Object.keys(record || {})) {
                    if ((attrValues[attr] == null)) {
                        attrValues[attr] = {};
                        if (recordsProcessed > 0) {
                            attrValues[attr]['null'] = recordsProcessed;
                        }
                    }
                }
                for (attr in attrValues) {
                    const value = record[attr] != null ? record[attr] : 'null';
                    if (attrValues[attr][value] == null) {
                        attrValues[attr][value] = 0;
                    }
                    attrValues[attr][value]++;
                }
                return recordsProcessed++;
            });

            const uiContainer = $('<div>').addClass('pvtUi');

            const uiMenu = $('<div>').addClass('pvtUiMenu');
            const uiParameters = $('<div>').addClass('pvtUiParameters');
            const uiPivotContainer = $('<div>').addClass('pvtUiContainer');

            const uiButtonColumns = $('<div>')
                .addClass('pvtUiVerticalButton')
                .addClass('pvtUiButtonColumns')
                .addClass('active')
                .text(localeStrings.colsLabel)
                .on('click', function () {
                    opts.parametersActive = !opts.parametersActive;
                    if (opts.parametersActive) {
                        uiButtonColumns.addClass('active');
                        return uiParameters.show();
                    } else {
                        uiButtonColumns.removeClass('active');
                        return uiParameters.hide();
                    }
                })
                .appendTo(uiMenu);

            const uiButtonGroups = $('<div>')
                .addClass('pvtUiVerticalButton')
                .addClass('pvtUiButtonGroups')
                .text(localeStrings.groupsLabel)
                .on('click', function () {
                    if (opts.grouping) {
                        uiButtonGroups.removeClass('active');
                        opts.grouping = false;
                    } else {
                        uiButtonGroups.addClass('active');
                        opts.grouping = {
                            colGroupBefore: false,
                        };
                    }
                    return refresh();
                })
                .appendTo(uiMenu);

            uiContainer
                .append(uiMenu)
                .append(uiParameters)
                .append(uiPivotContainer);

            //# Render type
            $('<div>')
                .addClass('pvtParameterLabel')
                .appendTo(uiParameters)
                .text(localeStrings.rendererLabel);
            let pvtRenderType = $('<div>')
                .addClass('pvtRendererType')
                .addClass('pvtParameter')
                .appendTo(uiParameters);
            const renderer = $('<select>')
                .addClass('pvtRenderer')
                .appendTo(pvtRenderType)
                .bind('change', () => refresh()); //capture reference
            for (x of Object.keys(opts.renderers || {})) {
                $('<option>').val(x).html(x).appendTo(renderer);
            }


            //axis list, including the double click menu
            const unused = $('<div>').addClass('pvtAxisContainer pvtUnused');
            const shownAttributes = [];
            for (a in attrValues) {
                if (!opts.hiddenAttributes.includes(a)) {
                    shownAttributes.push(a);
                }
            }
            const shownInAggregators = [];
            for (c of shownAttributes) {
                if (!opts.hiddenFromAggregators.includes(c)) {
                    shownInAggregators.push(c);
                }
            }
            const shownInDragDrop = [];
            for (c of shownAttributes) {
                if (!opts.hiddenFromDragDrop.includes(c)) {
                    shownInDragDrop.push(c);
                }
            }

            let unusedAttrsVerticalAutoOverride = false;
            if (opts.unusedAttrsVertical === 'auto') {
                unusedAttrsVerticalAutoCutoff = 120; // legacy support
            } else {
                unusedAttrsVerticalAutoCutoff = parseInt(opts.unusedAttrsVertical);
            }

            if (!isNaN(unusedAttrsVerticalAutoCutoff)) {
                let attrLength = 0;
                for (a of shownInDragDrop) {
                    attrLength += a.length;
                }
                unusedAttrsVerticalAutoOverride = attrLength > unusedAttrsVerticalAutoCutoff;
            }

            for (i of Object.keys(shownInDragDrop || {})) {
                attr = shownInDragDrop[i];
                const values = [];
                for (const v in attrValues[attr]) {
                    values.push(v);
                }
                let hasExcludedItem = false;
                const valueList = $('<div>').addClass('pvtFilterBox').hide();

                valueList.append($('<h4>').append(
                        $('<span>').text(attr),
                        $('<span>').addClass('count').text(`(${values.length})`),
                    ),
                );
                if (values.length > opts.menuLimit) {
                    valueList.append($('<p>').html(opts.localeStrings.tooMany));
                } else {
                    if (values.length > 5) {
                        const controls = $('<p>').appendTo(valueList);
                        const sorter = getSort(opts.sorters, attr);
                        const placeholder = opts.localeStrings.filterResults;
                        $('<input>', { type: 'text' }).appendTo(controls)
                            .attr({ placeholder, class: 'pvtSearch' })
                            .bind('keyup', function () {
                                const filter = $(this).val().toLowerCase().trim();
                                const accept_gen = (prefix, accepted) => (function (v) {
                                    const real_filter = filter.substring(prefix.length).trim();
                                    if (real_filter.length === 0) {
                                        return true;
                                    }
                                    let needle = Math.sign(sorter(v.toLowerCase(), real_filter));
                                    return accepted.includes(needle);
                                });
                                const accept =
                                    filter.indexOf('>=') === 0 ? accept_gen('>=', [1, 0])
                                        : filter.indexOf('<=') === 0 ? accept_gen('<=', [-1, 0])
                                            : filter.indexOf('>') === 0 ? accept_gen('>', [1])
                                                : filter.indexOf('<') === 0 ? accept_gen('<', [-1])
                                                    : filter.indexOf('~') === 0 ? function (v) {
                                                            if (filter.substring(1).trim().length === 0) {
                                                                return true;
                                                            }
                                                            return v.toLowerCase().match(filter.substring(1));
                                                        }
                                                        : v => v.toLowerCase().indexOf(filter) !== -1;

                                return valueList.find('.pvtCheckContainer p label span.value').each(function () {
                                    if (accept($(this).text())) {
                                        return $(this).parent().parent().show();
                                    } else {
                                        return $(this).parent().parent().hide();
                                    }
                                });
                            });
                        controls.append($('<br>'));
                        $('<button>', { type: 'button' }).appendTo(controls)
                            .html(opts.localeStrings.selectAll)
                            .bind('click', function () {
                                valueList.find('input:visible:not(:checked)')
                                    .prop('checked', true).toggleClass('changed');
                                return false;
                            });
                        $('<button>', { type: 'button' }).appendTo(controls)
                            .html(opts.localeStrings.selectNone)
                            .bind('click', function () {
                                valueList.find('input:visible:checked')
                                    .prop('checked', false).toggleClass('changed');
                                return false;
                            });
                    }

                    const checkContainer = $('<div>').addClass('pvtCheckContainer').appendTo(valueList);

                    for (let value of values.sort(getSort(opts.sorters, attr))) {
                        const valueCount = attrValues[attr][value];
                        const filterItem = $('<label>');
                        let filterItemExcluded = false;
                        if (opts.inclusions[attr]) {
                            filterItemExcluded = (!opts.inclusions[attr].includes(value));
                        } else if (opts.exclusions[attr]) {
                            filterItemExcluded = (opts.exclusions[attr].includes(value));
                        }
                        if (!hasExcludedItem) {
                            hasExcludedItem = filterItemExcluded;
                        }
                        $('<input>')
                            .attr('type', 'checkbox').addClass('pvtFilter')
                            .attr('checked', !filterItemExcluded).data('filter', [attr, value])
                            .appendTo(filterItem)
                            .bind('change', function () {
                                return $(this).toggleClass('changed');
                            });
                        filterItem.append($('<span>').addClass('value').text(value));
                        filterItem.append($('<span>').addClass('count').text('(' + valueCount + ')'));
                        checkContainer.append($('<p>').append(filterItem));
                    }
                }

                const closeFilterBox = function () {
                    if (valueList.find('[type=\'checkbox\']').length >
                        valueList.find('[type=\'checkbox\']:checked').length) {
                        attrElem.addClass('pvtFilteredAttribute');
                    } else {
                        attrElem.removeClass('pvtFilteredAttribute');
                    }

                    valueList.find('.pvtSearch').val('');
                    valueList.find('.pvtCheckContainer p').show();
                    return valueList.hide();
                };


                const finalButtons = $('<p>').appendTo(valueList);

                if (values.length <= opts.menuLimit) {
                    $('<button>', { type: 'button' }).text(opts.localeStrings.apply)
                        .appendTo(finalButtons).bind('click', function () {
                        if (valueList.find('.changed').removeClass('changed').length) {
                            refresh();
                        }
                        return closeFilterBox();
                    });
                }

                $('<button>', { type: 'button' }).text(opts.localeStrings.cancel)
                    .appendTo(finalButtons).bind('click', function () {
                    valueList.find('.changed:checked')
                        .removeClass('changed').prop('checked', false);
                    valueList.find('.changed:not(:checked)')
                        .removeClass('changed').prop('checked', true);
                    return closeFilterBox();
                });

                const triangleLink = $('<span>').addClass('pvtTriangle')
                    .html(' &#x25BE;').bind('click', function (e) {
                        const { left, top } = $(e.currentTarget).position();
                        return valueList.css({ left: left + 10, top: top + 10 }).show();
                    });

                const attrElem = $('<li>').addClass(`axis_${i}`)
                    .append($('<span>').addClass('pvtAttr').text(attr).data('attrName', attr).append(triangleLink));

                if (hasExcludedItem) {
                    attrElem.addClass('pvtFilteredAttribute');
                }
                unused.append(attrElem).append(valueList);
            }

            $('<div>')
                .addClass('pvtParameterLabel')
                .appendTo(uiParameters)
                .text(localeStrings.valuesLabel);

            //aggregator menu and value area
            const divAggregator = $('<div>')
                .addClass('pvtAggregatorChoose')
                .addClass('pvtParameter')
                .appendTo(uiParameters);

            const aggregator = $('<select>')
                .addClass('pvtAggregator')
                .appendTo(divAggregator)
                .bind('change', () => {
                    if (!opts.multiple) {
                        this.find('.pvtVals .pvtAttrDropdown').each(function () {
                            return this.remove();
                        });
                        aggregators = [{ id: 1, value: aggregator.val() }];
                        return refresh();
                    }
                }); //capture reference

            for (x of Object.keys(opts.aggregators || {})) {
                aggregator.append($('<option>').val(x).html(locales[locale].localeStrings[x] || locales['en'].localeStrings[x] || x));
            }

            if (opts.multiple) {
                $('<a>', { role: 'button' })
                    .addClass('pvtAddAggregator')
                    .addClass('pvtToolButton')
                    .appendTo(divAggregator)
                    .html('+')
                    .bind('click', function () {
                        aggregators.push({ id: ++itemsId, value: aggregator.val() });
                        renameAggregators();
                        return refresh();
                    });
            }

            const ordering = {
                key_a_to_z: { rowSymbol: '&varr;', colSymbol: '&harr;', next: 'value_a_to_z' },
                value_a_to_z: { rowSymbol: '&darr;', colSymbol: '&rarr;', next: 'value_z_to_a' },
                value_z_to_a: { rowSymbol: '&uarr;', colSymbol: '&larr;', next: 'key_a_to_z' },
            };

            const rowOrderArrow = $('<a>', { role: 'button' })
                .addClass('pvtRowOrder')
                .addClass('pvtToolButton')
                .appendTo(divAggregator)
                .data('order', opts.rowOrder).html(ordering[opts.rowOrder].rowSymbol)
                .bind('click', function () {
                    $(this).data('order', ordering[$(this).data('order')].next);
                    $(this).html(ordering[$(this).data('order')].rowSymbol);
                    return refresh();
                });

            const colOrderArrow = $('<a>', { role: 'button' })
                .addClass('pvtColOrder')
                .addClass('pvtToolButton')
                .appendTo(divAggregator)
                .data('order', opts.colOrder).html(ordering[opts.colOrder].colSymbol)
                .bind('click', function () {
                    $(this).data('order', ordering[$(this).data('order')].next);
                    $(this).html(ordering[$(this).data('order')].colSymbol);
                    return refresh();
                });

            const pvVals = $('<div>').addClass('pvtVals')
                .addClass('pvtParameter')
                .appendTo(uiParameters);

            uiParameters.append(pvVals);

            // Available fields
            $('<div>')
                .addClass('pvtParameterLabel')
                .appendTo(uiParameters)
                .text(localeStrings.fieldsLabel);

            uiParameters.append(unused);

            //column axes
            $('<div>')
                .addClass('pvtParameterLabel')
                .appendTo(uiParameters)
                .text(localeStrings.colsLabel);

            $('<div>').addClass('pvtAxisContainer pvtCols').appendTo(uiParameters);

            //row axes
            $('<div>')
                .addClass('pvtParameterLabel')
                .appendTo(uiParameters)
                .text(localeStrings.rowsLabel);
            $('<div>').addClass('pvtAxisContainer pvtRows').appendTo(uiParameters);

            //the actual pivot table container
            const pivotTable = $('<div>')
                .addClass('pvtRendererArea')
                .appendTo(uiPivotContainer);

            //render the UI in its default state
            this.html(uiContainer);

            if (!opts.parametersActive) {
                uiButtonColumns.removeClass('active');
                uiParameters.hide();
            }

            //set up the UI initial state as requested by moving elements around

            let initialRender = true;

            //set up for refreshing
            const refreshDelayed = () => {
                let vals;
                const subopts = {
                    derivedAttributes: opts.derivedAttributes,
                    localeStrings: opts.localeStrings,
                    rendererOptions: opts.rendererOptions,
                    sorters: opts.sorters,
                    cols: [], rows: [],
                    dataClass: opts.dataClass,
                    grouping: opts.grouping,
                };

                this.find('.pvtRows li span.pvtAttr').each(function () {
                    return subopts.rows.push($(this).data('attrName'));
                });
                this.find('.pvtCols li span.pvtAttr').each(function () {
                    return subopts.cols.push($(this).data('attrName'));
                });

                let numInputsToProcess = 0;

                const aggVals = [];
                let j = 0, idx = j;
                for (; j < aggregators.length; j++, idx = j) {
                    let aggregatorType;
                    const agg = aggregators[idx];
                    if (typeof agg === 'object') {
                        aggregatorType = agg.value;
                    }
                    const aggIdx = agg.id;
                    const initialVals = agg.vals;

                    const left = opts.aggregators[aggregatorType]([])().numInputs;
                    if (left != null) {
                        numInputsToProcess = left;
                    } else {
                        numInputsToProcess = 0;
                    }
                    vals = [];
                    this.find('.pvtVals select.pvtAttrDropdown' + aggIdx).each(function () {
                        if (numInputsToProcess !== 0) {
                            numInputsToProcess--;
                            if ($(this).val() !== '') {
                                return vals.push($(this).val());
                            }
                        }
                    });


                    const pvtVals = this.find('.pvtVals');
                    let container = this.find('.pvtVals .pvtAttrDropdownContainer' + aggIdx);
                    const found = container.length > 0;
                    if (opts.multiple) {
                        let labelAggregator;
                        if (!found) {
                            container = $('<div>')
                                .addClass('pvtAttrDropdownContainer')
                                .addClass('pvtAttrDropdownContainer' + aggIdx)
                                .appendTo(pvtVals);
                            labelAggregator = locales[locale].localeStrings[aggregatorType] || locales['en'].localeStrings[aggregatorType] || aggregatorType;
                            $('<label>')
                                .addClass('pvtAttrDropdown')
                                .addClass('pvtAttrDropdown' + aggIdx)
                                .appendTo(container)
                                .html('<b>' + agg.displayName + '</b>) ' + labelAggregator);
                            initialRender = true;
                        }

                        if (!initialRender) {
                            this.find('.pvtVals .pvtAttrDropdownContainer' + aggIdx + ' label.pvtAttrDropdown')
                                .each(function () {
                                    labelAggregator = locales[locale].localeStrings[aggregatorType] || locales['en'].localeStrings[aggregatorType] || aggregatorType;
                                    return $(this).html('<b>' + agg.displayName + '</b>) ' + labelAggregator);
                                });
                        }
                    } else {
                        container = pvtVals;
                    }

                    if (numInputsToProcess !== 0) {
                        let asc, end;
                        for (x = 0, end = numInputsToProcess, asc = 0 <= end; asc ? x < end : x > end; asc ? x++ : x--) {
                            const newDropdown = $('<select>')
                                .addClass('pvtAttrDropdown' + aggIdx)
                                .addClass('pvtAttrDropdown')
                                .append($('<option>'))
                                .bind('change', () => refresh());
                            for (attr of shownInAggregators) {
                                newDropdown.append($('<option>').val(attr).text(attr));
                            }
                            container.append(newDropdown);
                        }
                    }


                    if (opts.multiple && !found) {
                        $('<a>')
                            .html('x')
                            .addClass('pvtRemoveAggregator')
                            .addClass('pvtToolButton')
                            .addClass('pvtAttrDropdown' + aggIdx)
                            .appendTo(container)
                            .bind('click', (function () {
                                    this.instance.find('.pvtVals .pvtAttrDropdownContainer' + this.aggIdx).remove();
                                    idx = aggregators.findIndex(agg => agg.id === this.aggIdx);
                                    aggregators.splice(idx, 1);
                                    renameAggregators();
                                    return refresh();
                                }).bind({ instance: this, aggIdx }),
                            );
                    }

                    if (initialRender) {
                        vals = initialVals != null ? initialVals : opts.vals;
                        i = 0;
                        this.find('.pvtVals select.pvtAttrDropdown' + aggIdx).each(function () {
                            $(this).val(vals[i]);
                            return i++;
                        });
                        initialRender = false;
                    }

                    aggVals.push(vals);
                }

                subopts.aggregatorName = aggregators.map(agg => agg.value);
                subopts.vals = aggVals;
                subopts.aggregator = aggregators.map((agg, i) => opts.aggregators[agg.value](aggVals[i]));
                subopts.renderer = opts.renderers[renderer.val()];
                subopts.rowOrder = rowOrderArrow.data('order');
                subopts.colOrder = colOrderArrow.data('order');
                if (opts.multiple) {
                    subopts.aggregatorsLabel = aggregators.map(agg => agg.displayName);
                }

                //construct filter here
                const exclusions = {};
                this.find('input.pvtFilter').not(':checked').each(function () {
                    const filter = $(this).data('filter');
                    if (exclusions[filter[0]] != null) {
                        return exclusions[filter[0]].push(filter[1]);
                    } else {
                        return exclusions[filter[0]] = [filter[1]];
                    }
                });
                //include inclusions when exclusions present
                const inclusions = {};
                this.find('input.pvtFilter:checked').each(function () {
                    const filter = $(this).data('filter');
                    if (exclusions[filter[0]] != null) {
                        if (inclusions[filter[0]] != null) {
                            return inclusions[filter[0]].push(filter[1]);
                        } else {
                            return inclusions[filter[0]] = [filter[1]];
                        }
                    }
                });

                subopts.filter = function (record) {
                    if (!opts.filter(record)) {
                        return false;
                    }
                    for (let k in exclusions) {
                        const excludedItems = exclusions[k];
                        if (excludedItems.includes('' + (record[k] != null ? record[k] : 'null'))) {
                            return false;
                        }
                    }
                    return true;
                };

                pivotTable.pivot(materializedInput, subopts);
                const pivotUIOptions = $.extend({}, opts, {
                        cols: subopts.cols,
                        rows: subopts.rows,
                        colOrder: subopts.colOrder,
                        rowOrder: subopts.rowOrder,
                        vals: aggVals,
                        exclusions,
                        inclusions,
                        inclusionsInfo: inclusions, //duplicated for backwards-compatibility
                        aggregatorName: aggregators.map(agg => agg.value),
                        rendererName: renderer.val(),
                    },
                );

                const currentPivotData = subopts.pivotData;
                delete subopts.pivotData;
                this.data('pivotUIOptions', pivotUIOptions);

                // if requested, make sure unused columns are in alphabetical order
                if (opts.autoSortUnusedAttrs) {
                    const unusedAttrsContainer = this.find('td.pvtUnused.pvtAxisContainer');
                    $(unusedAttrsContainer).children('li')
                        .sort((a, b) => naturalSort($(a).text(), $(b).text()))
                        .appendTo(unusedAttrsContainer);
                }

                pivotTable.css('opacity', 1);
                if (opts.onRefresh != null) {
                    return opts.onRefresh(pivotUIOptions, currentPivotData);
                }
            };

            const refresh = () => {
                pivotTable.css('opacity', 0.5);
                return setTimeout(refreshDelayed, 10);
            };

            for (x of opts.cols) {
                this.find('.pvtCols').append(this.find(`.axis_${$.inArray(x, shownInDragDrop)}`));
            }
            for (x of opts.rows) {
                this.find('.pvtRows').append(this.find(`.axis_${$.inArray(x, shownInDragDrop)}`));
            }
            if (opts.aggregatorName != null) {
                if (opts.multiple) {
                    opts.aggregatorName = Array.isArray(opts.aggregatorName) ? opts.aggregatorName : [opts.aggregatorName];
                    for (let idx = 0; idx < opts.aggregatorName.length; idx++) {
                        const agg = opts.aggregatorName[idx];
                        aggregators.push({
                            id: ++itemsId,
                            value: agg,
                            vals: (opts.vals != null ? opts.vals[idx] : undefined),
                        });
                        renameAggregators();
                    }
                } else {
                    this.find('.pvtVals').append(this.find('.pvtAttrDropdown'));
                    this.find('.pvtAggregator').val(opts.aggregatorName).change();
                }
            } else {
                this.find('.pvtAggregator').change();
            }
            if (opts.rendererName != null) {
                this.find('.pvtRenderer').val(opts.rendererName);
            }

            if (!opts.showUI) {
                this.find('.pvtUiCell').hide();
            }

            //the very first refresh will actually display the table
            refresh();

            this.find('.pvtAxisContainer').sortable({
                update(e, ui) {
                    if ((ui.sender == null)) {
                        return refresh();
                    }
                },
                connectWith: this.find('.pvtAxisContainer'),
                items: 'li',
                placeholder: 'pvtPlaceholder',
            });
        } catch (error) {
            console.error(error);
            this.html(opts.localeStrings.uiRenderError);
        }
        return this;
    };

    /*
    Heatmap post-processing
    */

    $.fn.heatmap = function (scope, opts) {
        if (scope == null) {
            scope = 'heatmap';
        }
        const numRows = this.data('numrows');
        const numCols = this.data('numcols');

        // given a series of values
        // must return a function to map a given value to a CSS color
        let colorScaleGenerator = opts?.heatmap?.colorScaleGenerator;
        if (colorScaleGenerator == null) {
            colorScaleGenerator = function (values) {
                const min = Math.min(...(values || []));
                const max = Math.max(...(values || []));
                return function (x) {
                    const nonRed = 255 - Math.round((255 * (x - min)) / (max - min));
                    return `rgb(255,${nonRed},${nonRed})`;
                };
            };
        }

        const heatmapper = scope => {
            const forEachCell = f => {
                return this.find(scope).each(function () {
                    const x = $(this).data('value');
                    if ((x != null) && isFinite(x)) {
                        return f(x, $(this));
                    }
                });
            };

            const values = [];
            forEachCell(x => values.push(x));
            const colorScale = colorScaleGenerator(values);
            return forEachCell((x, elem) => elem.css('background-color', colorScale(x)));
        };

        switch (scope) {
            case 'heatmap':
                heatmapper('.pvtVal');
                break;
            case 'rowheatmap':
                for (let i = 0, end = numRows, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                    heatmapper(`.pvtVal.row${i}`);
                }
                break;
            case 'colheatmap':
                for (let j = 0, end1 = numCols, asc1 = 0 <= end1; asc1 ? j < end1 : j > end1; asc1 ? j++ : j--) {
                    heatmapper(`.pvtVal.col${j}`);
                }
                break;
        }

        heatmapper('.pvtTotal.rowTotal');
        heatmapper('.pvtTotal.colTotal');

        return this;
    };

    /*
    Barchart post-processing
    */

    $.fn.barchart = function (opts) {
        const numRows = this.data('numrows');
        const numCols = this.data('numcols');

        const barcharter = scope => {
            const forEachCell = f => {
                return this.find(scope).each(function () {
                    const x = $(this).data('value');
                    if ((x != null) && isFinite(x)) {
                        return f(x, $(this));
                    }
                });
            };

            const values = [];
            forEachCell(x => values.push(x));
            let max = Math.max(...(values || []));
            if (max < 0) {
                max = 0;
            }
            let range = max;
            const min = Math.min(...(values || []));
            if (min < 0) {
                range = max - min;
            }
            const scaler = x => (100 * x) / (1.4 * range);
            return forEachCell(function (x, elem) {
                const text = elem.text();
                const wrapper = $('<div>').css({
                    'position': 'relative',
                    'height': '55px',
                });
                let bgColor = 'gray';
                let bBase = 0;
                if (min < 0) {
                    bBase = scaler(-min);
                }
                if (x < 0) {
                    bBase += scaler(x);
                    bgColor = 'darkred';
                    x = -x;
                }
                wrapper.append($('<div>').css({
                        'position': 'absolute',
                        'bottom': bBase + '%',
                        'left': 0,
                        'right': 0,
                        'height': scaler(x) + '%',
                        'background-color': bgColor,
                    }),
                );
                wrapper.append($('<div>').text(text).css({
                        'position': 'relative',
                        'padding-left': '5px',
                        'padding-right': '5px',
                    }),
                );

                return elem.css({ 'padding': 0, 'padding-top': '5px', 'text-align': 'center' }).html(wrapper);
            });
        };

        for (let i = 0, end = numRows, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
            barcharter(`.pvtVal.row${i}`);
        }
        barcharter('.pvtTotal.colTotal');

        return this;
    };

    /*
    Grouping fold/expand rows and cols
    */

    const childIndex = el => Array.prototype.indexOf.call(el.parentNode.children, el);

    const childKeysIndices = function (keys, n) {
        const up = keys[0].length === 1 ? 1 : -1;
        const len = keys[n].length;

        const result = [];
        n = n + up;
        let key = keys[n];
        while (key && key.length > len) {
            if (key.length === (len + 1)) {
                result.push(n);
            } else {
                continue;
            }
            n = n + up;
            key = keys[n];
        }
        return result;
    };

    const parentKeysIndices = function (keys, n) {
        const up = keys[0].length === 1 ? 1 : -1;
        const result = [];
        let len = keys[n].length;
        while (len > 1) {
            let key;
            n = n - up;
            key = keys[n];
            while (key && key.length >= len) {
                n = n - up;
                key = keys[n];
            }
            result.push(n);

            len = keys[n].length;
        }
        return result;
    };

    const levelKeysIndices = (keys, level) => (keys.filter(d => d.length === level)).map(keys.indexOf.bind(keys));

    const getAxis = function (table, rows, level) {
        if (rows) {
            return table.find(`thead tr:last-child th.pvtAxisLabel:nth-of-type(${level})`);
        } else {
            return table.find(`thead tr:nth-child(${level}) th.pvtAxisLabel`);
        }
    };

    const getHeader = (table, rows, n) => table.find(rows ? `tbody tr th.row${n}` : `thead th.col${n}`);

    const rowGetter = function (table) {
        const selecttion = table.find('tbody tr');
        return n => $(selecttion[n]);
    };

    const colGetter = function (table) {
        const selecttion = table.find('tr');
        return n => selecttion.find(`.col${n}`);
    };

    const showHide = function (getter, keys, nth, offset, show) {
        const object = childKeysIndices(keys, nth);
        for (let i in object) {
            const n = object[i];
            const row = getter(n + offset);
            const fn = show ? $.fn.show : $.fn.hide;
            fn.call(row);
            if (!row.hasClass('collapsed')) {
                showHide(getter, keys, n, offset, show);
            }
        }
        return true;
    };

    const expandRowsGroupAfter = function (cell, rows, keys, nth) {
        const table = $(cell).closest('table');
        const initIndex = childIndex(cell.parentNode);
        const getter = rowGetter(table);
        const row = getter(nth);

        const insertPoint = row.hasClass('collapsed') ? getter(cell._old) : row;
        if (!row.hasClass('collapsed')) {
            cell._old = childIndex(cell.parentNode);
        }
        insertPoint.prepend(cell);

        const object = parentKeysIndices(keys, nth);
        for (let i in object) {
            const p = object[i];
            const parent = (getHeader(table, rows, p))[0];
            const parentIndex = childIndex(parent.parentNode);
            parent._old = parent._old != null ? parent._old : parentIndex;
            if ((parent._old === initIndex) && (parent.rowSpan === 1)) {
                parent._old -= initIndex - childIndex(cell.parentNode);
            }

            if (initIndex === parentIndex) {
                insertPoint.prepend(parent);
            }
        }

        return expandWithSpan(cell, rows, keys, nth);
    };

    const expandRowCol = function (cell, rows, keys, nth, parent) {
        const table = $(cell).closest('table');
        const getter = rows ? rowGetter(table) : colGetter(table);
        const span = rows ? 'rowSpan' : 'colSpan';

        const offset = rows && (this.aggregator.length > 1) ? 1 : 0;
        if ((parent != null ? parent[span] : undefined) !== 1) {
            showHide(getter, keys, nth, offset, getter(nth + offset).hasClass('collapsed'));
        }
        getter(nth + offset).toggleClass('collapsed');
        return $(cell).toggleClass('open close');
    };

    const expandAll = function (pivotData, table, level, rows, expand) {
        let i;
        if (expand && (level > 1)) {
            getAxis(table, rows, level - 1).removeClass('close').addClass('open');
            expandAll(pivotData, table, level - 1, rows, expand);
        }

        const levels = (rows ? pivotData.rowAttrs : pivotData.colAttrs).length - 1;
        if (!expand && (level < levels)) {
            let asc, end, start;
            for (start = level + 1, i = start, end = levels, asc = start <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
                getAxis(table, rows, i).removeClass('open').addClass('close');
            }
        }

        const keys = rows ? pivotData.rowKeys : pivotData.colKeys;
        const object = levelKeysIndices(keys, level);
        for (i in object) {
            const n = object[i];
            const el = getHeader(table, rows, n);
            if (expand === el.hasClass('close')) {
                el.trigger('click');
            }
        }
        return null;
    };

    const getExpandHandler = (keys, rows, handler) => (function (ev) {
        const match = ev.target.className.match(rows ? /row(\d+)/ : /col(\d+)/);
        if (match) {
            return handler(ev.target, rows, keys, +match[1]);
        }
    });

    return getExpandAllHandler = (pivotData, level, rows) => (function (ev) {
        expandAll(pivotData, $(ev.target).closest('table'), level + 1, rows, $(ev.target).hasClass('close'));
        return $(ev.target).toggleClass('open close');
    });
})(jQuery);

