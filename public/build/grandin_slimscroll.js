(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["grandin_slimscroll"],{

/***/ "./assets/grandin_theme/js/jquery.slimscroll.js":
/*!******************************************************!*\
  !*** ./assets/grandin_theme/js/jquery.slimscroll.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {__webpack_require__(/*! core-js/modules/es.function.bind */ "./node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.parse-float */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.parse-int */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.6
 *
 */
(function ($) {
  $.fn.extend({
    slimScroll: function slimScroll(options) {
      var defaults = {
        // width in pixels of the visible scroll area
        width: 'auto',
        // height in pixels of the visible scroll area
        height: '250px',
        // width in pixels of the scrollbar and rail
        size: '7px',
        // scrollbar color, accepts any hex/color value
        color: '#000',
        // scrollbar position - left/right
        position: 'right',
        // distance in pixels between the side edge and the scrollbar
        distance: '1px',
        // default scroll position on load - top / bottom / $('selector')
        start: 'top',
        // sets scrollbar opacity
        opacity: .4,
        // enables always-on mode for the scrollbar
        alwaysVisible: false,
        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut: false,
        // sets visibility of the rail
        railVisible: false,
        // sets rail color
        railColor: '#333',
        // sets rail opacity
        railOpacity: .2,
        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable: true,
        // defautlt CSS class of the slimscroll rail
        railClass: 'slimScrollRail',
        // defautlt CSS class of the slimscroll bar
        barClass: 'slimScrollBar',
        // defautlt CSS class of the slimscroll wrapper
        wrapperClass: 'slimScrollDiv',
        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll: false,
        // scroll amount applied to each mouse wheel step
        wheelStep: 20,
        // scroll amount applied when user is using gestures
        touchScrollStep: 200,
        // sets border radius
        borderRadius: '7px',
        // sets border radius of the rail
        railBorderRadius: '7px'
      };
      var o = $.extend(defaults, options); // do it for every element that matches selector

      this.each(function () {
        var isOverPanel,
            isOverBar,
            isDragg,
            queueHide,
            touchDif,
            barHeight,
            percentScroll,
            lastScroll,
            divS = '<div></div>',
            minBarHeight = 30,
            releaseScroll = false; // used in event handlers and for better minification

        var me = $(this); // ensure we are not binding it again

        if (me.parent().hasClass(o.wrapperClass)) {
          // start from last bar position
          var offset = me.scrollTop(); // find bar and rail

          bar = me.closest('.' + o.barClass);
          rail = me.closest('.' + o.railClass);
          getBarHeight(); // check if we should scroll existing instance

          if ($.isPlainObject(options)) {
            // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
            if ('height' in options && options.height == 'auto') {
              me.parent().css('height', 'auto');
              me.css('height', 'auto');
              var height = me.parent().parent().height();
              me.parent().css('height', height);
              me.css('height', height);
            }

            if ('scrollTo' in options) {
              // jump to a static point
              offset = parseInt(o.scrollTo);
            } else if ('scrollBy' in options) {
              // jump by value pixels
              offset += parseInt(o.scrollBy);
            } else if ('destroy' in options) {
              // remove slimscroll elements
              bar.remove();
              rail.remove();
              me.unwrap();
              return;
            } // scroll content by the given offset


            scrollContent(offset, false, true);
          }

          return;
        } else if ($.isPlainObject(options)) {
          if ('destroy' in options) {
            return;
          }
        } // optionally set height to the parent's height


        o.height = o.height == 'auto' ? me.parent().height() : o.height; // wrap content

        var wrapper = $(divS).addClass(o.wrapperClass).css({
          position: 'relative',
          overflow: 'hidden',
          width: o.width,
          height: o.height
        }); // update style for the div

        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        }); // create scrollbar rail

        var rail = $(divS).addClass(o.railClass).css({
          width: o.size,
          height: '100%',
          position: 'absolute',
          top: 0,
          display: o.alwaysVisible && o.railVisible ? 'block' : 'none',
          'border-radius': o.railBorderRadius,
          background: o.railColor,
          opacity: o.railOpacity,
          zIndex: 90
        }); // create scrollbar

        var bar = $(divS).addClass(o.barClass).css({
          background: o.color,
          width: o.size,
          position: 'absolute',
          top: 0,
          opacity: o.opacity,
          display: o.alwaysVisible ? 'block' : 'none',
          'border-radius': o.borderRadius,
          BorderRadius: o.borderRadius,
          MozBorderRadius: o.borderRadius,
          WebkitBorderRadius: o.borderRadius,
          zIndex: 99
        }); // set position

        var posCss = o.position == 'right' ? {
          right: o.distance
        } : {
          left: o.distance
        };
        rail.css(posCss);
        bar.css(posCss); // wrap it

        me.wrap(wrapper); // append to parent div

        me.parent().append(bar);
        me.parent().append(rail); // make it draggable and no longer dependent on the jqueryUI

        if (o.railDraggable) {
          bar.bind("mousedown", function (e) {
            var $doc = $(document);
            isDragg = true;
            t = parseFloat(bar.css('top'));
            pageY = e.pageY;
            $doc.bind("mousemove.slimScroll", function (e) {
              currTop = t + e.pageY - pageY;
              bar.css('top', currTop);
              scrollContent(0, bar.position().top, false); // scroll content
            });
            $doc.bind("mouseup.slimScroll", function (e) {
              isDragg = false;
              hideBar();
              $doc.unbind('.slimScroll');
            });
            return false;
          }).bind("selectstart.slimScroll", function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
          });
        } // on rail over


        rail.hover(function () {
          showBar();
        }, function () {
          hideBar();
        }); // on bar over

        bar.hover(function () {
          isOverBar = true;
        }, function () {
          isOverBar = false;
        }); // show on parent mouseover

        me.hover(function () {
          isOverPanel = true;
          showBar();
          hideBar();
        }, function () {
          isOverPanel = false;
          hideBar();
        }); // support for mobile

        me.bind('touchstart', function (e, b) {
          if (e.originalEvent.touches.length) {
            // record where touch started
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });
        me.bind('touchmove', function (e) {
          // prevent scrolling the page if necessary
          if (!releaseScroll) {
            e.originalEvent.preventDefault();
          }

          if (e.originalEvent.touches.length) {
            // see how far user swiped
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep; // scroll content

            scrollContent(diff, true);
            touchDif = e.originalEvent.touches[0].pageY;
          }
        }); // set up initial height

        getBarHeight(); // check start position

        if (o.start === 'bottom') {
          // scroll content to bottom
          bar.css({
            top: me.outerHeight() - bar.outerHeight()
          });
          scrollContent(0, true);
        } else if (o.start !== 'top') {
          // assume jQuery selector
          scrollContent($(o.start).position().top, null, true); // make sure bar stays hidden

          if (!o.alwaysVisible) {
            bar.hide();
          }
        } // attach scroll events


        attachWheel(this);

        function _onWheel(e) {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) {
            return;
          }

          var e = e || window.event;
          var delta = 0;

          if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
          }

          if (e.detail) {
            delta = e.detail / 3;
          }

          var target = e.target || e.srcTarget || e.srcElement;

          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(delta, true);
          } // stop window scroll


          if (e.preventDefault && !releaseScroll) {
            e.preventDefault();
          }

          if (!releaseScroll) {
            e.returnValue = false;
          }
        }

        function scrollContent(y, isWheel, isJump) {
          releaseScroll = false;
          var delta = y;
          var maxTop = me.outerHeight() - bar.outerHeight();

          if (isWheel) {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight(); // move bar, make sure it doesn't go out

            delta = Math.min(Math.max(delta, 0), maxTop); // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity

            delta = y > 0 ? Math.ceil(delta) : Math.floor(delta); // scroll the scrollbar

            bar.css({
              top: delta + 'px'
            });
          } // calculate actual scroll amount


          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump) {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            bar.css({
              top: offsetTop + 'px'
            });
          } // scroll content


          me.scrollTop(delta); // fire scrolling event

          me.trigger('slimscrolling', ~~delta); // ensure bar is visible

          showBar(); // trigger hide when scroll is stopped

          hideBar();
        }

        function attachWheel(target) {
          if (window.addEventListener) {
            target.addEventListener('DOMMouseScroll', _onWheel, false);
            target.addEventListener('mousewheel', _onWheel, false);
          } else {
            document.attachEvent("onmousewheel", _onWheel);
          }
        }

        function getBarHeight() {
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max(me.outerHeight() / me[0].scrollHeight * me.outerHeight(), minBarHeight);
          bar.css({
            height: barHeight + 'px'
          }); // hide scrollbar if content is not long enough

          var display = barHeight == me.outerHeight() ? 'none' : 'block';
          bar.css({
            display: display
          });
        }

        function showBar() {
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide); // when bar reached top or bottom

          if (percentScroll == ~~percentScroll) {
            //release wheel
            releaseScroll = o.allowPageScroll; // publish approporiate event

            if (lastScroll != percentScroll) {
              var msg = ~~percentScroll == 0 ? 'top' : 'bottom';
              me.trigger('slimscroll', msg);
            }
          } else {
            releaseScroll = false;
          }

          lastScroll = percentScroll; // show only when required

          if (barHeight >= me.outerHeight()) {
            //allow window scroll
            //Edited 23-jan-17;
            bar.hide();
            releaseScroll = true;
            return;
          }

          bar.stop(true, true).fadeIn('fast');

          if (o.railVisible) {
            rail.stop(true, true).fadeIn('fast');
          }
        }

        function hideBar() {
          // only hide when options allow it
          if (!o.alwaysVisible) {
            queueHide = setTimeout(function () {
              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                bar.fadeOut('slow');
                rail.fadeOut('slow');
              }
            }, 1000);
          }
        }
      }); // maintain chainability

      return this;
    }
  });
  $.fn.extend({
    slimscroll: $.fn.slimScroll
  });
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/core-js/internals/function-bind.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ "./node_modules/core-js/internals/number-parse-float.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/number-parse-float.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var trim = __webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim;
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var $parseFloat = global.parseFloat;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ "./node_modules/core-js/internals/number-parse-int.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/number-parse-int.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var trim = __webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim;
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "./node_modules/core-js/internals/string-trim.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/string-trim.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "./node_modules/core-js/internals/whitespaces.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/whitespaces.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/core-js/modules/es.function.bind.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.function.bind.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var bind = __webpack_require__(/*! ../internals/function-bind */ "./node_modules/core-js/internals/function-bind.js");

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.parse-float.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.parse-float.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var parseFloatImplementation = __webpack_require__(/*! ../internals/number-parse-float */ "./node_modules/core-js/internals/number-parse-float.js");

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.parse-int.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es.parse-int.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var parseIntImplementation = __webpack_require__(/*! ../internals/number-parse-int */ "./node_modules/core-js/internals/number-parse-int.js");

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ })

},[["./assets/grandin_theme/js/jquery.slimscroll.js","runtime","vendors~app~grandin_bootstrap~grandin_datatable~grandin_datatabletheme~grandin_fancydropdown~grandin~45f0517e","vendors~grandin_init~grandin_slimscroll"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvZ3JhbmRpbl90aGVtZS9qcy9qcXVlcnkuc2xpbXNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWZsb2F0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9udW1iZXItcGFyc2UtaW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5mdW5jdGlvbi5iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucGFyc2UtZmxvYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wYXJzZS1pbnQuanMiXSwibmFtZXMiOlsiJCIsImZuIiwiZXh0ZW5kIiwic2xpbVNjcm9sbCIsIm9wdGlvbnMiLCJkZWZhdWx0cyIsIndpZHRoIiwiaGVpZ2h0Iiwic2l6ZSIsImNvbG9yIiwicG9zaXRpb24iLCJkaXN0YW5jZSIsInN0YXJ0Iiwib3BhY2l0eSIsImFsd2F5c1Zpc2libGUiLCJkaXNhYmxlRmFkZU91dCIsInJhaWxWaXNpYmxlIiwicmFpbENvbG9yIiwicmFpbE9wYWNpdHkiLCJyYWlsRHJhZ2dhYmxlIiwicmFpbENsYXNzIiwiYmFyQ2xhc3MiLCJ3cmFwcGVyQ2xhc3MiLCJhbGxvd1BhZ2VTY3JvbGwiLCJ3aGVlbFN0ZXAiLCJ0b3VjaFNjcm9sbFN0ZXAiLCJib3JkZXJSYWRpdXMiLCJyYWlsQm9yZGVyUmFkaXVzIiwibyIsImVhY2giLCJpc092ZXJQYW5lbCIsImlzT3ZlckJhciIsImlzRHJhZ2ciLCJxdWV1ZUhpZGUiLCJ0b3VjaERpZiIsImJhckhlaWdodCIsInBlcmNlbnRTY3JvbGwiLCJsYXN0U2Nyb2xsIiwiZGl2UyIsIm1pbkJhckhlaWdodCIsInJlbGVhc2VTY3JvbGwiLCJtZSIsInBhcmVudCIsImhhc0NsYXNzIiwib2Zmc2V0Iiwic2Nyb2xsVG9wIiwiYmFyIiwiY2xvc2VzdCIsInJhaWwiLCJnZXRCYXJIZWlnaHQiLCJpc1BsYWluT2JqZWN0IiwiY3NzIiwicGFyc2VJbnQiLCJzY3JvbGxUbyIsInNjcm9sbEJ5IiwicmVtb3ZlIiwidW53cmFwIiwic2Nyb2xsQ29udGVudCIsIndyYXBwZXIiLCJhZGRDbGFzcyIsIm92ZXJmbG93IiwidG9wIiwiZGlzcGxheSIsImJhY2tncm91bmQiLCJ6SW5kZXgiLCJCb3JkZXJSYWRpdXMiLCJNb3pCb3JkZXJSYWRpdXMiLCJXZWJraXRCb3JkZXJSYWRpdXMiLCJwb3NDc3MiLCJyaWdodCIsImxlZnQiLCJ3cmFwIiwiYXBwZW5kIiwiYmluZCIsImUiLCIkZG9jIiwiZG9jdW1lbnQiLCJ0IiwicGFyc2VGbG9hdCIsInBhZ2VZIiwiY3VyclRvcCIsImhpZGVCYXIiLCJ1bmJpbmQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImhvdmVyIiwic2hvd0JhciIsImIiLCJvcmlnaW5hbEV2ZW50IiwidG91Y2hlcyIsImxlbmd0aCIsImRpZmYiLCJvdXRlckhlaWdodCIsImhpZGUiLCJhdHRhY2hXaGVlbCIsIl9vbldoZWVsIiwid2luZG93IiwiZXZlbnQiLCJkZWx0YSIsIndoZWVsRGVsdGEiLCJkZXRhaWwiLCJ0YXJnZXQiLCJzcmNUYXJnZXQiLCJzcmNFbGVtZW50IiwiaXMiLCJyZXR1cm5WYWx1ZSIsInkiLCJpc1doZWVsIiwiaXNKdW1wIiwibWF4VG9wIiwiTWF0aCIsIm1pbiIsIm1heCIsImNlaWwiLCJmbG9vciIsInNjcm9sbEhlaWdodCIsIm9mZnNldFRvcCIsInRyaWdnZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJjbGVhclRpbWVvdXQiLCJtc2ciLCJzdG9wIiwiZmFkZUluIiwic2V0VGltZW91dCIsImZhZGVPdXQiLCJzbGltc2Nyb2xsIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0FBT0EsQ0FBQyxVQUFTQSxDQUFULEVBQVk7QUFFWEEsR0FBQyxDQUFDQyxFQUFGLENBQUtDLE1BQUwsQ0FBWTtBQUNWQyxjQUFVLEVBQUUsb0JBQVNDLE9BQVQsRUFBa0I7QUFFNUIsVUFBSUMsUUFBUSxHQUFHO0FBRWI7QUFDQUMsYUFBSyxFQUFHLE1BSEs7QUFLYjtBQUNBQyxjQUFNLEVBQUcsT0FOSTtBQVFiO0FBQ0FDLFlBQUksRUFBRyxLQVRNO0FBV2I7QUFDQUMsYUFBSyxFQUFFLE1BWk07QUFjYjtBQUNBQyxnQkFBUSxFQUFHLE9BZkU7QUFpQmI7QUFDQUMsZ0JBQVEsRUFBRyxLQWxCRTtBQW9CYjtBQUNBQyxhQUFLLEVBQUcsS0FyQks7QUF1QmI7QUFDQUMsZUFBTyxFQUFHLEVBeEJHO0FBMEJiO0FBQ0FDLHFCQUFhLEVBQUcsS0EzQkg7QUE2QmI7QUFDQUMsc0JBQWMsRUFBRyxLQTlCSjtBQWdDYjtBQUNBQyxtQkFBVyxFQUFHLEtBakNEO0FBbUNiO0FBQ0FDLGlCQUFTLEVBQUcsTUFwQ0M7QUFzQ2I7QUFDQUMsbUJBQVcsRUFBRyxFQXZDRDtBQXlDYjtBQUNBQyxxQkFBYSxFQUFHLElBMUNIO0FBNENiO0FBQ0FDLGlCQUFTLEVBQUcsZ0JBN0NDO0FBK0NiO0FBQ0FDLGdCQUFRLEVBQUcsZUFoREU7QUFrRGI7QUFDQUMsb0JBQVksRUFBRyxlQW5ERjtBQXFEYjtBQUNBQyx1QkFBZSxFQUFHLEtBdERMO0FBd0RiO0FBQ0FDLGlCQUFTLEVBQUcsRUF6REM7QUEyRGI7QUFDQUMsdUJBQWUsRUFBRyxHQTVETDtBQThEYjtBQUNB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QUMzQkE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNGQSxRQUFRLG1CQUFPLENBQUMsdUVBQXFCO0FBQ3JDLFdBQVcsbUJBQU8sQ0FBQyxxRkFBNEI7O0FBRS9DO0FBQ0E7QUFDQSxHQUFHLGtDQUFrQztBQUNyQztBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ1BELFFBQVEsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDckMsK0JBQStCLG1CQUFPLENBQUMsK0ZBQWlDOztBQUV4RTtBQUNBO0FBQ0EsR0FBRywrREFBK0Q7QUFDbEU7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNQRCxRQUFRLG1CQUFPLENBQUMsdUVBQXFCO0FBQ3JDLDZCQUE2QixtQkFBTyxDQUFDLDJGQUErQjs7QUFFcEU7QUFDQTtBQUNBLEdBQUcsMkRBQTJEO0FBQzlEO0FBQ0EsQ0FBQyIsImZpbGUiOiJncmFuZGluX3NsaW1zY3JvbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgQ29weXJpZ2h0IChjKSAyMDExIFBpb3RyIFJvY2hhbGEgKGh0dHA6Ly9yb2NoYS5sYSlcclxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocClcclxuICogYW5kIEdQTCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9ncGwtbGljZW5zZS5waHApIGxpY2Vuc2VzLlxyXG4gKlxyXG4gKiBWZXJzaW9uOiAxLjMuNlxyXG4gKlxyXG4gKi9cclxuKGZ1bmN0aW9uKCQpIHtcclxuXHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgc2xpbVNjcm9sbDogZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cclxuICAgICAgdmFyIGRlZmF1bHRzID0ge1xyXG5cclxuICAgICAgICAvLyB3aWR0aCBpbiBwaXhlbHMgb2YgdGhlIHZpc2libGUgc2Nyb2xsIGFyZWFcclxuICAgICAgICB3aWR0aCA6ICdhdXRvJyxcclxuXHJcbiAgICAgICAgLy8gaGVpZ2h0IGluIHBpeGVscyBvZiB0aGUgdmlzaWJsZSBzY3JvbGwgYXJlYVxyXG4gICAgICAgIGhlaWdodCA6ICcyNTBweCcsXHJcblxyXG4gICAgICAgIC8vIHdpZHRoIGluIHBpeGVscyBvZiB0aGUgc2Nyb2xsYmFyIGFuZCByYWlsXHJcbiAgICAgICAgc2l6ZSA6ICc3cHgnLFxyXG5cclxuICAgICAgICAvLyBzY3JvbGxiYXIgY29sb3IsIGFjY2VwdHMgYW55IGhleC9jb2xvciB2YWx1ZVxyXG4gICAgICAgIGNvbG9yOiAnIzAwMCcsXHJcblxyXG4gICAgICAgIC8vIHNjcm9sbGJhciBwb3NpdGlvbiAtIGxlZnQvcmlnaHRcclxuICAgICAgICBwb3NpdGlvbiA6ICdyaWdodCcsXHJcblxyXG4gICAgICAgIC8vIGRpc3RhbmNlIGluIHBpeGVscyBiZXR3ZWVuIHRoZSBzaWRlIGVkZ2UgYW5kIHRoZSBzY3JvbGxiYXJcclxuICAgICAgICBkaXN0YW5jZSA6ICcxcHgnLFxyXG5cclxuICAgICAgICAvLyBkZWZhdWx0IHNjcm9sbCBwb3NpdGlvbiBvbiBsb2FkIC0gdG9wIC8gYm90dG9tIC8gJCgnc2VsZWN0b3InKVxyXG4gICAgICAgIHN0YXJ0IDogJ3RvcCcsXHJcblxyXG4gICAgICAgIC8vIHNldHMgc2Nyb2xsYmFyIG9wYWNpdHlcclxuICAgICAgICBvcGFjaXR5IDogLjQsXHJcblxyXG4gICAgICAgIC8vIGVuYWJsZXMgYWx3YXlzLW9uIG1vZGUgZm9yIHRoZSBzY3JvbGxiYXJcclxuICAgICAgICBhbHdheXNWaXNpYmxlIDogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIHNob3VsZCBoaWRlIHRoZSBzY3JvbGxiYXIgd2hlbiB1c2VyIGlzIGhvdmVyaW5nIG92ZXJcclxuICAgICAgICBkaXNhYmxlRmFkZU91dCA6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBzZXRzIHZpc2liaWxpdHkgb2YgdGhlIHJhaWxcclxuICAgICAgICByYWlsVmlzaWJsZSA6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBzZXRzIHJhaWwgY29sb3JcclxuICAgICAgICByYWlsQ29sb3IgOiAnIzMzMycsXHJcblxyXG4gICAgICAgIC8vIHNldHMgcmFpbCBvcGFjaXR5XHJcbiAgICAgICAgcmFpbE9wYWNpdHkgOiAuMixcclxuXHJcbiAgICAgICAgLy8gd2hldGhlciAgd2Ugc2hvdWxkIHVzZSBqUXVlcnkgVUkgRHJhZ2dhYmxlIHRvIGVuYWJsZSBiYXIgZHJhZ2dpbmdcclxuICAgICAgICByYWlsRHJhZ2dhYmxlIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgLy8gZGVmYXV0bHQgQ1NTIGNsYXNzIG9mIHRoZSBzbGltc2Nyb2xsIHJhaWxcclxuICAgICAgICByYWlsQ2xhc3MgOiAnc2xpbVNjcm9sbFJhaWwnLFxyXG5cclxuICAgICAgICAvLyBkZWZhdXRsdCBDU1MgY2xhc3Mgb2YgdGhlIHNsaW1zY3JvbGwgYmFyXHJcbiAgICAgICAgYmFyQ2xhc3MgOiAnc2xpbVNjcm9sbEJhcicsXHJcblxyXG4gICAgICAgIC8vIGRlZmF1dGx0IENTUyBjbGFzcyBvZiB0aGUgc2xpbXNjcm9sbCB3cmFwcGVyXHJcbiAgICAgICAgd3JhcHBlckNsYXNzIDogJ3NsaW1TY3JvbGxEaXYnLFxyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBtb3VzZXdoZWVsIHNob3VsZCBzY3JvbGwgdGhlIHdpbmRvdyBpZiB3ZSByZWFjaCB0b3AvYm90dG9tXHJcbiAgICAgICAgYWxsb3dQYWdlU2Nyb2xsIDogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIHNjcm9sbCBhbW91bnQgYXBwbGllZCB0byBlYWNoIG1vdXNlIHdoZWVsIHN0ZXBcclxuICAgICAgICB3aGVlbFN0ZXAgOiAyMCxcclxuXHJcbiAgICAgICAgLy8gc2Nyb2xsIGFtb3VudCBhcHBsaWVkIHdoZW4gdXNlciBpcyB1c2luZyBnZXN0dXJlc1xyXG4gICAgICAgIHRvdWNoU2Nyb2xsU3RlcCA6IDIwMCxcclxuXHJcbiAgICAgICAgLy8gc2V0cyBib3JkZXIgcmFkaXVzXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnN3B4JyxcclxuXHJcbiAgICAgICAgLy8gc2V0cyBib3JkZXIgcmFkaXVzIG9mIHRoZSByYWlsXHJcbiAgICAgICAgcmFpbEJvcmRlclJhZGl1cyA6ICc3cHgnXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIC8vIGRvIGl0IGZvciBldmVyeSBlbGVtZW50IHRoYXQgbWF0Y2hlcyBzZWxlY3RvclxyXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgIHZhciBpc092ZXJQYW5lbCwgaXNPdmVyQmFyLCBpc0RyYWdnLCBxdWV1ZUhpZGUsIHRvdWNoRGlmLFxyXG4gICAgICAgIGJhckhlaWdodCwgcGVyY2VudFNjcm9sbCwgbGFzdFNjcm9sbCxcclxuICAgICAgICBkaXZTID0gJzxkaXY+PC9kaXY+JyxcclxuICAgICAgICBtaW5CYXJIZWlnaHQgPSAzMCxcclxuICAgICAgICByZWxlYXNlU2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHVzZWQgaW4gZXZlbnQgaGFuZGxlcnMgYW5kIGZvciBiZXR0ZXIgbWluaWZpY2F0aW9uXHJcbiAgICAgICAgdmFyIG1lID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gZW5zdXJlIHdlIGFyZSBub3QgYmluZGluZyBpdCBhZ2FpblxyXG4gICAgICAgIGlmIChtZS5wYXJlbnQoKS5oYXNDbGFzcyhvLndyYXBwZXJDbGFzcykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBzdGFydCBmcm9tIGxhc3QgYmFyIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBtZS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbmQgYmFyIGFuZCByYWlsXHJcbiAgICAgICAgICAgIGJhciA9IG1lLmNsb3Nlc3QoJy4nICsgby5iYXJDbGFzcyk7XHJcbiAgICAgICAgICAgIHJhaWwgPSBtZS5jbG9zZXN0KCcuJyArIG8ucmFpbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIGdldEJhckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2Ugc2hvdWxkIHNjcm9sbCBleGlzdGluZyBpbnN0YW5jZVxyXG4gICAgICAgICAgICBpZiAoJC5pc1BsYWluT2JqZWN0KG9wdGlvbnMpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgLy8gUGFzcyBoZWlnaHQ6IGF1dG8gdG8gYW4gZXhpc3Rpbmcgc2xpbXNjcm9sbCBvYmplY3QgdG8gZm9yY2UgYSByZXNpemUgYWZ0ZXIgY29udGVudHMgaGF2ZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgICAgaWYgKCAnaGVpZ2h0JyBpbiBvcHRpb25zICYmIG9wdGlvbnMuaGVpZ2h0ID09ICdhdXRvJyApIHtcclxuICAgICAgICAgICAgICAgIG1lLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgICAgIG1lLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBtZS5wYXJlbnQoKS5wYXJlbnQoKS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgIG1lLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIG1lLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmICgnc2Nyb2xsVG8nIGluIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8ganVtcCB0byBhIHN0YXRpYyBwb2ludFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gcGFyc2VJbnQoby5zY3JvbGxUbyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCdzY3JvbGxCeScgaW4gb3B0aW9ucylcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBqdW1wIGJ5IHZhbHVlIHBpeGVsc1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IHBhcnNlSW50KG8uc2Nyb2xsQnkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIGlmICgnZGVzdHJveScgaW4gb3B0aW9ucylcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgc2xpbXNjcm9sbCBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgYmFyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmFpbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIG1lLnVud3JhcCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy8gc2Nyb2xsIGNvbnRlbnQgYnkgdGhlIGdpdmVuIG9mZnNldFxyXG4gICAgICAgICAgICAgIHNjcm9sbENvbnRlbnQob2Zmc2V0LCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoJC5pc1BsYWluT2JqZWN0KG9wdGlvbnMpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCdkZXN0cm95JyBpbiBvcHRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFx0cmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvcHRpb25hbGx5IHNldCBoZWlnaHQgdG8gdGhlIHBhcmVudCdzIGhlaWdodFxyXG4gICAgICAgIG8uaGVpZ2h0ID0gKG8uaGVpZ2h0ID09ICdhdXRvJykgPyBtZS5wYXJlbnQoKS5oZWlnaHQoKSA6IG8uaGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyB3cmFwIGNvbnRlbnRcclxuICAgICAgICB2YXIgd3JhcHBlciA9ICQoZGl2UylcclxuICAgICAgICAgIC5hZGRDbGFzcyhvLndyYXBwZXJDbGFzcylcclxuICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICB3aWR0aDogby53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBvLmhlaWdodFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBzdHlsZSBmb3IgdGhlIGRpdlxyXG4gICAgICAgIG1lLmNzcyh7XHJcbiAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICB3aWR0aDogby53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogby5oZWlnaHRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNjcm9sbGJhciByYWlsXHJcbiAgICAgICAgdmFyIHJhaWwgPSAkKGRpdlMpXHJcbiAgICAgICAgICAuYWRkQ2xhc3Moby5yYWlsQ2xhc3MpXHJcbiAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgd2lkdGg6IG8uc2l6ZSxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6IChvLmFsd2F5c1Zpc2libGUgJiYgby5yYWlsVmlzaWJsZSkgPyAnYmxvY2snIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IG8ucmFpbEJvcmRlclJhZGl1cyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogby5yYWlsQ29sb3IsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IG8ucmFpbE9wYWNpdHksXHJcbiAgICAgICAgICAgIHpJbmRleDogOTBcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc2Nyb2xsYmFyXHJcbiAgICAgICAgdmFyIGJhciA9ICQoZGl2UylcclxuICAgICAgICAgIC5hZGRDbGFzcyhvLmJhckNsYXNzKVxyXG4gICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG8uY29sb3IsXHJcbiAgICAgICAgICAgIHdpZHRoOiBvLnNpemUsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IG8ub3BhY2l0eSxcclxuICAgICAgICAgICAgZGlzcGxheTogby5hbHdheXNWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJyxcclxuICAgICAgICAgICAgJ2JvcmRlci1yYWRpdXMnIDogby5ib3JkZXJSYWRpdXMsXHJcbiAgICAgICAgICAgIEJvcmRlclJhZGl1czogby5ib3JkZXJSYWRpdXMsXHJcbiAgICAgICAgICAgIE1vekJvcmRlclJhZGl1czogby5ib3JkZXJSYWRpdXMsXHJcbiAgICAgICAgICAgIFdlYmtpdEJvcmRlclJhZGl1czogby5ib3JkZXJSYWRpdXMsXHJcbiAgICAgICAgICAgIHpJbmRleDogOTlcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBzZXQgcG9zaXRpb25cclxuICAgICAgICB2YXIgcG9zQ3NzID0gKG8ucG9zaXRpb24gPT0gJ3JpZ2h0JykgPyB7IHJpZ2h0OiBvLmRpc3RhbmNlIH0gOiB7IGxlZnQ6IG8uZGlzdGFuY2UgfTtcclxuICAgICAgICByYWlsLmNzcyhwb3NDc3MpO1xyXG4gICAgICAgIGJhci5jc3MocG9zQ3NzKTtcclxuXHJcbiAgICAgICAgLy8gd3JhcCBpdFxyXG4gICAgICAgIG1lLndyYXAod3JhcHBlcik7XHJcblxyXG4gICAgICAgIC8vIGFwcGVuZCB0byBwYXJlbnQgZGl2XHJcbiAgICAgICAgbWUucGFyZW50KCkuYXBwZW5kKGJhcik7XHJcbiAgICAgICAgbWUucGFyZW50KCkuYXBwZW5kKHJhaWwpO1xyXG5cclxuICAgICAgICAvLyBtYWtlIGl0IGRyYWdnYWJsZSBhbmQgbm8gbG9uZ2VyIGRlcGVuZGVudCBvbiB0aGUganF1ZXJ5VUlcclxuICAgICAgICBpZiAoby5yYWlsRHJhZ2dhYmxlKXtcclxuICAgICAgICAgIGJhci5iaW5kKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyICRkb2MgPSAkKGRvY3VtZW50KTtcclxuICAgICAgICAgICAgaXNEcmFnZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHQgPSBwYXJzZUZsb2F0KGJhci5jc3MoJ3RvcCcpKTtcclxuICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZO1xyXG5cclxuICAgICAgICAgICAgJGRvYy5iaW5kKFwibW91c2Vtb3ZlLnNsaW1TY3JvbGxcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgY3VyclRvcCA9IHQgKyBlLnBhZ2VZIC0gcGFnZVk7XHJcbiAgICAgICAgICAgICAgYmFyLmNzcygndG9wJywgY3VyclRvcCk7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsQ29udGVudCgwLCBiYXIucG9zaXRpb24oKS50b3AsIGZhbHNlKTsvLyBzY3JvbGwgY29udGVudFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2MuYmluZChcIm1vdXNldXAuc2xpbVNjcm9sbFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgaXNEcmFnZyA9IGZhbHNlO2hpZGVCYXIoKTtcclxuICAgICAgICAgICAgICAkZG9jLnVuYmluZCgnLnNsaW1TY3JvbGwnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0pLmJpbmQoXCJzZWxlY3RzdGFydC5zbGltU2Nyb2xsXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb24gcmFpbCBvdmVyXHJcbiAgICAgICAgcmFpbC5ob3ZlcihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgc2hvd0JhcigpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBoaWRlQmFyKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG9uIGJhciBvdmVyXHJcbiAgICAgICAgYmFyLmhvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBpc092ZXJCYXIgPSB0cnVlO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBpc092ZXJCYXIgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc2hvdyBvbiBwYXJlbnQgbW91c2VvdmVyXHJcbiAgICAgICAgbWUuaG92ZXIoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGlzT3ZlclBhbmVsID0gdHJ1ZTtcclxuICAgICAgICAgIHNob3dCYXIoKTtcclxuICAgICAgICAgIGhpZGVCYXIoKTtcclxuICAgICAgICB9LCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgaXNPdmVyUGFuZWwgPSBmYWxzZTtcclxuICAgICAgICAgIGhpZGVCYXIoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc3VwcG9ydCBmb3IgbW9iaWxlXHJcbiAgICAgICAgbWUuYmluZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUsYil7XHJcbiAgICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyByZWNvcmQgd2hlcmUgdG91Y2ggc3RhcnRlZFxyXG4gICAgICAgICAgICB0b3VjaERpZiA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VZO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtZS5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIC8vIHByZXZlbnQgc2Nyb2xsaW5nIHRoZSBwYWdlIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgaWYoIXJlbGVhc2VTY3JvbGwpXHJcbiAgICAgICAgICB7XHJcbiAgXHRcdCAgICAgIGUub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ICAgICAgfVxyXG4gICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC50b3VjaGVzLmxlbmd0aClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gc2VlIGhvdyBmYXIgdXNlciBzd2lwZWRcclxuICAgICAgICAgICAgdmFyIGRpZmYgPSAodG91Y2hEaWYgLSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWSkgLyBvLnRvdWNoU2Nyb2xsU3RlcDtcclxuICAgICAgICAgICAgLy8gc2Nyb2xsIGNvbnRlbnRcclxuICAgICAgICAgICAgc2Nyb2xsQ29udGVudChkaWZmLCB0cnVlKTtcclxuICAgICAgICAgICAgdG91Y2hEaWYgPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHVwIGluaXRpYWwgaGVpZ2h0XHJcbiAgICAgICAgZ2V0QmFySGVpZ2h0KCk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgaWYgKG8uc3RhcnQgPT09ICdib3R0b20nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC8vIHNjcm9sbCBjb250ZW50IHRvIGJvdHRvbVxyXG4gICAgICAgICAgYmFyLmNzcyh7IHRvcDogbWUub3V0ZXJIZWlnaHQoKSAtIGJhci5vdXRlckhlaWdodCgpIH0pO1xyXG4gICAgICAgICAgc2Nyb2xsQ29udGVudCgwLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoby5zdGFydCAhPT0gJ3RvcCcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gYXNzdW1lIGpRdWVyeSBzZWxlY3RvclxyXG4gICAgICAgICAgc2Nyb2xsQ29udGVudCgkKG8uc3RhcnQpLnBvc2l0aW9uKCkudG9wLCBudWxsLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgYmFyIHN0YXlzIGhpZGRlblxyXG4gICAgICAgICAgaWYgKCFvLmFsd2F5c1Zpc2libGUpIHsgYmFyLmhpZGUoKTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYXR0YWNoIHNjcm9sbCBldmVudHNcclxuICAgICAgICBhdHRhY2hXaGVlbCh0aGlzKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX29uV2hlZWwoZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAvLyB1c2UgbW91c2Ugd2hlZWwgb25seSB3aGVuIG1vdXNlIGlzIG92ZXJcclxuICAgICAgICAgIGlmICghaXNPdmVyUGFuZWwpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgdmFyIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuXHJcbiAgICAgICAgICB2YXIgZGVsdGEgPSAwO1xyXG4gICAgICAgICAgaWYgKGUud2hlZWxEZWx0YSkgeyBkZWx0YSA9IC1lLndoZWVsRGVsdGEvMTIwOyB9XHJcbiAgICAgICAgICBpZiAoZS5kZXRhaWwpIHsgZGVsdGEgPSBlLmRldGFpbCAvIDM7IH1cclxuXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNUYXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG4gICAgICAgICAgaWYgKCQodGFyZ2V0KS5jbG9zZXN0KCcuJyArIG8ud3JhcHBlckNsYXNzKS5pcyhtZS5wYXJlbnQoKSkpIHtcclxuICAgICAgICAgICAgLy8gc2Nyb2xsIGNvbnRlbnRcclxuICAgICAgICAgICAgc2Nyb2xsQ29udGVudChkZWx0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gc3RvcCB3aW5kb3cgc2Nyb2xsXHJcbiAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCAmJiAhcmVsZWFzZVNjcm9sbCkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cclxuICAgICAgICAgIGlmICghcmVsZWFzZVNjcm9sbCkgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbENvbnRlbnQoeSwgaXNXaGVlbCwgaXNKdW1wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHJlbGVhc2VTY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAgIHZhciBkZWx0YSA9IHk7XHJcbiAgICAgICAgICB2YXIgbWF4VG9wID0gbWUub3V0ZXJIZWlnaHQoKSAtIGJhci5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgIGlmIChpc1doZWVsKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBtb3ZlIGJhciB3aXRoIG1vdXNlIHdoZWVsXHJcbiAgICAgICAgICAgIGRlbHRhID0gcGFyc2VJbnQoYmFyLmNzcygndG9wJykpICsgeSAqIHBhcnNlSW50KG8ud2hlZWxTdGVwKSAvIDEwMCAqIGJhci5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSBiYXIsIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IGdvIG91dFxyXG4gICAgICAgICAgICBkZWx0YSA9IE1hdGgubWluKE1hdGgubWF4KGRlbHRhLCAwKSwgbWF4VG9wKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHNjcm9sbGluZyBkb3duLCBtYWtlIHN1cmUgYSBmcmFjdGlvbmFsIGNoYW5nZSB0byB0aGVcclxuICAgICAgICAgICAgLy8gc2Nyb2xsIHBvc2l0aW9uIGlzbid0IHJvdW5kZWQgYXdheSB3aGVuIHRoZSBzY3JvbGxiYXIncyBDU1MgaXMgc2V0XHJcbiAgICAgICAgICAgIC8vIHRoaXMgZmxvb3Jpbmcgb2YgZGVsdGEgd291bGQgaGFwcGVuZWQgYXV0b21hdGljYWxseSB3aGVuXHJcbiAgICAgICAgICAgIC8vIGJhci5jc3MgaXMgc2V0IGJlbG93LCBidXQgd2UgZmxvb3IgaGVyZSBmb3IgY2xhcml0eVxyXG4gICAgICAgICAgICBkZWx0YSA9ICh5ID4gMCkgPyBNYXRoLmNlaWwoZGVsdGEpIDogTWF0aC5mbG9vcihkZWx0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzY3JvbGwgdGhlIHNjcm9sbGJhclxyXG4gICAgICAgICAgICBiYXIuY3NzKHsgdG9wOiBkZWx0YSArICdweCcgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gY2FsY3VsYXRlIGFjdHVhbCBzY3JvbGwgYW1vdW50XHJcbiAgICAgICAgICBwZXJjZW50U2Nyb2xsID0gcGFyc2VJbnQoYmFyLmNzcygndG9wJykpIC8gKG1lLm91dGVySGVpZ2h0KCkgLSBiYXIub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgICBkZWx0YSA9IHBlcmNlbnRTY3JvbGwgKiAobWVbMF0uc2Nyb2xsSGVpZ2h0IC0gbWUub3V0ZXJIZWlnaHQoKSk7XHJcblxyXG4gICAgICAgICAgaWYgKGlzSnVtcClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZGVsdGEgPSB5O1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gZGVsdGEgLyBtZVswXS5zY3JvbGxIZWlnaHQgKiBtZS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICBvZmZzZXRUb3AgPSBNYXRoLm1pbihNYXRoLm1heChvZmZzZXRUb3AsIDApLCBtYXhUb3ApO1xyXG4gICAgICAgICAgICBiYXIuY3NzKHsgdG9wOiBvZmZzZXRUb3AgKyAncHgnIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHNjcm9sbCBjb250ZW50XHJcbiAgICAgICAgICBtZS5zY3JvbGxUb3AoZGVsdGEpO1xyXG5cclxuICAgICAgICAgIC8vIGZpcmUgc2Nyb2xsaW5nIGV2ZW50XHJcbiAgICAgICAgICBtZS50cmlnZ2VyKCdzbGltc2Nyb2xsaW5nJywgfn5kZWx0YSk7XHJcblxyXG4gICAgICAgICAgLy8gZW5zdXJlIGJhciBpcyB2aXNpYmxlXHJcbiAgICAgICAgICBzaG93QmFyKCk7XHJcblxyXG4gICAgICAgICAgLy8gdHJpZ2dlciBoaWRlIHdoZW4gc2Nyb2xsIGlzIHN0b3BwZWRcclxuICAgICAgICAgIGhpZGVCYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaFdoZWVsKHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIF9vbldoZWVsLCBmYWxzZSApO1xyXG4gICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIF9vbldoZWVsLCBmYWxzZSApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hdHRhY2hFdmVudChcIm9ubW91c2V3aGVlbFwiLCBfb25XaGVlbClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEJhckhlaWdodCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gY2FsY3VsYXRlIHNjcm9sbGJhciBoZWlnaHQgYW5kIG1ha2Ugc3VyZSBpdCBpcyBub3QgdG9vIHNtYWxsXHJcbiAgICAgICAgICBiYXJIZWlnaHQgPSBNYXRoLm1heCgobWUub3V0ZXJIZWlnaHQoKSAvIG1lWzBdLnNjcm9sbEhlaWdodCkgKiBtZS5vdXRlckhlaWdodCgpLCBtaW5CYXJIZWlnaHQpO1xyXG4gICAgICAgICAgYmFyLmNzcyh7IGhlaWdodDogYmFySGVpZ2h0ICsgJ3B4JyB9KTtcclxuXHJcbiAgICAgICAgICAvLyBoaWRlIHNjcm9sbGJhciBpZiBjb250ZW50IGlzIG5vdCBsb25nIGVub3VnaFxyXG4gICAgICAgICAgdmFyIGRpc3BsYXkgPSBiYXJIZWlnaHQgPT0gbWUub3V0ZXJIZWlnaHQoKSA/ICdub25lJyA6ICdibG9jayc7XHJcbiAgICAgICAgICBiYXIuY3NzKHsgZGlzcGxheTogZGlzcGxheSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dCYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC8vIHJlY2FsY3VsYXRlIGJhciBoZWlnaHRcclxuICAgICAgICAgIGdldEJhckhlaWdodCgpO1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHF1ZXVlSGlkZSk7XHJcblxyXG4gICAgICAgICAgLy8gd2hlbiBiYXIgcmVhY2hlZCB0b3Agb3IgYm90dG9tXHJcbiAgICAgICAgICBpZiAocGVyY2VudFNjcm9sbCA9PSB+fnBlcmNlbnRTY3JvbGwpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vcmVsZWFzZSB3aGVlbFxyXG4gICAgICAgICAgICByZWxlYXNlU2Nyb2xsID0gby5hbGxvd1BhZ2VTY3JvbGw7XHJcblxyXG4gICAgICAgICAgICAvLyBwdWJsaXNoIGFwcHJvcG9yaWF0ZSBldmVudFxyXG4gICAgICAgICAgICBpZiAobGFzdFNjcm9sbCAhPSBwZXJjZW50U2Nyb2xsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gKH5+cGVyY2VudFNjcm9sbCA9PSAwKSA/ICd0b3AnIDogJ2JvdHRvbSc7XHJcbiAgICAgICAgICAgICAgICBtZS50cmlnZ2VyKCdzbGltc2Nyb2xsJywgbXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICByZWxlYXNlU2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsYXN0U2Nyb2xsID0gcGVyY2VudFNjcm9sbDtcclxuXHJcbiAgICAgICAgICAvLyBzaG93IG9ubHkgd2hlbiByZXF1aXJlZFxyXG4gICAgICAgICAgaWYoYmFySGVpZ2h0ID49IG1lLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgLy9hbGxvdyB3aW5kb3cgc2Nyb2xsXHJcblx0XHRcdC8vRWRpdGVkIDIzLWphbi0xNztcclxuXHRcdFx0YmFyLmhpZGUoKTtcclxuXHRcdFx0cmVsZWFzZVNjcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJhci5zdG9wKHRydWUsdHJ1ZSkuZmFkZUluKCdmYXN0Jyk7XHJcbiAgICAgICAgICBpZiAoby5yYWlsVmlzaWJsZSkgeyByYWlsLnN0b3AodHJ1ZSx0cnVlKS5mYWRlSW4oJ2Zhc3QnKTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGlkZUJhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gb25seSBoaWRlIHdoZW4gb3B0aW9ucyBhbGxvdyBpdFxyXG4gICAgICAgICAgaWYgKCFvLmFsd2F5c1Zpc2libGUpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHF1ZXVlSGlkZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBpZiAoIShvLmRpc2FibGVGYWRlT3V0ICYmIGlzT3ZlclBhbmVsKSAmJiAhaXNPdmVyQmFyICYmICFpc0RyYWdnKVxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhci5mYWRlT3V0KCdzbG93Jyk7XHJcbiAgICAgICAgICAgICAgICByYWlsLmZhZGVPdXQoJ3Nsb3cnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gbWFpbnRhaW4gY2hhaW5hYmlsaXR5XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkLmZuLmV4dGVuZCh7XHJcbiAgICBzbGltc2Nyb2xsOiAkLmZuLnNsaW1TY3JvbGxcclxuICB9KTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBmYWN0b3JpZXMgPSB7fTtcblxudmFyIGNvbnN0cnVjdCA9IGZ1bmN0aW9uIChDLCBhcmdzTGVuZ3RoLCBhcmdzKSB7XG4gIGlmICghKGFyZ3NMZW5ndGggaW4gZmFjdG9yaWVzKSkge1xuICAgIGZvciAodmFyIGxpc3QgPSBbXSwgaSA9IDA7IGkgPCBhcmdzTGVuZ3RoOyBpKyspIGxpc3RbaV0gPSAnYVsnICsgaSArICddJztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICBmYWN0b3JpZXNbYXJnc0xlbmd0aF0gPSBGdW5jdGlvbignQyxhJywgJ3JldHVybiBuZXcgQygnICsgbGlzdC5qb2luKCcsJykgKyAnKScpO1xuICB9IHJldHVybiBmYWN0b3JpZXNbYXJnc0xlbmd0aF0oQywgYXJncyk7XG59O1xuXG4vLyBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24uYmluZCB8fCBmdW5jdGlvbiBiaW5kKHRoYXQgLyogLCAuLi5hcmdzICovKSB7XG4gIHZhciBmbiA9IGFGdW5jdGlvbih0aGlzKTtcbiAgdmFyIHBhcnRBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB2YXIgYm91bmRGdW5jdGlvbiA9IGZ1bmN0aW9uIGJvdW5kKC8qIGFyZ3MuLi4gKi8pIHtcbiAgICB2YXIgYXJncyA9IHBhcnRBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgYm91bmRGdW5jdGlvbiA/IGNvbnN0cnVjdChmbiwgYXJncy5sZW5ndGgsIGFyZ3MpIDogZm4uYXBwbHkodGhhdCwgYXJncyk7XG4gIH07XG4gIGlmIChpc09iamVjdChmbi5wcm90b3R5cGUpKSBib3VuZEZ1bmN0aW9uLnByb3RvdHlwZSA9IGZuLnByb3RvdHlwZTtcbiAgcmV0dXJuIGJvdW5kRnVuY3Rpb247XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB0cmltID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltJykudHJpbTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgJHBhcnNlRmxvYXQgPSBnbG9iYWwucGFyc2VGbG9hdDtcbnZhciBGT1JDRUQgPSAxIC8gJHBhcnNlRmxvYXQod2hpdGVzcGFjZXMgKyAnLTAnKSAhPT0gLUluZmluaXR5O1xuXG4vLyBgcGFyc2VGbG9hdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wYXJzZWZsb2F0LXN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBwYXJzZUZsb2F0KHN0cmluZykge1xuICB2YXIgdHJpbW1lZFN0cmluZyA9IHRyaW0oU3RyaW5nKHN0cmluZykpO1xuICB2YXIgcmVzdWx0ID0gJHBhcnNlRmxvYXQodHJpbW1lZFN0cmluZyk7XG4gIHJldHVybiByZXN1bHQgPT09IDAgJiYgdHJpbW1lZFN0cmluZy5jaGFyQXQoMCkgPT0gJy0nID8gLTAgOiByZXN1bHQ7XG59IDogJHBhcnNlRmxvYXQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciAkcGFyc2VJbnQgPSBnbG9iYWwucGFyc2VJbnQ7XG52YXIgaGV4ID0gL15bKy1dPzBbWHhdLztcbnZhciBGT1JDRUQgPSAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMDgnKSAhPT0gOCB8fCAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMHgxNicpICE9PSAyMjtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXBhcnNlaW50LXN0cmluZy1yYWRpeFxubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBwYXJzZUludChzdHJpbmcsIHJhZGl4KSB7XG4gIHZhciBTID0gdHJpbShTdHJpbmcoc3RyaW5nKSk7XG4gIHJldHVybiAkcGFyc2VJbnQoUywgKHJhZGl4ID4+PiAwKSB8fCAoaGV4LnRlc3QoUykgPyAxNiA6IDEwKSk7XG59IDogJHBhcnNlSW50O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIHdoaXRlc3BhY2UgPSAnWycgKyB3aGl0ZXNwYWNlcyArICddJztcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXicgKyB3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAod2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKiQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICBpZiAoVFlQRSAmIDEpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltTGVmdCwgdHJpbVN0YXJ0IH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltc3RhcnRcbiAgc3RhcnQ6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltUmlnaHQsIHRyaW1FbmQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1lbmRcbiAgZW5kOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgdHJpbTogY3JlYXRlTWV0aG9kKDMpXG59O1xuIiwiLy8gYSBzdHJpbmcgb2YgYWxsIHZhbGlkIHVuaWNvZGUgd2hpdGVzcGFjZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5tb2R1bGUuZXhwb3J0cyA9ICdcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJztcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZCcpO1xuXG4vLyBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiQoeyB0YXJnZXQ6ICdGdW5jdGlvbicsIHByb3RvOiB0cnVlIH0sIHtcbiAgYmluZDogYmluZFxufSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBwYXJzZUZsb2F0SW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWZsb2F0Jyk7XG5cbi8vIGBwYXJzZUZsb2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXBhcnNlZmxvYXQtc3RyaW5nXG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHBhcnNlRmxvYXQgIT0gcGFyc2VGbG9hdEltcGxlbWVudGF0aW9uIH0sIHtcbiAgcGFyc2VGbG9hdDogcGFyc2VGbG9hdEltcGxlbWVudGF0aW9uXG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHBhcnNlSW50SW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWludCcpO1xuXG4vLyBgcGFyc2VJbnRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcGFyc2VpbnQtc3RyaW5nLXJhZGl4XG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHBhcnNlSW50ICE9IHBhcnNlSW50SW1wbGVtZW50YXRpb24gfSwge1xuICBwYXJzZUludDogcGFyc2VJbnRJbXBsZW1lbnRhdGlvblxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9