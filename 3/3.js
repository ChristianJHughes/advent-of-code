// NOTE: The entire grid is modeled in memory as a two-dimensional array. It can become very large. At 20000x20000, it's 400 million elements. Modeling the entire grid in memory like this is not space effecient, there are undoubtably optimizations. It has the benefit of being easy to understand, and supporting n number of wires.
//
// The Heap size may need to be increased to support large grids:
// `node --max-old-space-size=8192 3.js`

var fs = require('fs');

var fileContent = fs.readFileSync(process.argv[2] || 'input.txt', 'utf8');
let wires = fileContent.split('\n');

// Assume we 20000 x 20000 grid provides enough memory.
const GRID_SIZE = 20000;

function initializeGrid(size) {
  let grid = new Array(size);

  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(size).fill('');
  }
  return grid;
}

function solvePart1(wires) {
  let grid = initializeGrid(GRID_SIZE);
  const gridCenter = Math.floor(grid.length / 2);

  let coordinate;
  let wireX;
  let wireY;
  let steps;

  for (let wireNumber = 0; wireNumber < wires.length; wireNumber++) {
    wire = wires[wireNumber].split(',').map((el) => {
      return {
        direction: el.substring(0, 1),
        distance: parseInt(el.substring(1))
      };
    });

    wireX = gridCenter;
    wireY = gridCenter;
    steps = 0;

    for (const path of wire) {
      for (let dist = 1; dist <= path.distance; dist++) {
        switch (path.direction) {
          case 'R':
            wireX = wireX + 1;
            break;
          case 'L':
            wireX = wireX - 1;
            break;
          case 'D':
            wireY = wireY + 1;
            break;
          case 'U':
            wireY = wireY - 1;
            break;
        }
        steps++;
        coordinate = grid[wireX][wireY];
        let coordinateData = {};
        if (coordinate !== '' && coordinate.number !== wireNumber) {
          coordinateData = {
            number: wireNumber,
            intersection: true,
            steps: coordinate.steps + steps
          };
          grid[wireX][wireY] = coordinateData;
        } else if (coordinate.number !== wireNumber) {
          coordinateData = {
            number: wireNumber,
            intersection: false,
            steps: steps
          };
          grid[wireX][wireY] = coordinateData;
        }
      }
    }
  }

  return findClosestIntersection(grid, gridCenter);
}

// This is brute-force searching for every intersection. There are better ways.
function findClosestIntersection(grid, gridCenter) {
  let closestIntersectionManhattan;
  let closestIntersectionSteps = 0;
  let xDist;
  let yDist;

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
      if (grid[i][j] !== '' && grid[i][j].intersection) {
        if (i < gridCenter) {
          xDist = gridCenter - i;
        } else {
          xDist = i - gridCenter;
        }

        if (j < gridCenter) {
          yDist = gridCenter - j;
        } else {
          yDist = j - gridCenter;
        }
        let manhattanDistance = xDist + yDist;

        if (
          !closestIntersectionManhattan ||
          manhattanDistance < closestIntersectionManhattan
        )
          closestIntersectionManhattan = manhattanDistance;

        if (
          closestIntersectionSteps == 0 ||
          grid[i][j].steps < closestIntersectionSteps
        ) {
          closestIntersectionSteps = grid[i][j].steps;
        }
      }
    }
  }
  return {
    closestIntersectionManhattan: closestIntersectionManhattan,
    closestIntersectionSteps: closestIntersectionSteps
  };
}

const solution = solvePart1(wires);

console.log(
  'The answer to part 1 is: ' + solution.closestIntersectionManhattan
);
console.log('The answer to part 2 is: ' + solution.closestIntersectionSteps);
