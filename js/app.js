const cells = document.querySelectorAll('td');
const buttons = [["cell-0", "cell-1", "cell-2"], ["cell-3", "cell-4", "cell-5"], ["cell-6", "cell-7", "cell-8"]];

let playerTurn = false;
cells.forEach(cell => {
  cell.addEventListener('click', (event) => {
    const clickedCell = event.target
    const cellText = clickedCell.textContent;

    if(cellText == ""){
      console.log("true")
      if(playerTurn){

        clickedCell.textContent = "x";
        playerTurn = false;
      }else{
        clickedCell.textContent = "o";
        playerTurn = true;
      }
      evaluate(buttons)

    }

  });
});

function evaluate(board){
  //Vertical and Horizontal
  for(i = 0; i < 3; i++){
    if(board[i][0].textContent == board[i][1].textContent && board[i][0].textContent == board[i][2].textContent && board[i][0].textContent != ""){
      console.log("vertical win")
      console.log(board[i][0].textContent)
    }
  }


}

//TODO: Add a winCheck for every move, and determine if there are no winners, make the AI move.
// Fix the board text bug where you can change the player cells if yuo click it more than one time.
