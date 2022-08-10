const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function isEvenNumber(number) {
  return number % 2 === 0;
}

const filtered = numbers.filter(isEvenNumber);
console.log(filtered);
