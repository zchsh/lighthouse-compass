/**
 *
 *
 *
 * REBUILDING BUILT-INS
 *
 *
 *
 */

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
function arrayJoin(arrayOfStrings, joinerString = "") {
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
 * Given an array, and a start and optional end index to slice,
 * Return the sliced portion of the array.
 *
 * If no end index is provided, the array will be sliced
 * from the start index until the end of the array.
 *
 * @param {array} array
 * @param {number} firstIdx
 * @param {number} lastIdx
 * @returns {array}
 */
function arraySlice(array, firstIdx, lastIdx = array.length - 1) {
  const result = [];
  for (var i = firstIdx; i <= lastIdx; i++) {
    result.push(array[i]);
  }
  return result;
}

/**
 * Iterate character-by-character over a string,
 * handling each character with callback function.
 */
function stringParser(input, callback) {
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const lastChar = i > 0 ? input[i - 1] : null;
    callback(char, lastChar);
  }
}

/**
 * Given a string to search and replace in,
 * a target string to search for,
 * and a replace string to replace the target string with,
 *
 * Return the original string with all instances
 * of the targetString replaced by replaceString.
 *
 * @param {*} input
 * @param {*} targetString
 * @param {*} replaceString
 */
function stringReplace(input, targetString, replaceString) {
  let resultString = "";
  let characterBuffer = [];
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    // We always push this character to the buffer
    characterBuffer.push(char);
    // If our character buffer is long enough to compare to our target string,
    // then we're ready to add characters from our buffer to the resul.
    // to be worth comparing to our target string, then we move on.
    if (characterBuffer.length == targetString.length) {
      if (arrayJoin(characterBuffer) == targetString) {
        // If our character buffer yields our target string,
        // then add the replaceString to our result.
        // We can also clear our characterBuffer, since we've handled
        // all the characters in it by replacing them.
        resultString += replaceString;
        characterBuffer = [];
      } else {
        // Otherwise, we know:
        // - the characterBuffer does not match our targetString
        // - the first character in the characterBuffer has already been
        //   compared in all possible positions to match the targetString,
        //   so is not going to be part of a match.
        // So, we can grab the first character off our characterBuffer,
        // and add that to the resultString.
        resultString += characterBuffer[0];
        // We slice that first character off our buffer. The remaining
        // characters need to stick around in our buffer, as they could be
        // the first character in a future match of our targetString.
        characterBuffer = arraySlice(characterBuffer, 1);
      }
    }
  }
  // If we have buffer left, add it to the end of our string
  if (characterBuffer.length) {
    resultString += arrayJoin(characterBuffer);
  }
  // Return the resultString
  return resultString;
}

/**
 * Split a single string into an array of strings, known as "words",
 * splitting along the provided splitCharacter.
 *
 * If no splitCharacter is provided, the string is split on spaces.
 * Note that splitCharacters are collapsed.
 *
 * @param {string} text
 * @returns {string[]}
 */
function stringSplit(input, splitCharacter) {
  const words = [];
  let currentWord = "";
  stringParser(input, (char, lastChar) => {
    // We don't do anything unless the current character is not a split char
    if (char !== splitCharacter) {
      // If the last character was a space, and this character isn't,
      // we effectively collapse the previous string of 1 or more spaces
      // by adding only a single replacement character.
      if (lastChar === splitCharacter) {
        words.push(currentWord);
        currentWord = "";
      }
      // We then add the current non-space character to the output string.
      currentWord += char;
    }
  });
  // At the end of parsing, we might have some characters in our currentWord
  // buffer. If we do, we should add them as another word.
  if (currentWord.length > 0) {
    words.push(currentWord);
  }
  return words;
}

/**
 *
 *
 *
 * THE IMPLEMENTATION
 *
 *
 *
 */

const urlDecode = function (text) {
  const decoded = {};
  const words = stringSplit(text, "&");
  for (var i = 0; i < words.length; i++) {
    const [key, value] = stringSplit(words[i], "=");
    decoded[key] = stringReplace(value, "%20", " ");
  }
  return decoded;
};

console.log(urlDecode("duck=rubber"));
console.log(urlDecode("bootcamp=Lighthouse%20Labs"));
console.log(urlDecode("city=Vancouver&weather=lots%20of%20rain"));
console.log(urlDecode("city=Vancouver&weather=lots%20of%20rain").weather);
