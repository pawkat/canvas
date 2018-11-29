export default class Ballz {
  constructor(){
    this.canvas = document.querySelector("#ballz");
    this.context = this.canvas.getContext("2d");
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#ffffff';
    this.context.textAlign = 'center';
    this.squareBg = '#FFE793';
    this.color = '#000000';
    this.size = 50;
    this.circleSize = 10;
    this.maxquantity = 16;
    this.context.font = "30px Arial";
    this.init();
  }
  init(){
    this._drawSquare();
    this._drawCircle();
  }
  _renderSquare(square){
    let ctx = this.context;
    ctx.fillStyle = this.squareBg;
    ctx.rect(square.x, square.y, this.size, this.size);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.fillText(square.text, square.x + 25, square.y + 35);
    // console.log(square.text);
  }
  _drawSquare(){
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let quantity = getRandomInt(this.maxquantity);
    if (quantity < 3) {
      quantity = 3;
    }
    for (let i = 1; i <= quantity; i++) {
      let x = 12;
      if (i > 1) {
        x = this.size * (i - 1) + (i * 12);
      }
      let square = {
        x: x,
        y: 10,
        text: 1
      };
      this._renderSquare(square);
    }


  }
  _renderCircle(){

  }
  _drawCircle(){
    let ctx= this.context;
    ctx.beginPath();
    ctx.arc(800 / 2, 1200 - this.circleSize - 10,this.circleSize, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
}
