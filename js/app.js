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
cells.forEach(cell => {
  cell.addEventListener('click', (event) => {
    const clickedCell = event.target
    const cellText = clickedCell.textContent;

    if(cellText === ""){
      if(playerTurn){

        clickedCell.textContent = "x";
        playerTurn = false;
      }else{
        clickedCell.textContent = "o";
        playerTurn = true;
      }
      evaluate(board)

    }

  });
});
cells.forEach(cell =>{
  const row = parseInt(cell.dataset.row)
  const col = parseInt(cell.dataset.col)
  board[row][col] = cell;
  console.log("I was ran");

})

function evaluate(board){
  for(let i = 0; i < 3; i++){
    //Horizontal Win Check
    if((board[i][0].textContent === board[i][1].textContent) && (board[i][1].textContent === board[i][2].textContent) && board[i][0].textContent !== ""){
      console.log("Horizontal win")
    }

    // Vertical Win Check
    if((board[0][i].textContent === board[1][i].textContent) && (board[1][i].textContent === board[2][i].textContent) && board[0][i].textContent !== ""){
      console.log("Horizontal win")
    }
  }

  if((board[0][0].textContent === board[1][1].textContent) && (board[0][0].textContent === board[2][2]) && board[1][1].textContent !== ""){
    console.log("Diagonal Win")
  }

  if((board[0][2].textContent === board[1][1].textContent) && (board[0][2].textContent === board[2][0]) && board[1][1].textContent !== ""){
    console.log("Diagonal Win")
  }


}

//TODO: Add a winCheck for every move, and determine if there are no winners, make the AI move.
// Fix the board text bug where you can change the player cells if yuo click it more than one time.
