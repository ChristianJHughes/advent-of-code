// I wrote this junk at 2 AM, I'll clean it up later.

const { log } = require("console");
var fs = require("fs");

var fileContent = fs.readFileSync(process.argv[2] || "input.txt", "utf8");

const bags = fileContent.split("\n");

function Bag(color, contains) {
  this.color = color;
  this.bags = contains;
}

function partOne(bags) {
  let parsedBags = [];

  bags.forEach((bag) => {
    if (!bag) return;

    let color = bag.substring(0, bag.indexOf("bags")).trim();
    let otherBags = bag.substring(bag.indexOf("contain") + 8);
    otherBags = otherBags.slice(0, -1); // remove period
    otherBags = otherBags.split(", ");

    if (otherBags[0] == "no other bags") {
      let tempBag = new Bag(color, []);
      parsedBags.push(tempBag);
    } else {
      otherBags = otherBags.map((bags) => ({
        quantity: bags.trim()[0],
        color: bags.substring(2).replace("bags", "").replace("bag", "").trim(), // Should be a regex.
      }));
      let tempBag = new Bag(color, otherBags);
      parsedBags.push(tempBag);
    }
  });

  // let shinyGoldBags = getBagsThatCanContainMe(parsedBags, "shiny gold");
  // return new Set(shinyGoldBags.filter((bag) => bag.color)).size;
  let shinyGoldBags = getQuantityOfBagsInsideOfMe(parsedBags, "shiny gold");
  log(shinyGoldBags);
  // return new Set(shinyGoldBags.filter((bag) => bag.color)).size;
}

// This is not effecient. I would have created a binary tree given the time, rather then do this kind of search.
function getBagsThatCanContainMe(bags, color) {
  let bagsThatCanContainMe = [];
  bags.forEach((bag) => {
    if (bag.bags.some((e) => e.color == color)) bagsThatCanContainMe.push(bag);
  });

  if (!bagsThatCanContainMe) {
    return bagsThatCanContainMe;
  } else {
    bagsThatCanContainMe.forEach((bag) => {
      bagsThatCanContainMe = bagsThatCanContainMe.concat(
        getBagsThatCanContainMe(bags, bag.color)
      );
    });
    return bagsThatCanContainMe;
  }
}

function getQuantityOfBagsInsideOfMe(bags, color) {
  let bagsInsideOfMe = [];
  let quantityOfBagsInsideOfMe = 1;

  let bagObj = bags.filter((bag) => {
    return bag.color === color;
  });

  log(bagObj);

  // Add quanitity
  // bagObj[0].bags.forEach((bag) => quantityOfBagsInsideOfMe);

  bagObj[0].bags.forEach((currentBag) => {
    bagsInsideOfMe.push({
      bag: bags.filter((bag) => {
        return bag.color === currentBag.color;
      })[0],
      quantity: currentBag.quantity,
    });
  });

  if (!bagsInsideOfMe) {
    return 1;
  } else {
    bagsInsideOfMe.forEach((bag) => {
      log(bag.quantity);
      quantityOfBagsInsideOfMe +=
        (bag.quantity || 1) * getQuantityOfBagsInsideOfMe(bags, bag.bag.color);
    });
    return quantityOfBagsInsideOfMe - 1;
  }
}

function partTwo(bags) {}

log(partOne(bags));
// log(partTwo(answers));
