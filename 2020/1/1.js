var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const expenses = fileContent.split("\n").map((elem) => parseInt(elem));

// Slowpoke function with naive n^2 search scope
function naiveExpensesSearch() {
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

console.log(naiveExpensesSearch());
