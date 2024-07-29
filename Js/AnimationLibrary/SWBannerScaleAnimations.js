function SWBannerScaleAnimations() {
    var _this = this;
    _this.bannerImages = document.querySelectorAll('.banner-image');
    _this.bannerImage;
    _this.isResizing = false;
    _this.addResizeListener();
    _this.setBannerImage();
    _this.animateBannerImage();
  }
  SWBannerScaleAnimations.prototype.getDeviceType = function() {
    if (window.innerWidth > 767) {
      return "desktop";
    } else {
      return "mobile";
    }
  }
  SWBannerScaleAnimations.prototype.setBannerImage = function() {
    var _this = this;
    var deviceType = _this.getDeviceType();
    switch (deviceType) {
      case 'desktop':
        for (var i = 0, len = _this.bannerImages.length; i < len; i++) {
          if (_this.bannerImages[i].classList.contains('desktop-image')) {
            _this.bannerImage = _this.bannerImages[i];
            break;
          }
        }
        break;
      case 'mobile':
        for (var i = 0, len = _this.bannerImages.length; i < len; i++) {
          if (_this.bannerImages[i].classList.contains('mobile-image')) {
            _this.bannerImage = _this.bannerImages[i];
            break;
          }
        }
        break;
    }
  }
  SWBannerScaleAnimations.prototype.animateBannerImage = function() {
    var _this = this;
    var bannerImage = _this.bannerImage;
    if (bannerImage) {
      var image = new Image();
      image.src = bannerImage.dataset.src;
      image.onload = function() {
        var tl = new TimelineMax({
          paused: true
        });
        tl.to(bannerImage, 0.6, {
          opacity: 1,
          scale: 1.02
        }, 0);
        requestAnimFrame(function() {
          tl.play()
        });
      }
    }
  }
  SWBannerScaleAnimations.prototype.onResize = function() {
    var _this = this;
    _this.setBannerImage();
    _this.animateBannerImage();
  }
  SWBannerScaleAnimations.prototype.addResizeListener = function() {
    var _this = this;
    window.addEventListener('resize', function() {
      window.clearTimeout(_this.isResizing);
      _this.isResizing = setTimeout(function() {
        _this.onResize();
      }, 200);
    }, false);
  }