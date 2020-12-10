const { log } = require('console');
var fs = require('fs');

var fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');

let input = fileContent.split('\n');

function partOne(input) {}

function partTwo(input) {}

log('Part 1 is: ' + partOne(input));
log('Part 2 is: ' + partTwo(input));
