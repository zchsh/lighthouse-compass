/**
 * Given a string,
 * Return the string with all spaces removed.
 *
 * @param {string} string
 * @returns
 */
function removeCharacters(string, targetChar) {
  let filtered = "";
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char !== targetChar) {
      filtered += char;
    }
  }
  return filtered;
}

/**
 * Given a string, and a columnCount,
 * Return an array of arrays representing a grid of the string's characters.
 *
 * Each row in the grid will have a length of columnCount,
 * and the number of rows will be sufficient to capture all characters.
 *
 * Note: The final row in the grid may be short, if the string.length is not
 * evenly divisible by "columnCount".
 */
function stringToGrid(message, columnCount) {
  const grid = [];
  for (var i = 0; i < message.length; i++) {
    const char = message[i];
    /**
     * x (the column we're pulling from) changes every iteration.
     * It keeps going (0, 1, 2, .. columnCount) & repeating back from 0 again.
     */
    const x = i % columnCount;
    /**
     * y (the "row" we're pulling from") should be 0 for the first few loops
     * as we work through the first row. It should increase once after
     * every "columnCount" iterations.
     */
    const y = Math.floor(i / columnCount);
    /**
     * We make sure we have a row to push to in the grid
     */
    if (!grid[y]) {
      grid[y] = [];
    }
    /**
     * We push our message character, at this co-ordinate, into the grid
     */
    grid[y][x] = char;
  }
  return grid;
}

/**
 * Given a grid, being an array of rows, and each row being an array of columns,
 * and given an optional rowSeparator character
 *
 * Return a string representing all of the characters in the grid
 * reading from left to right through each row,
 * adding the rowSeparator character (if provided) after each row.
 *
 * @param {*} grid
 * @param {*} rowSeparator
 * @returns
 */
function gridToString(grid, rowSeparator = "") {
  let string = "";
  // Determine the row and column count of the existing grid.
  // Note that we expect the first row to accurate reflect column count.
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  // Build the inverted grid
  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < columnCount; x++) {
      const char = grid[y][x];
      string += char || "";
    }
    // At the end of each row, except the last row,
    // add a row separator
    if (y < rowCount - 1) {
      string += rowSeparator;
    }
  }
  // Return the inverted grid
  return string;
}

/**
 * Given a grid, being an array of rows, and each row being an array of columns,
 * Return the same grid but flipped both horizontally and vertically,
 * with each (x,y) cell from the original grid now located at (y,x).
 *
 * Note that, given an original grid with X columns and Y row,
 * the result grid will have Y rows and X columns.
 *
 * @param {any[][]} grid
 * @returns {any[][]}
 */
function invertGrid(grid) {
  // Determine the row and column count of the existing grid.
  // Note that we expect the first row to accurate reflect column count.
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  // Build the inverted grid
  const invertedGrid = [];
  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < columnCount; x++) {
      const char = grid[y][x];
      /**
       * We make sure we have a row to push to in the grid.
       * Note that we've inverted things here, we've switched x and y.
       */
      if (!invertedGrid[x]) {
        invertedGrid[x] = [];
      }
      /**
       * We push our message character, at this co-ordinate, into the grid.
       * Note that we've inverted things here, we've switched x and y.
       */
      invertedGrid[x][y] = char;
    }
  }
  // Return the inverted grid
  return invertedGrid;
}

/**
 * Encode a message by transforming it into a grid, then reading
 * the grid column-by-column rather than row-by-row.
 *
 * The column count of the grid will be equal to the ceiling
 * of the square root of the length of the message without spaces.
 *
 * @param {*} message
 * @param {*} options
 * @returns
 */
function squareCode(message, options = {}) {
  // Allow use of some options
  const verbose = options.verbose || false;
  // Remove spaces from the string, treat the filtered string as our source
  const preparedMsg = removeCharacters(message, " ");
  // Determine the square root of the message length,
  // use that to determine the column and row count of our imagined grid
  const columnCount = Math.ceil(Math.sqrt(preparedMsg.length));
  // Transform the message into a grid.
  const messageGrid = stringToGrid(preparedMsg, columnCount);
  if (verbose) {
    logOutGrid(messageGrid);
  }
  // Invert the grid
  const invertedGrid = invertGrid(messageGrid);
  if (verbose) {
    logOutGrid(invertedGrid);
  }
  // Transform the inverted grid back into a string.
  // If we're encrypting & not preserving spaces, we separate rows with spaces
  const transformedMessage = gridToString(invertedGrid, " ");
  // Return the encrypted message
  return transformedMessage;
}

console.log(squareCode("chill out"));
console.log(squareCode("feed the dog"));
console.log(squareCode("have a nice day"));
console.log(
  squareCode(
    "if man was meant to stay on the ground god would have given us roots"
  )
);

/**
 * Given a grid of strings,
 * Log them out in a pretty way.
 */
function logOutGrid(grid, emptyCellChar = " ") {
  // Terminal colors
  const C = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    dim: "\x1b[2m",
  };
  // Rrow and column divider characters
  const rowDivChar = "-";
  const colDivChar = `${C.dim}|${C.reset}`;
  // Determine the column count of grid.
  // Note that we expect the first row to accurate reflect column count.
  // We use this to fill in empty cells so that the grid looks pretty.
  const columnCount = grid[0].length;
  // Build strings for each row
  const rowStrings = grid.map((row) => {
    const paddedRow = row.slice(0);
    // Pad row with empty cells
    const missingCellCount = columnCount - row.length;
    for (var c = 0; c < missingCellCount; c++) {
      paddedRow.push(null);
    }
    // Build a string for the row
    let rowString = ``;
    rowString += `${colDivChar} `;
    rowString += paddedRow
      .map((char) => `${C.blue}${char || emptyCellChar}${C.reset}`)
      .join(` ${colDivChar} `);
    rowString += ` ${colDivChar}`;
    return rowString;
  });
  // Build a divider line, to break up the rows
  const rowLength = columnCount * 4 + 1;
  let rowDiv = `${C.dim}`;
  for (var i = 0; i < rowLength; i++) {
    rowDiv += rowDivChar;
  }
  rowDiv += `${C.reset}`;
  // Combine the row strings and divider lines for a pretty table
  let msg = "\n";
  msg += rowStrings.map((rowString) => `${rowDiv}\n${rowString}`).join("\n");
  msg += `\n${rowDiv}\n`;

  // Log it out
  console.log(msg);
}
