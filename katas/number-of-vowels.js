const VOWELS = ["a", "e", "i", "o", "u"];

const numberOfVowels = function (string) {
  let vowelCount = 0;
  for (let i = 0; i < string.length; i++) {
    const character = string[i];
    const isVowel = VOWELS.includes(character);
    if (isVowel) {
      vowelCount++;
    }
  }
  return vowelCount;
};

console.log(numberOfVowels("orange"));
console.log(numberOfVowels("lighthouse labs"));
console.log(numberOfVowels("aeiou"));
