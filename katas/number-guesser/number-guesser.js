const prompt = require("prompt-sync")();

function main() {
  // generate a number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  // keep track of how many tries
  let triesCount = 0;
  // keep track of the latest guess
  let pastGuesses = [];
  let answer;
  let parsedAnswer;
  while (answer !== "exit") {
    answer = prompt("Guess a number: ");
    parsedAnswer = parseInt(answer);
    const isValidNumber = String(parsedAnswer) === answer;
    if (isValidNumber) {
      if (parsedAnswer == randomNumber) {
        triesCount++;
        break;
      } else if (pastGuesses.indexOf(parsedAnswer) !== -1) {
        console.log("Already Guessed!");
      } else if (parsedAnswer > randomNumber) {
        console.log("Too High!");
        triesCount++;
      } else if (parsedAnswer < randomNumber) {
        console.log("Too Low!");
        triesCount++;
      }
      pastGuesses.push(parsedAnswer);
    } else {
      console.log("Not a number! Try again!");
    }
  }
  // print out a final message
  if (parsedAnswer === randomNumber) {
    console.log("You got it! You took " + triesCount + " attempts.");
  } else {
    console.log("You gave up. Better luck next time.");
  }
}

main();
