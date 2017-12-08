//The code below is in vanilla JavaScript.
function fitViewport() {
  detectViewport();
  //enlarge the body to fit the viewport
  widthRatio = viewportWidth / bodyWidth;
  heightRatio = viewportHeight / bodyHeight;
  scaleRatio = Math.min(widthRatio, heightRatio);
  body.style.transform = "scale(" + scaleRatio + ")";
}

function initialize() {
  wins = 0;
  losses = 0;
  abortions = 0;
  gameInProcess = false;
  hideAll("#tally span");
  masthead = document.querySelector("h1");
  body = document.querySelector("body");
  bodyBackgroundColor = "#23462d";
  body.style.backgroundColor = bodyBackgroundColor; //it's used across multiple places, so set here as opposed to stylesheet
  bodyWidth = body.offsetWidth; //detect the width and height of body, which are the initial values set in stylesheet
  bodyHeight = body.offsetHeight;
  detectViewport();
  document.querySelector("#new-game").addEventListener("click", newGame);
}

function detectViewport() {
  viewportHeight = document.documentElement.clientHeight; // first tried window.innerHeight, seemed buggy
  viewportWidth = document.documentElement.clientWidth;
  //if isLandscape is undefined, or is wrong(user changed it), make it right, then make changes accordingly
  if (isLandscape != viewportHeight < viewportWidth) {
    isLandscape = viewportHeight < viewportWidth;
    if (isLandscape) {
      //if landscape, leave some white color on both sides
      body.style.padding = "1.3rem 7rem 0.7rem 7rem";
      document.querySelector("html").style.backgroundColor = "white";
    } else {
      //if portrait, set a universal background color
      body.style.padding = "1.3rem 0 0.7rem 0";
      document.querySelector("html").style.backgroundColor = bodyBackgroundColor;
    }
  }
}

function newGame() {
  if (gameInProcess == true) { //true means the last game wasn't finished before user clicked "New Game"
    aborted();
  }
  gameInProcess = true; //game starts
  masthead.innerText = "Hangman";
  masthead.setAttribute("status", "normal"); //black color
  answer = newRandomWord();
  console.log("Hey you're cheating! " + 'Close the console! The answer is "' + answer + '"');
  wrongGuesses = 0;
  resetKeypad();
  maskedAnswer = []; //maskedAnswer is the mixture of letters and underscores
  for (i of answer) {
    maskedAnswer.push("_")
  }
  updateDisplayWord(); //display the maskedAnswer
  hang(); //draw graph
}

function verifyGuess() { //the onclick event
  guessedLetter = this.innerText.toLowerCase();
  //when it's a match:
  if (answer.toLowerCase().includes(guessedLetter)) {
    //update the displayed word
    for (i in maskedAnswer) {
      if (answer[i] == guessedLetter) {
        maskedAnswer[i] = answer[i];
      }
    }
    updateDisplayWord();
    if (maskedAnswer.includes("_") == false) { //won
      escaped();
    }
    //change color and make the mouse no-drop
    this.classList.toggle("correct-letter", true);
    this.removeEventListener("click", verifyGuess);
  } else {
    //when it's not a match:
    this.classList.toggle("incorrect-letter", true); //change color and make the mouse no-drop
    this.removeEventListener("click", verifyGuess);
    wrongGuesses++;
    hang();
  }
}

function updateDisplayWord() {
  display = "";
  for (i of maskedAnswer) {
    display += i + " ";
  }
  display.slice(0, -1);
  document.querySelector("#guessing").textContent = display;
}

function aborted() { //add 1 to the tally Abortions
  abortions++;
  document.querySelector("#abortions").innerText = abortions;
  unhideAll(".abortions");
}

function hang() { //draw the hangman
  if (wrongGuesses == 0) {
    hideAll("svg *");
  } else if (wrongGuesses == 1) {
    unhideAll(".gallows");
  } else if (wrongGuesses == 2) {
    unhide("#head");
  } else if (wrongGuesses == 3) {
    unhide("#body");
  } else if (wrongGuesses == 4) {
    unhide("#left-arm");
  } else if (wrongGuesses == 5) {
    unhide("#right-arm");
  } else if (wrongGuesses == 6) {
    unhide("#left-leg");
  } else if (wrongGuesses >= 7) {
    unhide("#right-leg");
    hanged();
  }
}

function hanged() { //lost
  gameInProcess = false;
  masthead.innerText = "You are hanged!";
  masthead.setAttribute("status", "hanged");
  losses++;
  removeAllListeners();
  unhideAll(".losses");
  document.querySelector("#losses").innerText = losses;
  // show correct answer;
  var display = ""
  for (var i of answer) {
    display += i + " ";
  }
  display.slice(0, -1);
  document.querySelector("#guessing").textContent = display;
}

function escaped() { //won
  gameInProcess = false;
  masthead.innerText = "You escaped!!";
  masthead.setAttribute("status", "escaped");
  wins++;
  removeAllListeners();
  unhideAll(".wins");
  document.querySelector("#wins").innerText = wins;
}

function removeAllListeners() { //prevent user from continue clicking after game's over
  for (i of document.querySelectorAll("#keypad a")) {
    i.removeEventListener("click", verifyGuess);
    i.classList.toggle("finished", true);
  }
}

function newRandomWord() {
  return commonWords[Math.floor(Math.random() * commonWords.length)];
}

function resetKeypad() {
  for (i of document.querySelectorAll("#keypad div")) { //clear the keypad
    i.innerText = "";
  }
  populateRow(1, "QWERTYUIOP");
  populateRow(2, "ASDFGHJKL");
  populateRow(3, "ZXCVBNM");
}

function populateRow(rowNumber, rowLetters) { //draw the keyboard and attach listeners
  for (i of rowLetters) {
    key = document.createElement("a");
    key.id = i.toLowerCase();
    key.append(i);
    key.addEventListener("click", verifyGuess);
    document.querySelector("#keypad--row" + rowNumber).append(key);
  }
};

function hide(targetElement) {
  document.querySelector(targetElement).classList.toggle("hidden", true);
}

function unhide(targetElement) {
  document.querySelector(targetElement).classList.toggle("hidden", false);
}

function hideAll(targetElements) {
  for (i of document.querySelectorAll(targetElements)) {
    i.classList.toggle("hidden", true)
  }
}

function unhideAll(targetElements) {
  for (i of document.querySelectorAll(targetElements)) {
    i.classList.toggle("hidden", false)
  }
}
