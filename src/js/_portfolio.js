import 'pixi.js';
import * as filters from 'pixi-filters';
import {TimelineMax} from 'gsap';

export default class Portfolio {
  constructor(conf) {
    this.wrapper = conf.wrapper;
    this.images = conf.images;


    this.width = this.wrapper.width();
    this.h = conf.height ? conf.height : this.width / 2;

    this.lines = Math.round(this.images.length / 2);

    this.height = this.lines * this.h;

    this.src = this.images[0];

    this.angle = 2;
    this.radius = 100;

    this.defaultFilterPos = {
      x: -100,
      y: -100
    };

    this.app = new PIXI.Application(this.width, this.height, {transparent: true});
    this.wrapper.append(this.app.view);


    this.imgY = 0;
    this.translateImg = 200;

    this._load();
    this._resize();
  }

  _resize() {
    $(window).resize(() => {
      $(this.app.view).css('width', this.wrapper.width());
    });
  }

  _load() {
    let tmpImg = new Image();
    tmpImg.src = this.src;
    tmpImg.onload = () => {
      this._startAnimation();
    };
  }

  _startAnimation() {
    this.images.forEach((el, i) => {
      const conf = {
        src: el,
        i: i
      };
      this._renderImg(conf);
    });
  }

  _renderImg(conf) {
    const self = this;
    let mouseon = false;
    let normalize = this._visible(this.wrapper[0]) ? true : false;

    function isInteger(num) {
      return (num ^ 0) === num;
    }


    let container = new PIXI.Container();
    container.interactive = true;
    let x = isInteger(conf.i / 2) ? 0 : this.width / 2;
    let y = this.imgY;
    let bgY;
    if (this._visible(this.wrapper[0])) bgY = 0;
    else bgY = this.translateImg;

    container.x = x;
    container.y = this.imgY;
    let bg = PIXI.Sprite.fromImage(conf.src);
    bg.width = this.width / 2;
    bg.height = this.h;
    bg.position.x = 0;
    bg.position.y = bgY;
    container.addChild(bg);

    this.app.stage.addChild(container);


    if (!isInteger(conf.i / 2)) this.imgY += this.h;


    let TwistFilter = new filters.TwistFilter();
    TwistFilter.offset.x = this.defaultFilterPos.x;
    TwistFilter.offset.y = this.defaultFilterPos.y;
    TwistFilter.radius = this.radius;
    TwistFilter.angle = this.angle;

    let displacementSprite = PIXI.Sprite.fromImage('img/map.jpg');
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    // displacementSprite.anchor.x = 0.5;
    // displacementSprite.anchor.y = 0.5;
    let displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementFilter.scale.set(0);
    // displacementFilter.scale.x = 100;

    container.addChild(displacementSprite);
    container.filters = [displacementFilter];

    bg.filters = [TwistFilter];


    function _doWaves() {
      displacementSprite.x += 1;
      displacementSprite.y += 1;
    }

    container.mouseover = () => {
      if (!mouseon) mouseon = true;
      self._mouseOver(displacementFilter, displacementSprite, _doWaves);
    };
    container.mouseout = () => {
      if (mouseon) mouseon = false;
      this._mouseOut(displacementFilter, TwistFilter, _doWaves);
    };
    container.mousemove = (e) => {
      if (mouseon) {
        const eCoord = e.data.global;
        const filterConf = {
          TwistFilter,
          x: eCoord.x,
          y: eCoord.y
        };
        this._filter(filterConf)
      }

    };

    $(window).on('scroll resize', () => {
      if (this._visible(this.wrapper[0], y) && !normalize) {
        normalize = true;
        let tl = new TimelineMax();
        tl.to(bg.position, 2, {y: 0});
        tl.fromTo(displacementFilter.scale, 2, {x: 0, y: -200}, {x: 0, y: 0}, 0);
      }
    });

    $(document).ready(() => {
      if (this._visible(this.wrapper[0], y) && !normalize) {
        normalize = true;
        let tl = new TimelineMax();
        tl.to(bg.position, 2, {y: 0});
        tl.fromTo(displacementFilter.scale, 2, {x: 0, y: -200}, {x: 0, y: 0}, 0);
      }
    });

  }

  _filter(conf) {
    conf.TwistFilter.offset.x = conf.x;
    conf.TwistFilter.offset.y = conf.y;
  }

  _mouseOver(displacementFilter, displacementSprite, func) {
    TweenMax.ticker.addEventListener('tick', func);
    let tl = new TimelineMax();
    tl.to(displacementFilter.scale, 2, {x: 50, y: 50});
  }

  _mouseOut(displacementFilter, TwistFilter, func) {
    TweenMax.ticker.removeEventListener('tick', func);
    let tl = new TimelineMax();
    tl.to(displacementFilter.scale, 0.5, {x: 0, y: 0});
    const filterConf = {
      TwistFilter,
      x: this.defaultFilterPos.x,
      y: this.defaultFilterPos.y
    };
    this._filter(filterConf);
  }

  _visible(target, elTop) {
    // Все позиции элемента
    let targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top + elTop,
        // left: window.pageXOffset + target.getBoundingClientRect().left,
        // right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
      // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        // left: window.pageXOffset,
        // right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };
    if (targetPosition.top < windowPosition.bottom) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
      // Если элемент полностью видно, то запускаем следующий код
      return true;
    } else {
      // Если элемент не видно, то запускаем этот код
      return false;
    }

  }
}
