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
const colors;
// winning conditions array;
const winningConditions;

// VARIABLES
const boardArr; //  = [0,0,0,0,0,0,0,0,0];
const turnCurr; // player 1 or 2.
const turnNum1; // number of turns.
const turnNum2;
const winner; // the winner;

// Initialize game 
const player1 = 'Player 1' // (prompt('Player 1. Enter your name: '));
const player2 = 'Player 2' // (prompt('Player 2. Enter your name: ')) ;

// SET THE STAGE
const init = () => {
    // fill up variables;
    // set boardArray, set random first turn (use Math.random()), number of turns for 1 and 2. Set winner to 0.
    // add event listeners to the cells.
    // REMEMBER BUBBLING. Apply listener to board component.
    // Maybe make a loop instead? Hmm... 
    // Play the game.
};

// event listener 1. Handle click.
// Extract the index (VALUE or maybe ID) of the cell.
// If it's player 1's turn, replace cell with X.
// If it's player 2's turn, replace cell with O.
// Fill board array at extracted index with 1 or 2, depending on whose turn it is.
// MAKE CELL UNCLICKABLE.
// CHECK FIRST IF VALUE AT INDEX IS EITHER 1 OR 2.
// Check win condition.


// play function.
// Wait for player 1's turn or click.
// Add 1 to turnNum1.
// Flip the "turn table".
// Wait for player 2's turn or click.
// Add 1 to turnNum2.
// Keep going while there is no winner.