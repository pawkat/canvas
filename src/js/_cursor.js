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
        fill1: '#FFA70C',
        fill2: '#E20769',
        translate: true,
        defaultTranslateX: 50,
        defaultTranslateY: 50,
      },
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        w: 10,
        h: 10,
        fill1: '#09090E',
        fill2: '#000000',
      },
    ];
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
    x += differenceX * 0.08;
    y += differenceY * 0.08;
    this.sqares[i].x = x;
    this.sqares[i].y = y;
    let x1 = x - w / 2;
    let y1 = y - h / 2;
    if (conf.translate) {
      x1 += conf.defaultTranslateX - (differenceX * 0.3);
      y1 += conf.defaultTranslateY - (differenceY * 0.3);
    }
    //main square
    let grd;
    grd = ctx.createLinearGradient(w / 2, y1, w / 2, y1 + h);
    grd.addColorStop(0, fill1);
    grd.addColorStop(1, fill2);
    ctx.fillStyle = grd;
    ctx.fillRect(x1, y1, w, h);

    // //square shadow 1
    // let grd1;
    // grd1 = ctx.createLinearGradient(w / 2, y1 + h/10, w / 2, y1 + h + h/10);
    // grd1.addColorStop(0, fill1);
    // grd1.addColorStop(1, fill2);
    // ctx.fillStyle = grd1;
    // ctx.fillRect(x1 +w/10, y1 + h/10, w, h);
    //
    // //square shadow 2
    // let grd2;
    // grd2 = ctx.createLinearGradient(w / 2, y1 + h/6, w / 2, y1 + h + h/6);
    // grd2.addColorStop(0, fill1);
    // grd2.addColorStop(1, fill2);
    // ctx.fillStyle = grd2;
    // ctx.fillRect(x1 +w/6, y1 + h/6, w, h);
    // //square shadow 3
    // let grd3;
    // grd3 = ctx.createLinearGradient(w / 2, y1 + h/4, w / 2, y1 + h + h/4);
    // grd3.addColorStop(0, fill1);
    // grd3.addColorStop(1, fill2);
    // ctx.fillStyle = grd3;
    // ctx.fillRect(x1 +w/4, y1 + h/4, w, h);

  }

  _mouseMove() {
    let self = this;
    document.addEventListener('mousemove', function(e) {
      self.cursor.x = e.pageX;
      self.cursor.y = e.pageY;
    });
  }


}
