import 'pixi.js';
import * as filters from 'pixi-filters';
import {TimelineMax} from 'gsap';

export default class Logo {
  constructor($wrapper) {
    this.wrapper = $wrapper;
    // this.width = $wrapper.width();
    // this.height = $wrapper.height();
    // this.src = $wrapper.data('src');

    this.mouseOn = false;

    // this.app = new PIXI.Application(this.width, this.height, {transparent: true});
    // this.wrapper.append(this.app.view);
    // this.container = new PIXI.Container();
    // this.app.stage.addChild(this.container);

    // this._load();
    this._startAnimation();
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
    // this.bg = PIXI.Sprite.fromImage(this.src);
    // this.bg.width = this.width;
    // this.bg.height = this.height;
    // this.bg.position.x = 0;
    // this.bg.position.y = 0;
    // this.container.addChild(this.bg);


    // this.TwistFilter = new filters.TwistFilter();
    // this.TwistFilter.offset.x = -100;
    // this.TwistFilter.offset.y = -100;
    // this.TwistFilter.radius = this.radius;
    // this.TwistFilter.angle = this.angle;

    // this.displacementSprite = PIXI.Sprite.fromImage('img/displacement1.jpg');
    // this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    // this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    // this.displacementFilter.scale.set(0);
    // this.app.stage.addChild(this.displacementSprite);
    // this.container.filters = [this.displacementFilter];


    // this.bg.filters = [this.TwistFilter];

    // this._showImage();
    this._hover();
    // this._click();
  }


  _follow(x, y) {
    // let centerX = this.bg.width / 2;
    // let centerY = this.bg.height / 2;
    // if (x < centerX) x = x * -1;
    // if (y < centerY) y = y * -1;
    console.log(x, y);
    // this.bg.rotation = 0.2;
  }

  _hover() {
    this.wrapper.on('mousemove', (e) => {
      let x = e.offsetX;
      let y = e.offsetY;
      this._follow(x, y);
    });
  }


}
