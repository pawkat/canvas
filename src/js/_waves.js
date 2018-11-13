import 'pixi.js';
import {TimelineMax} from 'gsap';

export default class Waves {
  constructor(conf) {
    this.wrapper = conf.wrapper;

    this.w = conf.wrapper.width();
    this.h = conf.wrapper.height();
    this.width = conf.wrapper.width() * 2;
    this.height = conf.wrapper.height() * 2;

    this.images = conf.images;
    this.firstImage = conf.firstImage - 1 || 0;
    this.activeImage = this.firstImage;
    this.src = this.images[this.firstImage];


    this.mouseOn = false;
    this.animated = false;

    this.app = new PIXI.Application(this.width, this.height, {transparent: true});
    this.wrapper.append(this.app.view);

    $(this.app.view).css('width', this.w);
    $(this.app.view).css('height', this.h);

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);



    this._load();
  }


  _load() {
    let self = this;
    let tmpImg = new Image();
    tmpImg.src = this.src;
    tmpImg.onload = () => {
      this._startAnimation();
    };
  }

  _startAnimation() {
    this.images.forEach((el, i) => {
      const imgConf = {
        src: el,
        i: i
      };
      this._addImage(imgConf);
    });

    this.displacementSprite = PIXI.Sprite.fromImage('img/map.jpg');
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale.set(0);
    this.app.stage.addChild(this.displacementSprite);
    this.container.filters = [this.displacementFilter];

    // this._showImage();
    // this._hover();
  }

  _addImage(conf) {
    let bg = PIXI.Sprite.fromImage(conf.src);
    if (conf.i !== this.activeImage) {
      bg.alpha = 0;
      bg.visible = false;
    }
    bg.width = this.width;
    bg.height = this.height;
    bg.position.x = 0;
    bg.position.y = 0;
    this.container.addChild(bg);
  }

  _hover() {
    let self = this;
    this.wrapper.on('mouseover', () => {
      if (!self.mouseOn && self.animated) {
        self.mouseOn = true;
        TweenMax.ticker.addEventListener('tick', self._doWaves, self);
        let tl = new TimelineMax();
        tl.to(self.displacementFilter.scale, 2, {x: 50, y: 50});
      }
    });
    this.wrapper.on('mouseout', () => {
      if (self.mouseOn && self.animated) {
        self.mouseOn = false;
        TweenMax.ticker.removeEventListener('tick', self._doWaves, self);
        let tl = new TimelineMax();
        tl.to(self.displacementFilter.scale, 0.5, {x: 1, y: 1});
      }
    });
  }

  _doWaves() {
    this.displacementSprite.y += 0.5;
  }

  _showImage() {
    if (!this.animated) {
      let self = this;
      let tl = new TimelineMax({
        onComplete: function () {
          self.animated = true;
        }
      });
      tl.to(self.displacementFilter.scale, 1, {x: 1, y: 1});
    }
  }

  // _click() {
  //   this.wrapper.on('click', () => {
  //     if (this.activeImage > 0 ){
  //       this._goTo(2);
  //     } else {
  //       this._goTo(1);
  //     }
  //
  //   });
  // }

  _goTo(i) {
    let tl = new TimelineMax({
      onComplete: () => {
        this.activeImage = i;
        // TweenMax.ticker.removeEventListener('tick', this._doWaves, this);
        // let tl = new TimelineMax();
        // tl.to(this.displacementFilter.scale, 0.5, {x: 1, y: 1});
      }
    });
    tl
      .to(this.container.children[this.activeImage], 1.5, {
        alpha: 0,
        visible: false,
        onStart: () => {
          TweenMax.ticker.addEventListener('tick', this._doWaves, this);
          let tl = new TimelineMax();
          tl.to(this.displacementFilter.scale, 1.5, {x: 50, y: 50});
        }
      })
      .to(this.container.children[i], 1.5, {
        alpha: 1,
        visible: true,
        onStart: () => {
          TweenMax.ticker.removeEventListener('tick', this._doWaves, this);
          let tl = new TimelineMax();
          tl.to(this.displacementFilter.scale, 1.5, {x: 1, y: 1});
        }
      });
  }

}
