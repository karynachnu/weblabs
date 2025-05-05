
function createDeck(pairCount) {
  const allImages = Array.from({ length: 20 }, (_, i) => `images/image${i + 1}.jpg`);
  const images = Array.from({ length: pairCount }, (_, i) => allImages[i % allImages.length]);
  const cards = images.concat(images).map((img, index) => ({
    id: index,
    image: img,
    flipped: false,
    matched: false
  }));
  return cards;
}

function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function flipCard(deck, cardId) {
  return deck.map(card =>
    card.id === cardId ? { ...card, flipped: true } : card
  );
}

function checkMatch(deck, flippedIds) {
  const [firstId, secondId] = flippedIds;
  const first = deck.find(c => c.id === firstId);
  const second = deck.find(c => c.id === secondId);
  if (first.image === second.image) {
    return deck.map(c =>
      flippedIds.includes(c.id) ? { ...c, matched: true } : c
    );
  } else {
    return deck.map(c =>
      flippedIds.includes(c.id) ? { ...c, flipped: false } : c
    );
  }
}

function isGameOver(deck) {
  return deck.every(card => card.matched);
}

let state = {
  deck: [],
  flipped: [],
  matchedPairs: 0,
  moves: 0,
  timer: null,
  timeLeft: 180,
  playerTurn: 0,
  players: ["Player 1"],
  scores: [0],
  rounds: 1,
  currentRound: 1,
  difficulty: 'easy',
  size: [4, 4],
  roundStats: [],
  roundWins: [0, 0]
};

const sizeMap = {
  '4x4': [4, 4],
  '4x6': [4, 6],
  '6x6': [6, 6]
};

const difficultyTimes = {
  easy: 180,
  normal: 120,
  hard: 60
};

const gameEl = document.getElementById('game');
const timerEl = document.getElementById('timer');
const statusEl = document.getElementById('status');

function initGame() {
  const [cols, rows] = sizeMap[document.getElementById('size').value];
  const players = parseInt(document.getElementById('players').value);
  const player1 = document.getElementById('player1').value || 'Player 1';
  const player2 = document.getElementById('player2').value || 'Player 2';
  const difficulty = document.getElementById('difficulty').value;
  const rounds = parseInt(document.getElementById('rounds').value);

  state.players = players === 2 ? [player1, player2] : [player1];
  state.scores = [0, 0];
  state.roundWins = [0, 0];
  state.rounds = rounds;
  state.currentRound = 1;
  state.difficulty = difficulty;
  state.moves = 0;
  state.playerTurn = 0;
  state.size = [cols, rows];
  state.roundStats = [];

  startGame();
}

function startGame() {
  const [cols, rows] = state.size;
  const count = (cols * rows) / 2;

  state.deck = shuffleDeck(createDeck(count));
  state.flipped = [];
  state.matchedPairs = 0;
  state.moves = 0;
  state.timeLeft = difficultyTimes[state.difficulty];
  state.playerTurn = 0;
  state.scores = [0, 0];

  gameEl.style.gridTemplateColumns = `repeat(${cols}, 80px)`;

  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.timeLeft--;
    timerEl.textContent = `Time left: ${state.timeLeft}s`;
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      endGame();
    }
  }, 1000);

  render();
}

function render() {
  gameEl.innerHTML = '';
  state.deck.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card' + (card.flipped || card.matched ? ' flipped' : '');

    if (card.flipped || card.matched) {
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = 'card';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      cardEl.appendChild(img);
    } else {
      cardEl.textContent = '❓';
    }

    if (!card.flipped && !card.matched) {
      cardEl.onclick = () => onCardClick(card.id);
    }

    gameEl.appendChild(cardEl);
  });

  statusEl.textContent = `Ходи: ${state.moves} | Раунд: ${state.currentRound} | Гравець: ${state.players[state.playerTurn]}`;
}

function onCardClick(cardId) {
  if (state.flipped.length >= 2 || state.deck.find(c => c.id === cardId).flipped) return;

  state.deck = flipCard(state.deck, cardId);
  state.flipped.push(cardId);
  render();

  if (state.flipped.length === 2) {
    state.moves++;
    setTimeout(() => {
      const newDeck = checkMatch(state.deck, state.flipped);
      const matchFound = newDeck.filter(c => c.matched).length > state.deck.filter(c => c.matched).length;
      state.deck = newDeck;
      if (matchFound) {
        state.matchedPairs++;
        state.scores[state.playerTurn]++;
      } else if (state.players.length === 2) {
        state.playerTurn = (state.playerTurn + 1) % 2;
      }
      state.flipped = [];
      render();
      if (isGameOver(state.deck)) {
        clearInterval(state.timer);
        state.roundStats.push({
          moves: state.moves,
          timeLeft: state.timeLeft,
          scores: [...state.scores]
        });

        let roundWinner = '';
        if (state.scores[0] > state.scores[1]) {
          state.roundWins[0]++;
          roundWinner = state.players[0];
        } else if (state.scores[1] > state.scores[0]) {
          state.roundWins[1]++;
          roundWinner = state.players[1];
        } else {
          roundWinner = 'Нічия';
        }

        setTimeout(() => {
          alert(`Раунд завершено! Переможець раунду: ${roundWinner}\nРахунок: ${state.players[0]} - ${state.scores[0]}, ${state.players[1] || ''} ${state.scores[1] || ''}`);
          if (state.currentRound < state.rounds) {
            state.currentRound++;
            setTimeout(() => startGame(), 500);
          } else {
            const gameWinner = getGameWinner();
            alert(`Гра завершена! Переможець: ${gameWinner}`);
            gameEl.innerHTML = '';
            statusEl.textContent = `Гра завершена. Переможець: ${gameWinner}`;
          }
        }, 300);
      }
    }, 800);
  }
}

function getGameWinner() {
  if (state.players.length === 1) return state.players[0];

  if (state.roundWins[0] > state.roundWins[1]) return state.players[0];
  if (state.roundWins[1] > state.roundWins[0]) return state.players[1];
  return 'Нічия';
}

function endGame() {
  clearInterval(state.timer);
  alert(`Час вийшов! Переможець: ${getGameWinner()}`);
  gameEl.innerHTML = '';
  statusEl.textContent = `Гру завершено через таймер. Переможець: ${getGameWinner()}`;
}

function restartGame() {
  state.currentRound = 1;
  startGame();
}



function resetSettings() {
  document.getElementById('players').value = 1;
  document.getElementById('player1').value = '';
  document.getElementById('player2').value = '';
  document.getElementById('player2').disabled = true;
  document.getElementById('size').value = '4x4';
  document.getElementById('difficulty').value = 'easy';
  document.getElementById('rounds').value = 1;
}

document.getElementById('startBtn').onclick = initGame;
document.getElementById('resetBtn').onclick = resetSettings;
document.getElementById('restartBtn').onclick = restartGame;
document.getElementById('players').onchange = (e) => {
  document.getElementById('player2').disabled = e.target.value === '1';
};
