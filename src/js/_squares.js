export default class Squares {
  constructor() {
    this.canvas = document.getElementById('squares');
    this.ctx = this.canvas.getContext('2d');

    this.centerW = window.innerWidth / 2;
    this.centerH = window.innerHeight / 2;
    // this.startH = window.innerHeight / 2 - 100;
    this.squareW = 50;
    this.squareH = 50;
    this.time = 200;
    this.firstStep = this.time / 4;
    this.firstStepLength = 100;
    this.secondStep = this.time / 4;
    this.secondStepLength = 50;
    this.secondStep = this.time / 2;
    this.thirdStepLength = 200;

    this.init();
  }

  init() {
    this._setSize();
    this._changeSize();
    // this._renderSquare();
    this._animation();
  }

  _setSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _changeSize() {
    $(window).on('resize', () => {
      this._setSize();
    });
  }
  _renderSquare(t, w, h, fill1, fill2) {
    let ctx = this.ctx;

    let startW = this.centerW - (w / 2);
    // let startH = this.centerH - (h / 2) - 100;
    let startH = this.centerH - (h / 2);
    // let startW = w / 2;
    // let startH = h / 2;

    let grd, x, y, w1, h1, percentage;


    // x = startW;
    // y = startH;
    // w1 = w;
    // h1 = h;
    if (t <= this.firstStep) {
      // this.firstStepLength
      percentage = t / this.firstStep;
      x = startW;
      y = startH + (t * 2);
      w1 = w;
      h1 = (h * 1.5) - ((t / this.firstStep) * (h / 2));
    } else if (t > this.firstStep && t <= this.secondStep) {
      ctx.save();
      x = startW - t + this.firstStep;
      y = startH + (this.firstStep * 2);
      w1 = w;
      h1 = h;
    } else {
      ctx.save();
      x = startW - (this.secondStep + this.firstStep) + t;
      y = startH + (this.firstStep * 2);
      w1 = w;
      h1 = h;
    }

    if (t <= this.firstStep) {
      grd = ctx.createLinearGradient(w1 / 2, y, w1 / 2, y + h1);
      grd.addColorStop(0, fill1);
      grd.addColorStop(1, fill2);
      ctx.fillStyle = grd;
      ctx.fillRect(x, y, w1, h1);
    } else if (t > this.firstStep && t <= this.secondStep) {
      grd = ctx.createLinearGradient(-w1/2, -h1/2, -w1/2, -h1/2 + h1);
      grd.addColorStop(0, fill1);
      grd.addColorStop(1, fill2);
      ctx.fillStyle = grd;

      ctx.translate(this.centerW - t + this.firstStep, this.centerH + (this.firstStep * 2));
      let deg = t - this.firstStep;
      let rad = deg * Math.PI/180;
      ctx.rotate(-rad);
      ctx.fillRect(-w1/2, -h1/2, w1, h1);

      ctx.restore();
    } else {
      grd = ctx.createLinearGradient(-w1/2, -h1/2, -w1/2, -h1/2 + h1);
      grd.addColorStop(0, fill1);
      grd.addColorStop(1, fill2);
      ctx.fillStyle = grd;

      ctx.translate(this.centerW - (this.secondStep + this.firstStep) + t, this.centerH + (this.firstStep * 2));
      let deg = 1;
      let rad = deg * Math.PI/180;
      ctx.rotate(t*2 * Math.PI/180);
      ctx.fillRect(-w1/2, -h1/2, w1, h1);

      ctx.restore();
    }





  }
  _initSquares(t, w ,h) {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    this._renderSquare(t, w * 1.5, h * 1.5, 'rgba(24, 114, 255, 1.000)', 'rgba(0, 218, 246, 1.000)');
    this._renderSquare(t, w * 1.25, h * 1.25, 'rgba(53, 98, 242, 1.000)', 'rgba(112, 31, 212, 1.000)');
    this._renderSquare(t, w, h, 'rgba(255, 182, 6, 1.000)', 'rgba(255, 4, 115, 1.000)');
    // this._renderSquare(t, w, h, 'black', 'red');

  }

  _animation() {
    let t = 0;
    let self = this;

    (function() {
      let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();

    function step() {
      if (t <= self.time) {
        t++;
        self._initSquares(t, self.squareW, self.squareH);
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }


}
