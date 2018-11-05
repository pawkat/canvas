export default class Squares {
  constructor() {
    this.canvas = document.getElementById('squares');
    this.ctx = this.canvas.getContext('2d');

    this.centerW = window.innerWidth / 2;
    // this.centerH = window.innerHeight / 2;
    this.startH = window.innerHeight / 2 - 100;
    this.squareW = 50;

    this.init();
  }

  init() {
    this._setSize();
    this._changeSize();
    this._renderSquare();
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

  _renderSquare() {
    let startW = this.centerW - (this.squareW / 2);
    let startH = this.startH - (this.squareW / 2);
    let grd = this.ctx.createLinearGradient(0, 0, 150, 0);
    grd.addColorStop(0, '#1E5799');
    grd.addColorStop(1, '#D121D1');
    this.ctx.fillStyle = grd;
    this.ctx.rect(startW, startH, this.squareW, this.squareW);
    this.ctx.fill();

  }


}
