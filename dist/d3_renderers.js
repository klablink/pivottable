"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// noinspection JSUnresolvedReference,NpmUsedModulesInstalled

/** global: jQuery, define, d3 */

var callWithJQueryAndD3 = function callWithJQueryAndD3(pivotModule) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
    // CommonJS
    return pivotModule(require('jquery'), require('d3'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    return define(['jquery', 'd3'], pivotModule);
    // Plain browser env
  } else {
    return pivotModule(jQuery, d3);
  }
};
callWithJQueryAndD3(function ($, d3) {
  return $.pivotUtilities.d3_renderers = {
    Treemap: function Treemap(pivotData, opts) {
      var value;
      var defaults = {
        localeStrings: {},
        d3: {
          width: function width() {
            return $(window).width() / 1.4;
          },
          height: function height() {
            return $(window).height() / 1.4;
          }
        }
      };
      opts = $.extend(true, {}, defaults, opts);
      var result = $('<div>').css({
        width: '100%',
        height: '100%'
      });
      var tree = {
        name: 'All',
        children: []
      };
      var addToTree = function addToTree(tree, path, value) {
        if (path.length === 0) {
          tree.value = value;
          return;
        }
        if (tree.children == null) {
          tree.children = [];
        }
        var x = path.shift();
        var _iterator = _createForOfIteratorHelper(tree.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            if (child.name === x) {
              addToTree(child, path, value);
              return;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var newChild = {
          name: x
        };
        addToTree(newChild, path, value);
        return tree.children.push(newChild);
      };
      var _iterator2 = _createForOfIteratorHelper(pivotData.getRowKeys()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var rowKey = _step2.value;
          value = pivotData.getAggregator(rowKey, []).value();
          if (value != null) {
            addToTree(tree, rowKey, value);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var color = d3.scale.category10();
      var width = opts.d3.width();
      var height = opts.d3.height();
      var treemap = d3.layout.treemap().size([width, height]).sticky(true).value(function (d) {
        return d.size;
      });
      d3.select(result[0]).append('div').style('position', 'relative').style('width', width + 'px').style('height', height + 'px').datum(tree).selectAll('.node').data(treemap.padding([15, 0, 0, 0]).value(function (d) {
        return d.value;
      }).nodes).enter().append('div').attr('class', 'node').style('background', function (d) {
        if (d.children != null) {
          return 'lightgrey';
        } else {
          return color(d.name);
        }
      }).text(function (d) {
        return d.name;
      }).call(function () {
        this.style('left', function (d) {
          return d.x + 'px';
        }).style('top', function (d) {
          return d.y + 'px';
        }).style('width', function (d) {
          return Math.max(0, d.dx - 1) + 'px';
        }).style('height', function (d) {
          return Math.max(0, d.dy - 1) + 'px';
        });
      });
      return result;
    }
  };
});
//# sourceMappingURL=d3_renderers.js.map
