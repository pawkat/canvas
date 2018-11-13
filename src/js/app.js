import cssTriangles from './_cssTriangles';
import Triangles from './_canvasTriangles';
import Ballz from './_ballz';
import Paint from './_paint';
import Squares from './_squares';
import Cursor from './_cursor';
import Waves from './_waves';
import Twist from './twist';
import Logo from './logo';
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
if ($('#cursor').length) {
  let cursor = new Cursor($('.out'));
}
if ($('#waves').length) {
  let waves = new Waves({
    wrapper: $('.js-image'),
    images: [
      'img/1.jpg',
      'img/2.jpg',
      'img/3.jpg'
    ],
    firstImage: 1
  });
  setTimeout(() => {
    waves._goTo(2);
  }, 2000);

}
if ($('.twist').length) {
  let waves = new Twist($('.twist'));
}
// if ($('.twist').length) {
//   let logo = new Logo($('.logo'));
// }

