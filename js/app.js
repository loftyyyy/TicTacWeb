const cells = document.querySelectorAll('td');
const board = [[null,null,null], [null,null,null], [null,null,null]]

let playerTurn = true;

cells.forEach(cell => {
  cell.addEventListener('click', (event) => {
    const clickedCell = event.target
    const cellText = clickedCell.textContent;

    if(cellText == ""){
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
  //Vertical and Horizontal
  for(i = 0; i < 3; i++){
    if(board[i][0].textContent === board[i][1].textContent && board[i][0].textContent === board[i][2].textContent && board[i][0].textContent !== ""){
      console.log("vertical win")
      console.log(board[i][0].textContent)
    }
  }


}

//TODO: Add a winCheck for every move, and determine if there are no winners, make the AI move.
// Fix the board text bug where you can change the player cells if yuo click it more than one time.
