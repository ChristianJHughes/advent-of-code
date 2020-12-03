// PART 1
// Rank: 3259
// Time: 00:13:02
//
// PART 2
// Rank: 2380
// Time: 00:16:37

var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const slopes = fileContent.split("\n");

function partOne(slopes) {
  const horSlopeLen = slopes[0].length;

  let numTrees = 0;
  let horSlopeIndex = 0;
  let vertSlopeIndex = 0;

  while (vertSlopeIndex + 1 < slopes.length) {
    if (horSlopeIndex + 3 < horSlopeLen) {
      horSlopeIndex += 3;
    } else {
      horSlopeIndex = horSlopeIndex + 3 - horSlopeLen;
    }
    vertSlopeIndex += 1;
    if (slopes[vertSlopeIndex][horSlopeIndex] == "#") numTrees++;
  }
  return numTrees;
}

function partTwo(slopes, horSlopeDist, vertSlopeIndexDist) {
  const horSlopeLen = slopes[0].length;

  let numTrees = 0;
  let horSlopeIndex = 0;
  let vertSlopeIndex = 0;

  while (vertSlopeIndex + vertSlopeIndexDist < slopes.length) {
    if (horSlopeIndex + horSlopeDist < horSlopeLen) {
      horSlopeIndex += horSlopeDist;
    } else {
      horSlopeIndex = horSlopeIndex + horSlopeDist - horSlopeLen;
    }
    vertSlopeIndex += vertSlopeIndexDist;
    if (slopes[vertSlopeIndex][horSlopeIndex] == "#") numTrees++;
  }
  return numTrees;
}

console.log("Part 1 Answer: " + partOne(slopes));
console.log(
  "Part 2 Answer: " +
    partTwo(slopes, 1, 1) *
      partTwo(slopes, 3, 1) *
      partTwo(slopes, 5, 1) *
      partTwo(slopes, 7, 1) *
      partTwo(slopes, 1, 2)
);
