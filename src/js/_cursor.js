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
        w: 50,
        h: 50,
        fill1: '255, 167, 12',
        fill2: '226, 7, 105',
        translate: true,
        defaultTranslateX: 50,
        defaultTranslateY: 50,
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
    this.inertion = 0.1;
    this.shadowInertion = 0.00025;
    // this.shadowInertion = 0.0002;
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
      self._renderSquares();
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  _renderSquares() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sqares.forEach((el, i) => {
      this._renderSquare(el, i);
    });
  }

  _renderSquare(conf, i) {
    let ctx = this.ctx;
    let x = conf.x,
      y = conf.y,
      w = conf.w,
      h = conf.h,
      fill1 = conf.fill1,
      fill2 = conf.fill2;

    let differenceX = this.cursor.x - x;
    let differenceY = this.cursor.y - y;
    x += differenceX * this.inertion;
    y += differenceY * this.inertion;
    this.sqares[i].x = x;
    this.sqares[i].y = y;
    let x1 = x - w / 2;
    let y1 = y - h / 2;
    if (conf.translate) {
      x1 += conf.defaultTranslateX - (differenceX * 0.3);
      y1 += conf.defaultTranslateY - (differenceY * 0.3);
    }


    //square shadow 1
    let grd1;
    // let shadowTranslateX = x1 + w/10;
    // let shadowTranslateY = y1 + h/10;
    let shadow1TranslateX, shadow1TranslateY;
    if (differenceX > 0) shadow1TranslateX = x1 - (differenceX * differenceX * this.shadowInertion);
    else shadow1TranslateX = x1 + (differenceX * differenceX * this.shadowInertion);
    if (differenceY > 0) shadow1TranslateY = y1 - (differenceY * differenceY * this.shadowInertion);
    else shadow1TranslateY = y1 + (differenceY * differenceY * this.shadowInertion);
    grd1 = ctx.createLinearGradient(w / 2, shadow1TranslateY, w / 2, shadow1TranslateY + h);
    grd1.addColorStop(0, `rgba(${fill1}, .5)`);
    grd1.addColorStop(1, `rgba(${fill2}, .5)`);
    ctx.fillStyle = grd1;
    ctx.fillRect(shadow1TranslateX, shadow1TranslateY, w, h);

    // //square shadow 2
    // let grd2;
    // let shadow2TranslateX = x1 + (differenceX * differenceX * 0.00012);
    // let shadow2TranslateY = y1 + (differenceY * differenceY * 0.00012);
    // grd2 = ctx.createLinearGradient(w / 2, shadow2TranslateY, w / 2, shadow2TranslateY + h);
    // grd2.addColorStop(0, `rgba(${fill1}, .2)`);
    // grd2.addColorStop(1, `rgba(${fill2}, .2)`);
    // ctx.fillStyle = grd2;
    // ctx.fillRect(shadow2TranslateX, shadow2TranslateY, w, h);



    //main square
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
