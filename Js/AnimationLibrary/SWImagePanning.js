function SWImagePanning(swPanImage) {
  var _this = this;
  _this.swPanImage = swPanImage;
  _this.imageOffset = {};
  _this.setImageOffset();
  requestInterval(_this.scrollUpdate.bind(_this), 1);
}
SWImagePanning.prototype.setImageOffset = function() {
  var _this = this;
  var windowHeight = window.innerHeight;
  var imageBoundingClientRect = _this.swPanImage.getBoundingClientRect();
  var offsetTop = imageBoundingClientRect.top + thisScrollY;
  _this.imageOffset['offsetTop'] = offsetTop;
  _this.imageOffset['start'] = offsetTop - windowHeight;
  _this.imageOffset['end'] = offsetTop + windowHeight;
}
SWImagePanning.prototype.scrollUpdate = function() {
  var _this = this;
  if (between(thisScrollY, _this.imageOffset['start'], _this.imageOffset['end'])) {
    var imageTx = mapRange(thisScrollY, _this.imageOffset['start'], _this.imageOffset['end'], -30, 30);
    TweenMax.set(_this.swPanImage, {
      x: imageTx,
      force3D: true
    })
  }
}