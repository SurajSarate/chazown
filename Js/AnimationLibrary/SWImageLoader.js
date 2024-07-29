/* ====================================== */
/* Image Loading
/* ====================================== */
function SWImageLoader() {
  var _this = this;
  _this.isResizing = false;
  _this.imageList = [];
  _this.lowPriorityMiscellaneousImages = [];
  _this.setImages();
  _this.addImagesToDOM();
  _this.addResizeListener();
}
SWImageLoader.prototype.getDeviceType = function() {
  if (window.innerWidth > 767) {
    return "desktop";
  } else {
    return "mobile";
  }
}
SWImageLoader.prototype.loadImagesToDOMSerially = function(images, index) {
  var _this = this;
  index = index || 0;
  if (images.length > index) {
    var imgEl = images[index];
    if (!imgEl.dataset.animated && !imgEl.dataset.loadonly) {
      imgEl.style.opacity = 0;
      imgEl.style.transition = 'opacity 0ms';
    }
    var img = new Image();
    img.src = imgEl.getAttribute('data-src');
    img.onload = function() {
      imgEl.dataset.loaded = true;
      if (imgEl.tagName == 'IMG') {
        imgEl.src = this.src;
        if (!imgEl.dataset.loadonly) {
          imgEl.style.opacity = 1;
          imgEl.style.transition = 'opacity 600ms cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          imgEl.dataset.animated = true;
        }
      } else {
        imgEl.style.backgroundImage = 'url(' + this.src + ')';
        if (!imgEl.dataset.loadonly) {
          imgEl.style.opacity = 1;
          imgEl.style.transition = 'opacity 600ms cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          imgEl.dataset.animated = true;
        }
      }
      _this.loadImagesToDOMSerially(images, index + 1);
    };
  } else {
    _this.preloadMiscellaneousImages(_this.lowPriorityMiscellaneousImages);
  }
}
SWImageLoader.prototype.preloadMiscellaneousImages = function(images, index) {
  var _this = this;
  index = index || 0;
  if (images.length > index) {
    var img = new Image();
    img.src = images[index];
    img.onload = function() {
      _this.preloadMiscellaneousImages(images, index + 1);
    };
  }
}
SWImageLoader.prototype.setImages = function() {
  var _this = this;
  _this.imageList = [];
  _this.lowPriorityImageList = [];
  _this.highPriorityImageList = [];
  _this.lowPriorityMiscellaneousImages = [];
  var deviceType = _this.getDeviceType();
  var allImages = document.querySelectorAll('*[data-src]');
  if (deviceType === "desktop") {
    for (var i = 0, len = allImages.length; i < len; i++) {
      var image = allImages[i];
      if (image.classList.contains('common-image') || image.classList.contains('desktop-image')) {
        if (('lowPriority' in image.dataset)) {
          _this.lowPriorityImageList.push(image);
        } else {
          _this.highPriorityImageList.push(image);
        }
      }
    }
    _this.imageList = _this.highPriorityImageList.concat(_this.lowPriorityImageList);
    _this.lowPriorityMiscellaneousImages = ["images/about/desktop/banner.jpg", "images/project/desktop/banner.jpg", "images/people/desktop/banner.jpg", "images/csr/desktop/banner.jpg", "images/media/desktop/banner.jpg", "images/contact/banner.jpg"];
    //
  } else {
    for (var i = 0, len = allImages.length; i < len; i++) {
      var image = allImages[i];
      if (image.classList.contains('common-image') || image.classList.contains('mobile-image')) {
        if (('lowPriority' in image.dataset)) {
          _this.lowPriorityImageList.push(image);
        } else {
          _this.highPriorityImageList.push(image);
        }
      }
    }
    _this.imageList = _this.highPriorityImageList.concat(_this.lowPriorityImageList);
    _this.lowPriorityMiscellaneousImages = ["images/about/mobile/banner.jpg", "images/people/mobile/banner.jpg", "images/csr/mobile/banner.jpg", "images/media/mobile/banner.jpg"];
    //
  }
}
SWImageLoader.prototype.addImagesToDOM = function() {
  var _this = this;
  _this.loadImagesToDOMSerially(_this.imageList);
}
SWImageLoader.prototype.onResize = function() {
  var _this = this;
  _this.setImages();
  _this.addImagesToDOM();
}
SWImageLoader.prototype.addResizeListener = function() {
  var _this = this;
  window.addEventListener('resize', function() {
    window.clearTimeout(_this.isResizing);
    _this.isResizing = setTimeout(function() {
      _this.onResize();
    }, 200);
  }, false);
}