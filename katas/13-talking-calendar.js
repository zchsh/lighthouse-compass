/**
 * Given a number,
 * Return a string representing the ordinal format of the number.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/English_numerals#Ordinal_numbers
 *
 * @param {number} number
 * @returns {string}
 */
function numberToOrdinal(n) {
  /**
   * The general rules for ordinals are:
   * - numbers ending in 1 should be "1st",
   * - numbers ending in 2 should be "2nd",
   * - numbers ending in 3 should be "3rd",
   * - all other numbers should be "th".
   *
   * With a key set of exceptions:
   * Numbers with a "tens" digit of one, such as 11, 112, 9311, and so on,
   * should have the suffix "th" rather than "st".
   *
   * We exclude these numbers from our (n % 10 === 1) check,
   * so that they end up in the "else" bucket of "all other numbers".
   */
  let suffix;
  const onesDigit = n % 10;
  const tensDigit = Math.floor((n % 100) / 10);
  if (onesDigit === 1 && tensDigit !== 1) {
    suffix = "st";
  } else if (onesDigit === 2) {
    suffix = "nd";
  } else if (onesDigit === 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  return `${n}${suffix}`;
}

/**
 * Given a number corresponding to a month,
 * such as 1 for January or 12 for December,
 * 
 * Return the full name of the month.
 
* @param {number} month
 * @returns {string}
 */
function getMonthName(month) {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return MONTHS[month - 1];
}

const talkingCalendar = function (date) {
  const [year, month, day] = date.split("/");
  return `${getMonthName(month)} ${numberToOrdinal(day)}, ${year}`;
};

console.log(talkingCalendar("2017/12/02"));
console.log(talkingCalendar("2007/11/11"));
console.log(talkingCalendar("1987/08/24"));
