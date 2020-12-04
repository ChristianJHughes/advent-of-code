const { log } = require("console");
var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const passportLines = fileContent.split("\n");
const partOnerequiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function partOne(passportLines) {
  let curPassportStart = 0;
  const passports = [];
  let validPassports = 0;
  for (let i = 0; i < passportLines.length; i++) {
    if (passportLines[i] == "") {
      let passport = "";
      for (let j = curPassportStart; j < i; j++) {
        passport = passport.concat(" ", passportLines[j]);
      }
      passports.push(passport);
      curPassportStart = i + 1;
    }
  }

  for (let i = 0; i < passports.length; i++) {
    let isValidPassport = true;
    for (let j = 0; j < partOnerequiredFields.length; j++) {
      if (!passports[i].includes(partOnerequiredFields[j] + ":")) {
        isValidPassport = false;
      }
    }
    if (isValidPassport) validPassports++;
  }

  return validPassports;
}

function partTwo(passportLines) {
  let curPassportStart = 0;
  const passports = [];
  let validPassports = 0;
  for (let i = 0; i < passportLines.length; i++) {
    if (passportLines[i] == "") {
      let passport = "";
      for (let j = curPassportStart; j < i; j++) {
        passport = passport.concat(" ", passportLines[j]).trim();
      }
      passports.push(passport);
      curPassportStart = i + 1;
    }
  }

  for (let i = 0; i < passports.length; i++) {
    let isValidPassport = true;
    for (let j = 0; j < partOnerequiredFields.length; j++) {
      if (!passports[i].includes(partOnerequiredFields[j] + ":")) {
        isValidPassport = false;
        break;
      }
    }

    if (isValidPassport) {
      for (let j = 0; j < partOnerequiredFields.length; j++) {
        let fieldName = partOnerequiredFields[j];
        let fieldValue = passports[i]
          .substring(
            passports[i].indexOf(partOnerequiredFields[j] + ":") +
              partOnerequiredFields[j].length +
              1
          )
          .split(" ")[0]
          .trim();
        isValidPassport = checkValidField(fieldName, fieldValue);
        if (!isValidPassport) break;
      }
    }

    if (isValidPassport) validPassports++;
  }

  return validPassports;
}

function checkValidField(fieldName, fieldValue) {
  let val;
  switch (fieldName) {
    case "byr":
      if (fieldValue.match(/^\d{4}$/)) {
        val = parseInt(fieldValue);
        if (val >= 1920 && val <= 2002) {
          return true;
        }
      }
      break;
    case "iyr":
      if (fieldValue.match(/^\d{4}$/)) {
        val = parseInt(fieldValue);
        if (val >= 2010 && val <= 2020) {
          return true;
        }
      }
      break;
    case "eyr":
      if (fieldValue.match(/^\d{4}$/)) {
        val = parseInt(fieldValue);
        if (val >= 2020 && val <= 2030) {
          return true;
        }
      }
      break;
    case "hgt":
      if (fieldValue.endsWith("cm")) {
        val = fieldValue.substring(0, fieldValue.length - 2);
        val = parseInt(val);
        if (val >= 150 && val <= 193) {
          return true;
        }
      } else if (fieldValue.endsWith("in")) {
        val = fieldValue.substring(0, fieldValue.length - 2);
        val = parseInt(val);
        if (val >= 59 && val <= 76) {
          return true;
        }
      }
      break;
    case "hcl":
      if (fieldValue.match(/^\#[0-9a-f]{6}$/)) return true;
    case "ecl":
      if (fieldValue.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) return true;
    case "pid":
      if (fieldValue.match(/^\d{9}$/)) return true;
    default:
      return false;
  }
  return false;
}

log(partOne(passportLines));
log(partTwo(passportLines));
