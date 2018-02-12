
'use strict';

Image.allImages = [];
var indexArray = [];
var numOfClicks = 0;

function Image(name, filepath) {
  this.name = name;
  this.filepath = filepath;
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

var imgElOne = document.getElementById('imgOne');
var imgElTwo = document.getElementById('imgTwo');
var imgElThree = document.getElementById('imgThree');
var startButton = document.getElementById('startButton');
imgElOne.addEventListener('click', clickChecker);
imgElTwo.addEventListener('click', clickChecker);
imgElThree.addEventListener('click', clickChecker);
startButton.addEventListener('click', clickChecker);// start button

//randomly display one of the pictures. need to run this three times and have IF statements making sure that there arent doubles and that they dont match the previous three set
function randomPicture() {
  var randomIndexOne = Math.floor(Math.random() * Image.allImages.length);
  var randomIndexTwo = Math.floor(Math.random() * Image.allImages.length);
  var randomIndexThree = Math.floor(Math.random() * Image.allImages.length);
  indexArray.push(randomIndexOne);
  indexArray.push(randomIndexTwo);
  indexArray.push(randomIndexThree);
  randChecker();//i need to put this so it doesnt fire until the randChecker??
}
//needs to be a function that check if the number are equal to eachother before allowign them to be pushed to eht page (stored in the array)
function randChecker () {
  if (indexArray[0] === indexArray[1] || indexArray[2]) {
    indexArray[0] = Math.floor(Math.random() * Image.allImages.length);
    console.log('check index one: ' + indexArray[0]);
  }
  if (indexArray[1] === indexArray[0] || indexArray[2]) {
    indexArray[1] = Math.floor(Math.random() * Image.allImages.length);
    console.log('check index two: ' + indexArray[1]);
  }
  if (indexArray[2] === indexArray[0] || indexArray[1]) {
    indexArray[2] = Math.floor(Math.random() * Image.allImages.length);
    console.log('check index three: ' + indexArray[2]);
  }
  imgElOne.src = Image.allImages[indexArray[0]].filepath;
  imgElTwo.src = Image.allImages[indexArray[1]].filepath;
  imgElThree.src = Image.allImages[indexArray[2]].filepath;
}
//needs to be a filter function that checks condition of numOfClicks before firing the randomfunction
function clickChecker() {
  if (numOfClicks !== 25) {
    randomPicture();
  }
  numOfClicks++;
  console.log('clicks: ' + numOfClicks);
}
randomPicture();
