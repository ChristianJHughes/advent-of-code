var fs = require('fs');

var fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');

let cleanInput = fileContent.split(',').map((el) => parseInt(el));

let input = fileContent.split(',').map((el) => parseInt(el));

function runComputer(input) {
  let currentIndex = 0;
  let opCode = input[currentIndex];

  while (opCode != '99') {
    let arg1position = input[currentIndex + 1];
    let arg2position = input[currentIndex + 2];
    let outputPosition = input[currentIndex + 3];

    switch (opCode) {
      case 1:
        input[outputPosition] = input[arg1position] + input[arg2position];
        break;
      case 2:
        input[outputPosition] = input[arg1position] * input[arg2position];
        break;
    }

    currentIndex += 4;
    opCode = input[currentIndex];
  }
  return input;
}

function restoreGravityAssistProgram(input) {
  input[1] = 12;
  input[2] = 2;
  return input;
}

function solvePart1(input) {
  input = restoreGravityAssistProgram(input);
  input = runComputer(input);
  return input[0];
}

function solvePart2(input) {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      input = cleanInput.slice(0);
      input[1] = i;
      input[2] = j;
      input = runComputer(input);

      if (input[0] == 19690720) {
        noun = input[1];
        verb = input[2];
        return 100 * noun + verb;
      }
    }
  }
  return 0;
}

console.log('The answer to part 1 is: ' + solvePart1(input));
console.log('The answer to part 2 is: ' + solvePart2(input));
