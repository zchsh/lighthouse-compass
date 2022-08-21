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
 * Given a string encoded with squareCode,
 * with divider characters inserted at the end of each row,
 * Return the string with divider characters removed.
 *
 * @param {string} string
 * @returns
 */
function removeDividers(string, dividerString, emptyCellChar) {
  const parts = string.split(dividerString);
  const columnCount = parts[0].length;
  return parts
    .map((part) => {
      let paddedPart = part;
      const missingChars = columnCount - part.length;
      for (let i = 0; i < missingChars; i++) {
        paddedPart += emptyCellChar;
      }
      return paddedPart;
    })
    .join("");
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
 *
 * @param {*} sourceString
 * @param {*} columnCount
 * @param {*} rowCount
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
 * @param {*} mode
 * @returns
 */
function squareCode(message, mode = "encrypt", options = {}) {
  // Parse options
  const defaultOptions = {
    preserveSpaces: false,
    /**
     * dividerString should not be a space if preserveSpaces is true.
     */
    dividerString: " ",
    /**
     * emptyCellChar should be a character not used in the message,
     * and should also not be the same as dividerString.
     */
    emptyCellChar: "#",
  };
  const preserveSpaces =
    options.preserveSpaces || defaultOptions.preserveSpaces;
  const dividerString =
    typeof options.dividerString == "string"
      ? options.dividerString
      : defaultOptions.dividerString;
  const emptyCellChar = options.emptyCellChar || defaultOptions.emptyCellChar;
  const isDecryptMode = mode == "decrypt";
  console.log(`message: "${message}"`);
  // Remove divider strings from the string
  const messageNoDividers = isDecryptMode
    ? removeDividers(message, dividerString, emptyCellChar)
    : message;
  // Remove spaces from the string, treat the filtered string as our source
  const sourceString = preserveSpaces
    ? messageNoDividers
    : removeCharacters(messageNoDividers, " ");
  // Determine the square root of the message length,
  // use that to determine the column and row count of our imagined grid
  const columnCount = Math.ceil(Math.sqrt(sourceString.length));
  const rowCount = Math.ceil(sourceString.length / columnCount);
  // Transform the message into a grid
  // Note that if we're decrypting, we use the expected rowCount,
  // since we'll be inverting our grid.
  const gridColumnCount = mode === "decrypt" ? rowCount : columnCount;
  const messageGrid = stringToGrid(sourceString, gridColumnCount);
  logOutGrid(messageGrid);
  // Invert the grid
  const invertedGrid = invertGrid(messageGrid);
  logOutGrid(invertedGrid, emptyCellChar);
  // Transform the inverted grid back into a string, separating rows with spaces
  const transformDividerString = isDecryptMode ? "" : dividerString;
  const transformedMessage = gridToString(invertedGrid, transformDividerString);
  // There is a (maybe?) more efficient way to run the message-grid-invert-grid
  // operation, but I find it to be less confusing. So I've commented it out.
  const efficientlyTransformedMessage = stringGridInversion(
    sourceString,
    isDecryptMode ? rowCount : columnCount,
    isDecryptMode ? columnCount : rowCount,
    isDecryptMode ? "" : dividerString
  );
  console.log({ efficientlyTransformedMessage, transformedMessage });
  // Return the encrypted message
  return removeCharacters(transformedMessage, emptyCellChar);
}

const TEST_CASES = [
  "chill out",
  "feed the dog",
  "have a nice day",
  "if man was meant to stay on the ground god would have given us roots",
];

TEST_CASES.forEach((message) => {
  const options = {
    preserveSpaces: true,
    dividerString: "|",
  };
  const encrypted = squareCode(message, "encrypt", options);
  const decrypted = squareCode(encrypted, "decrypt", options);
  console.log({ encrypted, decrypted });
});

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

/**
 * Given a string, as well as a columnCount and rowCount
 * and imagining the characters of that string in a grid with
 * columnCount columns and rowCount rows,
 *
 * Return a string which represents the column-first traversal
 * of the imagined grid, with spaces at the end of each column.
 *
 * This is a slightly more efficient implementation of doing the same
 * in multiple steps.
 *
 * @param {*} sourceString
 * @param {*} columnCount
 * @param {*} rowCount
 * @returns
 */
function stringGridInversion(
  sourceString,
  columnCount,
  rowCount,
  dividerCharacter = ""
) {
  let encryptedMessage = "";
  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      /**
       * We translate the "x, y" co-ordinate into an index in our string,
       * when it's layed out in our imagined square.
       */
      const targetCharIdx = y * columnCount + x;
      /**
       * We will only be able to fill every column in every row
       * if our number divides evenly by its rounded square root.
       * This isn't guaranteed, so if we tried accessing every (x,y) position,
       * we might end up accessing an out-of-bounds character.
       *
       * We check that there is an in-bounds character in our sourceString
       * before proceeding.
       */
      if (targetCharIdx < sourceString.length) {
        // We know the character is in bounds, so we access it
        const targetCharacter = sourceString[targetCharIdx];
        encryptedMessage += targetCharacter;
      }
      /**
       * If the targeted character was the last character in a "column",
       * then add the divider character, if any.
       */
      const isLastColumn = y == rowCount - 1;
      const isLastRow = x == columnCount - 1;
      if (isLastColumn && !isLastRow) {
        encryptedMessage += dividerCharacter;
      }
    }
  }
  return encryptedMessage;
}
