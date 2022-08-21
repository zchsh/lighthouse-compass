/**
 * Encode a message by transforming it into a grid, then reading
 * the grid column-by-column rather than row-by-row.
 *
 * The column count of the grid will be equal to the ceiling
 * of the square root of the length of the message without spaces.
 *
 * @param {*} message
 * @returns
 */
function squareCode(message) {
  // Remove spaces from the string, treat the filtered string as our source.
  //
  // Side note: this unfortunately makes it hard for us to decode the message
  // using this same function. If we didn't filter spaces here, and we didn't
  // add spaces after each column later in this function, we would have
  // a squareCode function that could be used for both encoding and decoding.
  let sourceString = "";
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    if (char !== " ") {
      sourceString += char;
    }
  }
  // Determine the square root of the message length,
  // use that to determine the column and row count of our imagined grid
  const colsCount = Math.ceil(Math.sqrt(sourceString.length));
  const rowsCount = Math.ceil(sourceString.length / colsCount);
  // To step through a grid normally, rows-first,
  // we'd do `y` from `0 ... rowsCount` in the outer for loop, and
  // we'd do `x` from `0 ... colsCount` in the inner for loop.
  // By switching the inner and outer for loops, we run down the columns first.
  let transformedMessage = "";
  for (let x = 0; x < colsCount; x++) {
    for (let y = 0; y < rowsCount; y++) {
      /**
       * When we imaging laying our string out in a grid,
       * we want to jump to the (y * colsCount) character to get
       * the first character in a row. To get a specific character in that row,
       * we add the x position.
       */
      const targetCharIdx = y * colsCount + x;
      /**
       * If our string length does not divide evenly by its square root,
       * which will happen a lot, we'll end up trying to access a character
       * in the string that doesn't exist. We protect against this.
       */
      if (targetCharIdx < sourceString.length) {
        transformedMessage += sourceString[targetCharIdx];
      }
      /**
       * If the targeted character was the last character in a "column",
       * we want to add a space for some reason.
       */
      const isLastColumn = y == rowsCount - 1;
      const isLastRow = x == colsCount - 1;
      if (isLastColumn && !isLastRow) {
        transformedMessage += " ";
      }
    }
  }
  // Return the transformed message
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
