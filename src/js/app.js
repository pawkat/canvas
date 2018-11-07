import cssTriangles from './_cssTriangles';
import Triangles from './_canvasTriangles';
import Ballz from './_ballz';
import Paint from './_paint';
import Squares from './_squares';
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
  // var gui = new dat.GUI({name: 'My GUI'});
}


