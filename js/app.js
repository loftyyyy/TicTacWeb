// NOTE: This was originally a Java project, and I already finished it. However, it was inconvenient for people to download the code to see how it worked, so I created a web-based version of the game.
// This was done solely for the purpose of demonstrating the algorithm.
/**
 *
 * @type {NodeListOf<HTMLElementTagNameMap[string]>}
 */

const cells = document.querySelectorAll('td');
let board = [[null, null, null], [null, null, null], [null, null, null]];
const header = document.getElementById("winHeader");

let playerTurn = true;

function clearBoard() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      header.textContent = "Can you win?"

      board[i][j].textContent = "";
      board[i][j].style.backgroundColor = ""; // Reset cell color
    }
  }
  playerTurn = true;
}

cells.forEach(cell => {
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  board[row][col] = cell;
  console.log("I was ran");
});

cells.forEach(cell => {
  cell.addEventListener('click', (event) => {
    const clickedCell = event.target;
    const cellText = clickedCell.textContent;

    // Check if the cell is empty; if yes, proceed to make a move.
    if (cellText === "") {
      if (playerTurn) {
        clickedCell.textContent = "x";
        playerTurn = false;
        // Check if game is already over after player's move
        const evaluationAfterPlayer = evaluate();
        if (evaluationAfterPlayer.result === 0) { // If game is still ongoing
          AiMove(0);  // Pass depth as 0 for the AI's root call
        }
      }

      const evaluation = evaluate();
      if (evaluation.result !== 0) {
        setWin(evaluation);
      }
    }
  });
});

function AiMove(depth) {
  let bestEval = Number.NEGATIVE_INFINITY;
  let bestMove = { row: -1, col: -1 };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].textContent === "") {
        board[i][j].textContent = "o"; // Try this move for AI
        // Call minimax for the opponent's turn (minimizing player) at the next depth
        let eval = minimax(depth + 1, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false);
        board[i][j].textContent = ""; // Reset cell after evaluation

        if (eval > bestEval) {
          bestEval = eval;
          bestMove = { row: i, col: j };
        }
      }
    }
  }

  if (bestMove.row !== -1 && bestMove.col !== -1) {
    board[bestMove.row][bestMove.col].textContent = "o";
    playerTurn = true;
  }
}

function minimax(depth, alpha, beta, isMaximizing) {
  const evaluation = evaluate();
  const result = evaluation.result; // -1 for X win, 1 for O win, 2 for Draw, 0 for ongoing

  // Base cases: game is over
  if (result === 1) { // AI ('o') wins
    return 1000 - depth; // Prioritize quicker wins by subtracting depth
  } else if (result === -1) { // Player ('x') wins
    return -1000 + depth; // De-prioritize quicker losses by adding depth
  } else if (result === 2) { // Draw
    return 0; // Neutral score for a draw
  }
  // If result is 0, the game is ongoing, continue recursion.
  // The original `depth === 1000` condition for returning `result` (which would be 0 for an ongoing game)
  // is problematic as it would incorrectly treat deep non-terminal states as draws.
  // For Tic-Tac-Toe, a full search is feasible, so a heuristic depth limit for returning a score is not needed.

  if (isMaximizing) {
    let maxEval = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].textContent === "") {
          board[i][j].textContent = "o"; // Maximizing player (AI) tries a move
          let eval = minimax(depth + 1, alpha, beta, false);
          board[i][j].textContent = ""; // Reset cell

          maxEval = Math.max(maxEval, eval);
          alpha = Math.max(alpha, eval);
          if (beta <= alpha) { // Alpha-beta pruning
            break;
          }
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Number.POSITIVE_INFINITY;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].textContent === "") {
          board[i][j].textContent = "x"; // Minimizing player (opponent) tries a move
          let eval = minimax(depth + 1, alpha, beta, true);
          board[i][j].textContent = ""; // Reset cell

          minEval = Math.min(minEval, eval);
          beta = Math.min(beta, eval);
          if (beta <= alpha) { // Alpha-beta pruning
            break;
          }
        }
      }
    }
    return minEval;
  }
}

function evaluate() {
  for (let i = 0; i < 3; i++) {
    // Horizontal Win Check
    if ((board[i][0].textContent === board[i][1].textContent) && (board[i][1].textContent === board[i][2].textContent) && board[i][0].textContent !== "") {
      console.log("Horizontal win");
      return {
        result: board[i][0].textContent === "x" ? -1 : 1,
        combination: [[i, 0], [i, 1], [i, 2]]
      };
    }

    // Vertical Win Check
    if ((board[0][i].textContent === board[1][i].textContent) && (board[1][i].textContent === board[2][i].textContent) && board[0][i].textContent !== "") {
      console.log("Vertical Win");
      return {
        result: board[0][i].textContent === "x" ? -1 : 1,
        combination: [[0, i], [1, i], [2, i]]
      };
    }
  }

  // Diagonals
  if ((board[0][0].textContent === board[1][1].textContent) && (board[1][1].textContent === board[2][2].textContent) && board[1][1].textContent !== "") {
    return {
      result: board[0][0].textContent === "x" ? -1 : 1,
      combination: [[0, 0], [1, 1], [2, 2]]
    };
  }
  if ((board[0][2].textContent === board[1][1].textContent) && (board[1][1].textContent === board[2][0].textContent) && board[1][1].textContent !== "") {
    return {
      result: board[0][2].textContent === "x" ? -1 : 1,
      combination: [[0, 2], [1, 1], [2, 0]]
    };
  }

  // Check for available moves (game ongoing)
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].textContent === "") {
        console.log("available move");
        return { result: 0 };
      }
    }
  }

  return { result: 2 }; // Draw (no winner and no available moves)
}

function setWin(evaluation) {

  if (evaluation.result === -1) {
    changeHeaderText("X won");
  }
  if (evaluation.result === 1) {
    changeHeaderText("O won");
  }
  if (evaluation.result === 2) {
    changeHeaderText("Draw");
  }

  // Highlight winning combination
  if (evaluation.combination) {
    evaluation.combination.forEach(cell => {
      board[cell[0]][cell[1]].style.backgroundColor = "lightgreen";
    });
  } else if (evaluation.result === 2) { // Highlight all cells if it's a draw
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].style.backgroundColor = "lightcoral";
      }
    }
  }
}
function changeHeaderText(text) {
  const originalText = header.textContent;
  header.textContent = text;
  setTimeout(function() {
    header.textContent = originalText;
  }, 1000);
}

window.addEventListener('load', () => {
  const algorithmInfoDiv = document.getElementById('algorithm-info');
  algorithmInfoDiv.innerHTML = `
    <h3>About the Algorithm: Alpha-Beta Pruning</h3>
    <p>
      Alpha-Beta Pruning is a search algorithm that helps the computer play Tic-Tac-Toe optimally.
      It works by looking ahead at possible moves and evaluating their outcomes, eliminating branches
      that are unlikely to lead to a win. This allows the computer to make intelligent decisions quickly.
    </p>
    <p>Learn more about Alpha-Beta Pruning: <a href="https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning" target="_blank">Wikipedia</a></p>
    <p>Note: This is just a web representation of the game tictactoe with the implementation of the minimax algorithm accompanied by alpha-beta pruning</p>
  `;
});