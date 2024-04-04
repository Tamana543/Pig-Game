'use strict';
// Selecting
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const current1El = document.getElementById('current--0');
const current2El = document.getElementById('current--1');
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
//starting point
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');
// functionalities
let score, currentScore, activePlayer, playing;
function restart() {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  // to stop the game after winning it
  playing = true;
  document.querySelector('.current-score').textContent = currentScore;
  current1El.textContent = 0;
  current2El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  player1El.classList.remove('winner');
  player2El.classList.remove('winner');
  player2El.classList.remove('player--active');
  player1El.classList.add('player--active');
  diceEl.classList.add('hidden');
}
restart();
function chPlayerEn() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
}
function holdNum() {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 50) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      chPlayerEn();
    }
  }
}
function diceEng() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    //   to get images channged
    diceEl.src = `dice-${dice}.png`;

    //   consitions
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      chPlayerEn();
    }
  }
}
// callling Functions
btnRollEl.addEventListener('click', diceEng);
btnHoldEl.addEventListener('click', holdNum);
btnNewEl.addEventListener('click', restart);
// Keyborad Functions
document.addEventListener('keydown', function (event) {
  if (event.key === 'n') {
    restart();
  }
});
document.addEventListener('keypress', function (event) {
  if (event.key === 'h') {
    holdNum();
  }
});
document.addEventListener('keypress', function (event) {
  if (event.key === 'd') {
    diceEng();
  }
});
