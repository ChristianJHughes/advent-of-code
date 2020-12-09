const { log } = require("console");
var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const dataStream = fileContent.split("\n").map((x) => parseInt(x));

function partOne(dataStream, preambleLength) {
  let startingDataIndex = preambleLength;

  for (let i = startingDataIndex; i < dataStream.length; i++) {
    let currentNumber = dataStream[i];
    if (!findSum(dataStream, i, preambleLength)) return currentNumber;
  }
}

// Brute force
function findSum(dataStream, currentIndex, preambleLength) {
  let startingIndex = currentIndex - preambleLength;
  let sum = dataStream[currentIndex];
  for (let i = startingIndex; i < startingIndex + preambleLength; i++) {
    for (let j = startingIndex; j < startingIndex + preambleLength; j++) {
      if (
        dataStream[i] + dataStream[j] == sum &&
        dataStream[i] != dataStream[j]
      )
        return true;
    }
  }
  return false;
}

function partTwo(dataStream, targetSum) {
  let currentIndex = 0;
  let sum = 0;
  let lowestNumber = 0;
  let highestNumber = 0;

  while (currentIndex < dataStream.length) {
    for (let i = currentIndex; i < dataStream.length; i++) {
      let currentNumber = dataStream[i];
      sum += currentNumber;
      if (lowestNumber == 0 || currentNumber < lowestNumber)
        lowestNumber = currentNumber;
      if (highestNumber == 0 || currentNumber > highestNumber)
        highestNumber = currentNumber;
      if (sum == targetSum) return lowestNumber + highestNumber;
      if (sum > targetSum) break;
    }
    currentIndex++;
    sum = 0;
    lowestNumber = 0;
    highestNumber = 0;
  }
}
log("Part 1 is: " + partOne(dataStream, 25));
log("Part 2 is: " + partTwo(dataStream, 10884537));
