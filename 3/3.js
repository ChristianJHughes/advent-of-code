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

  for (let wireNumber = 0; wireNumber < wires.length; wireNumber++) {
    wire = wires[wireNumber].split(',').map((el) => {
      return {
        direction: el.substring(0, 1),
        distance: parseInt(el.substring(1))
      };
    });

    wireX = gridCenter;
    wireY = gridCenter;

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
        coordinate = grid[wireX][wireY];
        if (coordinate !== '' && coordinate !== wireNumber) {
          grid[wireX][wireY] = 'i';
        } else {
          grid[wireX][wireY] = wireNumber;
        }
      }
    }
  }

  return findClosestIntersection(grid, gridCenter);
}

// This is brute-force searching for every intersection. There are better ways.
function findClosestIntersection(grid, gridCenter) {
  let closestIntersection;
  let xDist;
  let yDist;

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
      if (grid[i][j] == 'i') {
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

        if (!closestIntersection || manhattanDistance < closestIntersection)
          closestIntersection = manhattanDistance;
      }
    }
  }
  return closestIntersection;
}

console.log('The answer to part 1 is: ' + solvePart1(wires));
