/**
 *
 *
 * HELPERS
 *
 *
 */

/**
 * Given an array and a value,
 * Return true if the value is found in the array..
 *
 * Note: we do not traverse the whole array,
 * we exit early if we find a value.
 *
 * @param {any[]} array
 * @param {any} value
 * @returns {boolean}
 */
function arrayIncludes(array, value) {
  let isIncluded = false;
  for (let i = 0; i < array.length; i++) {
    if (value === array[i]) {
      isIncluded = true;
      break;
    }
  }
  return isIncluded;
}

const VOWELS = ["a", "e", "i", "o", "u"];
const CONSONANTS = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];

/**
 * Given a character,
 * Return true if it is a space, false otherwise.
 */
function isSpace(char) {
  return char == " ";
}

/**
 * Given a character,
 * Return true if it is a vowel, false otherwise.
 */
function isVowel(char) {
  return VOWELS.includes(char);
}

/**
 * Given a character,
 * Return true if it is a consonant, false otherwise.
 */
function isConsonant(char) {
  return CONSONANTS.includes(char);
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
 * Collapses, and optionally replaces, spaces in a string.
 */
function collapseSpaces(input, replaceStr = " ") {
  let outputString = "";
  stringParser(input, (char, lastChar) => {
    // We don't do anything unless the current character is not a space
    if (!isSpace(char)) {
      // If the last character was a space, and this character isn't,
      // we effectively collapse the previous string of 1 or more spaces
      // by adding only a single replacement character.
      if (isSpace(lastChar)) {
        outputString += replaceStr;
      }
      // We then add the current non-space character to the output string.
      outputString += char;
    }
  });
  return outputString;
}

/**
 *
 *
 * SPECIFIC CASING FUNCTIONS
 *
 *
 */

/**
 * A string representing a type of case transformation.
 * @typedef {("camel"|"pascal"|"snake"|"kebab"|"title"|"lower"|"upper"|"vowel"|"consonant")} CaseType
 */

/**
 * Transform the input string to camelCase
 */
function camelCase(input) {
  let outputString = "";
  // Parse each character, adding to the output string
  stringParser(input, (char, lastChar) => {
    const shouldCapitalize = isSpace(lastChar);
    outputString += shouldCapitalize ? char.toUpperCase() : char;
  });
  // Return the output string
  return collapseSpaces(outputString, "");
}

/**
 * Transform the input string to pascalCase
 */
function pascalCase(input) {
  let outputString = "";
  // Parse each character, adding to the output string
  stringParser(input, (char, lastChar) => {
    const shouldCapitalize = lastChar == null || isSpace(lastChar);
    outputString += shouldCapitalize ? char.toUpperCase() : char;
  });
  // Return the output string
  return collapseSpaces(outputString, "");
}

/**
 * Transform the input string to kebabCase
 */
function snakeCase(input) {
  return lowerCase(collapseSpaces(input, "_"));
}

/**
 * Transform the input string to kebabCase
 */
function kebabCase(input) {
  return lowerCase(collapseSpaces(input, "-"));
}

/**
 * Transform the input string to titleCase
 */
function titleCase(input) {
  let outputString = "";
  // Parse each character, adding to the output string
  stringParser(input, (char, lastChar) => {
    const shouldCapitalize = lastChar == null || isSpace(lastChar);
    outputString += shouldCapitalize ? char.toUpperCase() : char;
  });
  // Return the output string
  return outputString;
}

/**
 * Transform the input string to lowerCase
 */
function lowerCase(input) {
  return input.toLowerCase();
}

/**
 * Transform the input string to upperCase
 */
function upperCase(input) {
  return input.toUpperCase();
}

/**
 * Transform the input string to vowelCase
 */
function vowelCase(input) {
  let outputString = "";
  stringParser(input, (char) => {
    const shouldCapitalize = isVowel(char);
    outputString += shouldCapitalize ? char.toUpperCase() : char;
  });
  // Return the output string
  return outputString;
}

/**
 * Transform the input string to consonantCase
 */
function consonantCase(input) {
  let outputString = "";
  stringParser(input, (char) => {
    const shouldCapitalize = isConsonant(char);
    outputString += shouldCapitalize ? char.toUpperCase() : char;
  });
  // Return the output string
  return outputString;
}

/**
 *
 *
 *
 * COMBINED SOLUTION
 *
 *
 *
 */

/**
 * Given a caseType,
 *
 * Return an integer representing the precedence it should take
 * over other caseType transformations. Lower values come first.
 *
 * @param {CaseType} caseType
 */
function getCaseTypeRank(caseType) {
  if (arrayIncludes(["camel", "pascal", "snake", "kebab", "title"], caseType)) {
    return 1;
  } else if (arrayIncludes(["lower", "upper"], caseType)) {
    return 2;
  } else if (arrayIncludes(["vowel", "consonant"], caseType)) {
    return 3;
  }
}

/**
 * Given an array of case types,
 * Return these case types sorted by their precedence.
 *
 * @param {CaseType[]} caseTypes
 */
function sortCaseTypes(caseTypes) {
  return caseTypes.sort((a, b) => {
    const aRank = getCaseTypeRank(a);
    const bRank = getCaseTypeRank(b);
    // Return value based on precedence. Lower precedence values come first.
    const sortAThenB = aRank < bRank;
    const sortBThenA = bRank < aRank;
    return sortAThenB ? -1 : sortBThenA ? 1 : 0;
  });
}

/**
 * Given an input string, and either a single caseType or array of caseTypes,
 * apply the specific casing transformation(s) to the string, and
 * Return the transformed string.
 *
 * @param {string} input the input string
 * @param {CaseType | CaseType[]} rawCase
 */
const makeCase = function (input, rawCase) {
  // Normalize our input to an array of case types to output.
  const caseTransforms = typeof rawCase == "string" ? [rawCase] : rawCase;
  // Sort the case types by precedence.
  const sortedCaseTransforms = sortCaseTypes(caseTransforms);
  // Iterate over each case type.
  let output = input;
  for (let i = 0; i < sortedCaseTransforms.length; i++) {
    switch (sortedCaseTransforms[i]) {
      case "camel":
        output = camelCase(output);
        break;
      case "pascal":
        output = pascalCase(output);
        break;
      case "snake":
        output = snakeCase(output);
        break;
      case "kebab":
        output = kebabCase(output);
        break;
      case "title":
        output = titleCase(output);
        break;
      case "vowel":
        output = vowelCase(output);
        break;
      case "consonant":
        output = consonantCase(output);
        break;
      case "upper":
        output = upperCase(output);
        break;
      case "lower":
        output = lowerCase(output);
        break;
    }
  }
  // Return the transformed output
  return output;
};

console.log(makeCase("this is a string", "camel"));
console.log(makeCase("this is a string", "pascal"));
console.log(makeCase("this is a string", "snake"));
console.log(makeCase("this is a string", "kebab"));
console.log(makeCase("this is a string", "title"));
console.log(makeCase("this is a string", "vowel"));
console.log(makeCase("this is a string", "consonant"));
console.log(makeCase("this is a string", ["upper", "snake"]));
