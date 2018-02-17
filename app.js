
'use strict';

Image.allImages = [];
var indexArray = []; //master array that the constructor function pushes the new instances to
var numOfClicks = 0; //same as totalClicks, you should incriment this in your handler function +=
var justViewed = []; //how am i pushing data to this?
Image.tally = document.getElementById('tally');

//constructor function
function Image(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.views = 0;
  Image.allImages.push(this);
}

new Image('bag','img/bag.jpg');
new Image('banana', 'img/banana.jpg');
new Image('bathroom', 'img/bathroom.jpg');
new Image('boots', 'img/boots.jpg');
new Image('breakfast','img/breakfast.jpg');
new Image('chair', 'img/chair.jpg');
new Image('cthulhu', 'img/cthulhu.jpg');
new Image('dog-duck', 'img/dog-duck.jpg');
new Image('dragon', 'img/dragon.jpg');
new Image('pen', 'img/pen.jpg');
new Image('pet-sweep', 'img/pet-sweep.jpg');
new Image('tauntaun','img/tauntaun.jpg');
new Image('unicorn', 'img/unicorn.jpg');
new Image('usb', 'img/usb.gif');
new Image('water-can', 'img/water-can.jpg');
new Image('wine-glass', 'img/wine-glass.jpg');




//randomly generate a number
function randNum() {
  return Math.floor(Math.random() * Image.length);
}

//randomly display one of the pictures. need to run this three times and have IF statements making sure that there arent doubles and that they dont match the previous three set
/*function randomPicture() { //this should be closer to the displayPictureFunction
  var randomIndexOne = Math.floor(Math.random() * Image.allImages.length);
  var randomIndexTwo = Math.floor(Math.random() * Image.allImages.length);
  var randomIndexThree = Math.floor(Math.random() * Image.allImages.length);
  indexArray.push(randomIndexOne);
  indexArray.push(randomIndexTwo);
  indexArray.push(randomIndexThree);
  randChecker();//i need to put this so it doesnt fire until the randChecker??
}*/

//needs to be a function that check if the number are equal to eachother before allowign them to be pushed to eht page (stored in the array)
function randChecker () {
  var currentShow = [];
  currentShow[0] = randNum();
  while (justViewed.indexOf(currentShow[0])) {
    currentShow[0] = randNum();
    console.log('check index one: ' + currentShow[0]);
  }
  currentShow[1] = randNum();
  while (currentShow[0] === currentShow[1] || justViewed.indexOf(currentShow[1]) !== -1) {
    currentShow[1] = randNum();
    console.log('check index two: ' + currentShow[1]);
  }
  currentShow[2] = randNum();
  while (currentShow[0] === currentShow[2] || currentShow[1] === currentShow[2] || justViewed.indexOf(currentShow[2]) !== -1) {
    currentShow[2] = randNum();
    console.log('check index three: ' + currentShow[2]);
  }
  imgElOne.src = Image.allImages[indexArray[0]].filepath;
  imgElTwo.src = Image.allImages[indexArray[1]].filepath;
  imgElThree.src = Image.allImages[indexArray[2]].filepath;

  for (var i = 0; i < 3; i++) {
    /*.pics[i].src = indexArray[currentShow[i]];
    Product.pics[i].id = indexArray[currentShow[i]].name;*/
    indexArray[currentShow[i]].views += 1;
    justViewed[i] = currentShow[i]; //storing the justViewed
  }
}

var imgElOne = document.getElementById('imgOne');
var imgElTwo = document.getElementById('imgTwo');
var imgElThree = document.getElementById('imgThree');

function handleClick(event) {
  console.log(numOfClicks, 'total clicks');
  if (numOfClicks > 24) {
    imgElOne.removeEventListener('click',handleClick);
    imgElTwo.removeEventListener('click',handleClick);
    imgElThree.removeEventListener('click',handleClick);
  }
  if (numOfClicks > 24) {
    imgElOne.removeEventListener('click',handleClick);
    imgElTwo.removeEventListener('click',handleClick);
    imgElThree.removeEventListener('click',handleClick);
  }
  if (numOfClicks > 24) {
    imgElOne.removeEventListener('click',handleClick);
    imgElTwo.removeEventListener('click',handleClick);
    imgElThree.removeEventListener('click',handleClick);
  }
  randChecker();
  function showTally() {
    for(var i = 0; i < indexArray.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = indexArray[i].name + ' has ' + indexArray[i].votes + ' votes in ' + indexArray[i].views + ' views ';
      Image.tally.appendChild(liEl);
    }
  }

  imgElOne.addEventListener('click', handleClick);
  imgElTwo.addEventListener('click', handleClick);
  imgElThree.addEventListener('click', handleClick);
  randChecker();
}
randChecker();