import {TweenMax} from "gsap";

export default class Sequence {
  constructor(conf) {
    this.$wrapper = conf.wrapper;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('sequence');
    this.ctx = this.canvas.getContext('2d');
    this.$wrapper.append(this.canvas);

    this.images = conf.images;
    this.currentImg = 0;
    this.loadedImages = [];

    this.animated = false;
    this.fps = conf.fps | 40;

    this.init();
  }

  init() {
    this._setSize();
    this._changeSize();
    this._loadImages();
  }

  _setSize() {
    this.canvas.width = this.$wrapper.width();
    this.canvas.height = window.innerHeight > this.$wrapper.height() ? window.innerHeight : this.$wrapper.height();
  }

  _changeSize() {
    window.addEventListener('resize', () => {
      this._setSize();
    });
  }

  _loadImages() {
    this.images.forEach((el, i) => {
      const img = new Image();
      img.src = el;
      img.onload = () => {
        this.loadedImages.push(
          {
            img,
            i
          }
        );
        if (this.loadedImages.length === this.images.length && !this.animated) {
          this._renderControl();
        }
      }
    })
  }


  _renderControl() {
    this.animated = true;
    const self = this;


    TweenMax.ticker.useRAF(false);
    TweenMax.ticker.fps(this.fps);
    TweenMax.ticker.addEventListener("tick", _draw);

    function _draw() {
      const obj = self.loadedImages.find(el => el.i === self.currentImg);
      self.$wrapper.addClass('is-sequence');
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      self.ctx.drawImage(obj.img, 0, 0, self.canvas.width, self.canvas.height);
      self.currentImg++;
      if (self.currentImg === self.images.length) {
        TweenMax.ticker.removeEventListener("tick", _draw);
        self.canvas.classList.add('is-finished');
      }
    }


  }

}
