// define the dimensions of the donut
const R = 10;
const r = 3;

// define the center of the donut
let x = 50;
let y = 15;

// define the direction and speed of the donut movement
let dx = 1;
let dy = 1;

// define the update interval for the donut movement
const interval = 100;

// clear the screen and set the cursor to the center of the donut
process.stdout.write("\x1B[2J\x1B[H");
process.stdout.write(`\x1B[${y};${x}H`);

// create a timer to update the donut position at regular intervals
const timer = setInterval(() => {
  // erase the donut from the previous position
  process.stdout.write(`\x1B[${y - dy};${x - dx}H `);

  // update the donut position
  x += dx;
  y += dy;

  // check if the donut has reached the edge of the screen
  if (x + R >= process.stdout.columns || x - R <= 0) {
    dx *= -1;
  }
  if (y + R >= process.stdout.rows || y - R <= 0) {
    dy *= -1;
  }

  // draw the donut at the new position
  process.stdout.write(`\x1B[${y};${x}H`);
  for (let i = 0; i < process.stdout.columns; i++) {
    for (let j = 0; j < process.stdout.rows; j++) {
      // calculate the distance from the point to the center of the donut
      const d = Math.sqrt(Math.pow(i - x, 2) + Math.pow(j - y, 2));

      // check if the point is within the outer or inner circle of the donut
      if (d < R && d > r) {
        // print a "*" at the point if it is within the donut
        process.stdout.write(`\x1B[${j};${i}H*`);
      }
    }
  }
}, interval);
