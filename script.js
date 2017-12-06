var wins = 0,
  losses = 0,
  abortions = 0;
var gameCompleted=true;
var headline = document.querySelector("h1");
document.querySelector("h2").addEventListener("click", newGame);
newGame();

function newGame() {
  if (gameCompleted == false) {
    abortions++;
  }
  if (abortions > 0) {
    document.querySelector("#abortions").classList.toggle("visible", true)
  }

  gameCompleted = false; //if true, a game was just played to the end
  document.querySelector("#keypad--row1").innerText="";
  document.querySelector("#keypad--row2").innerText="";
  document.querySelector("#keypad--row3").innerText="";

  answer = newRandomWord();
  console.log(answer);
  wrongGuesses = 0;
  resetKeypad();
  maskedAnswer = [];
  for (i of answer) {
    maskedAnswer.push("_")
  }
  updateDisplayWord();
  hang(wrongGuesses);
}

function verifyGuess() {
  guessedLetter = this.innerText.toLowerCase();
  console.log("You just clicked " + guessedLetter);
  //when there's a match:
  //1. update the display
  if (answer.toLowerCase().includes(guessedLetter)) {
    for (i in maskedAnswer) {
      // console.log(i);
      if (answer[i] == guessedLetter) {
        maskedAnswer[i] = answer[i];
      }
      if (maskedAnswer.includes("_") == false) {
        escaped();
      }
    }
    updateDisplayWord();
    //2. Change color and pointer
    this.classList.toggle("correct-letter", true);
    this.removeEventListener("click", verifyGuess);
  } else {
    //when there isn't a match:
    //change the color and pointer,
    this.classList.toggle("incorrect-letter", true);
    this.removeEventListener("click", verifyGuess);
    hang(++wrongGuesses);
  }
}

function hang(wrongGuesses) {
  if (wrongGuesses == 0) {
    svg = document.querySelectorAll("svg *")
    for (var i of svg) {
      i.classList.toggle("hidden", true);
    }
  } else if (wrongGuesses == 1) {
    gallows = document.querySelectorAll(".gallows");
    for (var j of gallows) {
      j.classList.toggle("hidden", false)
    }
  } else if (wrongGuesses == 2) {
    document.querySelector("#head").classList.toggle("hidden", false)
  } else if (wrongGuesses == 3) {
    document.querySelector("#body").classList.toggle("hidden", false)
  } else if (wrongGuesses == 4) {
    document.querySelector("#left-arm").classList.toggle("hidden", false)
  } else if (wrongGuesses == 5) {
    document.querySelector("#right-arm").classList.toggle("hidden", false)
  } else if (wrongGuesses == 6) {
    document.querySelector("#left-leg").classList.toggle("hidden", false)
  } else if (wrongGuesses == 7) {
    document.querySelector("#right-leg").classList.toggle("hidden", false);
    hanged();
  }
}

function hanged() {
  gameCompleted = true;
  // showAnswer();
  headline.innerText = "You are hanged!";
  headline.classList.toggle("hanged", true);
}

function escaped() {
  gameCompleted = true;
  document.querySelector("#keypad").classList.toggle("escaped", true);
  headline.innerText = "Escaped!!";
  headline.classList.toggle("escaped", true);
}

function updateDisplayWord() {
  var display = "";
  for (i of maskedAnswer) {
    display += i + " ";
  };
  display.slice(0, -1);
  document.querySelector("#guessing").textContent = display;
}

function newRandomWord() {
  return commonWords[Math.floor(Math.random() * commonWords.length)];
}

function resetKeypad() {
  populateRow(1, "QWERTYUIOP");
  populateRow(2, "ASDFGHJKL");
  populateRow(3, "ZXCVBNM");
}

function populateRow(rowNumber, rowLetters) {
  for (i of rowLetters) {
    key = document.createElement("a");
    key.id = i.toLowerCase();
    key.append(i);
    key.addEventListener("click", verifyGuess);
    document.querySelector("#keypad--row" + rowNumber).append(key);
  }
};
