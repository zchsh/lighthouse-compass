/**
 * Given an array of arrays, representing a grid of parking spots,
 * Returns the co-ordinates of an available spot if there is one,
 * or returns false if there is no available spot.
 */
function whereCanIPark(spots, vehicle) {
  // Set up a map of possible spots for each vehicle type
  const mapVehicleToValidSpots = {
    regular: ["R"],
    small: ["S", "R"],
    motorcycle: ["S", "M", "R"],
  };
  // Get the valid spots for this vehicle type
  const validSpots = mapVehicleToValidSpots[vehicle];
  // Collect available spot co-ordinates into a flat array
  const availableSpots = [];
  // Iterate over the grid, collecting available spots
  for (let y = 0; y < spots.length; y++) {
    const spotRow = spots[y];
    for (let x = 0; x < spotRow.length; x++) {
      const spotCell = spotRow[x];
      const isAvailable = validSpots.includes(spotCell);
      if (isAvailable) {
        availableSpots.push([x, y]);
      }
    }
  }
  // Return the first available spot
  return availableSpots.length ? availableSpots[0] : false;
}

console.log(
  whereCanIPark(
    [
      // COLUMNS ARE X
      // 0    1    2    3    4    5
      ["s", "s", "s", "S", "R", "M"], // 0 ROWS ARE Y
      ["s", "M", "s", "S", "r", "M"], // 1
      ["s", "M", "s", "S", "r", "m"], // 2
      ["S", "r", "s", "m", "r", "M"], // 3
      ["S", "r", "s", "m", "r", "M"], // 4
      ["S", "r", "S", "M", "M", "S"], // 5
    ],
    "regular"
  )
);

console.log(
  whereCanIPark(
    [
      ["M", "M", "M", "M"],
      ["M", "s", "M", "M"],
      ["M", "M", "M", "M"],
      ["M", "M", "r", "M"],
    ],
    "small"
  )
);

console.log(
  whereCanIPark(
    [
      ["s", "s", "s", "s", "s", "s"],
      ["s", "m", "s", "S", "r", "s"],
      ["s", "m", "s", "S", "r", "s"],
      ["S", "r", "s", "m", "r", "s"],
      ["S", "r", "s", "m", "R", "s"],
      ["S", "r", "S", "M", "m", "S"],
    ],
    "motorcycle"
  )
);
