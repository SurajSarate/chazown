function SWTimeline(timelineWrapper, callbackFunction) {
    var _this = this;
    _this.timelineWrapper = timelineWrapper;
    _this.callbackFunction = callbackFunction;
    _this.timelineOffset = 0;
    _this.timelineHeight = _this.timelineWrapper.getBoundingClientRect().height;
    _this.scrollY = window.pageYOffset;
    _this.ticking = false;
    _this.setTimelineOffset();
    _this.scrollListener = _this.onScroll.bind(_this);
    _this.addScrollListener();
    _this.update();
  }
  SWTimeline.prototype.setTimelineOffset = function() {
    var _this = this;
    _this.timelineOffset = _this.timelineWrapper.getBoundingClientRect().top + _this.scrollY - window.innerHeight;
  }
  SWTimeline.prototype.requestTick = function() {
    var _this = this;
    if (!_this.ticking) {
      requestAnimationFrame(_this.update.bind(_this));
      _this.ticking = true;
    }
  }
  SWTimeline.prototype.update = function() {
    var _this = this;
    if (_this.scrollY > _this.timelineOffset + _this.timelineHeight && !_this.timelineWrapper.dataset.animated) {
      _this.timelineWrapper.dataset.animated = true;
      _this.killScrollListener();
      var tl = new TimelineMax();
      tl.staggerTo('.timeline_block span', 0.4, {
        className: '+=active',
        onComplete: function() {
          TweenMax.set(this.target, {
            className: '-=active'
          })
        }
      }, 0.08).to('.timeline_block span[data-attribute="0"]', 0.1, {
        className: '+=active'
      }, 1.12).to('.timeline_image_box', 0.3, {
        scale: 1.05
      }, 1.12).to('.timeline_image_box', 0.3, {
        scale: 1,
        clearProps: 'transform',
        onComplete: function() {
          _this.callbackFunction();
        }
      });
    }
    _this.ticking = false;
  }
  SWTimeline.prototype.onScroll = function() {
    var _this = this;
    _this.scrollY = window.pageYOffset;
    _this.requestTick();
  }
  SWTimeline.prototype.addScrollListener = function() {
    var _this = this;
    window.addEventListener('scroll', _this.scrollListener, false)
  }
  SWTimeline.prototype.killScrollListener = function() {
    var _this = this;
    window.removeEventListener('scroll', _this.scrollListener, false)
  }