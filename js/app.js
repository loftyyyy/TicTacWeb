const cells = document.querySelectorAll('td');
let board = [[null,null,null], [null,null,null], [null,null,null]]

let playerTurn = true;

function clearBoard(){
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      board[i][j].textContent = "";
    }
  }
  playerTurn = true;
}
cells.forEach(cell =>{
  const row = parseInt(cell.dataset.row)
  const col = parseInt(cell.dataset.col)
  board[row][col] = cell;
  console.log("I was ran");

})
cells.forEach(cell => {
  cell.addEventListener('click', (event) => {
    const clickedCell = event.target
    const cellText = clickedCell.textContent;

    //checks if the cell is empty, if yes proceed to make a move.
    if(cellText === ""){
      if(playerTurn){

        clickedCell.textContent = "x";
        playerTurn = false;
        if(evaluate() === 0){

        }
      }

    }
    if(evaluate() !== 0){
      setWin();
    }

  });
});

function AiMove(depth){

}
function minimax(depth,alpha, beta, isMaximizing){
  // Base Case
  result = evaluate();

  if(result !== 0){
    return result;
  }

  if(depth === 9){
    return 0;
  }

  // Base Case ends here.

  if(isMaximizing){
    let maxEval = Number.MIN_VALUE;
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
        if(board[i][j].textContent === ""){
          board[i][j].textContent = "o";
          eval = minimax(depth + 1, alpha, beta, false);
          board[i][j].textContent === "";
          maxEval = Math.max(maxEval, eval);
          alpha = Math.max(alpha, eval);
          if(beta <= alpha){
            break;
          }


        }
      }
    }
    return maxEval;
  }else{
    let minEval = Number.MAX_VALUE;

    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
        if(board[i][j].textContent === ""){
          board[i][j].textContent = "x";
          eval = minimax(depth + 1, alpha, beta, true);
          board[i][j].textContent === "";
          minEval = Math.max(minEval, eval);
          beta = Math.max(beta, eval);
          if(beta <= alpha){
            break;
          }


        }
      }
    }
    return minEval;
  }

}

function evaluate(){
  for(let i = 0; i < 3; i++){
    //Horizontal Win Check
    if((board[i][0].textContent === board[i][1].textContent) && (board[i][1].textContent === board[i][2].textContent) && board[i][0].textContent !== ""){
      console.log("Horizontal win")
      return board[i][0].textContent === "x" ? -1 : 1;
    }

    // Vertical Win Check
    if((board[0][i].textContent === board[1][i].textContent) && (board[1][i].textContent === board[2][i].textContent) && board[0][i].textContent !== ""){
      console.log("Vertical Win")
      return board[0][i].textContent === "x" ? -1 : 1;
    }
  }

  //Diagonals
  if((board[0][0].textContent === board[1][1].textContent) && (board[1][1].textContent === board[2][2]) && board[1][1].textContent !== "" ){
    return board[0][0].textContent === "x" ? -1 : 1;

  }
  if((board[0][2].textContent === board[1][1].textContent) && (board[1][1].textContent === board[2][0]) && board[1][1].textContent !== "" ){
    return board[0][2].textContent === "x" ? -1 : 1;

  }

  for(let i = 0; i < board.length; i++){
    for(let j= 0; j < board[i].length; j++){
      if(board[i][j].textContent === ""){
        console.log("available move")
        return 0;
      }
    }
  }

  return 2;

}

function setWin(){
  const header = document.getElementById("winHeader");

  if(evaluate() === -1){
    header.textContent = "X won";

  }
  if(evaluate() === 1){
    header.textContent = "O won";

  }
  if(evaluate() === 2){
    header.textContent = "Draw";

  }
}
//TODO: Add a winCheck for every move, and determine if there are no winners, make the AI move.
// Fix the board text bug where you can change the player cells if yuo click it more than one time.
