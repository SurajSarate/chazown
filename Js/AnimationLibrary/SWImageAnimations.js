function SWImageAnimations() {
  var _this = this;
  _this.swImageWrappers = document.querySelectorAll('.sw-image-wrapper');
  _this.imageOffsets = [];
  _this.scrollY = window.pageYOffset;
  _this.ticking = false;
  _this.setImageOffsets();
  _this.scrollListener = _this.onScroll.bind(_this);
  _this.addScrollListener();
  _this.update();
}
SWImageAnimations.prototype.setImageOffsets = function() {
  var _this = this;
  for (var i = 0, len = _this.swImageWrappers.length; i < len; i++) {
    var swImageWrapper = _this.swImageWrappers[i];
    var swImage = swImageWrapper.querySelector('.sw-image');
    var imageBoundingClientRect = swImageWrapper.getBoundingClientRect();
    var offsetTop = imageBoundingClientRect.top + _this.scrollY - window.innerHeight;
    _this.imageOffsets.push(offsetTop);
    (function(swImageWrapper, swImage) {
      var tl = new TimelineMax();
      tl.set(swImageWrapper, {
        scale: 0.8,
        force3D: true,
        onUpdate: function() {
          if (swImageWrapper._gsTransform) {
            var scaleX = swImageWrapper._gsTransform.scaleX;
            TweenMax.set(swImage, {
              scale: 1 / scaleX,
              force3D: true
            })
          }
        }
      }, 0)
    })(swImageWrapper, swImage)
  }
}
SWImageAnimations.prototype.requestTick = function() {
  var _this = this;
  if (!_this.ticking) {
    requestAnimationFrame(_this.update.bind(_this));
    _this.ticking = true;
  }
}
SWImageAnimations.prototype.update = function() {
  var _this = this;
  var areAnimationsDone = true;
  for (var i = 0, len = _this.swImageWrappers.length; i < len; i++) {
    var swImageWrapper = _this.swImageWrappers[i];
    var swImage = swImageWrapper.querySelector('.sw-image');
    if (!swImageWrapper.dataset.animatedOnScroll) {
      areAnimationsDone = false;
    }
    if (_this.scrollY > _this.imageOffsets[i] && !swImageWrapper.dataset.animatedOnScroll) {
      swImageWrapper.dataset.animatedOnScroll = true;
      (function(swImageWrapper, swImage) {
        var tl = new TimelineMax();
        tl.to(swImageWrapper, 0.6, {
          scale: 1,
          force3D: true,
          clearProps: 'transform',
          onUpdate: function() {
            if (swImageWrapper._gsTransform) {
              var scaleX = swImageWrapper._gsTransform.scaleX;
              TweenMax.set(swImage, {
                scale: 1 / scaleX,
                force3D: true
              })
            }
          }
        }, 0)
      })(swImageWrapper, swImage)
    }
  }
  if (areAnimationsDone) {
    _this.killScrollListener();
  }
  _this.ticking = false;
}
SWImageAnimations.prototype.onScroll = function() {
  var _this = this;
  _this.scrollY = window.pageYOffset;
  _this.requestTick();
}
SWImageAnimations.prototype.addScrollListener = function() {
  var _this = this;
  window.addEventListener('scroll', _this.scrollListener, false)
}
SWImageAnimations.prototype.killScrollListener = function() {
  var _this = this;
  window.removeEventListener('scroll', _this.scrollListener, false)
}