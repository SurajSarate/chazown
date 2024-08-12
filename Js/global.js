/* ====================================== */
/* Check Device
/* ====================================== */
function getDeviceInfo() {
  if (navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|IEMobile)/)) {
    return 'mobile';
  } else if (navigator.userAgent.match(/(iPad)/)) {
    return 'ipad';
  } else {
    return 'desktop';
  }
}

function detectIE() {
  /**
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
}
/* ====================================== */
/* Global Scroll Event Handler
/* ====================================== */
if (getDeviceInfo() === 'mobile') {
  var sidebarBlock = document.querySelector('.sidebar_block');
  var lastY = 0; // Needed in order to determine direction of scroll.
  sidebarBlock.addEventListener('touchstart', function(event) {
    lastY = event.touches[0].clientY;
  }, false);
  sidebarBlock.addEventListener('touchmove', function(event) {
    var top = event.touches[0].clientY;
    // Determine scroll position and direction.
    var scrollTop = event.target.scrollTop;
    var direction = (lastY - top) < 0 ? "up" : "down";
    // FIX IT!
    if (scrollTop == 0 && direction == "up") {
      // Prevent scrolling up when already at top as this introduces a freeze.
      event.target.scrollTop = 1;
      event.preventDefault();
    } else if (scrollTop >= (event.target.scrollHeight - event.target.getBoundingClientRect()
        .height) && direction == "down") {
      // Prevent scrolling down when already at bottom as this also introduces a freeze.
      event.target.scrollTop = event.target.scrollHeight - event.target.getBoundingClientRect()
        .height - 1;
      event.preventDefault();
    }
    lastY = top;
  }, false);
}
window.addEventListener('scroll', _.throttle(onScroll, 16), false)
/* ============================================== */
/* Animation Frame/Timeout/Interval Functions
/* ============================================== */
// requestAnimationFrame() shim by Paul Irish
window.requestAnimFrame = (function() {
  return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function( /* function */ callback, /* DOMElement */ element) {
    window.setTimeout(callback, 1000 / 60);
  });
})();
/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
window.requestInterval = function(fn, delay) {
  if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return window.setInterval(fn, delay);
  var start = new Date()
    .getTime(),
    handle = new Object();

  function loop() {
    var current = new Date()
      .getTime(),
      delta = current - start;
    if (delta >= delay) {
      fn.call();
      start = new Date()
        .getTime();
    }
    handle.value = requestAnimFrame(loop);
  }
  handle.value = requestAnimFrame(loop);
  return handle;
};
/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestInterval = function(handle) {
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) /* Support for legacy API */ : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) : clearInterval(handle);
};
/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
window.requestTimeout = function(fn, delay) {
  if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return window.setTimeout(fn, delay);
  var start = new Date()
    .getTime(),
    handle = new Object();

  function loop() {
    var current = new Date()
      .getTime(),
      delta = current - start;
    delta >= delay ? fn.call() : (handle.value = requestAnimFrame(loop));
  }
  handle.value = requestAnimFrame(loop);
  return handle;
};
/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function(handle) {
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) /* Support for legacy API */ : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) : clearTimeout(handle);
};
/* ====================================== */
/* Helper Functions
/* ====================================== */
function removeElement(element) {
  element.parentNode.removeChild(element);
}

function scrollEasing(lastScrollY, thisScrollY, easingFactor) {
  easingFactor = easingFactor || 0.12;
  return (1 - easingFactor) * lastScrollY + easingFactor * thisScrollY;
}

function between(value, lowerLimit, upperLimit) {
  if (value >= lowerLimit && value <= upperLimit) {
    return true;
  } else {
    return false;
  }
}

function mapRange(x, a, b, c, d) {
  x = setBounds(x, a, b);
  return (x - a) * (d - c) / (b - a) + c;
}

function setBounds(value, lowerLimit, upperLimit) {
  if (value < lowerLimit) value = lowerLimit;
  if (value > upperLimit) value = upperLimit;
  return value;
}
/* ====================================== */
/* Global Page Functions
/* ====================================== */
var scrollingElement = document.scrollingElement || document.documentElement;
var customHeader = document.querySelector('.custom_header');
var scrolldownArrow = document.querySelector('.animate-scroll-arrow');
var pageContainer = document.querySelector('.page-container');
var mobileMenu = document.querySelector('.mbl_custom_menu');
var thisScrollY = window.pageYOffset;
var lastScrollY = 0;
var ticking = false;
var enableMenuToggle = true;
requestAnimationFrame(update);
/**
 * Our animation callback
 */
function update() {
  if (thisScrollY >= window.innerHeight / 2) {
    if (lastScrollY - thisScrollY > 10) {
      enableMenuToggle = true;
      customHeader.style.opacity = "1";
      customHeader.style.pointerEvents = "auto";
    }
    // if (thisScrollY - lastScrollY > 4) {
    //   enableMenuToggle = false;
    //   customHeader.style.opacity = "0";
    //   customHeader.style.pointerEvents = "none";
    // }
  }
  lastScrollY = thisScrollY;
  if (thisScrollY >= 50) {
    if (!customHeader.classList.contains('visible_top') && !document.body.classList.contains('sidebar_open')) customHeader.classList.add('visible_top');
    if (scrolldownArrow && !scrolldownArrow.classList.contains('d-n')) {
      scrolldownArrow.classList.add('d-n');
    }
  } else {
    if (customHeader.classList.contains('visible_top') && !document.body.classList.contains('sidebar_open')) customHeader.classList.remove('visible_top');
  }
  ticking = false;
}
/**
 * Callback for our scroll event - just
 * keeps track of the last scroll value
 */
function onScroll() {
  thisScrollY = window.pageYOffset;
  requestTick();
}
/**
 * Calls rAF if it's not already
 * been done already
 */
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

function toggleSidebar(event) {
  if (enableMenuToggle) {
    enableMenuToggle = false;
    document.body.classList.toggle('sidebar_open');
    if (document.body.classList.contains('sidebar_open')) {
      windowOffsetY = window.pageYOffset;
      document.body.style.position = "fixed";
      mobileMenu.style.opacity = '0';
      setTimeout(function() {
        // mobileMenu.style.height = window.innerHeight + 'px';
        mobileMenu.style.transition = 'opacity 300ms,right 300ms';
        mobileMenu.style.opacity = '1';
        pageContainer.style.transform = "translate3d(0,-" + windowOffsetY + "px,0)";
        enableMenuToggle = true;
      }, 1)
    } else {
      pageContainer.style.transform = "translate3d(0,0,0)";
      document.body.style.position = "static";
      setTimeout(function() {
        scrollingElement.scrollTop = windowOffsetY;
        mobileMenu.style.opacity = '0';
        enableMenuToggle = true;
      }, 0)
    }
  }
}

function closeSidebar() {
  toggleSidebar()
}


// Footer Date

// footer_copyright

var footerYearEls = document.querySelectorAll('.footer-year');
for (var i = 0, len = footerYearEls.length; i < len; i++) {
  var date = new Date();
  footerYearEls[i].innerHTML = date.getFullYear();
}


// window.oncontextmenu = function () {
//   return false;
// }
// document.onkeydown = function (e) { 
//    if (window.event.keyCode == 123 ||  e.button==2)    
//    return false;
// }