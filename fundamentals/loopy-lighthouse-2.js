function loopyLighthouse(range, multiples, words) {
  // Destructure input
  const [minValue, maxValue] = range;
  const [multiple1, multiple2] = multiples;
  const [word1, word2] = words;
  // Iterate over the loop
  for (var n = minValue; n <= maxValue; n++) {
    let output = "";
    // If we have a multiple of multiple1, add word1 to the output string.
    if (n % multiple1 === 0) {
      output += word1;
    }
    // If we have a multiple of multiple2, add word2 to the output string.
    if (n % multiple2 === 0) {
      output += word2;
    }
    // If we have nothing else to print, print the number
    if (output == "") {
      output = n;
    }
    // Print the output for this iteration
    console.log(output);
  }
}

loopyLighthouse([15, 90], [2, 5], ["Batty", "Beacon"]);
