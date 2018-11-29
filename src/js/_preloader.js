import {TimelineMax} from 'gsap';
import Sequence from "./_sequence";
export default class Preloader {
  constructor(conf) {
    this.wrapper = $('.js-preloader');
    this.tl = new TimelineMax({
      paused: true,
      onStart: ()=>{
        this.wrapper.css('opacity', '1')
      },
      onComplete: ()=>{
        $('.cursor').css('opacity', '1');
        this.wrapper.fadeOut(300, ()=>{
          const seq = new Sequence({
            wrapper: $('.js-sequence'),
            images: conf.sequenceImages
          });
        });
      }
    });
    this.time = 0.5;
    this.process = 0;
    this.inertia = 0.02;
    this.squaresConf = [
      {
        class: 'js-square js-square-blue square square_blue'
      },
      {
        class: 'js-square js-square-purple square square_md square_purple'
      },
      {
        class: 'js-square js-square-main square square_sm square_yellow'
      },
    ];
    $(document).ready(()=>{
      this._init();
    })
  }
  _init() {
    this._addHtml();

  }
  _addHtml() {
    this.squaresConf.forEach((el)=>{
      const style = el.class;
      const html = `<div class='${style}'></div>`;
      const htmlShadow = `<div class='${style} square_shadow'></div><div class='${style} square_shadow'></div><div class='${style} square_shadow'></div><div class='${style} square_shadow'></div>`;
      this.wrapper.append(html);
      this.wrapper.append(htmlShadow);
      this.process++;
      if (this.process === this.squaresConf.length) {
        this._animate();
      }
    });
  }
  _animate() {
    this.squaresMain = $('.js-square-main');
    this.squaresBlue = $('.js-square-blue');
    this.squaresPurple = $('.js-square-purple');
    this.tl
      .staggerFromTo(this.squaresBlue, this.time, {y: -300, scaleY: 3}, {y: 0, scaleY: 1}, this.inertia)
      .staggerFromTo(this.squaresPurple, this.time, {y: -300, scaleY: 3}, {y: 0, scaleY: 1}, this.inertia, `-=${this.time}`)
      .staggerFromTo(this.squaresMain, this.time, {y: -300, scaleY: 3}, {y: 0, scaleY: 1}, this.inertia, `-=${this.time}`)
      .staggerFromTo(this.squaresBlue, this.time, {x: 0, rotation: 0}, {x: -100, rotation: -110}, this.inertia, `-=${this.time/2}`)
      .staggerFromTo(this.squaresPurple, this.time, {x: 0, rotation: 0}, {x: -100, rotation: -110}, this.inertia, `-=${this.time}`)
      .staggerFromTo(this.squaresMain, this.time, {x: 0, rotation: 0}, {x: -100, rotation: -110}, this.inertia, `-=${this.time}`)
      .to($('.js-preloader-content-bg'), this.time/2, {width: '100%'}, `-=${this.time/6}`)
      .staggerTo(this.squaresBlue, this.time, {x: 100, rotation: -90}, this.inertia, `-=${this.time/2}`)
      .staggerTo(this.squaresPurple, this.time, {x: 100, rotation: -90}, this.inertia, `-=${this.time}`)
      .staggerTo(this.squaresMain, this.time, {x: 100, rotation: -90}, this.inertia, `-=${this.time}`)
      .staggerTo(this.squaresBlue, this.time/2, {scale: 0}, 0, `-=${this.time/4}`)
      .staggerTo(this.squaresPurple, this.time/2, {scale: 0}, 0, `-=${this.time/4}`)
      .to(this.squaresMain, this.time/2, {x: 200, y: 100, width: 40, height: 40}, `-=${this.time/2}`)
      .to(this.squaresMain, 0, {scale: 0});
    this.tl.play();
  }

}
