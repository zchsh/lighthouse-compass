function getMovementVector(direction, amount) {
  // Determine the direction vector
  let directionVector;
  switch (direction) {
    case "north":
      directionVector = [0, 1];
      break;
    case "south":
      directionVector = [0, -1];
      break;
    case "east":
      directionVector = [1, 0];
      break;
    case "west":
      directionVector = [-1, 0];
      break;
    default:
      throw new Error(
        `Unrecognized direction "${direction}" passed to getMovementVector. Valid options are "north", "east", "south", "west". Please provide a valid option.`
      );
  }
  // Multiply the direction vector by the amount to get the movement vector
  const [dirX, dirY] = directionVector;
  const [moveX, moveY] = [dirX * amount, dirY * amount];
  return [moveX, moveY];
}

/**
 *
 * @param {"north" | "east" | "south" | "west"} currentDirection
 * @param {"left" | "right"} turn
 * @returns
 */
function changeDirection(currentDirection, turn) {
  switch (currentDirection) {
    case "north":
      return turn == "right" ? "east" : "west";
    case "south":
      return turn == "right" ? "west" : "east";
    case "east":
      return turn == "right" ? "south" : "north";
    case "west":
      return turn == "right" ? "north" : "south";
    default:
      throw new Error(
        `Unrecognized direction "${direction}" passed to changeDirection. Valid options are "north", "east", "south", "west". Please provide a valid option.`
      );
  }
}

/**
 * Given an array of directions,
 * each of which will indicate a direction to turn towards
 * by 90˚ relative to the current position,
 * or will indicate how many units to move,
 * each representing the movement of a taxicab driver,
 *
 * and assuming a starting position of 0,0
 * and a starting direction facing north,
 * with positive y being north and positive x being east,
 *
 * Return the final position of the taxicab driver after
 * following the directions. The final position is expressed
 * with units as "blocks", and uses cardinal directions to
 * express the position relative to the origin.
 *
 * For example, the final point (x: 1, y: 3) is expressed
 * as { east: 1, north: 3 }.
 */
function blocksAway(directions) {
  // Keep track of the current position and direction
  let currentPosition = [0, 0];
  let currentDirection = "north";
  // Iterate over the steps we've been given
  for (let i = 0; i < directions.length; i++) {
    const step = directions[i];
    // Handle each of the possible step types
    if (step == "right" || step == "left") {
      // Change direction if the step is "left" or "right"
      currentDirection = changeDirection(currentDirection, step);
    } else if (typeof step == "number" && Math.abs(Math.round(step)) == step) {
      // Handle positive numbers, which we interpret as movement
      const [moveX, moveY] = getMovementVector(currentDirection, step);
      // Add the calculated movement to our current position
      const [curX, curY] = currentPosition;
      currentPosition = [curX + moveX, curY + moveY];
    } else {
      // Handle instances where we encounter steps we don't know how to follow
      throw new Error(
        `Unrecognized step "${step}". We can only handle "left", "right", and non-negative integers. Please ensure the provided array of directions is compatible.`
      );
    }
  }
  // Format the position as cardinal directions
  const [x, y] = currentPosition;
  const xName = x >= 0 ? "east" : "west";
  const yName = y >= 0 ? "north" : "south";
  const cardinalPosition = {
    [xName]: Math.abs(x),
    [yName]: Math.abs(y),
  };
  // Return the cardinal position
  return cardinalPosition;
}

console.log(blocksAway(["right", 2, "left", 3, "left", 1]));
// Note: the source page for this problem says the answer should be
// { east: 3, north: 3 }. However, we start of turning to the left,
// which represents turning west! So this case seems to
// in fact yield the final position { west: 3, north: 3}.
console.log(
  blocksAway([
    "left",
    1,
    "right",
    1,
    "left",
    1,
    "right",
    1,
    "left",
    1,
    "right",
    1,
  ])
);
console.log(blocksAway(["left", 3, "right", 1, "right", 3, "right", 1]));
