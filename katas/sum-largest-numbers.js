const sumLargestNumbers = function (data) {
  return data
    .sort((a, b) => {
      // sorts smallest first, largest last
      const aBeforeB = a < b;
      const bBeforeA = b < a;
      return aBeforeB ? -1 : bBeforeA ? 1 : 0;
    })
    .slice(-2) // gets the last two elements - the largest two!
    .reduce((sum, n) => sum + n); // sum it up
};

console.log(sumLargestNumbers([1, 10]));
console.log(sumLargestNumbers([1, 2, 3]));
console.log(sumLargestNumbers([10, 4, 34, 6, 92, 2]));
