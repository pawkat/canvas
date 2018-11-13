export default class _cursor {
  constructor($wrapper) {
    this.$wrapper = $wrapper;
    this.canvas = document.getElementById('cursor');
    this.ctx = this.canvas.getContext('2d');
    this.cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    this.sqares = [
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        w: 10,
        h: 10,
        fill1: '9, 9, 14',
        fill2: '0, 0, 0',
        shadowMaxTranslate: 12000
      },
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        w: 40,
        h: 40,
        fill1: '255, 167, 12',
        fill2: '226, 7, 105',
        translate: true,
        defaultTranslateX: 20,
        defaultTranslateY: 20,
        delay: true,
        shadowMaxTranslate: 7500,
        showHint: true
      },

    ];

    this.mainInertia = 0.1;
    this.shadowsQuantity = 5;
    this.shadowInertia = 0.001;
    this.shadowInertiaStep = 0.0009;


    this.fontLH = 16;
    this.font = `12px/${this.fontLH}px Arial`;
    this.textColor = '#ffffff';

    this.words = false;
    this.hint = false;
    this.maxHintSize = 80;
    this.hintPadding = 20;
    this.minHintSize = 40;


    this.init();
  }

  init() {
    this._setSize();
    this._changeSize();
    this._mouseMove();
    this._render();
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

  _render() {
    let self = this;

    function render() {
      self._initCursorRender();
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  _initCursorRender() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sqares.forEach((el, i) => {
      this._renderCursor(el, i);
    });
  }

  _renderCursor(conf, i) {
    const fill1 = conf.fill1,
      fill2 = conf.fill2,
      translate = conf.translate,
      defaultTranslateX = conf.defaultTranslateX,
      defaultTranslateY = conf.defaultTranslateY,
      shadowMaxTranslate = conf.shadowMaxTranslate;


    let x = conf.x,
      y = conf.y,
      h = conf.w,
      w = conf.h;


    let diff = {
      x: this.cursor.x - x,
      y: this.cursor.y - y
    };

    // scale square condition
    if (conf.showHint) {
      const scaleConf = {
        i,
        w,
        h
      };
      this._scaleSquare(scaleConf);
    }

    x += diff.x * this.mainInertia;
    y += diff.y * this.mainInertia;
    this.sqares[i].x = x;
    this.sqares[i].y = y;

    const x1comm = x - w / 2,
      y1comm = y - h / 2,
      x1hint = x,
      y1hint = y;

    let x1 = conf.showHint ? x1hint : x1comm;
    let y1 = conf.showHint ? y1hint : y1comm;

    if (translate) {
      x1 += defaultTranslateX - (diff.x * 0.3);
      y1 += defaultTranslateY - (diff.y * 0.3);
    }

    //render squares shadow
    for (let i = this.shadowsQuantity; i > 0; i--) {
      const shadowConf = {
        i: i,
        shadowMaxTranslate: shadowMaxTranslate,
        diff: diff,
        x1: x1,
        y1: y1,
        w: w,
        h: h,
        fill1: fill1,
        fill2: fill2
      };
      this._renderShadowSquare(shadowConf);
    }


    //render main cursor squares
    let squareConf = {
      x1: x1,
      y1: y1,
      w: w,
      h: h,
      fill1: fill1,
      fill2: fill2
    };
    this._renderMainSquares(squareConf);

    //show hint condition && render
    if (conf.showHint && this.hint) {
      const hintConf = {
        x1: x1,
        y1: y1,
        w: w,
        h: h
      };
      this._showHintText(hintConf);
    }
  }

  _renderShadowSquare(conf) {
    const ctx = this.ctx;
    let inertia = this.shadowInertia + (this.shadowsQuantity - conf.i) * this.shadowInertiaStep;

    const diffX = Math.pow(conf.diff.x, 2);
    const diffY = Math.pow(conf.diff.y, 2);

    const shadowDiff = {
      x: diffX > conf.shadowMaxTranslate ? conf.shadowMaxTranslate : diffX,
      y: diffY > conf.shadowMaxTranslate ? conf.shadowMaxTranslate : diffY
    };
    const shadowInertia = {
      x: shadowDiff.x * inertia,
      y: shadowDiff.y * inertia
    };


    let shadowTranslateX, shadowTranslateY;
    if (conf.diff.x > 0) shadowTranslateX = conf.x1 - shadowInertia.x;
    else shadowTranslateX = conf.x1 + shadowInertia.x;
    if (conf.diff.y > 0) shadowTranslateY = conf.y1 - shadowInertia.y;
    else shadowTranslateY = conf.y1 + shadowInertia.y;

    let grdShadow;
    grdShadow = ctx.createLinearGradient(conf.w / 2, shadowTranslateY, conf.w / 2, shadowTranslateY + conf.h);
    grdShadow.addColorStop(0, `rgba(${conf.fill1}, .${conf.i})`);
    grdShadow.addColorStop(1, `rgba(${conf.fill2}, .${conf.i})`);

    ctx.fillStyle = grdShadow;
    ctx.fillRect(shadowTranslateX, shadowTranslateY, conf.w, conf.h);
  }

  _scaleSquare(conf) {
    if (this.words) {
      if (this.hint) {
        let wordsH = this.words * this.fontLH;
        this.hintSize = this.maxHintSize > wordsH ? this.maxHintSize : wordsH;
        this.hintSize += this.hintPadding;
        if (conf.w !== this.hintSize) {
          this.sqares[conf.i].w += 2;
          this.hintVisible = true;
        }
        if (conf.h !== this.hintSize) {
          this.sqares[conf.i].h += 2;
        }
      }
    } else if (!this.hint && !this.words) {
      if (conf.w !== this.minHintSize) {
        this.sqares[conf.i].w -= 2;
        this.hintVisible = false;
      }
      if (conf.h !== this.minHintSize) {
        this.sqares[conf.i].h -= 2;
      }
    }
  }

  _showHintText(conf) {
    let ctx = this.ctx;
    ctx.font = this.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.textColor;


    let lines = [];
    let words = this.hint.split(' ');
    this.words = words.length;
    let line = '';
    let textY = conf.y1 + (this.hintSize / 2) - ((words.length - 1) * (this.fontLH / 2));
    for (let i = 0; i < words.length; i++) {
      line = words[i];
      ctx.fillText(line, conf.x1 + (conf.w / 2), textY);
      textY += this.fontLH;

    }
  }

  _renderMainSquares(conf) {
    const ctx = this.ctx;
    let grd;
    grd = ctx.createLinearGradient(conf.w / 2, conf.y1, conf.w / 2, conf.y1 + conf.h);
    grd.addColorStop(0, `rgb(${conf.fill1})`);
    grd.addColorStop(1, `rgb(${conf.fill2})`);
    ctx.fillStyle = grd;
    ctx.fillRect(conf.x1, conf.y1, conf.w, conf.h);
  }

  _mouseMove() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.x = e.pageX;
      this.cursor.y = e.pageY;
      this.hint = $(e.target).data('hint') ? $(e.target).data('hint') : false;
      if (!$(e.target).data('hint')) this.words = false;
    });
  }


}
