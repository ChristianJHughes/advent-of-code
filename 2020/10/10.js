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
      log('oops');
    }
  }
  log(numOfOneJoltDifferences);
  log(numOfThreeJoltDifferences);
  return numOfOneJoltDifferences * numOfThreeJoltDifferences;
}

function partTwo(joltages) {
  // log(joltages);
  let originalJoltages = joltages.slice();
  let deviceJoltage = joltages[joltages.length - 1] + 3;
  joltages.push(deviceJoltage);
  joltages.push(0);
  joltages = joltages.sort((a, b) => a - b);

  // let removableJoltages = 0;
  // let alreadyRemovedJoltages = [];
  // let removedJoltages = [];
  // let removedJoltagesSums = [];

  // let arrangements = 0;
  // let setsToRemove = 0;
  log(joltages);

  let baseIndex = 1;
  // let setSize = 0;
  let answer = 0;

  for (let i = 1; i < joltages.length - 1; i++) {
    let currentIndex = i;
    let upperIndex = i + 1;
    // log(joltages[currentIndex]);
    // log(joltages[upperIndex]);
    // log(joltages[baseIndex]);
    // log(currentIndex);
    // log(upperIndex);
    // log(baseIndex);

    if (joltages[upperIndex] - joltages[currentIndex] == 3) {
      // setSize = upperIndex - baseIndex;
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
        // i = upperIndex;
      } else {
        break;
      }
      // log(joltages[baseIndex]);
      // i = baseIndex;
    }
  }
  return answer;
}

function getNumberOfCombinationsForSet(set) {
  log(set);
  let variations = [];
  if (set.length == 0) {
    return 1;
  } else if (set.length == 1 || set.length == 2) {
    return Math.pow(2, set.length);
  } else if (set.length == 3) {
    return Math.pow(2, set.length) - 1;
  }
}

// function isValidSet(set) {
//   set.forEach(x => if(x))
// }

// for (let i = 0; i < joltages.length - 2; i++) {
//   let currentJoltage = joltages[i];
//   let nextJoltage = joltages[i + 1];
//   let futureJoltage = joltages[i + 2];
//   if (nextJoltage - currentJoltage == 1 && futureJoltage - nextJoltage <= 2) {
//     removableJoltages++;
//     if (futureJoltage - nextJoltage == 2) setsToRemove++;
//   } else if (
//     nextJoltage - currentJoltage == 2 &&
//     futureJoltage - nextJoltage == 1
//   ) {
//     removableJoltages++;
//   }
// }

// arrangements = Math.pow(2, removableJoltages);
// log(arrangements);
//   for (let j = 0; j < joltages.length - 2; j++) {
//     joltages = originalJoltages.slice();
//     for (let i = j; i < joltages.length - 2; i++) {
//       let difference = joltages[i + 2] - joltages[i];
//       // log(difference);

//       if (difference <= 3) {
//         removableJoltages++;
//         removedJoltages.push(joltages[i + 1]);
//         joltages.splice(i + 1, 1);
//         i--;
//       }
//     }
//     // let newlyRemovedJoltages = removedJoltages.filter(
//     //   (x) => !alreadyRemovedJoltages.includes(x)
//     // );
//     if (removedJoltages.length)
//       arrangements += Math.pow(2, removedJoltages.length);
//     removedJoltages.forEach((x) => alreadyRemovedJoltages.push(x));
//     removedJoltages = [];
//     joltages = originalJoltages.slice();
//     log(arrangements);

//     // if (
//     //   removedJoltages.includes(joltages[j]) &&
//     //   removedJoltages >= removableJoltages[removableJoltages.length - 1]
//     // ) {
//     //   log("wow");
//     // }
//     // removedJoltagesSums.push(removableJoltages);
//     // removableJoltages = 0;
//     // removableJoltagesArr.push(removableJoltages);
//     // removableJoltages = 0;
//   }
//   // log(removedJoltages);
//   // log(removedJoltagesSums);
//   // log(Math.pow(2, removableJoltages));
//   // log(deviceJoltage);
//   // log(joltages);
// }
// log("Part 1 is: " + partOne(dataStream, 25));
// log("Part 2 is: " + partTwo(dataStream, 10884537));

// log(partOne(joltages));
log(partTwo(joltages));
// log("Part 2 is: " + partTwo(dataStream, 10884537));
