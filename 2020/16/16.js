const { log } = require('console');
var fs = require('fs');

let fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');

let input = fileContent.split('\n');

function partOne(input) {
  let line = 0;
  let fields = {};
  let myTicket = [];
  let nearbyTickets = [];
  let ticketScanningErrorRate = 0;

  while (input[line] != '') {
    let field = input[line].split(':')[0];
    let range = input[line].split(':')[1].trim();
    fields[field] = range;
    line++;
  }

  line++;

  line++; // Skip 'Your ticket:' lin
  while (input[line] != '') {
    myTicket = input[line].split(',').map((x) => parseInt(x));
    line++;
  }

  line++;

  line++; // Skip 'Nearby Tickets:' lin
  while (line != input.length) {
    nearbyTickets.push(input[line].split(',').map((x) => parseInt(x)));
    line++;
  }

  nearbyTickets.forEach((ticket) => {
    ticket.forEach((ticketField) => {
      let fieldIsValid = false;
      for (const fieldName in fields) {
        let ranges = fields[fieldName].split('-');
        let rangeOneBottom = parseInt(ranges[0]);
        let rangeOneTop = parseInt(ranges[1].split(' ')[0]);
        let rangeTwoBottom = parseInt(ranges[1].split(' ')[2]);
        let rangeTwoTop = parseInt(ranges[2]);

        let inRangeOne =
          ticketField >= rangeOneBottom && ticketField <= rangeOneTop;
        let inRangeTwo =
          ticketField >= rangeTwoBottom && ticketField <= rangeTwoTop;

        if (inRangeOne || inRangeTwo) {
          fieldIsValid = true;
        }
      }

      if (!fieldIsValid) {
        ticketScanningErrorRate += ticketField;
      }
    });
  });

  return ticketScanningErrorRate;
}

function partTwo(input) {
  let line = 0;
  let fields = {};
  let myTicket = [];
  let nearbyTickets = [];
  let ticketScanningErrorRate = 0;

  while (input[line] != '') {
    let field = input[line].split(':')[0];
    let range = input[line].split(':')[1].trim();
    fields[field] = range;
    line++;
  }
  line++;

  line++; // Skip 'Your ticket:' lin
  while (input[line] != '') {
    myTicket = input[line].split(',').map((x) => parseInt(x));
    line++;
  }
  line++;

  line++; // Skip 'Nearby Tickets:' lin
  while (line != input.length) {
    nearbyTickets.push(input[line].split(',').map((x) => parseInt(x)));
    line++;
  }

  let validTickets = [];

  nearbyTickets.forEach((ticket, ticketIndex) => {
    let fieldIsValid = false;
    let anyFieldIsInvalid = false;
    ticket.forEach((ticketField) => {
      fieldIsValid = false;
      for (const fieldName in fields) {
        let ranges = fields[fieldName].split('-');
        let rangeOneBottom = parseInt(ranges[0]);
        let rangeOneTop = parseInt(ranges[1].split(' ')[0]);
        let rangeTwoBottom = parseInt(ranges[1].split(' ')[2]);
        let rangeTwoTop = parseInt(ranges[2]);

        let inRangeOne =
          ticketField >= rangeOneBottom && ticketField <= rangeOneTop;
        let inRangeTwo =
          ticketField >= rangeTwoBottom && ticketField <= rangeTwoTop;

        if (inRangeOne || inRangeTwo) {
          fieldIsValid = true;
        }
      }

      if (!fieldIsValid) {
        anyFieldIsInvalid = true;
        ticketScanningErrorRate += ticketField;
      }
    });
    if (!anyFieldIsInvalid) validTickets.push(ticket);
  });

  let departureFieldProduct = 1;
  let validIndexesForField = {};

  // Part 2
  for (const fieldName in fields) {
    let ranges = fields[fieldName].split('-');
    let rangeOneBottom = parseInt(ranges[0]);
    let rangeOneTop = parseInt(ranges[1].split(' ')[0]);
    let rangeTwoBottom = parseInt(ranges[1].split(' ')[2]);
    let rangeTwoTop = parseInt(ranges[2]);

    let validForAllTickets = true;

    for (let i = 0; i < validTickets[0].length; i++) {
      validForAllTickets = true;
      validTickets.forEach((ticket) => {
        let inRangeOne =
          ticket[i] >= rangeOneBottom && ticket[i] <= rangeOneTop;
        let inRangeTwo =
          ticket[i] >= rangeTwoBottom && ticket[i] <= rangeTwoTop;

        if (!(inRangeOne || inRangeTwo)) {
          validForAllTickets = false;
        }
      });

      if (validForAllTickets) {
        if (validIndexesForField[fieldName]) {
          validIndexesForField[fieldName].push(i);
        } else {
          validIndexesForField[fieldName] = [];
        }
      }
    }
  }

  for (let i = 0; i < 20; i++) {
    for (const fieldName in validIndexesForField) {
      if (validIndexesForField[fieldName].length == 1) {
        let indexForField = validIndexesForField[fieldName];

        if (fieldName.includes('departure')) {
          departureFieldProduct *= myTicket[indexForField];
        }

        for (const fieldName in validIndexesForField) {
          validIndexesForField[fieldName] = validIndexesForField[
            fieldName
          ].filter((x) => x != indexForField);
        }
      }
    }
  }

  return departureFieldProduct;
}

log('Part 1 is: ' + partOne(input));
log('Part 2 is: ' + partTwo(input));
