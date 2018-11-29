import 'pixi.js';
import {TimelineMax} from 'gsap';

export default class Waves {
  constructor(conf) {
    this.wrapper = conf.wrapper;

    // this.pl = conf.wrapper.width() / 2;
    this.pl = 0;
    this.w = conf.wrapper.width() + this.pl;
    this.h = conf.wrapper.height();
    this.width = this.w * window.devicePixelRatio;
    this.height = this.h * window.devicePixelRatio;

    this.displacementImg = conf.displacementImg;

    this.images = conf.images;
    this.firstImage = conf.firstImage - 1 || 0;
    this.activeImage = this.firstImage;
    this.src = this.images[this.firstImage];
    this.animationTime = conf.animationTime || 2;


    // this.mouseOn = false;
    // this.animated = false;

    this.app = new PIXI.Application(this.width, this.height, {transparent: true});
    this.wrapper.append(this.app.view);

    $(this.app.view).css('width', this.w - this.pl);
    $(this.app.view).css('height', this.h);

    this.container = new PIXI.Container();
    this.container.width = this.w;
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

    this.displacementSprite = PIXI.Sprite.fromImage(this.displacementImg);
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this.displacementSprite.anchor.x = 0.5;
    this.displacementSprite.anchor.y = 0.5;
    this.displacementSprite.scale.set(4);

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
    bg.width = this.width - this.pl;
    bg.height = this.height;
    bg.position.x = this.pl;
    bg.position.y = 0;
    this.container.addChild(bg);
  }


  _goTo(i) {
    const newImg = i - 1;
    const time = this.animationTime;
    let tl = new TimelineMax({
      onComplete: () => {
        this.activeImage = newImg;
      }
    });
    tl
      .to(this.container.children[this.activeImage], time, {
        alpha: 0,
        visible: false,
      })
      .to(this.displacementFilter.scale, time/3, {
        x: -200,
        y: 100,
      }, 0)
      .to(this.container.children[newImg], time, {
        alpha: 1,
        visible: true,
      }, 0)
      .to(this.displacementFilter.scale, time/3, {x: 0, y: 0}, time/3);
  }

}
