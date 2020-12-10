const { log } = require('console');
var fs = require('fs');

var fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');

let joltages = fileContent.split('\n').map((x) => parseInt(x));
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
      log('How did we get here?');
    }
  }

  return numOfOneJoltDifferences * numOfThreeJoltDifferences;
}

function partTwo(joltages) {
  let deviceJoltage = joltages[joltages.length - 1] + 3;
  joltages.push(deviceJoltage);
  joltages.push(0);
  joltages = joltages.sort((a, b) => a - b);

  let baseIndex = 1;
  let answer = 0;

  for (let i = 1; i < joltages.length - 1; i++) {
    let currentIndex = i;
    let upperIndex = i + 1;

    if (joltages[upperIndex] - joltages[currentIndex] == 3) {
      let set = [];

      for (let j = baseIndex; j < currentIndex; j++) {
        set.push(joltages[j]);
      }

      setCombinations = getNumberOfCombinationsForSet(set);

      if (!answer) {
        answer = setCombinations;
      } else {
        answer = answer * setCombinations;
      }

      if (upperIndex < joltages.length) {
        baseIndex = upperIndex + 1;
      }
    }
  }
  return answer;
}

function getNumberOfCombinationsForSet(set) {
  if (set.length == 0) {
    return 1;
  } else if (set.length == 1 || set.length == 2) {
    return Math.pow(2, set.length);
  } else if (set.length == 3) {
    return Math.pow(2, set.length) - 1;
  }
}

log('Part 1 is: ' + partOne(joltages));
log('Part 2 is: ' + partTwo(joltages));
