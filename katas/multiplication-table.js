const multiplicationTable = function (maxValue) {
  let string = "";
  for (var x = 1; x <= maxValue; x++) {
    for (var y = 1; y <= maxValue; y++) {
      string += x * y;
      if (y === maxValue) {
        string += "\n";
      } else {
        string += " ";
      }
    }
  }
  return string;
};

console.log(multiplicationTable(1));
console.log(multiplicationTable(5));
console.log(multiplicationTable(10));
