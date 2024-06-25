const cells = document.querySelectorAll('td');
const buttons = ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"];

cells.forEach(cell => {
  cell.addEventListener('click', (event) => {
    const clickedCell = event.target
    const className = clickedCell.id;
    console.log(className);

  });
});
