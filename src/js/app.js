import cssTriangles from './_cssTriangles'
import Triangles from './_canvasTriangles'
import Ballz from './_ballz'
import Paint from './_paint'


if ($('#triangles').length){
  let canvasTriangles = new Triangles;
  cssTriangles();
}
if ($('#ballz').length){
  let canvasBallz = new Ballz;
}
if ($('#paint').length) {
  let paint = new Paint;
}


