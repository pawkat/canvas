export default function smiles() {
  var wrapper = document.querySelector('.js-bg');

  for(var i = 0; i < 6; i++){
    var smilesRow = 12;
    var row = document.createElement('div');
    row.classList.add('bg__row');
    for(var j = 0; j < smilesRow; j++){
      var item = document.createElement('div');
      item.classList.add('bg__smile');
      var clonedSmile = document.querySelectorAll('.js-smile')[0].cloneNode(true);
      item.appendChild(clonedSmile);
      row.appendChild(item);
    }
    wrapper.appendChild(row);
  }
  function randomNumber (max, current) {
    var result = 0 + Math.random() * (max + 1 - 0);
    result = Math.floor(result);
    if (result === current) {
      if (result < max || result === 0) {
        result++;
      } else {
        result--;
      }
      return result;
    } else {
      return result;
    }
  }
  function addActiveClass(el){
    el.classList.add('is-active');
  }
  function removeActiveClass(el){
    el.classList.remove('is-active');
  }

  var smiles = document.querySelectorAll('.js-smile');
  var smilesArr = Array.prototype.slice.call(smiles);
  var smilesQuantity = smiles.length;
  smiles.forEach(function(el, i){
    var elFaces = el.querySelectorAll('.js-smile-face');
    var randomIndex = randomNumber(elFaces.length-1);
    addActiveClass(elFaces[randomIndex]);
    if (i === 0) {
      addActiveClass(el);
    }
  });



  function changeSmile(){
    var activeSmile = document.querySelectorAll('.js-smile.is-active');
    var activeSmileIndex = smilesArr.indexOf(activeSmile[0]);
    var randomIndex = randomNumber(smilesQuantity-1, activeSmileIndex);
    var randomSmile = smiles[randomIndex];


    var faces = randomSmile.querySelectorAll('.js-smile-face');
    var faceArr = Array.prototype.slice.call(faces);
    var activeFace = randomSmile.querySelectorAll('.js-smile-face.is-active');

    var activeFaceIndex = faceArr.indexOf(activeFace[0]);
    removeActiveClass(activeFace[0]);
    var randomFaceIndex = randomNumber(faceArr.length-1, activeFaceIndex);
    var randomFace = faces[randomFaceIndex];

    removeActiveClass(activeSmile[0]);
    addActiveClass(randomSmile);
    addActiveClass(randomFace);



  }

  setInterval(changeSmile, 1000);







}
