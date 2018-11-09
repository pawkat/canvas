import 'pixi.js';
import {TimelineMax} from 'gsap';

export default class Waves {
  constructor($wrapper) {
    this.wrapper = $wrapper;
    this.width = $wrapper.width();
    this.height = $wrapper.height();
    this.src = $wrapper.data('src');
    this.mouseOn = false;
    this.animated = false;

    this.app = new PIXI.Application(this.width, this.height, {transparent: true});
    this.wrapper.append(this.app.view);
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
    this.bg = PIXI.Sprite.fromImage(this.src);
    this.bg.width = this.width;
    this.bg.height = this.height;
    this.bg.position.x = 0;
    this.bg.position.y = 0;
    this.container.addChild(this.bg);

    this.bg2 = PIXI.Sprite.fromImage('img/2.jpg');
    this.bg2.alpha = 0;
    this.bg2.visible = false;
    this.bg2.width = this.width;
    this.bg2.height = this.height;
    this.bg2.position.x = 0;
    this.bg2.position.y = 0;
    this.container.addChild(this.bg2);

    this.displacementSprite = PIXI.Sprite.fromImage('img/displacement.jpg');
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale.set(1e4);
    this.app.stage.addChild(this.displacementSprite);
    this.container.filters = [this.displacementFilter];

    this._showImage();
    this._hover();
    this._click();
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

  _click() {
    this.wrapper.on('click', () => {
      console.log(this.container.children);
      let tl = new TimelineMax();
      tl.to(this.container.children[0], 1, {alpha: 0, visible: false})
        .to(this.container.children[1], 1, {alpha: 1, visible: true});
    });

  }

}
