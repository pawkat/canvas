import 'pixi.js';
import * as filters from 'pixi-filters';
import {TimelineMax} from 'gsap';

export default class Twist {
  constructor($wrapper) {
    this.wrapper = $wrapper;
    this.width = $wrapper.width();
    this.height = $wrapper.height();
    this.src = $wrapper.data('src');

    this.mouseOn = false;
    this.angle = 2;
    this.radius = 100;

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


    this.TwistFilter = new filters.TwistFilter();
    this.TwistFilter.offset.x = -100;
    this.TwistFilter.offset.y = -100;
    this.TwistFilter.radius = this.radius;
    this.TwistFilter.angle = this.angle;

    this.displacementSprite = PIXI.Sprite.fromImage('img/displacement1.jpg');
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale.set(0);
    this.app.stage.addChild(this.displacementSprite);
    this.container.filters = [this.displacementFilter];


    this.bg.filters = [this.TwistFilter];

    // this._showImage();
    this._hover();
    // this._click();
  }

  _doWaves() {
    this.displacementSprite.x += 0.5;
    this.displacementSprite.y += 0.5;
  }
  _filter(x, y) {
    this.TwistFilter.offset.x = x;
    this.TwistFilter.offset.y = y;
  }
  _hover() {
    this.wrapper.on('mousemove', (e) => {
      let x = e.offsetX;
      let y = e.offsetY;
      this._filter(x, y);
    });
    this.wrapper.on('mouseover', () => {
      if (!this.mouseOn) {
        this.mouseOn = true;
        TweenMax.ticker.addEventListener('tick', this._doWaves, this);
        let tl = new TimelineMax();
        tl.to(this.displacementFilter.scale, 2, {x: 20, y: 20});
      }
    });
    this.wrapper.on('mouseout', () => {
      if (this.mouseOn) {
        this.mouseOn = false;
        TweenMax.ticker.removeEventListener('tick', this._doWaves, this);
        let tl = new TimelineMax();
        tl.to(this.displacementFilter.scale, 0.5, {x: 1, y: 1});
      }
    });
  }



}
