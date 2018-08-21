//top 1000 common English words excluding four-letter-or-less ones
commonWords = ["their", "would", "about", "there", "think", "which", "people", "could", "other", "these", "first", "because", "thing", "those", "woman", "through", "child", "there", "after", "should", "world", "school", "still", "three", "state", "never", "become", "between", "really", "something", "another", "family", "leave", "while", "student", "great", "group", "begin", "country", "where", "problem", "every", "start", "might", "about", "against", "place", "again", "company", "where", "system", "right", "program", "question", "during", "government", "small", "number", "always", "night", "point", "believe", "today", "bring", "happen", "without", "before", "large", "million", "under", "water", "write", "mother", "national", "money", "story", "young", "month", "different", "right", "study", "though", "business", "issue", "black", "little", "house", "after", "since", "provide", "service", "around", "friend", "important", "father", "until", "power", "often", "political", "among", "stand", "however", "member", "almost", "include", "continue", "later", "community", "white", "least", "president", "learn", "change", "minute", "several", "information", "nothing", "right", "social", "understand", "whether", "watch", "together", "follow", "around", "parent", "anything", "create", "public", "already", "speak", "others", "level", "allow", "office", "spend", "health", "person", "history", "party", "within", "result", "change", "morning", "reason", "research", "early", "before", "moment", "himself", "teacher", "force", "offer", "enough", "education", "across", "although", "remember", "second", "maybe", "toward", "policy", "everything", "process", "music", "including", "consider", "appear", "actually", "probably", "human", "serve", "market", "expect", "sense", "build", "nation", "college", "interest", "death", "course", "someone", "experience", "behind", "reach", "local", "remain", "effect", "suggest", "class", "control", "raise", "perhaps", "little", "field", "former", "major", "sometimes", "require", "along", "development", "themselves", "report", "better", "economic", "effort", "decide", "strong", "possible", "heart", "leader", "light", "voice", "whole", "police", "finally", "return", "military", "price", "report", "according", "decision", "explain", "develop", "relationship", "carry", "drive", "federal", "break", "better", "difference", "thank", "receive", "value", "international", "building", "action", "model", "season", "society", "because", "director", "early", "position", "player", "agree", "especially", "record", "paper", "special", "space", "ground", "support", "event", "official", "whose", "matter", "everyone", "center", "couple", "project", "activity", "table", "court", "produce", "teach", "situation", "industry", "figure", "street", "image", "itself", "phone", "either", "cover", "quite", "picture", "clear", "practice", "piece", "recent", "describe", "product", "doctor", "patient", "worker", "movie", "certain", "north", "personal", "support", "simply", "third", "technology", "catch", "computer", "attention", "source", "nearly", "organization", "choose", "cause", "point", "century", "evidence", "window", "difficult", "listen", "culture", "billion", "chance", "brother", "energy", "period", "course", "summer", "realize", "hundred", "available", "plant", "likely", "opportunity", "short", "letter", "condition", "choice", "place", "single", "daughter", "administration", "south", "husband", "floor", "campaign", "material", "population", "economy", "medical", "hospital", "church", "close", "thousand", "current", "future", "wrong", "involve", "defense", "anyone", "increase", "security", "myself", "certainly", "sport", "board", "subject", "officer", "private", "behavior", "performance", "fight", "throw", "quickly", "second", "order", "author", "represent", "focus", "foreign", "blood", "agency", "nature", "color", "recently", "store", "reduce", "sound", "before", "movement", "enter", "share", "common", "other", "natural", "concern", "series", "significant", "similar", "language", "usually", "response", "animal", "factor", "decade", "article", "shoot", "seven", "artist", "scene", "stock", "career", "despite", "central", "eight", "treatment", "beyond", "happy", "exactly", "protect", "approach", "serious", "occur", "media", "ready", "thought", "individual", "simple", "quality", "pressure", "accept", "answer", "resource", "identify", "meeting", "determine", "prepare", "disease", "whatever", "success", "argue", "particularly", "amount", "ability", "staff", "recognize", "indicate", "character", "growth", "degree", "wonder", "attack", "herself", "region", "television", "training", "pretty", "trade", "election", "everybody", "physical", "general", "feeling", "standard", "message", "outside", "arrive", "analysis", "benefit", "forward", "lawyer", "present", "section", "environmental", "glass", "answer", "skill", "sister", "professor", "operation", "financial", "crime", "stage", "compare", "authority", "design", "knowledge", "station", "state", "strategy", "little", "clearly", "discuss", "indeed", "force", "truth", "example", "democratic", "check", "environment", "public", "various", "rather", "laugh", "guess", "executive", "study", "prove", "entire", "design", "enough", "forget", "since", "claim", "remove", "manager", "close", "sound", "enjoy", "network", "legal", "religious", "final", "science", "green", "memory", "above", "establish", "trial", "expert", "spring", "radio", "visit", "management", "avoid", "imagine", "tonight", "close", "finish", "yourself", "theory", "impact", "respond", "statement", "maintain", "charge", "popular", "traditional", "reveal", "direction", "weapon", "employee", "cultural", "contain", "peace", "control", "apply", "measure", "shake", "interview", "manage", "chair", "particular", "camera", "structure", "politics", "perform", "weight", "suddenly", "discover", "candidate", "production", "treat", "evening", "affect", "inside", "conference", "style", "adult", "worry", "range", "mention", "rather", "individual", "specific", "writer", "trouble", "necessary", "throughout", "challenge", "shoulder", "institution", "middle", "dream", "beautiful", "property", "instead", "improve", "stuff"]

