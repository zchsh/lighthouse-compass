/**
 * Given an array of numbers,
 * return their sum
 *
 * @param {Number[]} numbers
 * @returns
 */
function sum(numbers) {
  // return numbers.reduce((acc, n) => acc + n, 0)
  let sum = 0;
  for (let n = 0; n < numbers.length; n++) {
    sum += numbers[n];
  }
  return sum;
}

/**
 * Round a provided number to the specific number of decimal places.
 *
 * @param {*} number
 * @param {*} decimals
 */
function round(number, decimals = 0) {
  if (number == 0) return number;
  const factorOfTen = number * Math.pow(10, decimals);
  return Math.round(number * factorOfTen) / factorOfTen;
}

/**
 * Given two vectors,
 * compute their dot product.
 *
 * If the vectors are not of the same length,
 * this function will throw an error.
 *
 * @param {Number[]} vecA
 * @param {Number[]} vecB
 * @returns
 */
function dotProduct(vecA, vecB) {
  const lenA = vecA.length;
  const lenB = vecB.length;
  if (lenA !== lenB) {
    throw new Error(
      "Dot product could not be computed, as vectors had differing lengths. Please ensure both vector arguments have the same length."
    );
  }
  const products = [];
  for (let i = 0; i < lenA; i++) products.push(vecA[i] * vecB[i]);
  return sum(products);
}

/**
 * Converts degrees to radians
 *
 * @param {number} degrees
 * @returns {number} provided degrees converted to radians
 */
function radiansFromDegrees(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Given a matrix,
 * being an array of row arrays,
 * Return a array of column array.
 *
 * For example,
 * given the matrix:
 * [[ 1, 2, 3 ],
 * [ 4, 5, 6 ],
 * [ 7, 8, 9 ]]
 * will return the array of columns:
 * [[ 1, 4, 7 ],
 * [ 2, 5, 8 ],
 * [ 3, 6, 9 ]]
 *
 * @param {*} matrix
 * @returns
 */
function getMatrixColumns(matrix) {
  const columnCount = matrix[0].length;
  const columns = [];
  for (var c = 0; c < columnCount; c++) {
    columns.push(matrix.map((r) => r[c]));
  }
  return columns;
}

/**
 * Given two compatible matrices,
 * return the product of the two matrices.
 *
 * In order to be compatible,
 * the number of columns in the first matrix
 * must be equal to
 * the number of rows in the second matrix.
 *
 * @param {Number[][]} mA The first matrix
 * @param {Number[][]} mB The second matrix
 * @returns
 */
function multiplyTwoMatrices(mA, mB) {
  // validate that the number of
  // columns in mA is equal to the
  // number of rows in mB
  const columnsA = getMatrixColumns(mA);
  const columnsB = getMatrixColumns(mB);
  const rowsA = mA;
  const rowsB = mB;
  if (columnsA.length !== rowsB.length) {
    throw new Error(
      `Cannot multiply mismatched matrices: ${columnsA.length} columns in first matrix, ${rowsB.length} rows in second matrix. Ensure the first matrix argument has a number of columns equal the number of rows in the second matrix argument. Matrix multiplication is non-commutative, so re-ordering arguments cannot be done automatically.`
    );
  }
  // Multiply the matrices
  const resultRows = [];
  for (let r = 0; r < rowsA.length; r++) {
    const column = [];
    const rowA = mA[r];
    for (let c = 0; c < columnsB.length; c++) {
      const columnB = columnsB[c];
      const cell = dotProduct(rowA, columnB);
      column.push(cell);
    }
    resultRows.push(column);
  }
  return resultRows;
}

/**
 * Rotate a direction vector clockwise in 2D space,
 * by the specified number of degrees.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Rotation_matrix
 *
 * @param {[number, number]} vector
 * @param {*} degrees
 */
function rotateVectorPosition(vector, degrees) {
  // Transform the incoming [x, y] vector into a column vector we can multiply
  const [x, y] = vector;
  const columnVector = [[x], [y]];
  // Transform degrees to radians, and express as a rotation matrix
  const radians = radiansFromDegrees(degrees);
  const cosTheta = Math.cos(radians);
  const sinTheta = Math.sin(radians);
  // Note: using a clockwise rotation matrix here.
  // Counterclockwise rotation matrices seem to be more common,
  // but in this case clockwise tends to be more intuitive.
  // Reference: https://en.wikipedia.org/wiki/Rotation_matrix#Direction
  const rotationMatrix = [
    [cosTheta, sinTheta],
    [sinTheta * -1, cosTheta],
  ];
  // Multiply the columnVector by the rotationMatrix
  const resultColumnVector = multiplyTwoMatrices(rotationMatrix, columnVector);
  // Extract the resulting position vector in [x, y] format
  const [[resultX], [resultY]] = resultColumnVector;
  // Round the result, because math can be hard for computers.
  // Reference: https://en.wikipedia.org/wiki/Floating-point_arithmetic
  // Side note: I should look into https://mathjs.org/
  const [finalX, finalY] = [round(resultX, 3), round(resultY, 3)];
  return [finalX, finalY];
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
  /**
   * We can represent the directions as vectors
   * to be added to the current position during movement.
   * - "north" is [0, 1], as traveling north adds 1 unit to the y position
   * - "east" is [1, 0], as traveling east adds 1 unit to the x position
   * - "south" is [0, -1], as traveling south subtracts 1 unit from the y position
   * - "west" is [-1, 0], as traveling west subtracts 1 unit from the x position
   *
   * We use currentDirection to keep track of the current vector.
   */
  let currentPosition = [0, 0];
  let currentDirection = [0, 1];
  rotateVectorPosition(currentDirection, 90);
  // Iterate
  for (let i = 0; i < directions.length; i++) {
    const step = directions[i];
    // Handle each of the possible step types
    if (step == "right") {
      // Turning right is the same as turning 90 degrees clockwise
      currentDirection = rotateVectorPosition(currentDirection, 90);
    } else if (step == "left") {
      // Turning left is the same as turning 90 degrees counter-clockwise
      currentDirection = rotateVectorPosition(currentDirection, -90);
    } else if (
      typeof step == "number" &&
      step >= 0 &&
      Math.round(step) == step
    ) {
      // Handle positive numbers, which we interpret as movement
      // in the direction we're currently facing
      const [curX, curY] = currentPosition;
      const [dirX, dirY] = currentDirection;
      const [moveX, moveY] = [round(dirX * step, 3), round(dirY * step, 3)];
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
