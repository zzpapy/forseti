(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["grandin_init"],{

/***/ "./assets/grandin_theme/js/init.js":
/*!*****************************************!*\
  !*** ./assets/grandin_theme/js/init.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/** *************Init JS*********************
	
    TABLE OF CONTENTS
	---------------------------
	1.Ready function
	2.Load function
	3.Full height function
	4.grandin function
	5.Chat App function
	6.Resize function
 ** ***************************************/

/*****Ready function start*****/

__webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.match */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");

$(document).ready(function () {
  grandin();
  $('.preloader-it > .la-anim-1').addClass('la-animate');
});
/*****Ready function end*****/

/*****Load function start*****/

$(window).on("load", function () {
  $(".preloader-it").delay(500).fadeOut("slow");
  /*Progress Bar Animation*/

  var progressAnim = $('.progress-anim');

  if (progressAnim.length > 0) {
    for (var i = 0; i < progressAnim.length; i++) {
      var $this = $(progressAnim[i]);
      $this.waypoint(function () {
        var progressBar = $(".progress-anim .progress-bar");

        for (var i = 0; i < progressBar.length; i++) {
          $this = $(progressBar[i]);
          $this.css("width", $this.attr("aria-valuenow") + "%");
        }
      }, {
        triggerOnce: true,
        offset: 'bottom-in-view'
      });
    }
  }
});
/*****Load function* end*****/

/***** Full height function start *****/

var setHeightWidth = function setHeightWidth() {
  var height = $(window).height();
  var width = $(window).width();
  $('.full-height').css('height', height);
  $('.page-wrapper').css('min-height', height);
  /*Right Sidebar Scroll Start*/

  if (width <= 1007) {
    $('#chat_list_scroll').css('height', height - 270);
    $('.fixed-sidebar-right .chat-content').css('height', height - 279);
    $('.fixed-sidebar-right .set-height-wrap').css('height', height - 219);
  } else {
    $('#chat_list_scroll').css('height', height - 204);
    $('.fixed-sidebar-right .chat-content').css('height', height - 213);
    $('.fixed-sidebar-right .set-height-wrap').css('height', height - 153);
  }
  /*Right Sidebar Scroll End*/

  /*Vertical Tab Height Cal Start*/


  var verticalTab = $(".vertical-tab");

  if (verticalTab.length > 0) {
    for (var i = 0; i < verticalTab.length; i++) {
      var $this = $(verticalTab[i]);
      $this.find('ul.nav').css('min-height', '');
      $this.find('.tab-content').css('min-height', '');
      height = $this.find('ul.ver-nav-tab').height();
      $this.find('ul.nav').css('min-height', height + 40);
      $this.find('.tab-content').css('min-height', height + 40);
    }
  }
  /*Vertical Tab Height Cal End*/

};
/***** Full height function end *****/

/***** grandin function start *****/


var $wrapper = $(".wrapper");

var grandin = function grandin() {
  /*Counter Animation*/
  var counterAnim = $('.counter-anim');

  if (counterAnim.length > 0) {
    counterAnim.counterUp({
      delay: 10,
      time: 1000
    });
  }
  /*Tooltip*/


  if ($('[data-toggle="tooltip"]').length > 0) $('[data-toggle="tooltip"]').tooltip();
  /*Popover*/

  if ($('[data-toggle="popover"]').length > 0) $('[data-toggle="popover"]').popover();
  /*Sidebar Collapse Animation*/

  var sidebarNavCollapse = $('.fixed-sidebar-left .side-nav  li .collapse');
  var sidebarNavAnchor = '.fixed-sidebar-left .side-nav  li a';
  $(document).on("click", sidebarNavAnchor, function (e) {
    if ($(this).attr('aria-expanded') === "false") $(this).blur();
    $(sidebarNavCollapse).not($(this).parent().parent()).collapse('hide');
  });
  /*Panel Remove*/

  $(document).on('click', '.close-panel', function (e) {
    var effect = $(this).data('effect');
    $(this).closest('.panel')[effect]();
    return false;
  });
  /*Accordion js*/

  $(document).on('show.bs.collapse', '.panel-collapse', function (e) {
    $(this).siblings('.panel-heading').addClass('activestate');
  });
  $(document).on('hide.bs.collapse', '.panel-collapse', function (e) {
    $(this).siblings('.panel-heading').removeClass('activestate');
  });
  /*Sidebar Navigation*/

  $(document).on('click', '#toggle_nav_btn,#open_right_sidebar,#setting_panel_btn', function (e) {
    $(".dropdown.open > .dropdown-toggle").dropdown("toggle");
    return false;
  });
  $(document).on('click', '#toggle_nav_btn', function (e) {
    $wrapper.removeClass('open-right-sidebar open-setting-panel').toggleClass('slide-nav-toggle');
    return false;
  });
  $(document).on('click', '#open_right_sidebar', function (e) {
    $wrapper.toggleClass('open-right-sidebar').removeClass('open-setting-panel');
    return false;
  });
  $(document).on('click', '.product-carousel .owl-nav', function (e) {
    return false;
  });
  $(document).on('click', 'body', function (e) {
    if ($(e.target).closest('.fixed-sidebar-right,.setting-panel').length > 0) {
      return;
    }

    $('body > .wrapper').removeClass('open-right-sidebar open-setting-panel');
    return;
  });
  $(document).on('show.bs.dropdown', '.nav.navbar-right.top-nav .dropdown', function (e) {
    $wrapper.removeClass('open-right-sidebar open-setting-panel');
    return;
  });
  $(document).on('click', '#setting_panel_btn', function (e) {
    $wrapper.toggleClass('open-setting-panel').removeClass('open-right-sidebar');
    return false;
  });
  $(document).on('click', '#toggle_mobile_nav', function (e) {
    $wrapper.toggleClass('mobile-nav-open').removeClass('open-right-sidebar');
    return;
  });
  $(document).on("mouseenter mouseleave", ".wrapper > .fixed-sidebar-left", function (e) {
    if (e.type == "mouseenter") {
      $wrapper.addClass("sidebar-hover");
    } else {
      $wrapper.removeClass("sidebar-hover");
    }

    return false;
  });
  $(document).on("mouseenter mouseleave", ".wrapper > .setting-panel", function (e) {
    if (e.type == "mouseenter") {
      $wrapper.addClass("no-transition");
    } else {
      $wrapper.removeClass("no-transition");
    }

    return false;
  });
  /*Todo*/

  var random = Math.random();
  $(document).on("keypress", "#add_todo", function (e) {
    if (e.which == 13 && !$(this).val().length == 0) {
      $('<li class="todo-item"><div class="checkbox checkbox-success"><input type="checkbox" id="checkbox' + random + '"/><label for="checkbox' + random + '">' + $('.new-todo input').val() + '</label></div></li><li><hr class="light-grey-hr"/></li>').insertAfter(".todo-list li:last-child");
      $('.new-todo input').val('');
    } else if (e.which == 13) {
      alert('Please type somthing!');
    }

    return;
  });
  /*Chat*/

  $(document).on("keypress", "#input_msg_send", function (e) {
    if (e.which == 13 && !$(this).val().length == 0) {
      $('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".fixed-sidebar-right .chat-content  ul li:last-child");
      $(this).val('');
    } else if (e.which == 13) {
      alert('Please type somthing!');
    }

    return;
  });
  $(document).on("keypress", "#input_msg_send_widget", function (e) {
    if (e.which == 13 && !$(this).val().length == 0) {
      $('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".chat-for-widgets .chat-content  ul li:last-child");
      $(this).val('');
    } else if (e.which == 13) {
      alert('Please type somthing!');
    }

    return;
  });
  $(document).on("keypress", "#input_msg_send_chatapp", function (e) {
    if (e.which == 13 && !$(this).val().length == 0) {
      $('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".chat-for-widgets-1 .chat-content  ul li:last-child");
      $(this).val('');
    } else if (e.which == 13) {
      alert('Please type asomthing!');
    }

    return;
  });
  $(document).on("click", ".fixed-sidebar-right .chat-cmplt-wrap .chat-data", function (e) {
    $(".fixed-sidebar-right .chat-cmplt-wrap").addClass('chat-box-slide');
    return false;
  });
  $(document).on("click", ".fixed-sidebar-right #goto_back", function (e) {
    $(".fixed-sidebar-right .chat-cmplt-wrap").removeClass('chat-box-slide');
    return false;
  });
  /*Chat for Widgets*/

  $(document).on("click", ".chat-for-widgets.chat-cmplt-wrap .chat-data", function (e) {
    $(".chat-for-widgets.chat-cmplt-wrap").addClass('chat-box-slide');
    return false;
  });
  $(document).on("click", "#goto_back_widget", function (e) {
    $(".chat-for-widgets.chat-cmplt-wrap").removeClass('chat-box-slide');
    return false;
  });
  /*Horizontal Nav*/

  $(document).on("show.bs.collapse", ".top-fixed-nav .fixed-sidebar-left .side-nav > li > ul", function (e) {
    e.preventDefault();
  });
  /*Slimscroll*/

  $('.nicescroll-bar').slimScroll({
    height: '100%',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0,
    size: '4px',
    alwaysVisible: false
  });
  $('.message-nicescroll-bar').slimScroll({
    height: '229px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.message-box-nicescroll-bar').slimScroll({
    height: '350px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.product-nicescroll-bar').slimScroll({
    height: '346px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.app-nicescroll-bar').slimScroll({
    height: '162px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.todo-box-nicescroll-bar').slimScroll({
    height: '285px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.users-nicescroll-bar').slimScroll({
    height: '370px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.users-chat-nicescroll-bar').slimScroll({
    height: '257px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.chatapp-nicescroll-bar').slimScroll({
    height: '543px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  $('.chatapp-chat-nicescroll-bar').slimScroll({
    height: '483px',
    size: '4px',
    color: '#878787',
    disableFadeOut: true,
    borderRadius: 0
  });
  /*Product carousel*/

  if ($('.product-carousel').length > 0) var $owl = $('.product-carousel').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    navText: ["<i class='zmdi zmdi-chevron-left'></i>", "<i class='zmdi zmdi-chevron-right'></i>"],
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      767: {
        items: 3
      },
      1399: {
        items: 4
      }
    }
  });
  /*Refresh Init Js*/

  var refreshMe = '.refresh';
  $(document).on("click", refreshMe, function (e) {
    var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
    var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
    var loadingAnim = panelToRefresh.find('.la-anim-1');
    panelToRefresh.show();
    setTimeout(function () {
      loadingAnim.addClass('la-animate');
    }, 100);

    function started() {} //function before timeout


    setTimeout(function () {
      function completed() {} //function after timeout


      panelToRefresh.fadeOut(800);
      setTimeout(function () {
        loadingAnim.removeClass('la-animate');
      }, 800);
    }, 1500);
    return false;
  });
  /*Fullscreen Init Js*/

  $(document).on("click", ".full-screen", function (e) {
    $(this).parents('.panel').toggleClass('fullscreen');
    $(window).trigger('resize');
    return false;
  });
  /*Nav Tab Responsive Js*/

  $(document).on('show.bs.tab', '.nav-tabs-responsive [data-toggle="tab"]', function (e) {
    var $target = $(e.target);
    var $tabs = $target.closest('.nav-tabs-responsive');
    var $current = $target.closest('li');
    var $parent = $current.closest('li.dropdown');
    $current = $parent.length > 0 ? $parent : $current;
    var $next = $current.next();
    var $prev = $current.prev();
    $tabs.find('>li').removeClass('next prev');
    $prev.addClass('prev');
    $next.addClass('next');
    return;
  });
};
/***** grandin function end *****/

/***** Chat App function Start *****/


var chatAppTarget = $('.chat-for-widgets-1.chat-cmplt-wrap');

var chatApp = function chatApp() {
  $(document).on("click", ".chat-for-widgets-1.chat-cmplt-wrap .chat-data", function (e) {
    var width = $(window).width();

    if (width <= 1007) {
      chatAppTarget.addClass('chat-box-slide');
    }

    return false;
  });
  $(document).on("click", "#goto_back_widget_1", function (e) {
    var width = $(window).width();

    if (width <= 1007) {
      chatAppTarget.removeClass('chat-box-slide');
    }

    return false;
  });
};
/***** Chat App function End *****/


var boxLayout = function boxLayout() {
  if (!$wrapper.hasClass("rtl-layout") && $wrapper.hasClass("box-layout")) $(".box-layout .fixed-sidebar-right").css({
    right: $wrapper.offset().left + 300
  });else if ($wrapper.hasClass("box-layout rtl-layout")) $(".box-layout .fixed-sidebar-right").css({
    left: $wrapper.offset().left
  });
};

boxLayout();
/**Only For Setting Panel Start**/

/*Fixed Slidebar*/

var fixedHeader = function fixedHeader() {
  if ($(".setting-panel #switch_3").is(":checked")) {
    $wrapper.addClass("scrollable-nav");
  } else {
    $wrapper.removeClass("scrollable-nav");
  }
};

fixedHeader();
$(document).on('change', '.setting-panel #switch_3', function () {
  fixedHeader();
  return false;
});
/*Theme Color Init*/

$(document).on('click', '.theme-option-wrap > li', function (e) {
  $(this).addClass('active-theme').siblings().removeClass('active-theme');
  $wrapper.removeClass(function (index, className) {
    return (className.match(/(^|\s)theme-\S+/g) || []).join(' ');
  }).addClass($(this).attr('id') + '-active');
  return false;
});
/*Primary Color Init*/

var primaryColor = 'input:radio[name="radio-primary-color"]';

if ($('input:radio[name="radio-primary-color"]').length > 0) {
  //$(primaryColor)[0].checked = true;
  $(document).on('click', primaryColor, function (e) {
    $wrapper.removeClass(function (index, className) {
      return (className.match(/(^|\s)pimary-color-\S+/g) || []).join(' ');
    }).addClass($(this).attr('id'));
    return;
  });
}
/*Reset Init*/


$(document).on('click', '#reset_setting', function (e) {
  $('.theme-option-wrap > li').removeClass('active-theme').first().addClass('active-theme');
  $wrapper.removeClass(function (index, className) {
    return (className.match(/(^|\s)theme-\S+/g) || []).join(' ');
  }).addClass('theme-1-active');
  if ($(".setting-panel #switch_3").is(":checked")) $('.setting-panel .layout-switcher .switchery').trigger('click');
  $('#pimary-color-green').trigger('click');
  return false;
});
/*Switchery Init*/

var elems = Array.prototype.slice.call(document.querySelectorAll('.setting-panel .js-switch'));
$('.setting-panel .js-switch').each(function () {
  new Switchery($(this)[0], $(this).data());
});
/*Only For Setting Panel end*/

/***** Resize function start *****/

$(window).on("resize", function () {
  setHeightWidth();
  boxLayout();
  chatApp();
}).resize();
/***** Resize function end *****/
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./assets/grandin_theme/js/init.js","runtime","vendors~app~grandin_bootstrap~grandin_datatable~grandin_datatabletheme~grandin_fancydropdown~grandin~45f0517e","vendors~grandin_init~grandin_slimscroll","vendors~grandin_init"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvZ3JhbmRpbl90aGVtZS9qcy9pbml0LmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiZ3JhbmRpbiIsImFkZENsYXNzIiwid2luZG93Iiwib24iLCJkZWxheSIsImZhZGVPdXQiLCJwcm9ncmVzc0FuaW0iLCJsZW5ndGgiLCJpIiwiJHRoaXMiLCJ3YXlwb2ludCIsInByb2dyZXNzQmFyIiwiY3NzIiwiYXR0ciIsInRyaWdnZXJPbmNlIiwib2Zmc2V0Iiwic2V0SGVpZ2h0V2lkdGgiLCJoZWlnaHQiLCJ3aWR0aCIsInZlcnRpY2FsVGFiIiwiZmluZCIsIiR3cmFwcGVyIiwiY291bnRlckFuaW0iLCJjb3VudGVyVXAiLCJ0aW1lIiwidG9vbHRpcCIsInBvcG92ZXIiLCJzaWRlYmFyTmF2Q29sbGFwc2UiLCJzaWRlYmFyTmF2QW5jaG9yIiwiZSIsImJsdXIiLCJub3QiLCJwYXJlbnQiLCJjb2xsYXBzZSIsImVmZmVjdCIsImRhdGEiLCJjbG9zZXN0Iiwic2libGluZ3MiLCJyZW1vdmVDbGFzcyIsImRyb3Bkb3duIiwidG9nZ2xlQ2xhc3MiLCJ0YXJnZXQiLCJ0eXBlIiwicmFuZG9tIiwiTWF0aCIsIndoaWNoIiwidmFsIiwiaW5zZXJ0QWZ0ZXIiLCJhbGVydCIsInByZXZlbnREZWZhdWx0Iiwic2xpbVNjcm9sbCIsImNvbG9yIiwiZGlzYWJsZUZhZGVPdXQiLCJib3JkZXJSYWRpdXMiLCJzaXplIiwiYWx3YXlzVmlzaWJsZSIsIiRvd2wiLCJvd2xDYXJvdXNlbCIsImxvb3AiLCJtYXJnaW4iLCJuYXYiLCJuYXZUZXh0IiwiZG90cyIsImF1dG9wbGF5IiwicmVzcG9uc2l2ZSIsIml0ZW1zIiwicmVmcmVzaE1lIiwicGFuZWxUb1JlZnJlc2giLCJkYXRhVG9SZWZyZXNoIiwibG9hZGluZ0FuaW0iLCJzaG93Iiwic2V0VGltZW91dCIsInN0YXJ0ZWQiLCJjb21wbGV0ZWQiLCJwYXJlbnRzIiwidHJpZ2dlciIsIiR0YXJnZXQiLCIkdGFicyIsIiRjdXJyZW50IiwiJHBhcmVudCIsIiRuZXh0IiwibmV4dCIsIiRwcmV2IiwicHJldiIsImNoYXRBcHBUYXJnZXQiLCJjaGF0QXBwIiwiYm94TGF5b3V0IiwiaGFzQ2xhc3MiLCJyaWdodCIsImxlZnQiLCJmaXhlZEhlYWRlciIsImlzIiwiaW5kZXgiLCJjbGFzc05hbWUiLCJtYXRjaCIsImpvaW4iLCJwcmltYXJ5Q29sb3IiLCJmaXJzdCIsImVsZW1zIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWFjaCIsIlN3aXRjaGVyeSIsInJlc2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQVljO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBVTtBQUMzQkMsU0FBTztBQUNQSCxHQUFDLENBQUMsNEJBQUQsQ0FBRCxDQUFnQ0ksUUFBaEMsQ0FBeUMsWUFBekM7QUFDQSxDQUhEO0FBSUE7O0FBRUE7O0FBQ0FKLENBQUMsQ0FBQ0ssTUFBRCxDQUFELENBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQW9CLFlBQVU7QUFDN0JOLEdBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJPLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCQyxPQUE5QixDQUFzQyxNQUF0QztBQUNBOztBQUNBLE1BQUlDLFlBQVksR0FBR1QsQ0FBQyxDQUFDLGdCQUFELENBQXBCOztBQUNBLE1BQUlTLFlBQVksQ0FBQ0MsTUFBYixHQUFzQixDQUExQixFQUE2QjtBQUM1QixTQUFJLElBQUlDLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR0YsWUFBWSxDQUFDQyxNQUFoQyxFQUF3Q0MsQ0FBQyxFQUF6QyxFQUE0QztBQUMzQyxVQUFJQyxLQUFLLEdBQUdaLENBQUMsQ0FBQ1MsWUFBWSxDQUFDRSxDQUFELENBQWIsQ0FBYjtBQUNBQyxXQUFLLENBQUNDLFFBQU4s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UUFGSCxDQUVZLGdCQUZaO0FBR0EsTUFBR0osQ0FBQyxDQUFDLDBCQUFELENBQUQsQ0FBOEI4RixFQUE5QixDQUFpQyxVQUFqQyxDQUFILEVBQ0M5RixDQUFDLENBQUMsNENBQUQsQ0FBRCxDQUFnRDhFLE9BQWhELENBQXdELE9BQXhEO0FBQ0E5RSxHQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QjhFLE9BQXpCLENBQWlDLE9BQWpDO0FBQ0QsU0FBTyxLQUFQO0FBQ0EsQ0FURDtBQVlBOztBQUNBLElBQUl1QixLQUFLLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCeEcsUUFBUSxDQUFDeUcsZ0JBQVQsQ0FBMEIsMkJBQTFCLENBQTNCLENBQVo7QUFDQTFHLENBQUMsQ0FBQywyQkFBRCxDQUFELENBQStCMkcsSUFBL0IsQ0FBb0MsWUFBVztBQUM5QyxNQUFJQyxTQUFKLENBQWM1RyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsQ0FBUixDQUFkLEVBQTBCQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFzQyxJQUFSLEVBQTFCO0FBQ0EsQ0FGRDtBQUlBOztBQUVBOztBQUNBdEMsQ0FBQyxDQUFDSyxNQUFELENBQUQsQ0FBVUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsWUFBWTtBQUNsQ2EsZ0JBQWM7QUFDZHNFLFdBQVM7QUFDVEQsU0FBTztBQUNQLENBSkQsRUFJR3FCLE1BSkg7QUFLQSxpQyIsImZpbGUiOiJncmFuZGluX2luaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogKioqKioqKioqKioqKkluaXQgSlMqKioqKioqKioqKioqKioqKioqKipcclxuXHRcclxuICAgIFRBQkxFIE9GIENPTlRFTlRTXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0MS5SZWFkeSBmdW5jdGlvblxyXG5cdDIuTG9hZCBmdW5jdGlvblxyXG5cdDMuRnVsbCBoZWlnaHQgZnVuY3Rpb25cclxuXHQ0LmdyYW5kaW4gZnVuY3Rpb25cclxuXHQ1LkNoYXQgQXBwIGZ1bmN0aW9uXHJcblx0Ni5SZXNpemUgZnVuY3Rpb25cclxuICoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuIFxyXG4gXCJ1c2Ugc3RyaWN0XCI7IFxyXG4vKioqKipSZWFkeSBmdW5jdGlvbiBzdGFydCoqKioqL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cdGdyYW5kaW4oKTtcclxuXHQkKCcucHJlbG9hZGVyLWl0ID4gLmxhLWFuaW0tMScpLmFkZENsYXNzKCdsYS1hbmltYXRlJyk7XHJcbn0pO1xyXG4vKioqKipSZWFkeSBmdW5jdGlvbiBlbmQqKioqKi9cclxuXHJcbi8qKioqKkxvYWQgZnVuY3Rpb24gc3RhcnQqKioqKi9cclxuJCh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7XHJcblx0JChcIi5wcmVsb2FkZXItaXRcIikuZGVsYXkoNTAwKS5mYWRlT3V0KFwic2xvd1wiKTtcclxuXHQvKlByb2dyZXNzIEJhciBBbmltYXRpb24qL1xyXG5cdHZhciBwcm9ncmVzc0FuaW0gPSAkKCcucHJvZ3Jlc3MtYW5pbScpO1xyXG5cdGlmKCBwcm9ncmVzc0FuaW0ubGVuZ3RoID4gMCApe1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHByb2dyZXNzQW5pbS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdHZhciAkdGhpcyA9ICQocHJvZ3Jlc3NBbmltW2ldKTtcclxuXHRcdFx0JHRoaXMud2F5cG9pbnQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBwcm9ncmVzc0JhciA9ICQoXCIucHJvZ3Jlc3MtYW5pbSAucHJvZ3Jlc3MtYmFyXCIpO1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcHJvZ3Jlc3NCYXIubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdCR0aGlzID0gJChwcm9ncmVzc0JhcltpXSk7XHJcblx0XHRcdFx0JHRoaXMuY3NzKFwid2lkdGhcIiwgJHRoaXMuYXR0cihcImFyaWEtdmFsdWVub3dcIikgKyBcIiVcIik7XHJcblx0XHRcdH1cclxuXHRcdFx0fSwge1xyXG5cdFx0XHQgIHRyaWdnZXJPbmNlOiB0cnVlLFxyXG5cdFx0XHQgIG9mZnNldDogJ2JvdHRvbS1pbi12aWV3J1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG4vKioqKipMb2FkIGZ1bmN0aW9uKiBlbmQqKioqKi9cclxuXHJcbi8qKioqKiBGdWxsIGhlaWdodCBmdW5jdGlvbiBzdGFydCAqKioqKi9cclxudmFyIHNldEhlaWdodFdpZHRoID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBoZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblx0dmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblx0JCgnLmZ1bGwtaGVpZ2h0JykuY3NzKCdoZWlnaHQnLCAoaGVpZ2h0KSk7XHJcblx0JCgnLnBhZ2Utd3JhcHBlcicpLmNzcygnbWluLWhlaWdodCcsIChoZWlnaHQpKTtcclxuXHRcclxuXHQvKlJpZ2h0IFNpZGViYXIgU2Nyb2xsIFN0YXJ0Ki9cclxuXHRpZih3aWR0aDw9MTAwNyl7XHJcblx0XHQkKCcjY2hhdF9saXN0X3Njcm9sbCcpLmNzcygnaGVpZ2h0JywgKGhlaWdodCAtIDI3MCkpO1xyXG5cdFx0JCgnLmZpeGVkLXNpZGViYXItcmlnaHQgLmNoYXQtY29udGVudCcpLmNzcygnaGVpZ2h0JywgKGhlaWdodCAtIDI3OSkpO1xyXG5cdFx0JCgnLmZpeGVkLXNpZGViYXItcmlnaHQgLnNldC1oZWlnaHQtd3JhcCcpLmNzcygnaGVpZ2h0JywgKGhlaWdodCAtIDIxOSkpO1xyXG5cdFx0XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0JCgnI2NoYXRfbGlzdF9zY3JvbGwnKS5jc3MoJ2hlaWdodCcsIChoZWlnaHQgLSAyMDQpKTtcclxuXHRcdCQoJy5maXhlZC1zaWRlYmFyLXJpZ2h0IC5jaGF0LWNvbnRlbnQnKS5jc3MoJ2hlaWdodCcsIChoZWlnaHQgLSAyMTMpKTtcclxuXHRcdCQoJy5maXhlZC1zaWRlYmFyLXJpZ2h0IC5zZXQtaGVpZ2h0LXdyYXAnKS5jc3MoJ2hlaWdodCcsIChoZWlnaHQgLSAxNTMpKTtcclxuXHR9XHRcclxuXHQvKlJpZ2h0IFNpZGViYXIgU2Nyb2xsIEVuZCovXHJcblx0XHJcblx0LypWZXJ0aWNhbCBUYWIgSGVpZ2h0IENhbCBTdGFydCovXHJcblx0dmFyIHZlcnRpY2FsVGFiID0gJChcIi52ZXJ0aWNhbC10YWJcIik7XHJcblx0aWYoIHZlcnRpY2FsVGFiLmxlbmd0aCA+IDAgKXsgXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdmVydGljYWxUYWIubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHR2YXIgJHRoaXMgPSQodmVydGljYWxUYWJbaV0pO1xyXG5cdFx0XHQkdGhpcy5maW5kKCd1bC5uYXYnKS5jc3MoXHJcblx0XHRcdCAgJ21pbi1oZWlnaHQnLCAnJ1xyXG5cdFx0XHQpO1xyXG5cdFx0XHQkdGhpcy5maW5kKCcudGFiLWNvbnRlbnQnKS5jc3MoXHJcblx0XHRcdCAgJ21pbi1oZWlnaHQnLCAnJ1xyXG5cdFx0XHQpO1xyXG5cdFx0XHRoZWlnaHQgPSAkdGhpcy5maW5kKCd1bC52ZXItbmF2LXRhYicpLmhlaWdodCgpO1xyXG5cdFx0XHQkdGhpcy5maW5kKCd1bC5uYXYnKS5jc3MoXHJcblx0XHRcdCAgJ21pbi1oZWlnaHQnLCBoZWlnaHQgKyA0MFxyXG5cdFx0XHQpO1xyXG5cdFx0XHQkdGhpcy5maW5kKCcudGFiLWNvbnRlbnQnKS5jc3MoXHJcblx0XHRcdCAgJ21pbi1oZWlnaHQnLCBoZWlnaHQgKyA0MFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvKlZlcnRpY2FsIFRhYiBIZWlnaHQgQ2FsIEVuZCovXHJcbn07XHJcbi8qKioqKiBGdWxsIGhlaWdodCBmdW5jdGlvbiBlbmQgKioqKiovXHJcblxyXG4vKioqKiogZ3JhbmRpbiBmdW5jdGlvbiBzdGFydCAqKioqKi9cclxudmFyICR3cmFwcGVyID0gJChcIi53cmFwcGVyXCIpO1xyXG52YXIgZ3JhbmRpbiA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcblx0LypDb3VudGVyIEFuaW1hdGlvbiovXHJcblx0dmFyIGNvdW50ZXJBbmltID0gJCgnLmNvdW50ZXItYW5pbScpO1xyXG5cdGlmKCBjb3VudGVyQW5pbS5sZW5ndGggPiAwICl7XHJcblx0XHRjb3VudGVyQW5pbS5jb3VudGVyVXAoeyBkZWxheTogMTAsXHJcbiAgICAgICAgdGltZTogMTAwMH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKlRvb2x0aXAqL1xyXG5cdGlmKCAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykubGVuZ3RoID4gMCApXHJcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xyXG5cdFxyXG5cdC8qUG9wb3ZlciovXHJcblx0aWYoICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5sZW5ndGggPiAwIClcclxuXHRcdCQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKClcclxuXHRcclxuXHRcclxuXHQvKlNpZGViYXIgQ29sbGFwc2UgQW5pbWF0aW9uKi9cclxuXHR2YXIgc2lkZWJhck5hdkNvbGxhcHNlID0gJCgnLmZpeGVkLXNpZGViYXItbGVmdCAuc2lkZS1uYXYgIGxpIC5jb2xsYXBzZScpO1xyXG5cdHZhciBzaWRlYmFyTmF2QW5jaG9yID0gJy5maXhlZC1zaWRlYmFyLWxlZnQgLnNpZGUtbmF2ICBsaSBhJztcclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsc2lkZWJhck5hdkFuY2hvcixmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKCQodGhpcykuYXR0cignYXJpYS1leHBhbmRlZCcpID09PSBcImZhbHNlXCIpXHJcblx0XHRcdFx0JCh0aGlzKS5ibHVyKCk7XHJcblx0XHQkKHNpZGViYXJOYXZDb2xsYXBzZSkubm90KCQodGhpcykucGFyZW50KCkucGFyZW50KCkpLmNvbGxhcHNlKCdoaWRlJyk7XHJcblx0fSk7XHJcblx0XHJcblx0LypQYW5lbCBSZW1vdmUqL1xyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2xvc2UtcGFuZWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIGVmZmVjdCA9ICQodGhpcykuZGF0YSgnZWZmZWN0Jyk7XHJcblx0XHRcdCQodGhpcykuY2xvc2VzdCgnLnBhbmVsJylbZWZmZWN0XSgpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1x0XHJcblx0fSk7XHJcblx0XHJcblx0LypBY2NvcmRpb24ganMqL1xyXG5cdFx0JChkb2N1bWVudCkub24oJ3Nob3cuYnMuY29sbGFwc2UnLCAnLnBhbmVsLWNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdCQodGhpcykuc2libGluZ3MoJy5wYW5lbC1oZWFkaW5nJykuYWRkQ2xhc3MoJ2FjdGl2ZXN0YXRlJyk7XHJcblx0fSk7XHJcblx0XHJcblx0JChkb2N1bWVudCkub24oJ2hpZGUuYnMuY29sbGFwc2UnLCAnLnBhbmVsLWNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdCQodGhpcykuc2libGluZ3MoJy5wYW5lbC1oZWFkaW5nJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZXN0YXRlJyk7XHJcblx0fSk7XHJcblx0XHJcblx0LypTaWRlYmFyIE5hdmlnYXRpb24qL1xyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdG9nZ2xlX25hdl9idG4sI29wZW5fcmlnaHRfc2lkZWJhciwjc2V0dGluZ19wYW5lbF9idG4nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0JChcIi5kcm9wZG93bi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZVwiKS5kcm9wZG93bihcInRvZ2dsZVwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RvZ2dsZV9uYXZfYnRuJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdCR3cmFwcGVyLnJlbW92ZUNsYXNzKCdvcGVuLXJpZ2h0LXNpZGViYXIgb3Blbi1zZXR0aW5nLXBhbmVsJykudG9nZ2xlQ2xhc3MoJ3NsaWRlLW5hdi10b2dnbGUnKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI29wZW5fcmlnaHRfc2lkZWJhcicsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQkd3JhcHBlci50b2dnbGVDbGFzcygnb3Blbi1yaWdodC1zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ29wZW4tc2V0dGluZy1wYW5lbCcpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFxyXG5cdH0pO1xyXG5cdFxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsJy5wcm9kdWN0LWNhcm91c2VsIC5vd2wtbmF2JyxmdW5jdGlvbihlKXtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYm9keScsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZigkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZml4ZWQtc2lkZWJhci1yaWdodCwuc2V0dGluZy1wYW5lbCcpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0JCgnYm9keSA+IC53cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4tcmlnaHQtc2lkZWJhciBvcGVuLXNldHRpbmctcGFuZWwnKTtcclxuXHRcdHJldHVybjtcclxuXHR9KTtcclxuXHRcclxuXHQkKGRvY3VtZW50KS5vbignc2hvdy5icy5kcm9wZG93bicsICcubmF2Lm5hdmJhci1yaWdodC50b3AtbmF2IC5kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQkd3JhcHBlci5yZW1vdmVDbGFzcygnb3Blbi1yaWdodC1zaWRlYmFyIG9wZW4tc2V0dGluZy1wYW5lbCcpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjc2V0dGluZ19wYW5lbF9idG4nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0JHdyYXBwZXIudG9nZ2xlQ2xhc3MoJ29wZW4tc2V0dGluZy1wYW5lbCcpLnJlbW92ZUNsYXNzKCdvcGVuLXJpZ2h0LXNpZGViYXInKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RvZ2dsZV9tb2JpbGVfbmF2JywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdCR3cmFwcGVyLnRvZ2dsZUNsYXNzKCdtb2JpbGUtbmF2LW9wZW4nKS5yZW1vdmVDbGFzcygnb3Blbi1yaWdodC1zaWRlYmFyJyk7XHJcblx0XHRyZXR1cm47XHJcblx0fSk7XHJcblx0XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKFwibW91c2VlbnRlciBtb3VzZWxlYXZlXCIsXCIud3JhcHBlciA+IC5maXhlZC1zaWRlYmFyLWxlZnRcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYgKGUudHlwZSA9PSBcIm1vdXNlZW50ZXJcIikge1xyXG5cdFx0XHQkd3JhcHBlci5hZGRDbGFzcyhcInNpZGViYXItaG92ZXJcIik7IFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IFxyXG5cdFx0XHQkd3JhcHBlci5yZW1vdmVDbGFzcyhcInNpZGViYXItaG92ZXJcIik7ICBcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQkKGRvY3VtZW50KS5vbihcIm1vdXNlZW50ZXIgbW91c2VsZWF2ZVwiLFwiLndyYXBwZXIgPiAuc2V0dGluZy1wYW5lbFwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHRpZiAoZS50eXBlID09IFwibW91c2VlbnRlclwiKSB7XHJcblx0XHRcdCR3cmFwcGVyLmFkZENsYXNzKFwibm8tdHJhbnNpdGlvblwiKTsgXHJcblx0XHR9XHJcblx0XHRlbHNlIHsgXHJcblx0XHRcdCR3cmFwcGVyLnJlbW92ZUNsYXNzKFwibm8tdHJhbnNpdGlvblwiKTsgIFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qVG9kbyovXHJcblx0dmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XHJcblx0JChkb2N1bWVudCkub24oXCJrZXlwcmVzc1wiLFwiI2FkZF90b2RvXCIsZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICgoZS53aGljaCA9PSAxMykmJighJCh0aGlzKS52YWwoKS5sZW5ndGggPT0gMCkpICB7XHJcblx0XHRcdFx0JCgnPGxpIGNsYXNzPVwidG9kby1pdGVtXCI+PGRpdiBjbGFzcz1cImNoZWNrYm94IGNoZWNrYm94LXN1Y2Nlc3NcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja2JveCcrcmFuZG9tKydcIi8+PGxhYmVsIGZvcj1cImNoZWNrYm94JytyYW5kb20rJ1wiPicgKyAkKCcubmV3LXRvZG8gaW5wdXQnKS52YWwoKSArICc8L2xhYmVsPjwvZGl2PjwvbGk+PGxpPjxociBjbGFzcz1cImxpZ2h0LWdyZXktaHJcIi8+PC9saT4nKS5pbnNlcnRBZnRlcihcIi50b2RvLWxpc3QgbGk6bGFzdC1jaGlsZFwiKTtcclxuXHRcdFx0XHQkKCcubmV3LXRvZG8gaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0fSBlbHNlIGlmKGUud2hpY2ggPT0gMTMpIHtcclxuXHRcdFx0YWxlcnQoJ1BsZWFzZSB0eXBlIHNvbXRoaW5nIScpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qQ2hhdCovXHJcblx0JChkb2N1bWVudCkub24oXCJrZXlwcmVzc1wiLFwiI2lucHV0X21zZ19zZW5kXCIsZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICgoZS53aGljaCA9PSAxMykmJighJCh0aGlzKS52YWwoKS5sZW5ndGggPT0gMCkpIHtcclxuXHRcdFx0JCgnPGxpIGNsYXNzPVwic2VsZiBtYi0xMFwiPjxkaXYgY2xhc3M9XCJzZWxmLW1zZy13cmFwXCI+PGRpdiBjbGFzcz1cIm1zZyBibG9jayBwdWxsLXJpZ2h0XCI+JyArICQodGhpcykudmFsKCkgKyAnPGRpdiBjbGFzcz1cIm1zZy1wZXItZGV0YWlsIG10LTVcIj48c3BhbiBjbGFzcz1cIm1zZy10aW1lIHR4dC1ncmV5XCI+MzozMCBwbTwvc3Bhbj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj48L2xpPicpLmluc2VydEFmdGVyKFwiLmZpeGVkLXNpZGViYXItcmlnaHQgLmNoYXQtY29udGVudCAgdWwgbGk6bGFzdC1jaGlsZFwiKTtcclxuXHRcdFx0JCh0aGlzKS52YWwoJycpO1xyXG5cdFx0fSBlbHNlIGlmKGUud2hpY2ggPT0gMTMpIHtcclxuXHRcdFx0YWxlcnQoJ1BsZWFzZSB0eXBlIHNvbXRoaW5nIScpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwia2V5cHJlc3NcIixcIiNpbnB1dF9tc2dfc2VuZF93aWRnZXRcIixmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKChlLndoaWNoID09IDEzKSYmKCEkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PSAwKSkge1xyXG5cdFx0XHQkKCc8bGkgY2xhc3M9XCJzZWxmIG1iLTEwXCI+PGRpdiBjbGFzcz1cInNlbGYtbXNnLXdyYXBcIj48ZGl2IGNsYXNzPVwibXNnIGJsb2NrIHB1bGwtcmlnaHRcIj4nICsgJCh0aGlzKS52YWwoKSArICc8ZGl2IGNsYXNzPVwibXNnLXBlci1kZXRhaWwgbXQtNVwiPjxzcGFuIGNsYXNzPVwibXNnLXRpbWUgdHh0LWdyZXlcIj4zOjMwIHBtPC9zcGFuPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PjwvbGk+JykuaW5zZXJ0QWZ0ZXIoXCIuY2hhdC1mb3Itd2lkZ2V0cyAuY2hhdC1jb250ZW50ICB1bCBsaTpsYXN0LWNoaWxkXCIpO1xyXG5cdFx0XHQkKHRoaXMpLnZhbCgnJyk7XHJcblx0XHR9IGVsc2UgaWYoZS53aGljaCA9PSAxMykge1xyXG5cdFx0XHRhbGVydCgnUGxlYXNlIHR5cGUgc29tdGhpbmchJyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm47XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkub24oXCJrZXlwcmVzc1wiLFwiI2lucHV0X21zZ19zZW5kX2NoYXRhcHBcIixmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKChlLndoaWNoID09IDEzKSYmKCEkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PSAwKSkge1xyXG5cdFx0XHQkKCc8bGkgY2xhc3M9XCJzZWxmIG1iLTEwXCI+PGRpdiBjbGFzcz1cInNlbGYtbXNnLXdyYXBcIj48ZGl2IGNsYXNzPVwibXNnIGJsb2NrIHB1bGwtcmlnaHRcIj4nICsgJCh0aGlzKS52YWwoKSArICc8ZGl2IGNsYXNzPVwibXNnLXBlci1kZXRhaWwgbXQtNVwiPjxzcGFuIGNsYXNzPVwibXNnLXRpbWUgdHh0LWdyZXlcIj4zOjMwIHBtPC9zcGFuPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PjwvbGk+JykuaW5zZXJ0QWZ0ZXIoXCIuY2hhdC1mb3Itd2lkZ2V0cy0xIC5jaGF0LWNvbnRlbnQgIHVsIGxpOmxhc3QtY2hpbGRcIik7XHJcblx0XHRcdCQodGhpcykudmFsKCcnKTtcclxuXHRcdH0gZWxzZSBpZihlLndoaWNoID09IDEzKSB7XHJcblx0XHRcdGFsZXJ0KCdQbGVhc2UgdHlwZSBhc29tdGhpbmchJyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm47XHJcblx0fSk7XHJcblx0XHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLmZpeGVkLXNpZGViYXItcmlnaHQgLmNoYXQtY21wbHQtd3JhcCAuY2hhdC1kYXRhXCIsZnVuY3Rpb24gKGUpIHtcclxuXHRcdCQoXCIuZml4ZWQtc2lkZWJhci1yaWdodCAuY2hhdC1jbXBsdC13cmFwXCIpLmFkZENsYXNzKCdjaGF0LWJveC1zbGlkZScpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5maXhlZC1zaWRlYmFyLXJpZ2h0ICNnb3RvX2JhY2tcIixmdW5jdGlvbiAoZSkge1xyXG5cdFx0JChcIi5maXhlZC1zaWRlYmFyLXJpZ2h0IC5jaGF0LWNtcGx0LXdyYXBcIikucmVtb3ZlQ2xhc3MoJ2NoYXQtYm94LXNsaWRlJyk7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblx0XHJcblx0LypDaGF0IGZvciBXaWRnZXRzKi9cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIuY2hhdC1mb3Itd2lkZ2V0cy5jaGF0LWNtcGx0LXdyYXAgLmNoYXQtZGF0YVwiLGZ1bmN0aW9uIChlKSB7XHJcblx0XHQkKFwiLmNoYXQtZm9yLXdpZGdldHMuY2hhdC1jbXBsdC13cmFwXCIpLmFkZENsYXNzKCdjaGF0LWJveC1zbGlkZScpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIiNnb3RvX2JhY2tfd2lkZ2V0XCIsZnVuY3Rpb24gKGUpIHtcclxuXHRcdCQoXCIuY2hhdC1mb3Itd2lkZ2V0cy5jaGF0LWNtcGx0LXdyYXBcIikucmVtb3ZlQ2xhc3MoJ2NoYXQtYm94LXNsaWRlJyk7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblx0LypIb3Jpem9udGFsIE5hdiovXHJcblx0JChkb2N1bWVudCkub24oXCJzaG93LmJzLmNvbGxhcHNlXCIsXCIudG9wLWZpeGVkLW5hdiAuZml4ZWQtc2lkZWJhci1sZWZ0IC5zaWRlLW5hdiA+IGxpID4gdWxcIixmdW5jdGlvbiAoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qU2xpbXNjcm9sbCovXHJcblx0JCgnLm5pY2VzY3JvbGwtYmFyJykuc2xpbVNjcm9sbCh7aGVpZ2h0OicxMDAlJyxjb2xvcjogJyM4Nzg3ODcnLCBkaXNhYmxlRmFkZU91dCA6IHRydWUsYm9yZGVyUmFkaXVzOjAsc2l6ZTonNHB4JyxhbHdheXNWaXNpYmxlOmZhbHNlfSk7XHJcblx0JCgnLm1lc3NhZ2UtbmljZXNjcm9sbC1iYXInKS5zbGltU2Nyb2xsKHtoZWlnaHQ6JzIyOXB4JyxzaXplOiAnNHB4Jyxjb2xvcjogJyM4Nzg3ODcnLGRpc2FibGVGYWRlT3V0IDogdHJ1ZSxib3JkZXJSYWRpdXM6MH0pO1xyXG5cdCQoJy5tZXNzYWdlLWJveC1uaWNlc2Nyb2xsLWJhcicpLnNsaW1TY3JvbGwoe2hlaWdodDonMzUwcHgnLHNpemU6ICc0cHgnLGNvbG9yOiAnIzg3ODc4NycsZGlzYWJsZUZhZGVPdXQgOiB0cnVlLGJvcmRlclJhZGl1czowfSk7XHJcblx0JCgnLnByb2R1Y3QtbmljZXNjcm9sbC1iYXInKS5zbGltU2Nyb2xsKHtoZWlnaHQ6JzM0NnB4JyxzaXplOiAnNHB4Jyxjb2xvcjogJyM4Nzg3ODcnLGRpc2FibGVGYWRlT3V0IDogdHJ1ZSxib3JkZXJSYWRpdXM6MH0pO1xyXG5cdCQoJy5hcHAtbmljZXNjcm9sbC1iYXInKS5zbGltU2Nyb2xsKHtoZWlnaHQ6JzE2MnB4JyxzaXplOiAnNHB4Jyxjb2xvcjogJyM4Nzg3ODcnLGRpc2FibGVGYWRlT3V0IDogdHJ1ZSxib3JkZXJSYWRpdXM6MH0pO1xyXG5cdCQoJy50b2RvLWJveC1uaWNlc2Nyb2xsLWJhcicpLnNsaW1TY3JvbGwoe2hlaWdodDonMjg1cHgnLHNpemU6ICc0cHgnLGNvbG9yOiAnIzg3ODc4NycsZGlzYWJsZUZhZGVPdXQgOiB0cnVlLGJvcmRlclJhZGl1czowfSk7XHJcblx0JCgnLnVzZXJzLW5pY2VzY3JvbGwtYmFyJykuc2xpbVNjcm9sbCh7aGVpZ2h0OiczNzBweCcsc2l6ZTogJzRweCcsY29sb3I6ICcjODc4Nzg3JyxkaXNhYmxlRmFkZU91dCA6IHRydWUsYm9yZGVyUmFkaXVzOjB9KTtcclxuXHQkKCcudXNlcnMtY2hhdC1uaWNlc2Nyb2xsLWJhcicpLnNsaW1TY3JvbGwoe2hlaWdodDonMjU3cHgnLHNpemU6ICc0cHgnLGNvbG9yOiAnIzg3ODc4NycsZGlzYWJsZUZhZGVPdXQgOiB0cnVlLGJvcmRlclJhZGl1czowfSk7XHJcblx0JCgnLmNoYXRhcHAtbmljZXNjcm9sbC1iYXInKS5zbGltU2Nyb2xsKHtoZWlnaHQ6JzU0M3B4JyxzaXplOiAnNHB4Jyxjb2xvcjogJyM4Nzg3ODcnLGRpc2FibGVGYWRlT3V0IDogdHJ1ZSxib3JkZXJSYWRpdXM6MH0pO1xyXG5cdCQoJy5jaGF0YXBwLWNoYXQtbmljZXNjcm9sbC1iYXInKS5zbGltU2Nyb2xsKHtoZWlnaHQ6JzQ4M3B4JyxzaXplOiAnNHB4Jyxjb2xvcjogJyM4Nzg3ODcnLGRpc2FibGVGYWRlT3V0IDogdHJ1ZSxib3JkZXJSYWRpdXM6MH0pO1xyXG5cdFxyXG5cdC8qUHJvZHVjdCBjYXJvdXNlbCovXHJcblx0aWYoICQoJy5wcm9kdWN0LWNhcm91c2VsJykubGVuZ3RoID4gMCApXHJcblx0dmFyICRvd2wgPSAkKCcucHJvZHVjdC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuXHRcdGxvb3A6dHJ1ZSxcclxuXHRcdG1hcmdpbjoxNSxcclxuXHRcdG5hdjp0cnVlLFxyXG5cdFx0bmF2VGV4dDogW1wiPGkgY2xhc3M9J3ptZGkgem1kaS1jaGV2cm9uLWxlZnQnPjwvaT5cIixcIjxpIGNsYXNzPSd6bWRpIHptZGktY2hldnJvbi1yaWdodCc+PC9pPlwiXSxcclxuXHRcdGRvdHM6ZmFsc2UsXHJcblx0XHRhdXRvcGxheTp0cnVlLFxyXG5cdFx0cmVzcG9uc2l2ZTp7XHJcblx0XHRcdDA6e1xyXG5cdFx0XHRcdGl0ZW1zOjFcclxuXHRcdFx0fSxcclxuXHRcdFx0NDAwOntcclxuXHRcdFx0XHRpdGVtczoyXHJcblx0XHRcdH0sXHJcblx0XHRcdDc2Nzp7XHJcblx0XHRcdFx0aXRlbXM6M1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdDEzOTk6e1xyXG5cdFx0XHRcdGl0ZW1zOjRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG5cdC8qUmVmcmVzaCBJbml0IEpzKi9cclxuXHR2YXIgcmVmcmVzaE1lID0gJy5yZWZyZXNoJztcclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIscmVmcmVzaE1lLGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgcGFuZWxUb1JlZnJlc2ggPSAkKHRoaXMpLmNsb3Nlc3QoJy5wYW5lbCcpLmZpbmQoJy5yZWZyZXNoLWNvbnRhaW5lcicpO1xyXG5cdFx0dmFyIGRhdGFUb1JlZnJlc2ggPSAkKHRoaXMpLmNsb3Nlc3QoJy5wYW5lbCcpLmZpbmQoJy5wYW5lbC13cmFwcGVyJyk7XHJcblx0XHR2YXIgbG9hZGluZ0FuaW0gPSBwYW5lbFRvUmVmcmVzaC5maW5kKCcubGEtYW5pbS0xJyk7XHJcblx0XHRwYW5lbFRvUmVmcmVzaC5zaG93KCk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdGxvYWRpbmdBbmltLmFkZENsYXNzKCdsYS1hbmltYXRlJyk7XHJcblx0XHR9LDEwMCk7XHJcblx0XHRmdW5jdGlvbiBzdGFydGVkKCl7fSAvL2Z1bmN0aW9uIGJlZm9yZSB0aW1lb3V0XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdGZ1bmN0aW9uIGNvbXBsZXRlZCgpe30gLy9mdW5jdGlvbiBhZnRlciB0aW1lb3V0XHJcblx0XHRcdHBhbmVsVG9SZWZyZXNoLmZhZGVPdXQoODAwKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGxvYWRpbmdBbmltLnJlbW92ZUNsYXNzKCdsYS1hbmltYXRlJyk7XHJcblx0XHRcdH0sODAwKTtcclxuXHRcdH0sMTUwMCk7XHJcblx0XHQgIHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQvKkZ1bGxzY3JlZW4gSW5pdCBKcyovXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLmZ1bGwtc2NyZWVuXCIsZnVuY3Rpb24gKGUpIHtcclxuXHRcdCQodGhpcykucGFyZW50cygnLnBhbmVsJykudG9nZ2xlQ2xhc3MoJ2Z1bGxzY3JlZW4nKTtcclxuXHRcdCQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQvKk5hdiBUYWIgUmVzcG9uc2l2ZSBKcyovXHJcblx0JChkb2N1bWVudCkub24oJ3Nob3cuYnMudGFiJywgJy5uYXYtdGFicy1yZXNwb25zaXZlIFtkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHR2YXIgJHRhYnMgPSAkdGFyZ2V0LmNsb3Nlc3QoJy5uYXYtdGFicy1yZXNwb25zaXZlJyk7XHJcblx0XHR2YXIgJGN1cnJlbnQgPSAkdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XHJcblx0XHR2YXIgJHBhcmVudCA9ICRjdXJyZW50LmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJyk7XHJcblx0XHRcdCRjdXJyZW50ID0gJHBhcmVudC5sZW5ndGggPiAwID8gJHBhcmVudCA6ICRjdXJyZW50O1xyXG5cdFx0dmFyICRuZXh0ID0gJGN1cnJlbnQubmV4dCgpO1xyXG5cdFx0dmFyICRwcmV2ID0gJGN1cnJlbnQucHJldigpO1xyXG5cdFx0JHRhYnMuZmluZCgnPmxpJykucmVtb3ZlQ2xhc3MoJ25leHQgcHJldicpO1xyXG5cdFx0JHByZXYuYWRkQ2xhc3MoJ3ByZXYnKTtcclxuXHRcdCRuZXh0LmFkZENsYXNzKCduZXh0Jyk7XHJcblx0XHRyZXR1cm47XHJcblx0fSk7XHJcbn07XHJcbi8qKioqKiBncmFuZGluIGZ1bmN0aW9uIGVuZCAqKioqKi9cclxuXHJcbi8qKioqKiBDaGF0IEFwcCBmdW5jdGlvbiBTdGFydCAqKioqKi9cclxudmFyIGNoYXRBcHBUYXJnZXQgPSAkKCcuY2hhdC1mb3Itd2lkZ2V0cy0xLmNoYXQtY21wbHQtd3JhcCcpO1xyXG52YXIgY2hhdEFwcCA9IGZ1bmN0aW9uKCkge1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5jaGF0LWZvci13aWRnZXRzLTEuY2hhdC1jbXBsdC13cmFwIC5jaGF0LWRhdGFcIixmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblx0XHRpZih3aWR0aDw9MTAwNykge1xyXG5cdFx0XHRjaGF0QXBwVGFyZ2V0LmFkZENsYXNzKCdjaGF0LWJveC1zbGlkZScpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIiNnb3RvX2JhY2tfd2lkZ2V0XzFcIixmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblx0XHRpZih3aWR0aDw9MTAwNykge1xyXG5cdFx0XHRjaGF0QXBwVGFyZ2V0LnJlbW92ZUNsYXNzKCdjaGF0LWJveC1zbGlkZScpO1xyXG5cdFx0fVx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcbn07XHJcbi8qKioqKiBDaGF0IEFwcCBmdW5jdGlvbiBFbmQgKioqKiovXHJcblxyXG52YXIgYm94TGF5b3V0ID0gZnVuY3Rpb24oKSB7XHJcblx0aWYoKCEkd3JhcHBlci5oYXNDbGFzcyhcInJ0bC1sYXlvdXRcIikpJiYoJHdyYXBwZXIuaGFzQ2xhc3MoXCJib3gtbGF5b3V0XCIpKSlcclxuXHRcdCQoXCIuYm94LWxheW91dCAuZml4ZWQtc2lkZWJhci1yaWdodFwiKS5jc3Moe3JpZ2h0OiAkd3JhcHBlci5vZmZzZXQoKS5sZWZ0ICsgMzAwfSk7XHJcblx0XHRlbHNlIGlmKCR3cmFwcGVyLmhhc0NsYXNzKFwiYm94LWxheW91dCBydGwtbGF5b3V0XCIpKVxyXG5cdFx0XHQkKFwiLmJveC1sYXlvdXQgLmZpeGVkLXNpZGViYXItcmlnaHRcIikuY3NzKHtsZWZ0OiAkd3JhcHBlci5vZmZzZXQoKS5sZWZ0fSk7XHJcbn1cclxuYm94TGF5b3V0KCk7XHRcclxuXHJcbi8qKk9ubHkgRm9yIFNldHRpbmcgUGFuZWwgU3RhcnQqKi9cclxuXHJcbi8qRml4ZWQgU2xpZGViYXIqL1xyXG52YXIgZml4ZWRIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRpZigkKFwiLnNldHRpbmctcGFuZWwgI3N3aXRjaF8zXCIpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHRcdCR3cmFwcGVyLmFkZENsYXNzKFwic2Nyb2xsYWJsZS1uYXZcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdCR3cmFwcGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsYWJsZS1uYXZcIik7XHJcblx0fVxyXG59O1xyXG5maXhlZEhlYWRlcigpO1x0XHJcbiQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnLnNldHRpbmctcGFuZWwgI3N3aXRjaF8zJywgZnVuY3Rpb24gKCkge1xyXG5cdGZpeGVkSGVhZGVyKCk7XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59KTtcdFxyXG5cclxuLypUaGVtZSBDb2xvciBJbml0Ki9cclxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy50aGVtZS1vcHRpb24td3JhcCA+IGxpJywgZnVuY3Rpb24gKGUpIHtcclxuXHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUtdGhlbWUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUtdGhlbWUnKTtcclxuXHQkd3JhcHBlci5yZW1vdmVDbGFzcyAoZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuXHRcdHJldHVybiAoY2xhc3NOYW1lLm1hdGNoICgvKF58XFxzKXRoZW1lLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcclxuXHR9KS5hZGRDbGFzcygkKHRoaXMpLmF0dHIoJ2lkJykrJy1hY3RpdmUnKTtcclxuXHRyZXR1cm4gZmFsc2U7XHRcclxufSk7XHJcblxyXG4vKlByaW1hcnkgQ29sb3IgSW5pdCovXHJcbnZhciBwcmltYXJ5Q29sb3IgPSAnaW5wdXQ6cmFkaW9bbmFtZT1cInJhZGlvLXByaW1hcnktY29sb3JcIl0nO1xyXG5pZiggJCgnaW5wdXQ6cmFkaW9bbmFtZT1cInJhZGlvLXByaW1hcnktY29sb3JcIl0nKS5sZW5ndGggPiAwICl7XHJcblx0Ly8kKHByaW1hcnlDb2xvcilbMF0uY2hlY2tlZCA9IHRydWU7XHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJyxwcmltYXJ5Q29sb3IsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQkd3JhcHBlci5yZW1vdmVDbGFzcyAoZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuXHRcdFx0cmV0dXJuIChjbGFzc05hbWUubWF0Y2ggKC8oXnxcXHMpcGltYXJ5LWNvbG9yLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcclxuXHRcdH0pLmFkZENsYXNzKCQodGhpcykuYXR0cignaWQnKSk7XHJcblx0XHRyZXR1cm47XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qUmVzZXQgSW5pdCovXHJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjcmVzZXRfc2V0dGluZycsIGZ1bmN0aW9uIChlKSB7XHJcblx0JCgnLnRoZW1lLW9wdGlvbi13cmFwID4gbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlLXRoZW1lJykuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlLXRoZW1lJyk7XHJcblx0JHdyYXBwZXIucmVtb3ZlQ2xhc3MgKGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XHJcblx0XHRyZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCAoLyhefFxccyl0aGVtZS1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XHJcblx0fSkuYWRkQ2xhc3MoJ3RoZW1lLTEtYWN0aXZlJyk7XHJcblx0aWYoJChcIi5zZXR0aW5nLXBhbmVsICNzd2l0Y2hfM1wiKS5pcyhcIjpjaGVja2VkXCIpKVxyXG5cdFx0JCgnLnNldHRpbmctcGFuZWwgLmxheW91dC1zd2l0Y2hlciAuc3dpdGNoZXJ5JykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdCQoJyNwaW1hcnktY29sb3ItZ3JlZW4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdHJldHVybiBmYWxzZTtcdFxyXG59KTtcclxuXHJcblx0XHJcbi8qU3dpdGNoZXJ5IEluaXQqL1xyXG52YXIgZWxlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2V0dGluZy1wYW5lbCAuanMtc3dpdGNoJykpO1xyXG4kKCcuc2V0dGluZy1wYW5lbCAuanMtc3dpdGNoJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRuZXcgU3dpdGNoZXJ5KCQodGhpcylbMF0sICQodGhpcykuZGF0YSgpKTtcclxufSk7XHJcblxyXG4vKk9ubHkgRm9yIFNldHRpbmcgUGFuZWwgZW5kKi9cclxuXHJcbi8qKioqKiBSZXNpemUgZnVuY3Rpb24gc3RhcnQgKioqKiovXHJcbiQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XHJcblx0c2V0SGVpZ2h0V2lkdGgoKTtcclxuXHRib3hMYXlvdXQoKTtcclxuXHRjaGF0QXBwKCk7XHJcbn0pLnJlc2l6ZSgpO1xyXG4vKioqKiogUmVzaXplIGZ1bmN0aW9uIGVuZCAqKioqKi9cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=