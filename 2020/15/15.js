const { log } = require('console');
var fs = require('fs');

let fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');

let input = fileContent.split(',');

function partOne(input, numOfTurns) {
  let currentTurn = 1;
  let turns = new Array(numOfTurns);
  let firstTimeNumbers = new Map();
  let repeatNumbers = new Map();


  for (let i = currentTurn; i <= input.length; i++) {
    let number = input[i - 1];
    if (!firstTimeNumbers.has(number)) {
      if (!repeatNumbers.has(number)) {
        firstTimeNumbers.set(number, currentTurn);
      } else {
        repeatNumbers.set(number, currentTurn);
      }
    }
    turns[i - 1] = input[i - 1];
    currentTurn++;
  }

  if (firstTimeNumbers.has(turns[currentTurn - 2])) {

  } else () {
    turns[currentTurn - 2] = 0;
  }

}

function partTwo(input) {}

log(partOne(input));
// log('Part 2 is: ' + partTwo(input));
