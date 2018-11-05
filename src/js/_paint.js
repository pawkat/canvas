export default class Paint {
  constructor() {
    this.canvas = document.getElementById('paint');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeWidth = 0;
    this.lineWidthInput = $('.js-paint-line-width');
    this.lineWidth = this.lineWidthInput[0].value;
    this.colorInput = $('.js-paint-color');
    this.fill = this.colorInput[0].value;
    this.settings = {
      fill: this.fill,
      lineWidth: this.lineWidth
    };
    this.arcRadius = this.settings.lineWidth / 2;
    this.isMouseDown = false;

    this.controlsBarWidth = 100;
    this.memory = [];
    this.bar = $('.js-paint-bar');
    this.init();
  }

  init() {
    this._setSize();
    this._changeSize();
    this._detectMouse();
    this._mouseEvents();
    this._draw();
    this._actions();
  }

  _setSize() {
    this.canvas.width = window.innerWidth - this.bar.width();
    this.canvas.height = window.innerHeight;
  }

  _changeSize() {
    $(window).on('resize', () => {
      this._setSize();
    });
  }

  _detectMouse() {
    $(this.canvas).on('mousedown touchstart', () => {
      this.isMouseDown = true;
    });
    $(this.canvas).on('mouseup ', () => {
      this.isMouseDown = false;
    });
  }

  _mouseEvents() {
    $(this.canvas).on('mouseup touchend', () => {
      this.ctx.beginPath();
      this.memory.push('mouseup');
    });
  }

  _render(x, y, lineWidth, fill) {

    let radius = lineWidth / 2;

    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = fill;

    this.ctx.lineWidth = lineWidth;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  _draw() {
    $(this.canvas).on('mousemove touchmove', (e) => {

      if (this.isMouseDown) {
        let x = e.clientX - this.controlsBarWidth;
        let y = e.clientY;
        if (e.type === 'touchmove') {
          e.preventDefault();
          // console.dir(e);
          x = e.touches[0].clientX  - this.controlsBarWidth;
          y = e.touches[0].clientY;
          console.log(`x: ${x}, y: ${y}`);

        }

        this.memory.push(
          {
            x: x,
            y: y,
            lineWidth: this.settings.lineWidth,
            fill: this.settings.fill
          }
        );

        this._render(x, y, this.settings.lineWidth, this.settings.fill);
      }
    });
  }

  _clear() {
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.beginPath();
    this.memory = [];
  }

  _save() {
    let memory = JSON.stringify(this.memory);
    localStorage.setItem('memory', memory);
  }

  _replay() {
    let memory = JSON.parse(localStorage.getItem('memory'));
    this._clear();
    let timer = setInterval(() => {
      if (!memory.length) {
        clearInterval(timer);
        this.ctx.beginPath();
        return;
      }
      let step = memory.shift();
      this._render(step.x, step.y, step.lineWidth, step.fill);

    }, 30);
  }

  _actions() {
    let self = this;

    let clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
      this._clear();
    });

    let save = document.getElementById('save');
    save.addEventListener('click', () => {
      this._save();
    });

    let replay = document.getElementById('replay');
    replay.addEventListener('click', () => {
      this._replay();
    });

    this.lineWidthInput.on('change', function() {
      self.settings.lineWidth = this.value;
    });

    this.colorInput.on('change', function() {
      self.settings.fill = this.value;
    });
  }
}
