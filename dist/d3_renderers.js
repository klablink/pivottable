"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

var callWithJQueryAndD3 = function callWithJQueryAndD3(pivotModule) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
    // CommonJS
    return pivotModule(require("jquery"), require("d3"));
  } else if (typeof define === "function" && define.amd) {
    // AMD
    return define(["jquery", "d3"], pivotModule);
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
        for (var _i = 0, _Array$from = Array.from(tree.children); _i < _Array$from.length; _i++) {
          var child = _Array$from[_i];
          if (child.name === x) {
            addToTree(child, path, value);
            return;
          }
        }
        var newChild = {
          name: x
        };
        addToTree(newChild, path, value);
        return tree.children.push(newChild);
      };
      for (var _i2 = 0, _Array$from2 = Array.from(pivotData.getRowKeys()); _i2 < _Array$from2.length; _i2++) {
        var rowKey = _Array$from2[_i2];
        value = pivotData.getAggregator(rowKey, []).value();
        if (value != null) {
          addToTree(tree, rowKey, value);
        }
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
