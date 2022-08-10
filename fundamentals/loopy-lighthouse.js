for (var n = 100; n <= 200; n++) {
  let output = "";
  // If we have a multiple of 3, add "Loopy" to the output string.
  if (n % 3 === 0) {
    output += "Loopy";
  }
  // If we have a multiple of 4, add "Lighthouse" to the output string.
  if (n % 4 === 0) {
    output += "Lighthouse";
  }
  // If we have nothing else to print, print the number
  if (output == "") {
    output = n;
  }
  // Print the output for this iteration
  console.log(output);
}
