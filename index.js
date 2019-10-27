const selectMode = document.getElementById("select-mode")
const selectPosition = document.getElementById("select-position")
const grid = document.getElementById('grid');
const cells = document.getElementsByClassName('cell');
const restartButton = document.getElementById('restart-button')
const message = document.getElementById('gameover-message')


var currentPlayer = 'X';
var moveCounter = 0;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gridClickListener = e => {
    if(e.target.textContent === String.fromCharCode(160)){
        e.target.textContent = currentPlayer;
        moveCounter++;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        let winner = getWinner();
        if(winner === 'X'|| winner === 'O'){
            message.textContent = `${winner} won the game`;
            grid.removeEventListener('click', gridClickListener);
        }else if(winner === 'tie'){
            message.textContent = 'Game tied';
        }
    }
}

grid.addEventListener('click', gridClickListener);

restartButton.addEventListener('click', function(){
    Array.from(cells).forEach(cell => cell.textContent = String.fromCharCode(160))
    message.textContent= ''
    moveCounter = 0;
    grid.addEventListener('click', gridClickListener);
})

selectMode.addEventListener("change", function(){
   if(selectMode.value === 'single player'){
       selectPosition.style.display = 'inline-block';
   } else {
        selectPosition.style.display = 'none';
   }
});



function getWinner() {
    for(i=0; i<8; i++){
        let condition = winConditions[i];
        let row = [];
        condition.forEach(index => row.push(cells[index].textContent));
        if(row[0]===row[1] && row[1] === row[2] && row[0] !== String.fromCharCode(160))
            return row[0];
    } 
    if(moveCounter === 9)
        return 'tie';
    return 'none';
}

