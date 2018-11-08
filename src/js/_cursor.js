export default class _cursor {
  constructor() {
    this.canvas = document.getElementById('cursor');
    this.ctx = this.canvas.getContext('2d');
    this.cursor = {
      x: 0,
      y: 0
    };
    this.sqares = [
      {
        w: 10,
        h: 10,
        translateX: 0,
        translateY: 0,
        fill1: '#09090E',
        fill2: '#000000',
      },
      {
        w: 50,
        h: 50,
        translateX: 50,
        translateY: 50,
        fill1: '#FFA70C',
        fill2: '#E20769',
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
    function render() {
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  _renderSquare(conf) {
    let ctx = this.ctx;
    let x = this.cursor.x,
        y = this.cursor.y,
        w = conf.w,
        h = conf.h,
        fill1 = conf.fill1,
        fill2 = conf.fill2,
        translateX = conf.translateX,
        translateY = conf.translateY;


    let x1 = x - w/2 + translateX;
    let y1 = y - h/2 + translateY;
    let grd;
    grd = ctx.createLinearGradient(w / 2, y1, w / 2, y1 + h);
    grd.addColorStop(0, fill1);
    grd.addColorStop(1, fill2);
    ctx.fillStyle = grd;
    // ctx.fillStyle = fill1;


    ctx.fillRect(x1, y1, w, h);


  }

  _mouseMove() {
    let self = this;
    let squares = this.sqares;
    document.addEventListener('mousemove', function(e) {
      let x = e.pageX;
      let y = e.pageY;
      self.cursor.x = x;
      self.cursor.y = y;
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      squares.forEach(function (el) {
        self._renderSquare(el);
      });
    });
  }


}
