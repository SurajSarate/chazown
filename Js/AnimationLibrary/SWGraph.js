function SWGraph(graphWrapper) {
    var _this = this;
    _this.graphWrapper = graphWrapper;
    _this.graphOffset = 0;
    _this.scrollY = window.pageYOffset;
    _this.ticking = false;
    _this.setGraphOffset();
    _this.scrollListener = _this.onScroll.bind(_this);
    _this.addScrollListener();
    _this.update();
  }
  SWGraph.prototype.setGraphOffset = function() {
    var _this = this;
    _this.graphOffset = _this.graphWrapper.getBoundingClientRect()
      .top + _this.scrollY - window.innerHeight;
  }
  SWGraph.prototype.requestTick = function() {
    var _this = this;
    if (!_this.ticking) {
      requestAnimationFrame(_this.update.bind(_this));
      _this.ticking = true;
    }
  }
  SWGraph.prototype.update = function() {
    var _this = this;
    if (_this.scrollY > _this.graphOffset && !_this.graphWrapper.dataset.animated) {
      _this.graphWrapper.dataset.animated = true;
      _this.killScrollListener();
      var tl = new TimelineMax();
      tl.to(['.graph-wrapper', '.graph_box_text'], 0.4, {
          autoAlpha: 1
        })
        .from('.graph-wrapper .layer0', 0.2, {
          opacity: 0,
          force3D: true
        }, 0.4)
        .from('.graph-wrapper .layer1', 1, {
          scaleY: 0,
          transformOrigin: '0% 100%',
          force3D: "auto"
        }, 0.4)
        .from(['.graph-wrapper .layer2', '.graph-wrapper .layer3', '.graph-wrapper .layer4'], 1, {
          opacity: 0,
          force3D: true
        })
    }
    _this.ticking = false;
  }
  SWGraph.prototype.onScroll = function() {
    var _this = this;
    _this.scrollY = window.pageYOffset;
    _this.requestTick();
  }
  SWGraph.prototype.addScrollListener = function() {
    var _this = this;
    window.addEventListener('scroll', _this.scrollListener, false)
  }
  SWGraph.prototype.killScrollListener = function() {
    var _this = this;
    window.removeEventListener('scroll', _this.scrollListener, false)
  }