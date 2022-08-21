const camelCase = function (input) {
  let camelCased = "";
  let capitalizeNextChar = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const isSpace = char === " ";
    if (isSpace) {
      // For spaces, capitalize the next character, and skip adding the space
      capitalizeNextChar = true;
    } else {
      // For non-space characters, add the character to the output
      const charToAdd = capitalizeNextChar ? char.toUpperCase() : char;
      camelCased += charToAdd;
      capitalizeNextChar = false;
    }
  }
  return camelCased;
};

console.log(camelCase("this is a string"));
console.log(camelCase("loopy lighthouse"));
console.log(camelCase("supercalifragalisticexpialidocious"));
