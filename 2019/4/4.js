function returnNumberOfValidPasswords(bottom, top, part) {
  let numberOfValidPasswords = 0;

  for (var i = bottom; i <= top; i++) {
    let digits = [];
    digits.push(Math.floor(i / 100000) % 10);
    digits.push(Math.floor(i / 10000) % 10);
    digits.push(Math.floor(i / 1000) % 10);
    digits.push(Math.floor(i / 100) % 10);
    digits.push(Math.floor(i / 10) % 10);
    digits.push(Math.floor(i % 10));

    let validNumber =
      part == 1 ? validateNumberPart1(digits) : validateNumberPart2(digits);
    if (validNumber) {
      numberOfValidPasswords++;
    }
  }

  return numberOfValidPasswords;
}

function validateNumberPart1(digits) {
  let isConsecutive = false;
  let isAssending = true;

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] == digits[i + 1]) {
      isConsecutive = true;
    }
  }

  for (let j = 0; j < digits.length; j++) {
    if (digits[j] > digits[j + 1]) {
      isAssending = false;
    }
  }

  return isConsecutive && isAssending;
}

function validateNumberPart2(digits) {
  let isConsecutive = false;
  let isAssending = true;

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] == digits[i + 1]) {
      if (!digits[i + 2] || (digits[i + 2] && digits[i] != digits[i + 2])) {
        if (!digits[i - 1] || (digits[i - 1] && digits[i] != digits[i - 1])) {
          isConsecutive = true;
        }
      }
    }
  }

  for (let j = 0; j < digits.length; j++) {
    if (digits[j] > digits[j + 1]) {
      isAssending = false;
    }
  }

  return isConsecutive && isAssending;
}

console.log(
  'The answer to part 1 is: ' + returnNumberOfValidPasswords(367479, 893698, 1)
);
console.log(
  'The answer to part 2 is: ' + returnNumberOfValidPasswords(367479, 893698, 2)
);
