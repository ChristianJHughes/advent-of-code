const { log } = require("console");
var fs = require("fs");
var G = require("generatorics");

let fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

let input = fileContent.split("\n");

let memory = {};

function partOne(input) {
  let mask = "";
  let memoryAddr = 0;
  let baseTenValue = 0;
  let baseTwoValue = 0;
  let baseTwoValueWithMask = 0;

  let memorySum = 0;

  input.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.substring(7);
      log(mask);
    } else {
      memoryAddr = line.substring(4, line.indexOf("]"));
      baseTenValue = line.substring(line.indexOf("=") + 2);
      baseTwoValue = parseInt(baseTenValue).toString(2);
      baseTwoValue = baseTwoValue.padStart(36, "0");
      baseTwoValueWithMask = baseTwoValue;

      for (let i = 0; i < mask.length; i++) {
        if (mask[i] != "X") {
          log("here!");
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

function partTwo(input) {
  let mask = "";
  let memoryAddr = 0;
  let baseTwoValue = 0;
  let memorySum = 0;

  input.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.substring(7);
    } else {
      memoryAddr = line.substring(4, line.indexOf("]"));
      baseTwoMemoryAddress = parseInt(memoryAddr).toString(2).padStart(36, "0");
      value = line.substring(line.indexOf("=") + 2);
      baseTwoValue = parseInt(value).toString(2).padStart(36, "0");
      baseTwoMemoryAddressWithMask = baseTwoMemoryAddress;

      // 1. Transform base two memory address
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] == "X" || mask[i] == "1") {
          baseTwoMemoryAddressWithMask =
            baseTwoMemoryAddressWithMask.substring(0, i) +
            mask[i] +
            baseTwoMemoryAddressWithMask.substring(i + 1);
        }
      }

      // 2. Set all possible memory addresses to value.
      let floatingPermutations = [];
      let floatingDigitLength = mask.split("X").length - 1;

      // 3. Get Floating Point Permutation with which to replace 'X'
      for (let i = 0; i < Math.pow(2, floatingDigitLength); i++) {
        floatingPermutations.push(
          i.toString(2).padStart(floatingDigitLength, "0")
        );
      }

      // 4. Replace 'X'
      floatingPermutations.forEach((permutation) => {
        let generatedMemoryAddr = baseTwoMemoryAddressWithMask;
        for (let j = 0; j < permutation.length; j++) {
          generatedMemoryAddr = generatedMemoryAddr.replace(
            "X",
            permutation[j]
          );
        }
        memory[parseInt(generatedMemoryAddr, 2)] = value;
      });
    }
  });

  for (const address in memory) {
    memorySum += parseInt(memory[address]);
  }
  return memorySum;
}

log(partOne(input));
log(partTwo(input));
