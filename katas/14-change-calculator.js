const DENOMINATIONS_IN_CENTS = {
  twentyDollar: 2000,
  tenDollar: 1000,
  fiveDollar: 500,
  twoDollar: 200,
  oneDollar: 100,
  quarter: 25,
  dime: 10,
  nickel: 5,
  penny: 1,
};

/**
 * Given the total of a transaction, and the cash provided to pay,
 * Return the denominations of change to be given to the customer.
 *
 * @param {number} total
 * @param {number} cash
 */
const calculateChange = function (total, cash) {
  let changeAmount = cash - total;
  const changeBack = {};
  // For each denomination, calculate the number of units of that denomination
  // we could fit into the remaining change.
  for (const [name, cents] of Object.entries(DENOMINATIONS_IN_CENTS)) {
    const denominationCount = Math.floor(changeAmount / cents);
    if (denominationCount > 0) {
      // If we can fit some of this denomination into the remaining change,
      // then add the quantity we can fit to the changeBack object,
      // and subtract the number of cents that represent from the
      // remaining changeAmount.
      changeBack[name] = denominationCount;
      changeAmount -= denominationCount * cents;
    }
  }
  // If for some reason the change amount is not 0, which could happen
  // if we don't have pennies available, then chuck a bunch of pennies
  // at the customer to cover the difference. Good day to you, customer.
  if (changeAmount > 0) {
    changeBack.penny = changeAmount;
  }
  // Give em back their change.
  return changeBack;
};

console.log(calculateChange(1787, 2000));
console.log(calculateChange(2623, 4000));
console.log(calculateChange(501, 1000));
