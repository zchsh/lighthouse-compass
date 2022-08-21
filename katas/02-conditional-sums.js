/**
 * Adds two numbers together
 *
 * @param {number} a - first number to add
 * @param {number} b - second number to add
 */
function sum(a, b) {
  return a + b;
}

/**
 * Function to determine if a value matches an even / odd condition
 *
 * @param {number} value - value to check
 * @param {"even" | "odd"} condition - condition to check against
 */
function matchesCondition(value, condition) {
  const isEven = value % 2 == 0;
  const isOdd = value % 2 !== 0;
  return condition == "even" ? isEven : isOdd;
}

const conditionalSum = function (values, condition) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    if (matchesCondition(values[i], condition)) {
      sum += values[i];
    }
  }
  return sum;
  // Version with .filter cause I didn't read the instructions, oops
  // return values.filter(matchesCondition).reduce(sum, 0)
};

console.log(conditionalSum([1, 2, 3, 4, 5], "even"));
console.log(conditionalSum([1, 2, 3, 4, 5], "odd"));
console.log(conditionalSum([13, 88, 12, 44, 99], "even"));
console.log(conditionalSum([], "odd"));
