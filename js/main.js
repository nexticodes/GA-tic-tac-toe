// alert('JS. Works')

// Game knows the following:
// The board.
// The players' color.
// Whose turn it is.
// Is the game still going? aka has there been a winner?
// I guess, the number of turns.

// Game's functions:
// initialize game (init())
// check if winning condition is met.


// CONSTANTS
// store colors the players want their respective colors to be; [blue, red, gray]
const colors = [];
// winning conditions array;
let winningConditions;

// VARIABLES
let boardArr = []; //  = [0,0,0,0,0,0,0,0,0];
let turnCurr; // player 1 or 2.
let turnNum1; // number of turns.
let turnNum2;
let winner; // the winner;
let boardEl;

// Initialize game 
let player1; // (prompt('Player 1. Enter your name: '));
let player2; // (prompt('Player 2. Enter your name: ')) ;


// SET THE STAGE
const init = () => {
    // fill up variables;
    // set boardArray, set random first turn (use Math.random()), number of turns for 1 and 2. Set winner to 0.
    boardArr = [0,0,0,0,0,0,0,0,0];
    turnCurr = Math.floor(Math.random() * 2 + 1);
    // set up player object.
    player1 = {
        name: 'Player 1',
        // indeces of cells occupied 
        cells: [],
    }
    player2 = {
        name: 'Player 2',
        // indeces of cells occupied 
        cells: [],
    }
    // add event listeners to the board.
    boardEl = document.querySelector('#board');
    boardEl.addEventListener('click', handleClick);
    // REMEMBER BUBBLING. Apply listener to board component.
    // Maybe make a loop instead? Hmm... 
    // Play the game.

};



// play function.
// Wait for player 1's turn or click.
// Add 1 to turnNum1.
// Flip the "turn table".
// Wait for player 2's turn or click.
// Add 1 to turnNum2.

// event listener 1. Handle click.
function handleClick(e){
    // Extract the index (VALUE or maybe ID) of the cell.
    const clickedCellId = e.target.id;
    const clickedIndex = clickedCellId.charAt(clickedCellId.length - 1);
    // Fill board array at extracted index with 1 or 2, depending on whose turn it is.
    // Check first if taken. (if the array at index is not 0, means its taken)
    const arrIndexValue = boardArr[clickedIndex];
    if (boardArr[clickedIndex] === 0){
        boardArr[clickedIndex] = turnCurr;
        // Push clickedIndex into player's occupied cells array.
        if (turnCurr == 1) {
            player1.cells.push(clickedIndex);
        } else {
            player2.cells.push(clickedIndex);
        }
    }
    checkWin();
    // render;
    render(clickedIndex);
    flipTurn();
    // Check win condition.
}

// flip turn
function flipTurn(){
    // switch turns
    if (turnCurr === 1) {
        turnCurr = 2;
    } else if (turnCurr === 2) {
        turnCurr = 1;
    }
};

// render function when a click is made.
// param: cellIndex, index of the cell clicked 
function render(cellIndex){

    // Retrieve cell from HTML. Ref: id.
    const cell = document.querySelector('#cell-8');
    const clickedCell = document.querySelector(`#cell-${cellIndex}`);
    // If it's player 1's turn, replace cell with X.
    // If it's player 2's turn, replace cell with O.
    // Change background to x or o.
    // MAKE CELL UNCLICKABLE IF TAKEN.
    // CHECK FIRST IF VALUE AT INDEX IS EITHER 1 OR 2.
    if (!clickedCell.classList.contains('clicked')){
        if (turnCurr === 1) {
            clickedCell.classList.add('clicked', 'x');
        } else if (turnCurr === 2){
            clickedCell.classList.add('clicked', 'o');
        }
    }

    // if there's a winner.
    if (winner){
        displayWinner();
    }
}

// Check if win conditions met by player. Should be triggered every move.


// Horizontal win, 0 1 2 , 3 4 5, 6 7 8
function checkHorizontal(){
    if ((boardArr[0] === 1 && boardArr[1] === 1 && boardArr[2] === 1) ||
        (boardArr[3] === 1 && boardArr[4] === 1 && boardArr[5] === 1) || 
        (boardArr[6] === 1 && boardArr[7] === 1 && boardArr[8] === 1)){
        // player 1 wins
        winner = '1';
    } else if ((boardArr[0] === 2 && boardArr[1] === 2 && boardArr[2] === 2) ||
    (boardArr[3] === 2 && boardArr[4] === 2 && boardArr[5] === 2) || 
    (boardArr[6] === 2 && boardArr[7] === 2 && boardArr[8] === 2)){
        // player 2 wins
        winner = '2';
    }
}

// Vertical Win,   0 3 6, 1 4 7, 2 5 8
function checkVertical(){
    if ((boardArr[0] === 1 && boardArr[3] === 1 && boardArr[6] === 1) ||
        (boardArr[1] === 1 && boardArr[4] === 1 && boardArr[7] === 1) || 
        (boardArr[2] === 1 && boardArr[5] === 1 && boardArr[8] === 1)){
        // player 1 wins
        winner = '1';
    } else if ((boardArr[0] === 2 && boardArr[3] === 2 && boardArr[6] === 2) ||
        (boardArr[1] === 2 && boardArr[4] === 2 && boardArr[7] === 2) || 
        (boardArr[2] === 2 && boardArr[5] === 2 && boardArr[8] === 2)){
        // player 2 wins
        winner = '2';
    }
}


// Diagonal Win, 0 4 8, 2 4 6
function checkDiagonal(){
    if ((boardArr[0] === 1 && boardArr[3] === 1 && boardArr[6] === 1) ||
        (boardArr[1] === 1 && boardArr[4] === 1 && boardArr[7] === 1)){
        // player 1 wins
        winner = '1';
    } else if ((boardArr[0] === 2 && boardArr[4] === 2 && boardArr[8] === 2) ||
        (boardArr[2] === 2 && boardArr[4] === 2 && boardArr[6] === 2)){
        // player 2 wins
        winner = '2';
    }
}


function checkWin() {
    if (!winner){
        // Winning condition is if player has the following cells occupied:
        // Horizontal win
        tempWinner = checkHorizontal();
        // Vertical win
        tempWinner = checkVertical();
        // Diagonal win
        tempWinner = checkDiagonal();
    }
    console.log(winner)
}

function displayWinner(){
    const winnerEl = document.querySelector('#winner');
    winnerEl.innerText = `Player ${winner} wins!`
}

init();