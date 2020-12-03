var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const expenses = fileContent.split("\n").map((elem) => parseInt(elem));

// Slowpoke function with naive n^2 search scope
function naiveExpensesSearchPart1() {
  for (let i = 0; i < expenses.length; i++) {
    for (let j = 0; j < expenses.length; j++) {
      if (i != j && expenses[i] + expenses[j] == 2020) {
        return expenses[i] * expenses[j];
      }
    }
  }
}

function naiveExpensesSearchPart2() {
  for (let i = 0; i < expenses.length; i++) {
    for (let j = 0; j < expenses.length; j++) {
      for (let z = 0; z < expenses.length; z++) {
        if (
          i != j &&
          i != z &&
          j != z &&
          expenses[i] + expenses[j] + expenses[z] == 2020
        ) {
          return expenses[i] * expenses[j] * expenses[z];
        }
      }
    }
  }
}

console.log("Part 1 Answer: " + naiveExpensesSearchPart1());
console.log("Part 2 Answer: " + naiveExpensesSearchPart2());
