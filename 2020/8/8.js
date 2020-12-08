const { log } = require("console");
var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const bootInstructions = fileContent.split("\n");

function executeBootloader(bootInstructions) {
  let instructionLinesRun = [];
  let currentInstructionLine = 0;
  let accumulator = 0;
  let programTerminated = false;

  while (!instructionLinesRun.includes(currentInstructionLine)) {
    instructionLinesRun.push(currentInstructionLine);
    let instruction = bootInstructions[currentInstructionLine];
    let operation = instruction.split(" ")[0];
    let argumentSign = instruction.split(" ")[1][0];
    let argumentValue = parseInt(instruction.split(" ")[1].substring(1));

    switch (operation) {
      case "nop":
        currentInstructionLine++;
        break;
      case "acc":
        if (argumentSign == "+") {
          accumulator += argumentValue;
        } else {
          accumulator -= argumentValue;
        }
        currentInstructionLine++;
        break;
      case "jmp":
        if (argumentSign == "+") {
          currentInstructionLine += argumentValue;
        } else {
          currentInstructionLine -= argumentValue;
        }
        break;
      default:
        break;
    }
    if (currentInstructionLine >= bootInstructions.length - 1) {
      programTerminated = true;
      break;
    }
  }
  return { programTerminated: programTerminated, accumulator: accumulator };
}

function partOne(bootInstructions) {
  return executeBootloader(bootInstructions).accumulator;
}

function partTwo(bootInstructions) {
  for (let i = 0; i < bootInstructions.length; i++) {
    let operation = bootInstructions[i].split(" ")[0];

    if (operation == "nop") {
      bootInstructions[i] = bootInstructions[i].replace("nop", "jmp");
      let programResult = executeBootloader(bootInstructions);
      if (programResult.programTerminated) return programResult.accumulator;
      bootInstructions[i] = bootInstructions[i].replace("jmp", "nop");
    } else if (operation == "jmp") {
      bootInstructions[i] = bootInstructions[i].replace("jmp", "nop");
      let programResult = executeBootloader(bootInstructions);
      if (programResult.programTerminated) return programResult.accumulator;
      bootInstructions[i] = bootInstructions[i].replace("nop", "jmp");
    }
  }
}

log("Part 1 is: " + partOne(bootInstructions));
log("Part 2 is: " + partTwo(bootInstructions));
