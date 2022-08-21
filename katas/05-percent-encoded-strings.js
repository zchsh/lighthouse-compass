const urlEncode = function (text) {
  let encoded = "";
  let spacesBuffer = ""; // keeps track of spaces we might need to add
  for (var i = 0; i < text.length; i++) {
    const char = text[i];
    const isSpace = char === " ";
    // if it's a space but there are no other characters,
    // we're at the start of a string with outside whitespace.
    // ignore characters until we have a non-space character
    if (isSpace && encoded == "") {
      continue;
    }
    // if it's a space, add it to the buffer.
    // we add the spaces buffer to the string when we encounter
    // a non-space character. this prevents us from adding multiple
    // spaces to the the end of the encoded string - we only add space to the
    // string if we know there will be meaningful characters to follow.
    if (isSpace) {
      spacesBuffer += char;
      continue;
    }
    // otherwise, we have a meaningful character.
    // add the spaces buffer to the string, then clear the spaces buffer.
    encoded += spacesBuffer;
    spacesBuffer = "";
    // add the meaningful character, which for now requires no other encoding.
    encoded += char;
  }

  return encoded;
};

console.log(urlEncode("Lighthouse Labs"));
console.log(urlEncode(" Lighthouse Labs "));
console.log(urlEncode("blue is greener than purple for sure"));
