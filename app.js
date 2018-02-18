
// a lot of help on the chart from Katerina and Autumn, and Chris

'use strict';

var allImages = [];
var numOfClicks = 0;
var justViewed = [];
var tally = document.getElementById('tally');

var imgElOne = document.getElementById('imgOne');
var imgElTwo = document.getElementById('imgTwo');
var imgElThree = document.getElementById('imgThree');

function Image(name, filepath, labelColor) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.views = 0;
  this.labelColor = labelColor;
  allImages.push(this);
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

function randNum() {
  return Math.floor(Math.random() * allImages.length);
}

function randChecker () {
  var currentShow = [];
  currentShow[0] = randNum();
  while (justViewed.indexOf(currentShow[0]) !== -1) {
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
  console.log(currentShow);
  imgElOne.src = allImages[currentShow[0]].filepath;
  imgElTwo.src = allImages[currentShow[1]].filepath;
  imgElThree.src = allImages[currentShow[2]].filepath;
  for (var i = 0; i < 3; i++) {
    allImages[currentShow[i]].views += 1;
    justViewed[i] = currentShow[i];
    console.log('just viewed: ' + justViewed[i]);
  }
}

function showTally() {
  for(var i = 0; i < allImages.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allImages[i].name + ' has ' + allImages[i].votes + ' votes in ' + allImages[i].views + ' views ';
    tally.appendChild(liEl);
  }
}

imgElOne.addEventListener('click', handleClick);
function handleClick() {
  console.log(numOfClicks, ' total clicks');
  if (numOfClicks === 25) {
    removeListener();
    showTally();
    genChart();
  } else {
    numOfClicks += 1;
    allImages[justViewed[0]].votes += 1;
  }
  randChecker();
}


imgElTwo.addEventListener('click', handleClick2);
function handleClick2() {
  if (numOfClicks === 25) {
    removeListener();
    showTally();
    genChart();
  } else {
    numOfClicks += 1;
    allImages[justViewed[1]].votes += 1;
  }
  randChecker();
}

imgElThree.addEventListener('click', handleClick3);
function handleClick3() {
  if (numOfClicks === 25) {
    removeListener();
    showTally();
    genChart();
  } else {
    numOfClicks += 1;
    allImages[justViewed[2]].votes += 1;
  }
  randChecker();
}

function removeListener(){
  imgElOne.removeEventListener('click',handleClick);
  imgElTwo.removeEventListener('click',handleClick2);
  imgElThree.removeEventListener('click',handleClick3);
}
randChecker();

function genChart() {
  //JOSH told me this code for the local storage (giving him credit) and explained to me how it works
  var strItems = JSON.stringify(allImages);
  localStorage.setItem('items', strItems);

  var chartNames = [];
  var chartVotes = [];
  var labelColors = [];
  for(var j = 0; j < allImages.length; j++) {
    chartNames[j] = allImages[j].name;
    chartVotes[j] = allImages[j].votes;
    labelColors[j] = allImages[j].labelColor;
  }
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartNames,
      datasets: [{
        label: '# of Votes',
        data: chartVotes,
        backgroundColor: ["rgb(3,200,1)","rgb(256,2,1)","rgb(100,2,1)","rgb(3,2,200)","rgb(200,1,143)","rgb(21,111,13)","rgb(4,27,166)","rgb(131,222,1)","rgb(35,22,111)","rgb(39,24,12)","rgb(23,2,134)","rgb(3,222,1)","rgb(113,112,1)","rgb(234,24,1)","rgb(113,2,1)","rgb(3,2,144)","rgb(3,222,1)",]
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks:  {
            beginAtZero: true,
            stepSize: 1,
            max: 8,
          }
        }]
      }
    }
  });
}