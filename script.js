"use strict";

// Selecting Elements
const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let activePlayer = 0;
let hasNotWon = true;

let currentScoreEl;
let currentScore;

let finalScoreEl;
let finalScore;

// FUNCTIONS

// Refresh: init latest scores
const refresh = () => {
  currentScoreEl = document.querySelector(`#current--${activePlayer}`);
  finalScoreEl = document.querySelector(`#score--${activePlayer}`);

  currentScore = currentScoreEl.textContent;
  finalScore = finalScoreEl.textContent;
};

const switchPlayer = () => {
  refresh();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");

  activePlayer = activePlayer == 1 ? 0 : 1;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

const reset = () => {
  if (!hasNotWon) {
    document
      .querySelector(".player--winner")
      .classList.remove("player--winner");

    document.querySelector(`#name--${activePlayer}`).textContent = `Player-${
      activePlayer + 1
    }`;

    hasNotWon = true;
  }

  refresh();
  currentScoreEl.textContent = 0;
  finalScoreEl.textContent = 0;
  switchPlayer();

  refresh();
  currentScoreEl.textContent = 0;
  finalScoreEl.textContent = 0;
  switchPlayer();

  activePlayer = 0;
  document.querySelector(".player--active").classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");

  diceEl.classList.add("hidden");
};

reset();

// Dice Roll functionality
btnRoll.addEventListener("click", () => {
  if (hasNotWon) {
    refresh();

    const dice = Math.floor(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice == 1) {
      currentScoreEl.textContent = 0;
      switchPlayer();
    } else {
      currentScore = Number(currentScore) + dice;
      currentScoreEl.textContent = currentScore;
    }
  }
});

// Hold Btn Functionallity
btnHold.addEventListener("click", () => {
  if (hasNotWon) {
    refresh();

    if (Number(currentScore)) {
      finalScore = Number(finalScore) + Number(currentScore);
      finalScoreEl.textContent = finalScore;
      currentScoreEl.textContent = 0;

      if (finalScore >= 50) {
        hasNotWon = false;

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");

        document.querySelector(`#name--${activePlayer}`).textContent =
          "Winner! 🎉";

        diceEl.classList.add("hidden");
      } else {
        switchPlayer();
      }
    }
  }
});

btnNew.addEventListener("click", reset);
