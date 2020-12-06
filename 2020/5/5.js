const { log } = require("console");
var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const boardingPasses = fileContent.split("\n");

function getRoworColumn(boardingPass, lowerBound, upperBound, index) {
  const lowerDirection = ["F", "L"];
  const upperDirection = ["B", "R"];

  let direction = boardingPass[index];
  let rangeSize = upperBound - lowerBound + 1;

  if (upperBound - lowerBound == 1 || upperBound - lowerBound == 0) {
    return lowerDirection.includes(direction) ? lowerBound : upperBound;
  }

  if (lowerDirection.includes(direction)) {
    return getRoworColumn(
      boardingPass,
      lowerBound,
      upperBound - rangeSize / 2,
      index + 1
    );
  } else if (upperDirection.includes(direction)) {
    return getRoworColumn(
      boardingPass,
      lowerBound + rangeSize / 2,
      upperBound,
      index + 1
    );
  }
}

function partOne() {
  let highestSeatId = 0;
  boardingPasses.forEach((boardingPass) => {
    let row = getRoworColumn(boardingPass, 0, 127, 0);
    let column = getRoworColumn(boardingPass, 0, 7, 7);
    let seatId = row * 8 + column;
    if (seatId > highestSeatId) highestSeatId = seatId;
  });
  return highestSeatId;
}

function partTwo(passportLines) {
  let allSeatIds = [];

  for (let row = 0; row < 128; row++) {
    for (let column = 0; column < 8; column++) {
      allSeatIds.push(row * 8 + column);
    }
  }

  let boardingPassIds = [];

  boardingPasses.forEach((boardingPass) => {
    let row = getRoworColumn(boardingPass, 0, 127, 0);
    let column = getRoworColumn(boardingPass, 0, 7, 7);
    let seatId = row * 8 + column;
    boardingPassIds.push(seatId);
  });

  return allSeatIds.filter((seatId) => !boardingPassIds.includes(seatId));
}

log(partOne());
log(partTwo());
