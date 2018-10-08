export default class Paint {
  constructor(){
    this.canvas = document.getElementById('paint');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeWidth = 0;
    this.settings = {
      fill: "#000000",
      lineWidth: 20
    };
    this.arcRadius = this.settings.lineWidth / 2;
    this.isMouseDown = false;
    this.controlsBarWidth = 100;

    this.coords = [];
    this.init();
  }
  init(){
    this._setSize();
    this._changeSize();
    this._detectMouse();
    this._mouseEvents();
    this._draw();
    this._buttonsEvents();
  }
  _setSize(){
    this.canvas.width = window.innerWidth - 100;
    this.canvas.height = window.innerHeight;
  }
  _changeSize(){
    $(window).on('resize', ()=>{
      this._setSize()
    })
  }
  _detectMouse(){
    this.canvas.addEventListener('mousedown', ()=>{
      this.isMouseDown = true;
    });
    this.canvas.addEventListener('mouseup', ()=>{
      this.isMouseDown = false;
    });
  }
  _mouseEvents(){
    this.canvas.addEventListener('mouseup', ()=>{
      this.ctx.beginPath();
      this.coords.push('mouseup');
    });
  }
  _render(x, y, lineWidth, fill){

    let radius = lineWidth / 2;

    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = fill;

    this.ctx.lineWidth = lineWidth;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0 , Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  _draw(){
    this.canvas.addEventListener('mousemove', (e)=>{


      if (this.isMouseDown) {
        let x = e.clientX - this.controlsBarWidth;
        let y = e.clientY;

        this.coords.push([x, y]);

        this._render(x, y, this.settings.lineWidth, this.settings.fill);
      }
    });
  }
  _clear(){
    this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.beginPath();
  }
  _save(){
    let settings = JSON.stringify(this.settings);
    let coords = JSON.stringify(this.coords);
    localStorage.setItem('settings', settings);
    localStorage.setItem('coords', coords);
  }
  _replay(){
    let settings = JSON.parse(localStorage.getItem('settings'));
    let coords = JSON.parse(localStorage.getItem('coords'));
    console.log(coords);
    let timer = setInterval(()=>{
      if (!coords.length) {
        clearInterval(timer);
        this.ctx.beginPath();
        return;
      }
      this._clear();
      let coord = coords.shift();
      console.log(coord[0], coord[1]);
      this._render(coord[0], coord[1], settings.lineWidth, settings.fill)

    }, 30)
  }
  _buttonsEvents(){
    let clear = document.getElementById('clear');
    clear.addEventListener('click', ()=>{
      this._clear();
    });

    let save = document.getElementById('save');
    save.addEventListener('click', ()=>{
      this._save();
    });

    let replay = document.getElementById('replay');
    replay.addEventListener('click', ()=>{
      this._replay();
    })
  }
}
