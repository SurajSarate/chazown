/* ============================================== */
/* Slider Object
/* ============================================== */
function SWSlider(sliderConfig) {
  var _this = this;
  _this.scrollY = window.pageYOffset;
  _this.isScrolling = false;
  _this.homepageBannerWrapper = sliderConfig.sliderWrapper;
  _this.slideStatistics = _this.homepageBannerWrapper.querySelector('.slide-statistics');
  _this.sliderInterval = sliderConfig.sliderInterval;
  _this.transitionDuration = sliderConfig.transitionDuration;
  _this.bannerSliderHandle, _this.x1Down, _this.y1Down = null;
  _this.isSliderNavigationDisabled = true;
  _this.autoplayKilledOnScroll = false;
  _this.sliderWrapper = _this.homepageBannerWrapper.querySelector('.slider-wrapper');
  _this.slides = _this.sliderWrapper.querySelectorAll('.slide[slide-index]');
  _this.slideContent = _this.sliderWrapper.querySelectorAll('.slide-content');
  _this.addScrollListener();
  if (getDeviceInfo() !== "desktop") {
    _this.sliderWrapper.addEventListener('touchstart', function(event) {
      _this.handleSliderTouchStart(event);
    }, false);
    _this.sliderWrapper.addEventListener('touchmove', function(event) {
      _this.handleSliderTouchMove(event)
    }, false);
  }
}
SWSlider.prototype.reInitSlides = function() {
  var _this = this;
  _this.slides = _this.sliderWrapper.querySelectorAll('.slide[slide-index]');
  _this.slideContent = _this.sliderWrapper.querySelectorAll('.slide-content');
}
SWSlider.prototype.appendFirstSlide = function() {
  var _this = this;
  _this.sliderWrapper.appendChild(_this.slides[0]);
  _this.reInitSlides();
}
SWSlider.prototype.prependLastSlide = function() {
  var _this = this;
  var lastSlide = _this.slides[_this.slides.length - 1];
  _this.sliderWrapper.prepend(lastSlide);
  _this.reInitSlides();
}
SWSlider.prototype.cloneFirstSlide = function() {
  var _this = this;
  var firstSlide = _this.slides[0];
  var firstSlideClone = firstSlide.cloneNode(true);
  firstSlideClone.style.position = "absolute";
  firstSlideClone.style.left = "0";
  firstSlideClone.style.top = "0";
  return firstSlideClone;
}
SWSlider.prototype.transitionToNextSlide = function() {
  var _this = this;
  var firstSlide = _this.slides[0];
  var secondSlide = _this.slides[1];
  var firstSlideContent = _this.slideContent[0];
  var secondSlideContent = _this.slideContent[1];
  var tl = new TimelineMax({
    paused: true
  });
  tl.call(_this.tween_slideData.bind(_this), [secondSlide], 0)
    .call(_this.tween_animateNextSlide.bind(_this), [firstSlide, secondSlide], this, 0)
  requestAnimFrame(function() {
    tl.play();
  })
}
SWSlider.prototype.transitionToPreviousSlide = function() {
  var _this = this;
  var previousSlide = _this.slides[_this.slides.length - 1];
  var tl = new TimelineMax({
    paused: true
  });
  tl.call(_this.tween_slideData.bind(_this), [previousSlide], this, 0)
    .call(_this.tween_animatePreviousSlide.bind(_this), [], this, 0)
  requestAnimFrame(function() {
    tl.play();
  })
}
SWSlider.prototype.tween_animateNextSlide = function(firstSlide, secondSlide) {
  var _this = this;
  var firstSlide = _this.slides[0];
  var secondSlide = _this.slides[1];
  var firstSlideContent = _this.slideContent[0];
  var secondSlideContent = _this.slideContent[1];
  _this.resetVideoPosition(secondSlide);
  var secondSlideClone = secondSlide.cloneNode(true);
  _this.resetVideoPosition(secondSlideClone);
  var secondSlideCloneContent = secondSlideClone.querySelector('.slide-content');
  secondSlideClone.style.position = "absolute";
  secondSlideClone.style.left = "0";
  secondSlideClone.style.top = "0";
  secondSlideClone.style.opacity = "0";
  secondSlideCloneContent.style.opacity = "0";
  secondSlideCloneContent.style.transform = "scale(1)";
  _this.sliderWrapper.appendChild(secondSlideClone);
  requestTimeout(function() {
    var tl = new TimelineMax();
    tl.to(secondSlideClone, _this.transitionDuration, {
        autoAlpha: 1
      }, 0)
      .to(secondSlideCloneContent, _this.transitionDuration, {
        opacity: 1,
        scale: 1.1,
        onComplete: function() {
          secondSlideContent.style.transform = "scale(1.1)";
          _this.appendFirstSlide();
          requestTimeout(function() {
            _this.sliderWrapper.removeChild(secondSlideClone);
            _this.playVideo(secondSlide);
            _this.resetVideoPosition(firstSlide);
            _this.enableSliderNavigation();
          }, 0)
        }
      }, 0)
  }, 0)
}
SWSlider.prototype.tween_animatePreviousSlide = function() {
  var _this = this;
  var firstSlide = _this.slides[0];
  var firstSlideContent = _this.slideContent[0];
  var previousSlide = _this.slides[_this.slides.length - 1];
  var previousSlideContent = _this.slideContent[_this.slides.length - 1];
  var previousSlideClone = previousSlide.cloneNode(true);
  _this.resetVideoPosition(previousSlide);
  _this.resetVideoPosition(previousSlideClone);
  var previousSlideCloneContent = previousSlideClone.querySelector('.slide-content');
  previousSlideClone.style.position = "absolute";
  previousSlideClone.style.left = "0";
  previousSlideClone.style.top = "0";
  previousSlideClone.style.opacity = "0";
  previousSlideCloneContent.style.transform = "scale(1)";
  _this.sliderWrapper.appendChild(previousSlideClone);
  requestTimeout(function() {
    var tl = new TimelineMax();
    tl.to(previousSlideClone, _this.transitionDuration, {
        autoAlpha: 1
      }, 0)
      .to(previousSlideCloneContent, _this.transitionDuration, {
        autoAlpha: 1,
        scale: 1.1,
        onComplete: function() {
          previousSlideContent.style.transform = "scale(1.1)";
          _this.prependLastSlide();
          requestTimeout(function() {
            _this.sliderWrapper.removeChild(previousSlideClone);
            _this.reInitSlides();
            _this.playVideo(previousSlide);
            _this.resetVideoPosition(firstSlide);
            _this.enableSliderNavigation();
          }, 0)
        }
      }, 0)
  }, 0)
}
SWSlider.prototype.tween_slideData = function(slide) {
  var _this = this;
  var textName = _this.homepageBannerWrapper.querySelector('.text_name');
  var tl = new TimelineMax();
  tl.to(textName, 0.3, {
      autoAlpha: 0,
      force3D: true
    }, 0)
    .to(_this.slideStatistics, 0.3, {
      className: "-=animate",
      autoAlpha: 0,
      force3D: true,
      onComplete: function() {
        _this.setSlideData(slide);
      }
    }, 0)
    .to(textName, 0.3, {
      autoAlpha: 1,
      force3D: true
    }, 0.31)
    .to(_this.slideStatistics, 0.3, {
      className: "+=animate",
      autoAlpha: 1,
      force3D: true,
      onComplete: function() {
        _this.triggerSliderAutoplay();
      }
    }, 0.31);
}
SWSlider.prototype.setSlideData = function(slide) {
  var _this = this;
  var projectNameEl = _this.homepageBannerWrapper.querySelector('.text_name');
  projectNameEl.innerHTML = slide.dataset.name;
  var statisticsWrapper = _this.slideStatistics;
  statisticsWrapper.setAttribute('slide-index', slide.getAttribute('slide-index'));
  var statisticsData = slide.dataset.stats;
  statisticsData = statisticsData.replace(/'/g, '"');
  statisticsData = JSON.parse(statisticsData);
  var topLabels = slide.dataset.toplabel;
  topLabels = topLabels.replace(/'/g, '"');
  topLabels = JSON.parse(topLabels);
  var bottomLabels = slide.dataset.bottomlabel;
  bottomLabels = bottomLabels.replace(/'/g, '"');
  bottomLabels = JSON.parse(bottomLabels);
  var statEls = statisticsWrapper.querySelectorAll('.stats_number');
  for (var i = 0, len = statEls.length; i < len; i++) {
    var statEl = statEls[i];
    var title = statEl.getElementsByTagName('h2')[0];
    var topLabel = statEl.querySelector('.top-label');
    var bottomLabel = statEl.querySelector('.bottom-label');
    title.innerHTML = statisticsData[i];
    topLabel.innerHTML = topLabels[i];
    bottomLabel.innerHTML = bottomLabels[i];
    if (statisticsData[i] == '') {
      title.parentElement.style.visibility = 'hidden';
    } else {
      title.parentElement.style.visibility = 'visible';
    }
  }
}
SWSlider.prototype.resetVideoPosition = function(slide) {
  var _this = this;
  if (window.innerWidth > 767) {
    var videoEls = slide.getElementsByTagName('video');
    for (var i = 0, len = videoEls.length; i < len; i++) {
      var videoEl = videoEls[i];
      if (detectIE()) {
        if (!isNaN(videoEl.duration)) {
          videoEl.currentTime = 0;
        }
      } else {
        videoEl.currentTime = 0;
      }
      videoEl.pause();
    }
  }
}
SWSlider.prototype.playVideo = function(slide) {
  if (window.innerWidth > 767) {
    var videoEls = slide.getElementsByTagName('video');
    for (var i = 0, len = videoEls.length; i < len; i++) {
      var videoEl = videoEls[i];
      videoEl.play();
    }
  }
}
SWSlider.prototype.goToPreviousSlide = function() {
  var _this = this;
  if (!_this.isSliderNavigationDisabled) {
    window.sliderDirection = "PREVIOUS";
    _this.killAutoplay();
    _this.disableSliderNavigation();
    _this.transitionToPreviousSlide();
  }
}
SWSlider.prototype.goToNextSlide = function() {
  console.log('::go to next slide::')
  // window.t2 = performance.now();
  // console.log(window.t2 - window.t1);
  var _this = this;
  if (!_this.isSliderNavigationDisabled) {
    window.sliderDirection = "NEXT";
    _this.killAutoplay();
    _this.disableSliderNavigation();
    _this.transitionToNextSlide();
  }
}
SWSlider.prototype.disableSliderNavigation = function() {
  var _this = this;
  _this.isSliderNavigationDisabled = true;
}
SWSlider.prototype.enableSliderNavigation = function() {
  var _this = this;
  _this.isSliderNavigationDisabled = false;
}
SWSlider.prototype.killAutoplay = function() {
  var _this = this;
  clearRequestTimeout(_this.bannerSliderHandle);
}
SWSlider.prototype.triggerSliderAutoplay = function() {
  var _this = this;
  _this.bannerSliderHandle = requestTimeout(_this.goToNextSlide.bind(_this), _this.sliderInterval * 1000);
}
SWSlider.prototype.killAutoplayOnScroll = function() {
  var _this = this;
  if (_this.scrollY >= 0.5 * window.innerHeight) {
    if (!_this.autoplayKilledOnScroll) {
      console.log('::autoplay killed on scroll::');
      _this.autoplayKilledOnScroll = true;
      _this.killAutoplay();
    }
  } else {
    if (_this.autoplayKilledOnScroll) {
      console.log('::autoplay restarted on scroll::')
      _this.autoplayKilledOnScroll = false;
      _this.triggerSliderAutoplay();
    }
  }
}
SWSlider.prototype.addScrollListener = function() {
  var _this = this;
  window.addEventListener('scroll', function() {
    _this.scrollY = window.pageYOffset;
    window.clearTimeout(_this.isScrolling);
    _this.isScrolling = setTimeout(function() {
      _this.killAutoplayOnScroll();
    }, 66);
  }, false);
}
SWSlider.prototype.handleSliderTouchStart = function(event) {
  var _this = this;
  _this.x1Down = event.touches[0].clientX;
  _this.y1Down = event.touches[0].clientY;
};
SWSlider.prototype.handleSliderTouchMove = function(event) {
  var _this = this;
  if (!_this.x1Down || !_this.y1Down) {
    return;
  }
  var xUp = event.touches[0].clientX;
  var yUp = event.touches[0].clientY;
  var xDiff = _this.x1Down - xUp;
  var yDiff = _this.y1Down - yUp;
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      _this.goToNextSlide(); //Swipe Left
    } else {
      _this.goToPreviousSlide(); //Swipe Right
    }
  }
  /* reset values */
  _this.x1Down = null;
  _this.y1Down = null;
};