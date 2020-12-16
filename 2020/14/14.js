const { log } = require('console');
var fs = require('fs');

let fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');

let input = fileContent.split('\n');

let memory = Array(100000).fill(0);

function partOne(input) {
  let mask = '';
  let memoryAddr = 0;
  let baseTenValue = 0;
  let baseTwoValue = 0;
  let baseTwoValueWithMask = 0;

  let memorySum = 0;

  input.forEach((line) => {
    if (line.startsWith('mask')) {
      mask = line.substring(7);
      log(mask);
    } else {
      memoryAddr = line.substring(4, line.indexOf(']'));
      baseTenValue = line.substring(line.indexOf('=') + 2);
      baseTwoValue = parseInt(baseTenValue).toString(2);
      baseTwoValue = baseTwoValue.padStart(36, '0');
      baseTwoValueWithMask = baseTwoValue;

      for (let i = 0; i < mask.length; i++) {
        if (mask[i] != 'X') {
          log('here!');
          baseTwoValueWithMask =
            baseTwoValueWithMask.substring(0, i) +
            mask[i] +
            baseTwoValueWithMask.substring(i + 1);
        }
      }

      memory[memoryAddr] = parseInt(baseTwoValueWithMask, 2).toString(10);
      // log('Address ' + memoryAddr);
      // log('new val: ' + baseTwoValueWithMask);
      // log('Sum: ' + memory[memoryAddr]);

      // log(baseTwoValue);
      // log(baseTwoValue.length);
      // log(baseTenValue);
    }
  });

  memory.forEach((val) => {
    memorySum += parseInt(val);
  });
  return memorySum;
}

function partTwo(input) {}

log(partOne(input));
// log('Part 2 is: ' + partTwo(input));
