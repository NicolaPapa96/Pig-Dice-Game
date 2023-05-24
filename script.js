'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const defaultSettings = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

defaultSettings();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRollEl.addEventListener('click', function () {
  if (playing) {
    // 1. generare numer casuale tra 1 e 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. mostrare il dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // per mostrare l'immagine del dado lanciato. es. se esce 6 mostrerà il dado con il numero 6.
    // 3. controllare se esce 1, se esce cambiare giocatore
    if (dice !== 1) {
      // aggiungi dice al punteggio corrente
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // cambia giocatore
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // 1. aggiungere il punteggio corrente al punteggio del giocatore attivo quando clicca sul hold.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. controllare se il punteggio del giocatore attivo è >= 100.
    if (scores[activePlayer] >= 100) {
      // finisci il gioco
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // cambia giocatore.
      switchPlayer();
    }
  }
});

btnNewEl.addEventListener('click', defaultSettings);
