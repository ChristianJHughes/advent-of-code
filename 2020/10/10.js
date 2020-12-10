const { log } = require("console");
var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

let joltages = fileContent.split("\n").map((x) => parseInt(x));
joltages = joltages.sort((a, b) => a - b);

function partOne(joltages) {
  let deviceJoltage = joltages[joltages.length - 1] + 3;
  joltages.push(deviceJoltage);

  let numOfOneJoltDifferences = 0;
  let numOfThreeJoltDifferences = 0;
  let currentJoltage = 0;
  log(joltages);

  for (let i = 0; i < joltages.length; i++) {
    let difference = joltages[i] - currentJoltage;
    currentJoltage = joltages[i];
    if (difference == 1) {
      numOfOneJoltDifferences++;
    } else if (difference == 3) {
      numOfThreeJoltDifferences++;
    } else {
      log("oops");
    }
  }
  log(numOfOneJoltDifferences);
  log(numOfThreeJoltDifferences);
  return numOfOneJoltDifferences * numOfThreeJoltDifferences;
}

function partTwo(joltages) {
  let originalJoltages = joltages.slice();
  let deviceJoltage = joltages[joltages.length - 1] + 3;
  joltages.push(deviceJoltage);
  joltages.push(0);
  joltages = joltages.sort((a, b) => a - b);
  let removableJoltages = 0;
  let removableJoltagesArr = [];
  log(joltages);

  for (let j = 0; j < joltages.length - 2; j++) {
    joltages = originalJoltages.slice();
    for (let i = j; i < joltages.length - 2; i++) {
      let difference = joltages[i + 2] - joltages[i];
      // log(difference);

      if (difference <= 3) {
        removableJoltages++;
        joltages.splice(i + 1, 1);
        // log(joltages);
        i--;
      }
    }
    removableJoltagesArr.push(removableJoltages);
    removableJoltages = 0;
  }
  log(removableJoltagesArr);
  log(removableJoltages);
  log(Math.pow(2, removableJoltages));
  // log(deviceJoltage);
  log(joltages);
}
// log("Part 1 is: " + partOne(dataStream, 25));
// log("Part 2 is: " + partTwo(dataStream, 10884537));

// log(partOne(joltages));
log(partTwo(joltages));
// log("Part 2 is: " + partTwo(dataStream, 10884537));
