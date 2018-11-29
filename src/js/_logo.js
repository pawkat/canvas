export default class _logo {
  constructor(conf) {
    this.logo = $(conf.el);
    this.w = this.logo.innerWidth();
    this.centerW = this.w / 2;
    this.h = this.logo.innerHeight();
    this.centerH = this.h / 2;

    this.coeff = conf.coeff ? conf.coeff : 5;

    this.mouseOn = false;


    this._hover();
  }


  _follow(x, y) {
    x = (x - this.centerW) / this.coeff;
    y = (y - this.centerH) / this.coeff * -1;
    // console.log(y);
    this.logo.attr("style", `transform: rotateY(${x}deg) rotateX(${y}deg);-webkit-transform: rotateY(${x}deg) rotateX(${y}deg);-moz-transform: rotateY(${x}deg) rotateX(${y}deg)`);
  }

  _reset() {
    this.logo.attr("style", `transform: rotateY(0deg) rotateX(0deg);-webkit-transform: rotateY(0deg) rotateX(0deg);-moz-transform: rotateY(0deg) rotateX(0deg)`);
  }
  _hover() {
    this.logo.on('mouseover', () => {
      if (!this.mouseOn) this.mouseOn = true;
    });
    this.logo.on('mouseout', () => {
      if (this.mouseOn) this.mouseOn = false;
      this._reset();
    });
    this.logo.on('mousemove', (e) => {
      if (this.mouseOn) {
        const coords = {
          x: e.offsetX,
          y: e.offsetY,
        };
        this._follow(coords.x, coords.y);
      }
    });
  }


}
