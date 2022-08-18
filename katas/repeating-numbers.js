/**
 * Given an array of string values, and a joinerString with which to join them,
 *
 * Return a single string consisting of the strings in the array joined
 * together with the joinerString between each.
 *
 * @param {string[]} arrayOfStrings
 * @param {string} joinerString
 * @returns {string}
 */
function joinStrings(arrayOfStrings, joinerString) {
  // Set up a string to hold our work as we go
  let joinedString = "";
  for (let i = 0; i < arrayOfStrings.length; i++) {
    // Add each string from the array, one by one
    joinedString += arrayOfStrings[i];
    // Only add the joinerString if there's another string to join after it
    if (i < arrayOfStrings.length - 1) {
      joinedString += joinerString;
    }
  }
  // Return the joined string
  return joinedString;
}

/**
 * Given an array of two-number tuples, where the first number is the
 * number to repeat and the second number is the number of times to repeat,
 *
 * Return a string with comma-separated sections, each of which will correspond
 * to an entry in the tuples array, repeated with the given values.
 *
 * @param {[number, number][]} data
 * @returns {string}
 */
const repeatNumbers = function (data) {
  // Set up an array of string to hold our work as we go
  /** @type string[] */
  const numberStrings = [];
  // Iterate over the tuples, creating a string for each
  for (let i = 0; i < data.length; i++) {
    const [num, times] = data[i];
    let repeatedNumberString = "";
    // Repeatedly add the number to an empty string
    for (let n = 0; n < times; n++) {
      repeatedNumberString += String(num);
    }
    // Add this repeated-number-string to our array
    numberStrings.push(repeatedNumberString);
  }
  // Join the strings for each tuple with a comma and space
  const finalString = joinStrings(numberStrings, ", ");
  return finalString;
};

console.log(repeatNumbers([[1, 10]]));
console.log(
  repeatNumbers([
    [1, 2],
    [2, 3],
  ])
);
console.log(
  repeatNumbers([
    [10, 4],
    [34, 6],
    [92, 2],
  ])
);
