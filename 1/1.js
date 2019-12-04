var fs = require('fs');

var fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');

const moduleMasses = fileContent.split('\n');

let fuelSum = 0;
let recurssiveFuelSum = 0;

function getFuelFromMass(mass, nestedFuel) {
  let fuelSum = Math.floor(mass / 3) - 2;

  if (nestedFuel) {
    if (fuelSum > 0) {
      fuelSum += getFuelFromMass(fuelSum, true);
    }
  }

  return fuelSum > 0 ? fuelSum : 0;
}

for (const mass of moduleMasses) {
  fuelSum += getFuelFromMass(mass, false);
  recurssiveFuelSum += getFuelFromMass(mass, true);
}

console.log('Part 1 Mass is: ' + fuelSum);
console.log('Part 2 Mass is: ' + recurssiveFuelSum);
