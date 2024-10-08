const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

let xMoves = 0;  
let oMoves = 0;  
let selectedPieceIndex = null;  

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute('data-index'));

 
  if (isGameOver) return;

 
  if (boardState[cellIndex] === currentPlayer && selectedPieceIndex === null) {
    selectedPieceIndex = cellIndex;
    cell.classList.add('selected');  
    return;
  }

  
  if (selectedPieceIndex !== null) {
    if (boardState[cellIndex] === '') {
      
      boardState[cellIndex] = currentPlayer;
      boardState[selectedPieceIndex] = '';
      cells[selectedPieceIndex].textContent = '';  
      cells[selectedPieceIndex].classList.remove('selected');  
      cell.textContent = currentPlayer;  

      selectedPieceIndex = null;

      if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
      }
    } else {
      
      cells[selectedPieceIndex].classList.remove('selected');
      selectedPieceIndex = null;
    }
    return;
  }

  
  if (boardState[cellIndex] === '' && (currentPlayer === 'X' && xMoves < 3 || currentPlayer === 'O' && oMoves < 3)) {
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (currentPlayer === 'X') {
      xMoves++;
    } else {
      oMoves++;
    }

    if (checkWin()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      isGameOver = true;
    } else if (boardState.includes('')) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
      statusText.textContent = `It's a draw!`;
      isGameOver = true;
    }
  }
}


function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}


function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  currentPlayer = 'X';
  xMoves = 0;  
  oMoves = 0;  
  selectedPieceIndex = null;  
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('selected');  
  });
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
