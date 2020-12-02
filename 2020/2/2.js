// PART 1
// Rank: 3831
// Time: 00:16:59
//
// PART 2
// Rank: 3833
// Time: 00:25:06

var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const passwords = fileContent.split("\n");

function partOne(passwords) {
  let numOfValidPasswords = 0;

  passwords.forEach((password) => {
    if (password) {
      let range = password.split(" ")[0];
      let lowRange = parseInt(range.split("-")[0]);
      let highRange = parseInt(range.split("-")[1]);

      let char = password.split(" ")[1][0];

      let passwordString = password.split(" ")[2] || "";

      let regex = new RegExp(char, "g");
      let charNumInPassword = (passwordString.match(regex) || []).length;

      if (charNumInPassword <= highRange && charNumInPassword >= lowRange) {
        numOfValidPasswords++;
      }
    }
  });
  return numOfValidPasswords;
}

function partTwo(passwords) {
  let numOfValidPasswords = 0;

  passwords.forEach((password) => {
    if (password) {
      let indexes = password.split(" ")[0];
      let indexOne = parseInt(indexes.split("-")[0]);
      let indexTwo = parseInt(indexes.split("-")[1]);

      let char = password.split(" ")[1][0];
      let passwordString = password.split(" ")[2] || "";

      let charOne = passwordString[indexOne - 1];
      let charTwo = passwordString[indexTwo - 1];

      if (
        (charOne == char && charTwo != char) ||
        (charOne != char && charTwo == char)
      ) {
        numOfValidPasswords++;
      }
    }
  });

  return numOfValidPasswords;
}

console.log(partOne(passwords));
console.log(partTwo(passwords));
