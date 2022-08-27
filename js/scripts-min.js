(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _isMobile = require("./modules/isMobile");

var _initialVariables = require("./modules/initialVariables");

var _loading = require("./modules/loading");

var _scrollSmooth = require("./modules/scrollSmooth");

var _activeMenu = require("./modules/active-menu");

(0, _isMobile.setMobileClass)(_initialVariables.dd, 'mobile', 'desktop');
(0, _activeMenu.activeMenu)();
var loadingEle = document.getElementById('loading');
addEventListener('load', function () {
  (0, _initialVariables.cssScrollBarWidth)();
  if (loadingEle) (0, _loading.loading)(loadingEle, 500);
});
addEventListener('resize', function () {
  (0, _initialVariables.cssScrollBarWidth)();
  (0, _isMobile.setMobileClass)(_initialVariables.dd, 'mobile', 'desktop');
});

var setCurrentYear = function setCurrentYear(ele) {
  ele.innerText = new Date().getFullYear();
};

var currentYearElement = (0, _initialVariables.id)('currentYear');
if (currentYearElement) setCurrentYear(currentYearElement);

(function () {
  (0, _scrollSmooth.scrollTo)('.scroll', false, '.main-header');
})();

(0, _activeMenu.toggleMenu)((0, _isMobile.verifyMobile)(), '#toggle', '#main-menu');

},{"./modules/active-menu":2,"./modules/initialVariables":3,"./modules/isMobile":4,"./modules/loading":5,"./modules/scrollSmooth":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleMenu = exports.activeMenu = void 0;

var _initialVariables = require("./initialVariables");

var activeMenu = function activeMenu() {
  var menu = document.getElementById('main-menu');

  if (menu) {
    var links = Array.from(menu.querySelectorAll('a'));
    links.map(function (link) {
      if (link.href === location.href || link.href === location.href.slice(0, -1)) link.classList.add('active');
    });
  }
};

exports.activeMenu = activeMenu;

var toggleMenu = function toggleMenu(isMobile, toggleElement, mainMenu) {
  var toggle = document.querySelector(toggleElement);
  var menu = document.querySelector(mainMenu);
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
};

exports.toggleMenu = toggleMenu;

var toggleMenuAction = function toggleMenuAction(toggle, menu) {
  var links = Array.from(_initialVariables.d.querySelectorAll('a'));
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.toggle('active');
  });
  menu.addEventListener('click', function (e) {
    var t = e.target;

    if (t.nodeName === 'A') {
      menu.classList.remove('active');
    }
  });
};

},{"./initialVariables":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.w = exports.q = exports.log = exports.id = exports.dir = exports.dd = exports.d = exports.cssScrollBarWidth = exports.c = exports.body = exports.all = void 0;
var d = document,
    w = window,
    c = console,
    log = console.log,
    dir = console.dir,
    dd = document.documentElement,
    id = document.getElementById.bind(document),
    q = document.querySelector.bind(document),
    all = document.querySelectorAll.bind(document),
    body = document.body;
exports.body = body;
exports.all = all;
exports.q = q;
exports.id = id;
exports.dd = dd;
exports.dir = dir;
exports.log = log;
exports.c = c;
exports.w = w;
exports.d = d;

var getScrollBarWidth = function getScrollBarWidth() {
  return window.innerWidth - document.documentElement.getBoundingClientRect().width;
}; // funcion para asignar ese valor a una variable css


var cssScrollBarWidth = function cssScrollBarWidth() {
  return document.documentElement.style.setProperty("--scrollbar", "".concat(getScrollBarWidth(), "px"));
};

exports.cssScrollBarWidth = cssScrollBarWidth;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyMobile = exports.setMobileClass = exports.isMobile = void 0;
var isMobile = {
  mobilecheck: function mobilecheck() {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4));
  }
};
exports.isMobile = isMobile;

var verifyMobile = function verifyMobile() {
  return isMobile.mobilecheck();
};

exports.verifyMobile = verifyMobile;

var setMobileClass = function setMobileClass(ele, classNameMobile, classNameDesktop) {
  if (verifyMobile()) {
    ele.classList.add(classNameMobile);
    ele.classList.remove(classNameDesktop);
  } else {
    ele.classList.remove(classNameMobile);
    ele.classList.add(classNameDesktop);
  }
};

exports.setMobileClass = setMobileClass;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loading = void 0;

var loading = function loading(ele, time) {
  ele.style.transition = "opacity ".concat(time, "ms");
  ele.style.opacity = "0";
  setTimeout(function () {
    ele.remove();
  }, time);
};

exports.loading = loading;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var scrollAnchors = function scrollAnchors(e) {
  var respond = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var history = arguments.length > 2 ? arguments[2] : undefined;
  var hh = arguments.length > 3 ? arguments[3] : undefined;

  var distanceToTop = function distanceToTop(el) {
    return Math.floor(el.getBoundingClientRect().top);
  };

  e.preventDefault();
  var targetID = respond ? respond.getAttribute("href") : e.target.getAttribute("href");
  var targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  var originalTop = distanceToTop(targetAnchor);
  window.scrollBy({
    top: originalTop - hh,
    left: 0,
    behavior: "smooth"
  });
  if (history) window.history.pushState("", "", targetID);
  var checkIfDone = setInterval(function () {
    var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;

    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      // targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      clearInterval(checkIfDone);
    }
  }, 100);
};

var scrollTo = function scrollTo(scrollEle) {
  var history = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var elementOffSetId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var links = _toConsumableArray(document.querySelectorAll(scrollEle));

  var elementOffSetHeight = elementOffSetId ? document.querySelector(elementOffSetId).clientHeight : 0;
  if (elementOffSetHeight !== 0) document.documentElement.style.setProperty("--header-height", "".concat(elementOffSetHeight, "px"));
  links.map(function (each) {
    return each.addEventListener("click", function (e) {
      e.preventDefault();
      scrollAnchors(e, each, history, elementOffSetHeight);
    });
  });
};

exports.scrollTo = scrollTo;

},{}]},{},[1]);

//# sourceMappingURL=scripts-min.js.map
