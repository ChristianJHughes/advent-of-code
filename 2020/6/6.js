const { log } = require("console");
var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const answers = fileContent.split("\n");

function partOne(answers) {
  let groupSum = 0;
  let uniqueAnswersForGroup = new Set();
  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i];
    if (answer == "") {
      groupSum += uniqueAnswersForGroup.size;
      uniqueAnswersForGroup.clear();
    } else {
      for (let j = 0; j < answer.length; j++) {
        uniqueAnswersForGroup.add(answer[j]);
      }
    }
  }
  return groupSum;
}

function partTwo(answers) {
  let groupSum = 0;
  let uniqueAnswersForGroup = new Set();
  let isFirstInSet = true;
  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i];
    if (answer == "") {
      groupSum += uniqueAnswersForGroup.size;
      uniqueAnswersForGroup.clear();
      isFirstInSet = true;
    } else {
      if (isFirstInSet) {
        for (let j = 0; j < answer.length; j++) {
          uniqueAnswersForGroup.add(answer[j]);
        }
      } else {
        let setTwo = new Set();
        for (let j = 0; j < answer.length; j++) {
          setTwo.add(answer[j]);
        }
        uniqueAnswersForGroup = new Set(
          [...uniqueAnswersForGroup].filter((answer) => setTwo.has(answer))
        );
      }
      isFirstInSet = false;
    }
  }
  return groupSum;
}

log("Part 1 is: " + partOne(answers));
log("Part 2 is: " + partTwo(answers));