var isLandscape;
initialize();

function initialize() {
  wins = 0;
  losses = 0;
  abortions = 0;
  gameInProcess = false;
  hideAll("#tally span");
  masthead = document.querySelector("h1");
  body = document.querySelector("body");
  document.querySelector("#new-game").addEventListener("click", newGame);
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
  for (var i of answer) {
    maskedAnswer.push("_");
  }
  updateDisplayWord(); //display the maskedAnswer
  hang(); //draw graph
}

function newRandomWord() {
  return commonWords[Math.floor(Math.random() * commonWords.length)];
}

function verifyGuess() { //the onclick event
  guessedLetter = this.innerText.toLowerCase();
  //when it's a match:
  if (answer.toLowerCase().includes(guessedLetter)) {
    //update the displayed word
    for (var i in maskedAnswer) {
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
  var display = "";
  for (var i of maskedAnswer) {
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
  switch (wrongGuesses) {
    case 0:
      hideAll("svg *");
      break;
    case 1:
      unhideAll(".gallows");
      break;
    case 2:
      unhide("#head");
      break;
    case 3:
      unhide("#body");
      break;
    case 4:
      unhide("#left-arm");
      break;
    case 5:
      unhide("#right-arm");
      break;
    case 6:
      unhide("#left-leg");
      break;
    case 7:
      unhide("#right-leg");
      hanged();
      break;
    default:
      newGame();
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
  // show correct answer
  var display = "";
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
  for (var i of document.querySelectorAll("#keypad a")) {
    i.removeEventListener("click", verifyGuess);
    i.classList.toggle("finished", true);
  }
}

function resetKeypad() {
  for (var i of document.querySelectorAll("#keypad div")) { //clear the keypad
    i.innerText = "";
  }
  populateRow(1, "QWERTYUIOP");
  populateRow(2, "ASDFGHJKL");
  populateRow(3, "ZXCVBNM");
}

function populateRow(rowNumber, rowLetters) { //draw the keyboard and attach listeners
  for (var i of rowLetters) {
    key = document.createElement("a");
    key.id = i.toLowerCase();
    key.append(i);
    key.addEventListener("click", verifyGuess);
    document.querySelector("#keypad--row" + rowNumber).append(key);
  }
}

function hide(targetElement) {
  document.querySelector(targetElement).classList.toggle("hidden", true);
}

function unhide(targetElement) {
  document.querySelector(targetElement).classList.toggle("hidden", false);
}

function hideAll(targetElements) {
  for (var i of document.querySelectorAll(targetElements)) {
    i.classList.toggle("hidden", true);
  }
}

function unhideAll(targetElements) {
  for (var i of document.querySelectorAll(targetElements)) {
    i.classList.toggle("hidden", false);
  }
}


