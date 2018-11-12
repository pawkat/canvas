export default class _cursor {
  constructor() {
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
        w: 40,
        h: 40,
        fill1: '255, 167, 12',
        fill2: '226, 7, 105',
        translate: true,
        defaultTranslateX: 40,
        defaultTranslateY: 40,
      },
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        w: 10,
        h: 10,
        fill1: '9, 9, 14',
        fill2: '0, 0, 0',
      },
    ];


    this.mainInertia = 0.1;

    this.shadowsQuantity = 4;
    // this.shadowInertia = 0.0005;
    this.shadowInertia = 0.001;
    this.shadowInertiaStep = 0.0009;
    this.shadowMaxTranslate = 7500;
    this.init();
  }

  init() {
    this._setSize();
    this._changeSize();
    this._mouseMove();
    this._render();
  }

  _setSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    let ctx = this.ctx;
    let x = conf.x,
      y = conf.y,
      w = conf.w,
      h = conf.h,
      fill1 = conf.fill1,
      fill2 = conf.fill2;

    let difference = {
      x: this.cursor.x - x,
      y: this.cursor.y - y
    };
    // let differenceX = this.cursor.x - x;
    // let differenceY = this.cursor.y - y;
    x += difference.x * this.mainInertia;
    y += difference.y * this.mainInertia;
    this.sqares[i].x = x;
    this.sqares[i].y = y;
    let x1 = x - w / 2;
    let y1 = y - h / 2;
    if (conf.translate) {
      x1 += conf.defaultTranslateX - (difference.x * 0.3);
      y1 += conf.defaultTranslateY - (difference.y * 0.3);
    }

    //render shadow
    for (let i = this.shadowsQuantity; i > 0; i--) {
      let inertia = this.shadowInertia + (this.shadowsQuantity - i) * this.shadowInertiaStep;

      const difX = Math.pow(difference.x, 2);
      const difY = Math.pow(difference.y, 2);

      let shadowDifference = {
        x: difX > this.shadowMaxTranslate ? this.shadowMaxTranslate : difX,
        y: difY > this.shadowMaxTranslate ? this.shadowMaxTranslate : difY
      };
      let shadowInertia = {
        x: shadowDifference.x * inertia,
        y: shadowDifference.y * inertia
      };


      let shadowTranslateX, shadowTranslateY;
      if (difference.x > 0) shadowTranslateX = x1 - shadowInertia.x;
      else shadowTranslateX = x1 + shadowInertia.x;
      if (difference.y > 0) shadowTranslateY = y1 - shadowInertia.y;
      else shadowTranslateY = y1 + shadowInertia.y;

      let grdShadow;
      grdShadow = ctx.createLinearGradient(w / 2, shadowTranslateY, w / 2, shadowTranslateY + h);
      grdShadow.addColorStop(0, `rgba(${fill1}, .${i*2})`);
      grdShadow.addColorStop(1, `rgba(${fill2}, .${i*2})`);

      ctx.fillStyle = grdShadow;
      ctx.fillRect(shadowTranslateX, shadowTranslateY, w, h);
      // if (shadowDifference.x < 25000) {
      //   console.log(shadowDifference);
      // }
    }



    //render main cursor squares

    let grd;
    grd = ctx.createLinearGradient(w / 2, y1, w / 2, y1 + h);
    grd.addColorStop(0, `rgb(${fill1})`);
    grd.addColorStop(1, `rgb(${fill2})`);
    ctx.fillStyle = grd;
    ctx.fillRect(x1, y1, w, h);
  }

  _mouseMove() {
    let self = this;
    document.addEventListener('mousemove', function(e) {
      self.cursor.x = e.pageX;
      self.cursor.y = e.pageY;
    });
  }


}
