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
let player1 = 'Player 1' // (prompt('Player 1. Enter your name: '));
let player2 = 'Player 2' // (prompt('Player 2. Enter your name: ')) ;


// SET THE STAGE
const init = () => {
    // fill up variables;
    // set boardArray, set random first turn (use Math.random()), number of turns for 1 and 2. Set winner to 0.
    boardArr = [0,0,0,0,0,0,0,0,0];
    turnCurr = Math.floor(Math.random() * 2 + 1);
    // add event listeners to the board.
    boardEl = document.querySelector('#board');
    boardEl.addEventListener('click', handleClick);
    // REMEMBER BUBBLING. Apply listener to board component.
    // Maybe make a loop instead? Hmm... 
    // Play the game.

};
init();
console.log(boardArr);


// play function.
// Wait for player 1's turn or click.
// Add 1 to turnNum1.
// Flip the "turn table".
// Wait for player 2's turn or click.
// Add 1 to turnNum2.
// Keep going while there is no winner.

// event listener 1. Handle click.
function handleClick(e){
    // Extract the index (VALUE or maybe ID) of the cell.
    const clickedIndex = e.target.id;
    // Fill board array at extracted index with 1 or 2, depending on whose turn it is.
    // Check first if taken.
    const arrIndexValue = boardArr[clickedIndex];
    console.log("Value at array index ", arrIndexValue);
    boardArr[clickedIndex] = turnCurr;
    console.log(boardArr);
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

// render board function when a click is made.
// If it's player 1's turn, replace cell with X.
// If it's player 2's turn, replace cell with O.
// MAKE CELL UNCLICKABLE.
// CHECK FIRST IF VALUE AT INDEX IS EITHER 1 OR 2.

