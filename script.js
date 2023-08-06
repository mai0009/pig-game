"use strict";

// DOM Elements
const scoreElements = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
];
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const currentElements = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];
const playerElements = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];

// Game State
let scores, currentScore, activePlayer, playing;

// Initialize the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreElements[0].textContent = 0;
  scoreElements[1].textContent = 0;
  currentElements[0].textContent = 0;
  currentElements[1].textContent = 0;

  diceEl.classList.add("hidden");
  playerElements[0].classList.add("player--active");
  playerElements[1].classList.remove("player--active");
  playerElements[0].classList.remove("player--winner");
  playerElements[1].classList.remove("player--winner");
};

// Switch to the next player
const switchPlayer = function () {
  currentElements[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElements[0].classList.toggle("player--active");
  playerElements[1].classList.toggle("player--active");
};

// Roll the dice
const rollDice = function () {
  const dice = Math.trunc(Math.random() * 6 + 1);
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    currentElements[activePlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
};

// Hold the current score
const holdScore = function () {
  scores[activePlayer] += currentScore;
  scoreElements[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add("hidden");
    playerElements[activePlayer].classList.add("player--winner");
    playerElements[activePlayer].classList.remove("player--active");
  } else {
    switchPlayer();
  }
};

// Event Listeners
btnRoll.addEventListener("click", function () {
  if (playing) {
    rollDice();
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    holdScore();
  }
});

btnNew.addEventListener("click", init);

// Initialize the game when the page loads
init();
