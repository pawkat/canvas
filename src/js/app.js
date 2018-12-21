import cssTriangles from './_cssTriangles';
import Triangles from './_canvasTriangles';
import Ballz from './_ballz';
import Paint from './_paint';
import Cursor from './_cursor';
import Waves from './_waves';
import Portfolio from './_portfolio';
import Preloader from './_preloader';
import _logo from './_logo';
import swiperSlider from "./_swiperSlider";
import map from "./_map";
import smiles from "./_smiles";
// obliquePictures();

// import dat from 'dat.GUI';

if ($('#triangles').length) {
  let canvasTriangles = new Triangles;
  cssTriangles();
}
if ($('#ballz').length) {
  let canvasBallz = new Ballz;
}
if ($('#paint').length) {
  let paint = new Paint;
}
if ($('#squares').length) {
  let squares = new Squares();
}
let waves = new Waves({
  wrapper: $('.js-image'),
  images: [
    'img/img01.jpg',
    'img/img02.jpg',
    'img/img03.jpg'
  ],
  firstImage: 1,
  displacementImg: 'img/map.jpg',
});
// setTimeout(() => {
//   waves._goTo(2);
// }, 2000);
$('body').on('click', () => {
  waves._goTo(3);
});
if ($('.portfolio').length) {
  let portfolio = new Portfolio({
    wrapper: $('.portfolio'),
    images: [
      'img/img01.jpg',
      'img/img02.jpg',
      'img/img04.jpg',
      'img/img03.jpg',
    ]
  });
}
let cursor = new Cursor($('.out'));
$('.js-logo').each((i, el) => {
  const conf = {
    el,
    coeff: 3
  };
  let logo = new _logo(conf);
});
const preloader = new Preloader({
  sequenceImages: [
    'img/sequence/01_00094.png',
    'img/sequence/01_00095.png',
    'img/sequence/01_00096.png',
    'img/sequence/01_00097.png',
    'img/sequence/01_00098.png',
    'img/sequence/01_00099.png',
    'img/sequence/01_00100.png',
    'img/sequence/01_00101.png',
    'img/sequence/01_00102.png',
    'img/sequence/01_00103.png',
    'img/sequence/01_00104.png',
    'img/sequence/01_00105.png',
    'img/sequence/01_00106.png',
    'img/sequence/01_00107.png',
    'img/sequence/01_00108.png',
    'img/sequence/01_00109.png',
    'img/sequence/01_00110.png',
    'img/sequence/01_00111.png',
    'img/sequence/01_00112.png',
    'img/sequence/01_00113.png',
    'img/sequence/01_00114.png',
    'img/sequence/01_00115.png',
    'img/sequence/01_00116.png',
    'img/sequence/01_00117.png',
    'img/sequence/01_00118.png',
    'img/sequence/01_00119.png',
    'img/sequence/01_00120.png',
    'img/sequence/01_00121.png',
  ]
});

swiperSlider();

if ($('.js-map').length){
  map();
}
if ($('.js-smile')){
  smiles();
}
